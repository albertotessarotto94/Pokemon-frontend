require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Configurazione MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://admin:pokemon123@localhost:27017/pokemon_db?authSource=admin';
const DB_NAME = 'pokemon_db';
const COLLECTION_NAME = 'pokemon';

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

async function applyPatchesFromCSV(csvFilename) {
  let client;
  
  try {
    // Verifica esistenza file
    if (!fs.existsSync(csvFilename)) {
      throw new Error(`File CSV non trovato: ${csvFilename}`);
    }
    
    console.log(`📁 Caricamento file: ${csvFilename}`);
    const csvContent = fs.readFileSync(csvFilename, 'utf8');
    const patches = parseCSV(csvContent);
    
    console.log(`📊 Trovate ${patches.length} righe da processare`);
    
    // Connessione a MongoDB
    console.log('🔗 Connessione a MongoDB...');
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
        
        // Skip se non ci sono dati da aggiornare
        if (!hp && !moveNameIt && !movePower) {
          skipped++;
          console.log(`⏭️  #${pokedexNumber.toString().padStart(3, '0')} - Riga vuota, saltata`);
          continue;
        }
        
        // Prepara update
        const updateFields = {
          'updated_at': new Date()
        };
        
        if (hp && !isNaN(parseInt(hp))) {
          updateFields['hp'] = parseInt(hp);
        }
        
        if (moveNameIt) {
          updateFields['move.name_it'] = moveNameIt;
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
          
          console.log(`✅ #${pokedexNumber.toString().padStart(3, '0')} ${patch.name_it} - ${updateInfo.join(', ')}`);
        } else {
          errors.push(`Pokemon #${pokedexNumber} non trovato nel database`);
          console.log(`❌ #${pokedexNumber.toString().padStart(3, '0')} - Non trovato`);
        }
        
      } catch (error) {
        errors.push(`Errore riga ${processed}: ${error.message}`);
        console.log(`💥 Errore riga ${processed}: ${error.message}`);
      }
    }
    
    // Statistiche finali
    console.log(`\n📈 RIEPILOGO PATCH APPLICATE`);
    console.log(`═══════════════════════════════════`);
    console.log(`📊 Righe processate: ${processed}`);
    console.log(`✅ Pokemon aggiornati: ${updated}`);
    console.log(`⏭️  Righe saltate (vuote): ${skipped}`);
    console.log(`❌ Errori: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log(`\n🚨 ERRORI RISCONTRATI:`);
      errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    console.log(`\n🎉 Patch completate! Database aggiornato con dati Master Trainer.`);
    
  } catch (error) {
    console.error(`❌ Errore generale: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
      console.log(`\n🔒 Connessione MongoDB chiusa`);
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
console.log('🎮 IMPORT PATCH DA CSV A MONGODB');
console.log('================================');

const csvFile = process.argv[2] || findLatestCSV();

if (!csvFile) {
  console.log('❌ Nessun file CSV trovato!');
  console.log('💡 Utilizzo:');
  console.log('   node import-patch-csv.js [filename.csv]');
  console.log('   oppure genera prima il CSV con: node generate-patch-csv.js');
} else {
  console.log(`📁 File CSV: ${csvFile}`);
  applyPatchesFromCSV(csvFile).catch(console.error);
}
