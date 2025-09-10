require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const axios = require('axios');

// Configurazione MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://admin:pokemon123@localhost:27017/pokemon_db?authSource=admin';
const DB_NAME = 'pokemon_db';
const COLLECTION_NAME = 'pokemon';

// Configurazione PokeAPI
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// Colori per output console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Delay per non sovraccaricare PokeAPI
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Cache per evitare chiamate duplicate
const moveCache = new Map();

// Dizionario di traduzioni comuni IT → EN per mosse non trovate in PokeAPI
const manualTranslations = {
  'Parassiseme': 'leech-seed',
  'Foglielama': 'razor-leaf',
  'Solarraggio': 'solar-beam',
  'Turbofuoco': 'fire-blast',
  'Pistolacqua': 'water-gun',
  'Capocciata': 'headbutt',
  'Millebave': 'string-shot',
  'Rafforzatore': 'harden',
  'Sonnifero': 'sleep-powder',
  'Velenospina': 'poison-sting',
  'Doppio ago': 'twineedle',
  'Attacco d\'ala': 'wing-attack',
  'Attacco rapido': 'quick-attack',
  'Iperzanna': 'hyper-fang',
  'Perforbecco': 'drill-peck',
  'Tuonoshock': 'thunder-shock',
  'Tuononda': 'thunderbolt',
  'Graffio': 'scratch',
  'Lacerazione': 'slash',
  'Body Slam': 'body-slam',
  'Incornata': 'horn-attack',
  'Doppiasberla': 'double-slap',
  'Inibitore': 'disable',
  'Sanguisuga': 'leech-life',
  'Stordiraggio': 'confuse-ray',
  'Assorbimento': 'absorb',
  'Paralizzante': 'stun-spore',
  'Colpo-karate': 'karate-chop',
  'Movimento sismico': 'seismic-toss',
  'Riduttore': 'take-down',
  'Teletrasporto': 'teleport',
  'Psicoraggio': 'psybeam',
  'Psichico': 'psychic',
  'Sottomissione': 'submission',
  'Frustata': 'vine-whip',
  'Avvolgibotta': 'wrap',
  'Schianto': 'slam',
  'Limitazione': 'constrict',
  'Sassata': 'rock-throw',
  'Terremoto': 'earthquake',
  'Pestone': 'stomp',
  'Confusione': 'confusion',
  'Raggiaurora': 'aurora-beam',
  'Geloraggio': 'ice-beam',
  'Velenogas': 'poison-gas',
  'Tenaglia': 'vice-grip',
  'Sparalance': 'spike-cannon',
  'Leccata': 'lick',
  'Ombra notturna': 'night-shade',
  'Mangiasogni': 'dream-eater',
  'Martellata': 'crabhammer',
  'Sonic Boom': 'sonic-boom',
  'Esplosione': 'explosion',
  'Attacco pioggia': 'barrage',
  'Ossoclava': 'bone-club',
  'Ossomerang': 'bonemerang',
  'Megacalcio': 'mega-kick',
  'Megapugno': 'mega-punch',
  'Autodistruzione': 'self-destruct',
  'Perforcorno': 'horn-drill',
  'Sdoppiatore': 'soft-boiled',
  'Legatutto': 'bind',
  'Stordipugno': 'dizzy-punch',
  'Tripletta': 'tri-attack',
  'Gelopugno': 'ice-punch',
  'Ghigliottina': 'guillotine',
  'Trasformazione': 'transform',
  'Comete': 'swift',
  'Supersuono': 'supersonic',
  'Ira di drago': 'dragon-rage',
  'Aeroattacco': 'sky-attack'
};

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());
    
    const row = {};
    headers.forEach((header, index) => {
      const value = values[index] || '';
      row[header.trim()] = value.replace(/^"(.*)"$/, '$1');
    });
    
    return row;
  });
}

async function findEnglishMoveName(italianName) {
  // Check cache first
  if (moveCache.has(italianName)) {
    return moveCache.get(italianName);
  }
  
  // Check manual translations
  if (manualTranslations[italianName]) {
    const englishName = manualTranslations[italianName];
    moveCache.set(italianName, englishName);
    return englishName;
  }
  
  try {
    // Try to get all moves and find Italian translation
    console.log(`🔍 Cercando traduzione per "${italianName}"...`);
    
    // Get list of all moves (we'll cache this)
    const response = await axios.get(`${POKEAPI_BASE_URL}/move?limit=1000`);
    const moves = response.data.results;
    
    // Search for Italian name in move details
    for (const move of moves.slice(0, 100)) { // Limit search to avoid too many calls
      try {
        const moveDetails = await axios.get(move.url);
        const italianNameInAPI = moveDetails.data.names.find(name => name.language.name === 'it');
        
        if (italianNameInAPI && italianNameInAPI.name === italianName) {
          moveCache.set(italianName, move.name);
          return move.name;
        }
        
        await delay(50); // Small delay between API calls
      } catch (error) {
        console.log(`⚠️ Errore ricerca mossa ${move.name}: ${error.message}`);
      }
    }
    
    // If not found, return sanitized version of Italian name
    const fallbackName = italianName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9-]/g, '');
      
    console.log(`⚠️ Traduzione non trovata per "${italianName}", uso fallback: "${fallbackName}"`);
    moveCache.set(italianName, fallbackName);
    return fallbackName;
    
  } catch (error) {
    console.log(`❌ Errore ricerca "${italianName}": ${error.message}`);
    const fallbackName = italianName.toLowerCase().replace(/\s+/g, '-');
    moveCache.set(italianName, fallbackName);
    return fallbackName;
  }
}

async function getMoveTypeFromAPI(englishMoveName) {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/move/${englishMoveName}`);
    return response.data.type.name;
  } catch (error) {
    console.log(`⚠️ Tipo non trovato per "${englishMoveName}", uso 'normal'`);
    return 'normal'; // Fallback type
  }
}

async function updatePokemonDatabase(csvFilename) {
  let client;
  
  try {
    // Verifica esistenza file
    if (!fs.existsSync(csvFilename)) {
      throw new Error(`File CSV non trovato: ${csvFilename}`);
    }
    
    console.log(`${colors.bold}🎮 AGGIORNAMENTO DATABASE POKEMON DA MASTER TRAINER${colors.reset}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📁 File CSV: ${csvFilename}`);
    
    const csvContent = fs.readFileSync(csvFilename, 'utf8');
    const patches = parseCSV(csvContent);
    
    console.log(`📊 Trovate ${patches.length} righe da processare\n`);
    
    // Connessione a MongoDB
    console.log(`${colors.blue}🔗 Connessione a MongoDB...${colors.reset}`);
    client = new MongoClient(MONGO_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    let processed = 0;
    let updated = 0;
    let skipped = 0;
    const errors = [];
    
    // Processa ogni riga
    for (const patch of patches) {
      processed++;
      
      try {
        const pokedexNumber = parseInt(patch.pokedex_number);
        const hp = patch.hp?.trim();
        const moveNameIt = patch.move_name_it?.trim();
        const movePower = patch.move_power?.trim();
        
        console.log(`${colors.yellow}🔄 #${pokedexNumber.toString().padStart(3, '0')} ${patch.name_it}${colors.reset}`);
        
        // Skip se non ci sono dati da aggiornare
        if (!hp && !moveNameIt && !movePower) {
          skipped++;
          console.log(`   ⏭️  Riga vuota, saltata`);
          continue;
        }
        
        // Prepara update base
        const updateFields = {
          'updated_at': new Date()
        };
        
        if (hp && !isNaN(parseInt(hp))) {
          updateFields['hp'] = parseInt(hp);
        }
        
        if (moveNameIt) {
          updateFields['move.name_it'] = moveNameIt;
          
          // Trova nome inglese e tipo della mossa
          console.log(`   🔍 Traducendo "${moveNameIt}"...`);
          const englishMoveName = await findEnglishMoveName(moveNameIt);
          updateFields['move.name'] = englishMoveName;
          
          console.log(`   🌐 Nome inglese: "${englishMoveName}"`);
          
          // Ottieni tipo della mossa da PokeAPI
          const moveType = await getMoveTypeFromAPI(englishMoveName);
          updateFields['move.move_types'] = [moveType];
          
          console.log(`   🎯 Tipo mossa: "${moveType}"`);
          
          await delay(100); // Delay tra chiamate API
        }
        
        if (movePower && !isNaN(parseInt(movePower))) {
          updateFields['move.power'] = parseInt(movePower);
        }
        
        // Applica patch
        const result = await collection.updateOne(
          { 'pokedex_number': pokedexNumber },
          { '$set': updateFields }
        );
        
        if (result.matchedCount > 0) {
          updated++;
          const updateInfo = [];
          if (hp) updateInfo.push(`HP=${hp}`);
          if (moveNameIt) updateInfo.push(`mossa="${moveNameIt}"`);
          if (movePower) updateInfo.push(`potenza=${movePower}`);
          
          console.log(`   ${colors.green}✅ Aggiornato: ${updateInfo.join(', ')}${colors.reset}`);
        } else {
          errors.push(`Pokemon #${pokedexNumber} non trovato nel database`);
          console.log(`   ${colors.red}❌ Non trovato nel database${colors.reset}`);
        }
        
      } catch (error) {
        errors.push(`Errore riga ${processed}: ${error.message}`);
        console.log(`   ${colors.red}💥 Errore: ${error.message}${colors.reset}`);
      }
    }
    
    // Statistiche finali
    console.log(`\n${colors.bold}📈 RIEPILOGO AGGIORNAMENTO DATABASE${colors.reset}`);
    console.log(`${'═'.repeat(50)}`);
    console.log(`📊 Righe processate: ${processed}`);
    console.log(`${colors.green}✅ Pokemon aggiornati: ${updated}${colors.reset}`);
    console.log(`⏭️  Righe saltate (vuote): ${skipped}`);
    console.log(`${colors.red}❌ Errori: ${errors.length}${colors.reset}`);
    
    if (errors.length > 0) {
      console.log(`\n${colors.red}🚨 ERRORI RISCONTRATI:${colors.reset}`);
      errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    console.log(`\n${colors.green}🎉 DATABASE AGGIORNATO CON SUCCESSO!${colors.reset}`);
    console.log(`${colors.blue}Tutti i Pokemon ora hanno:${colors.reset}`);
    console.log(`   - HP da Pokemon Master Trainer`);
    console.log(`   - Mosse tradotte in italiano e inglese`);
    console.log(`   - Tipi mosse corretti da PokeAPI`);
    console.log(`   - Potenze da Master Trainer`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Errore generale: ${error.message}${colors.reset}`);
  } finally {
    if (client) {
      await client.close();
      console.log(`\n${colors.blue}🔒 Connessione MongoDB chiusa${colors.reset}`);
    }
  }
}

// Cerca automaticamente il file CSV più recente
function findLatestCSV() {
  const files = fs.readdirSync('.')
    .filter(file => file.startsWith('pokemon-master-trainer-patch-') && file.endsWith('.csv'))
    .sort()
    .reverse();
  
  return files[0] || null;
}

// Esecuzione script
const csvFile = process.argv[2] || findLatestCSV();

if (!csvFile) {
  console.log(`${colors.red}❌ Nessun file CSV trovato!${colors.reset}`);
  console.log(`${colors.blue}💡 Utilizzo:${colors.reset}`);
  console.log(`   node update-database-from-csv.js [filename.csv]`);
} else {
  updatePokemonDatabase(csvFile).catch(console.error);
}
