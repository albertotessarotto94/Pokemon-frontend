require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

// Configurazione MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://admin:pokemon123@localhost:27017/pokemon_db?authSource=admin';
const DB_NAME = 'pokemon_db';
const COLLECTION_NAME = 'pokemon';

async function generatePatchCSV() {
  let client;
  
  try {
    console.log('🔗 Connessione a MongoDB...');
    client = new MongoClient(MONGO_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Recupera tutti i Pokemon ordinati per Pokedex
    console.log('📊 Recupero Pokemon dalla collezione...');
    const pokemon = await collection
      .find({})
      .sort({ pokedex_number: 1 })
      .project({
        pokedex_number: 1,
        name: 1,
        name_it: 1,
        'move.name_it': 1,
        'move.power': 1
      })
      .toArray();
    
    console.log(`🎮 Trovati ${pokemon.length} Pokemon`);
    
    // Crea header CSV
    const csvHeaders = [
      'pokedex_number',
      'name', 
      'name_it',
      'hp',
      'move_name_it',
      'move_power'
    ];
    
    // Crea righe CSV
    const csvRows = [csvHeaders.join(',')];
    
    pokemon.forEach(poke => {
      const row = [
        poke.pokedex_number,              // Compilato automaticamente
        `"${poke.name}"`,                 // Compilato automaticamente
        `"${poke.name_it}"`,              // Per riferimento
        '',                               // DA COMPILARE MANUALMENTE (HP)
        '""',                             // DA COMPILARE MANUALMENTE (nome mossa)
        ''                                // DA COMPILARE MANUALMENTE (potenza)
      ];
      csvRows.push(row.join(','));
    });
    
    // Salva il file CSV
    const csvContent = csvRows.join('\n');
    const filename = `pokemon-master-trainer-patch-${new Date().toISOString().split('T')[0]}.csv`;
    
    fs.writeFileSync(filename, csvContent, 'utf8');
    
    console.log(`✅ File CSV generato: ${filename}`);
    console.log(`📋 Colonne disponibili:`);
    console.log(`   - pokedex_number: ✅ Compilato automaticamente`);
    console.log(`   - name: ✅ Compilato automaticamente (nome inglese)`);
    console.log(`   - name_it: ✅ Compilato automaticamente (per riferimento)`);
    console.log(`   - hp: ❌ DA COMPILARE (HP da Master Trainer)`);
    console.log(`   - move_name_it: ❌ DA COMPILARE (nome mossa italiano Master Trainer)`);
    console.log(`   - move_power: ❌ DA COMPILARE (potenza Master Trainer)`);
    console.log(`\n🎯 Prossimi passi:`);
    console.log(`   1. Apri il file CSV in Excel/Google Sheets`);
    console.log(`   2. Compila le colonne "hp", "move_name_it" e "move_power" con dati Master Trainer`);
    console.log(`   3. Salva il file`);
    console.log(`   4. Usa lo script di import per applicare le patch a MongoDB`);
    
    // Preview delle prime 5 righe
    console.log(`\n📄 Preview (prime 5 righe):`);
    csvRows.slice(0, 6).forEach((row, index) => {
      if (index === 0) {
        console.log(`HEADER: ${row}`);
      } else {
        console.log(`#${index.toString().padStart(3, '0')}: ${row}`);
      }
    });
    
  } catch (error) {
    console.error(`❌ Errore: ${error.message}`);
  } finally {
    if (client) {
      await client.close();
      console.log(`\n🔒 Connessione MongoDB chiusa`);
    }
  }
}

console.log('🎮 GENERATORE CSV PER PATCH POKEMON MASTER TRAINER');
console.log('==================================================');
generatePatchCSV().catch(console.error);
