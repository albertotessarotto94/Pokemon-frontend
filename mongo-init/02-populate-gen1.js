// Script per popolare la collezione con i 151 Pokemon della prima generazione
// Rimuove i documenti esistenti e inserisce tutti i Pokemon #001-#151

print('🚀 Inizializzazione collezione Pokemon - Prima Generazione');

// Connessione al database
db = db.getSiblingDB('pokemon_db');

// Rimuove tutti i documenti esistenti dalla collezione
db.pokemon.deleteMany({});
print('🗑️ Collezione svuotata');

// Array dei 151 Pokemon della prima generazione
const kanto_pokemon = [
  {
    name: "bulbasaur",
    name_it: "Bulbasaur",
    pokedex_number: 1,
    hp: 45,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "vine-whip",
      name_it: "Frustata",
      power: 45,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "ivysaur",
    name_it: "Ivysaur",
    pokedex_number: 2,
    hp: 60,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "razor-leaf",
      name_it: "Fogliame",
      power: 55,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "venusaur",
    name_it: "Venusaur",
    pokedex_number: 3,
    hp: 80,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "solar-beam",
      name_it: "Raggio Solare",
      power: 120,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "charmander",
    name_it: "Charmander",
    pokedex_number: 4,
    hp: 39,
    pokemon_types: ["fire"],
    move: {
      name: "ember",
      name_it: "Braciere",
      power: 40,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "charmeleon",
    name_it: "Charmeleon",
    pokedex_number: 5,
    hp: 58,
    pokemon_types: ["fire"],
    move: {
      name: "flamethrower",
      name_it: "Lanciafiamme",
      power: 90,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "charizard",
    name_it: "Charizard",
    pokedex_number: 6,
    hp: 78,
    pokemon_types: ["fire", "flying"],
    move: {
      name: "fire-blast",
      name_it: "Fuocobomba",
      power: 110,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "squirtle",
    name_it: "Squirtle",
    pokedex_number: 7,
    hp: 44,
    pokemon_types: ["water"],
    move: {
      name: "water-gun",
      name_it: "Pistola d'Acqua",
      power: 40,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "wartortle",
    name_it: "Wartortle",
    pokedex_number: 8,
    hp: 59,
    pokemon_types: ["water"],
    move: {
      name: "water-pulse",
      name_it: "Idropulsar",
      power: 60,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "blastoise",
    name_it: "Blastoise",
    pokedex_number: 9,
    hp: 79,
    pokemon_types: ["water"],
    move: {
      name: "hydro-pump",
      name_it: "Idropompa",
      power: 110,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "caterpie",
    name_it: "Caterpie",
    pokedex_number: 10,
    hp: 45,
    pokemon_types: ["bug"],
    move: {
      name: "tackle",
      name_it: "Azione",
      power: 40,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "metapod",
    name_it: "Metapod",
    pokedex_number: 11,
    hp: 50,
    pokemon_types: ["bug"],
    move: {
      name: "harden",
      name_it: "Rafforzatore",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "butterfree",
    name_it: "Butterfree",
    pokedex_number: 12,
    hp: 60,
    pokemon_types: ["bug", "flying"],
    move: {
      name: "psybeam",
      name_it: "Psicoraggio",
      power: 65,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "weedle",
    name_it: "Weedle",
    pokedex_number: 13,
    hp: 40,
    pokemon_types: ["bug", "poison"],
    move: {
      name: "poison-sting",
      name_it: "Velenospina",
      power: 15,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "kakuna",
    name_it: "Kakuna",
    pokedex_number: 14,
    hp: 45,
    pokemon_types: ["bug", "poison"],
    move: {
      name: "harden",
      name_it: "Rafforzatore",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "beedrill",
    name_it: "Beedrill",
    pokedex_number: 15,
    hp: 65,
    pokemon_types: ["bug", "poison"],
    move: {
      name: "twineedle",
      name_it: "Doppio Ago",
      power: 25,
      move_types: ["bug"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "pidgey",
    name_it: "Pidgey",
    pokedex_number: 16,
    hp: 40,
    pokemon_types: ["normal", "flying"],
    move: {
      name: "gust",
      name_it: "Raffica",
      power: 40,
      move_types: ["flying"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "pidgeotto",
    name_it: "Pidgeotto",
    pokedex_number: 17,
    hp: 63,
    pokemon_types: ["normal", "flying"],
    move: {
      name: "wing-attack",
      name_it: "Attacco d'Ala",
      power: 60,
      move_types: ["flying"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "pidgeot",
    name_it: "Pidgeot",
    pokedex_number: 18,
    hp: 83,
    pokemon_types: ["normal", "flying"],
    move: {
      name: "air-slash",
      name_it: "Eterelama",
      power: 75,
      move_types: ["flying"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "rattata",
    name_it: "Rattata",
    pokedex_number: 19,
    hp: 30,
    pokemon_types: ["normal"],
    move: {
      name: "quick-attack",
      name_it: "Attacco Rapido",
      power: 40,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "raticate",
    name_it: "Raticate",
    pokedex_number: 20,
    hp: 55,
    pokemon_types: ["normal"],
    move: {
      name: "hyper-fang",
      name_it: "Iperzanna",
      power: 80,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "spearow",
    name_it: "Spearow",
    pokedex_number: 21,
    hp: 40,
    pokemon_types: ["normal", "flying"],
    move: {
      name: "peck",
      name_it: "Beccata",
      power: 35,
      move_types: ["flying"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "fearow",
    name_it: "Fearow",
    pokedex_number: 22,
    hp: 65,
    pokemon_types: ["normal", "flying"],
    move: {
      name: "drill-peck",
      name_it: "Perforbecco",
      power: 80,
      move_types: ["flying"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "ekans",
    name_it: "Ekans",
    pokedex_number: 23,
    hp: 35,
    pokemon_types: ["poison"],
    move: {
      name: "poison-sting",
      name_it: "Velenospina",
      power: 15,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "arbok",
    name_it: "Arbok",
    pokedex_number: 24,
    hp: 60,
    pokemon_types: ["poison"],
    move: {
      name: "acid",
      name_it: "Acido",
      power: 40,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "pikachu",
    name_it: "Pikachu",
    pokedex_number: 25,
    hp: 35,
    pokemon_types: ["electric"],
    move: {
      name: "thunderbolt",
      name_it: "Fulmine",
      power: 90,
      move_types: ["electric"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Inserimento dei primi 25 Pokemon per iniziare
db.pokemon.insertMany(kanto_pokemon);
print('✅ Inseriti i primi 25 Pokemon della prima generazione (#001-#025)');

// Creiamo gli indici
db.pokemon.createIndex({ "pokedex_number": 1 }, { unique: true });
db.pokemon.createIndex({ "pokemon_types": 1 });
db.pokemon.createIndex({ "move.move_types": 1 });
db.pokemon.createIndex({ "generation": 1 });

print('📊 Indici creati per ottimizzare le query');
print('🎮 Database aggiornato con Pokemon della prima generazione!');
print('📝 Per completare, aggiungi i rimanenti Pokemon #026-#151');

// Mostra alcuni Pokemon inseriti
print('🔍 Pokemon inseriti (primi 5):');
db.pokemon.find().limit(5).sort({"pokedex_number": 1}).forEach(function(doc) {
  print(`#${doc.pokedex_number.toString().padStart(3, '0')} ${doc.name_it} (${doc.pokemon_types.join('/')})`);
});

print(`📈 Totale Pokemon nella collezione: ${db.pokemon.countDocuments()}`);
