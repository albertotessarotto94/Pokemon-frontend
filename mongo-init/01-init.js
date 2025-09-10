// Script di inizializzazione del database Pokemon
print('🚀 Inizializzazione del database Pokemon...');

// Crea il database pokemon_db se non esiste
db = db.getSiblingDB('pokemon_db');

// Crea la collezione pokemon
db.createCollection('pokemon');

// Crea gli indici per ottimizzare le query
db.pokemon.createIndex({ "name": 1 }, { unique: true });
db.pokemon.createIndex({ "pokedex_number": 1 }, { unique: true });
db.pokemon.createIndex({ "pokemon_types": 1 });
db.pokemon.createIndex({ "move.move_types": 1 });
db.pokemon.createIndex({ "generation": 1 });

// Inserisci alcuni Pokemon di esempio per la terza generazione
print('📝 Inserimento Pokemon di esempio...');

// Pokemon starter della terza generazione
db.pokemon.insertMany([
  {
    "name": "charizard",
    "name_it": "Charizard",
    "pokedex_number": 6,
    "hp": 78,
    "pokemon_types": ["fire", "flying"],
    "move": {
      "name": "flamethrower",
      "name_it": "Lanciafiamme",
      "power": 90,
      "move_types": ["fire"]
    },
    "generation": 1,
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "name": "blastoise",
    "name_it": "Blastoise", 
    "pokedex_number": 9,
    "hp": 79,
    "pokemon_types": ["water"],
    "move": {
      "name": "hydro-pump",
      "name_it": "Idropompa",
      "power": 110,
      "move_types": ["water"]
    },
    "generation": 1,
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "name": "venusaur",
    "name_it": "Venusaur",
    "pokedex_number": 3,
    "hp": 80,
    "pokemon_types": ["grass", "poison"],
    "move": {
      "name": "solar-beam",
      "name_it": "Raggio Solare",
      "power": 120,
      "move_types": ["grass"]
    },
    "generation": 1,
    "created_at": new Date(),
    "updated_at": new Date()
  }
]);

print('✅ Inizializzazione completata!');
print('📊 Pokemon inseriti: ' + db.pokemon.countDocuments());

// Mostra la struttura della collezione
print('📋 Struttura collezione:');
db.pokemon.findOne();
