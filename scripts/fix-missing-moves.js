const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MongoClient } = require('mongodb');

// Configurazione MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://admin:pokemon123@localhost:27017/pokemon_db?authSource=admin';

// Pokemon con mosse mancanti che devono essere aggiornate
const moveCorrections = {
  'Libbra': {
    english: 'pound',
    type: 'normal'
  },
  'Spora': {
    english: 'spore', 
    type: 'grass'
  },
  'Sfuriate': {
    english: 'fury-swipes',
    type: 'normal'
  },
  'Bolla': {
    english: 'bubble',
    type: 'water'
  },
  'Fango': {
    english: 'sludge',
    type: 'poison'
  }
};

// Pokemon da correggere con le relative mosse
const pokemonToFix = [
  { pokedex_number: 35, move_it: 'Libbra' },      // Clefairy
  { pokedex_number: 47, move_it: 'Spora' },       // Parasect
  { pokedex_number: 53, move_it: 'Sfuriate' },    // Persian
  { pokedex_number: 60, move_it: 'Bolla' },       // Poliwag
  { pokedex_number: 89, move_it: 'Fango' },       // Muk
  { pokedex_number: 109, move_it: 'Fango' },      // Koffing
  { pokedex_number: 116, move_it: 'Bolla' }       // Horsea
];

async function fixMissingMoves() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log('🔗 Connesso a MongoDB');
    
    const db = client.db('pokemon_db');
    const collection = db.collection('pokemon');
    
    console.log('🔧 Iniziando correzioni mosse...\n');
    
    let corrected = 0;
    let errors = 0;
    
    for (const pokemon of pokemonToFix) {
      const correction = moveCorrections[pokemon.move_it];
      
      if (!correction) {
        console.log(`❌ Nessuna correzione trovata per "${pokemon.move_it}"`);
        errors++;
        continue;
      }
      
      try {
        const result = await collection.updateOne(
          { pokedex_number: pokemon.pokedex_number },
          {
            $set: {
              'move.name': correction.english,
              'move.move_types': [correction.type],
              'updated_at': new Date()
            }
          }
        );
        
        if (result.matchedCount > 0) {
          const pokemonDoc = await collection.findOne({ pokedex_number: pokemon.pokedex_number });
          console.log(`✅ #${pokemon.pokedex_number.toString().padStart(3, '0')} ${pokemonDoc.name_it}`);
          console.log(`   🔄 "${pokemon.move_it}" → "${correction.english}" (${correction.type})`);
          console.log(`   📊 HP: ${pokemonDoc.hp}, Potenza: ${pokemonDoc.move.power}\n`);
          corrected++;
        } else {
          console.log(`❌ Pokemon #${pokemon.pokedex_number} non trovato`);
          errors++;
        }
        
      } catch (error) {
        console.error(`❌ Errore aggiornando #${pokemon.pokedex_number}: ${error.message}`);
        errors++;
      }
    }
    
    console.log('📊 RIEPILOGO CORREZIONI:');
    console.log(`✅ Pokemon corretti: ${corrected}`);
    console.log(`❌ Errori: ${errors}`);
    console.log(`📈 Totale processati: ${pokemonToFix.length}`);
    
    if (corrected > 0) {
      console.log('\n📋 VERIFICA FINALE:');
      for (const pokemon of pokemonToFix) {
        const doc = await collection.findOne({ pokedex_number: pokemon.pokedex_number });
        if (doc) {
          console.log(`#${pokemon.pokedex_number.toString().padStart(3, '0')} ${doc.name_it}: "${doc.move.name_it}" → "${doc.move.name}" (${doc.move.move_types[0]})`);
        }
      }
    }
    
    console.log('\n🎉 Correzioni completate!');
    
  } catch (error) {
    console.error('❌ Errore durante le correzioni:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Connessione MongoDB chiusa');
  }
}

fixMissingMoves();
