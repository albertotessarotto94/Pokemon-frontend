require('dotenv').config();
const { MongoClient } = require('mongodb');
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

// Funzione per aggiungere delay tra le chiamate API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Funzione per ottenere informazioni mossa da PokeAPI
async function getMoveFromPokeAPI(moveName) {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/move/${moveName}`);
    return {
      name: response.data.name,
      type: response.data.type.name,
      power: response.data.power,
      accuracy: response.data.accuracy
    };
  } catch (error) {
    throw new Error(`Errore API per mossa "${moveName}": ${error.message}`);
  }
}

// Funzione principale di verifica
async function verifyMoveTypes() {
  let client;
  
  try {
    // Connessione a MongoDB
    console.log(`${colors.blue}🔗 Connessione a MongoDB...${colors.reset}`);
    client = new MongoClient(MONGO_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Recupera tutti i Pokemon ordinati per Pokedex
    console.log(`${colors.blue}📊 Recupero Pokemon dalla collezione...${colors.reset}`);
    const pokemon = await collection.find({}).sort({ pokedex_number: 1 }).toArray();
    
    console.log(`${colors.bold}🎮 Trovati ${pokemon.length} Pokemon da verificare${colors.reset}\n`);
    
    // Statistiche
    let totalChecked = 0;
    let correctTypes = 0;
    let incorrectTypes = 0;
    let apiErrors = 0;
    const errors = [];
    const corrections = [];
    
    // Verifica ogni Pokemon
    for (const poke of pokemon) {
      totalChecked++;
      const paddedNumber = poke.pokedex_number.toString().padStart(3, '0');
      
      try {
        console.log(`${colors.yellow}🔍 #${paddedNumber} ${poke.name_it} - Verifica mossa: "${poke.move.name}"${colors.reset}`);
        
        // Chiamata a PokeAPI per la mossa
        const moveData = await getMoveFromPokeAPI(poke.move.name);
        
        // Confronta i tipi
        const mongoMoveTypes = poke.move.move_types;
        const pokeApiMoveType = moveData.type;
        
        // Verifica se il tipo corrisponde
        const isCorrect = mongoMoveTypes.length === 1 && mongoMoveTypes[0] === pokeApiMoveType;
        
        if (isCorrect) {
          correctTypes++;
          console.log(`  ${colors.green}✅ CORRETTO: Tipo "${pokeApiMoveType}" corrisponde${colors.reset}`);
        } else {
          incorrectTypes++;
          const error = {
            pokemon: `#${paddedNumber} ${poke.name_it}`,
            move_name: poke.move.name,
            mongo_types: mongoMoveTypes,
            pokeapi_type: pokeApiMoveType,
            pokeapi_power: moveData.power
          };
          errors.push(error);
          corrections.push({
            pokemon_id: poke._id,
            pokemon_name: poke.name_it,
            pokedex_number: poke.pokedex_number,
            move_name: poke.move.name,
            current_types: mongoMoveTypes,
            correct_type: pokeApiMoveType,
            correct_power: moveData.power
          });
          
          console.log(`  ${colors.red}❌ ERRORE: MongoDB=[${mongoMoveTypes.join(', ')}] vs PokeAPI=[${pokeApiMoveType}]${colors.reset}`);
        }
        
        // Delay per non sovraccaricare PokeAPI
        await delay(100);
        
      } catch (error) {
        apiErrors++;
        console.log(`  ${colors.red}💥 ERRORE API: ${error.message}${colors.reset}`);
        errors.push({
          pokemon: `#${paddedNumber} ${poke.name_it}`,
          move_name: poke.move.name,
          error: error.message
        });
      }
    }
    
    // Riepilogo finale
    console.log(`\n${colors.bold}📈 RIEPILOGO VERIFICA TIPI MOSSE${colors.reset}`);
    console.log(`${colors.blue}════════════════════════════════════════${colors.reset}`);
    console.log(`📊 Pokemon verificati: ${totalChecked}`);
    console.log(`${colors.green}✅ Tipi corretti: ${correctTypes}${colors.reset}`);
    console.log(`${colors.red}❌ Tipi errati: ${incorrectTypes}${colors.reset}`);
    console.log(`${colors.yellow}💥 Errori API: ${apiErrors}${colors.reset}`);
    console.log(`📈 Accuratezza: ${((correctTypes / totalChecked) * 100).toFixed(1)}%`);
    
    // Mostra errori dettagliati
    if (errors.length > 0) {
      console.log(`\n${colors.red}${colors.bold}🚨 ERRORI TROVATI:${colors.reset}`);
      errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.pokemon} - Mossa: "${error.move_name}"`);
        if (error.mongo_types) {
          console.log(`   MongoDB: [${error.mongo_types.join(', ')}]`);
          console.log(`   PokeAPI: [${error.pokeapi_type}]`);
          if (error.pokeapi_power !== null) {
            console.log(`   Potenza PokeAPI: ${error.pokeapi_power}`);
          }
        } else {
          console.log(`   Errore: ${error.error}`);
        }
      });
    }
    
    // Genera script di correzione se ci sono errori
    if (corrections.length > 0) {
      console.log(`\n${colors.yellow}${colors.bold}🔧 GENERAZIONE SCRIPT DI CORREZIONE...${colors.reset}`);
      
      const correctionScript = `// Script di correzione automatica per tipi mosse
// Generato il ${new Date().toISOString()}
// Correzioni da applicare: ${corrections.length}

db = db.getSiblingDB('pokemon_db');

print('🔧 Inizio correzione tipi mosse...');

${corrections.map((correction, index) => `
// ${index + 1}. ${correction.pokemon_name} - ${correction.move_name}
db.pokemon.updateOne(
  { _id: ObjectId("${correction.pokemon_id}") },
  { 
    $set: { 
      "move.move_types": ["${correction.correct_type}"],
      ${correction.correct_power !== null ? `"move.power": ${correction.correct_power},` : ''}
      "updated_at": new Date()
    } 
  }
);
print('✅ Corretto #${correction.pokedex_number.toString().padStart(3, '0')} ${correction.pokemon_name}');`).join('')}

print('🎉 Correzione completata!');
print('Verifiche da fare:');
print('- Controllare che tutti i tipi siano corretti');
print('- Verificare le potenze aggiornate');
`;

      // Salva script di correzione
      const fs = require('fs');
      fs.writeFileSync('mongo-correction-script.js', correctionScript);
      console.log(`${colors.green}✅ Script di correzione salvato in: mongo-correction-script.js${colors.reset}`);
    }
    
  } catch (error) {
    console.error(`${colors.red}💥 Errore generale: ${error.message}${colors.reset}`);
  } finally {
    if (client) {
      await client.close();
      console.log(`\n${colors.blue}🔒 Connessione MongoDB chiusa${colors.reset}`);
    }
  }
}

// Esecuzione script
console.log(`${colors.bold}🚀 VERIFICA TIPI MOSSE - Pokemon vs PokeAPI${colors.reset}`);
console.log(`${colors.blue}Inizio verifica di tutti i 151 Pokemon...${colors.reset}\n`);

verifyMoveTypes().catch(console.error);
