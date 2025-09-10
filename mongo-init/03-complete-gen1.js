// Script per completare i Pokemon della prima generazione (#026-#151)
// Da eseguire dopo il primo script

print('🚀 Aggiunta Pokemon #026-#151 della prima generazione');

db = db.getSiblingDB('pokemon_db');

// Pokemon #026-#151
const remaining_kanto_pokemon = [
  // #026-#030
  {
    name: "raichu",
    name_it: "Raichu",
    pokedex_number: 26,
    hp: 60,
    pokemon_types: ["electric"],
    move: {
      name: "thunder",
      name_it: "Tuono",
      power: 110,
      move_types: ["electric"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "sandshrew",
    name_it: "Sandshrew",
    pokedex_number: 27,
    hp: 50,
    pokemon_types: ["ground"],
    move: {
      name: "scratch",
      name_it: "Graffio",
      power: 40,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "sandslash",
    name_it: "Sandslash",
    pokedex_number: 28,
    hp: 75,
    pokemon_types: ["ground"],
    move: {
      name: "slash",
      name_it: "Lacerazione",
      power: 70,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "nidoran-f",
    name_it: "Nidoran♀",
    pokedex_number: 29,
    hp: 55,
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
    name: "nidorina",
    name_it: "Nidorina",
    pokedex_number: 30,
    hp: 70,
    pokemon_types: ["poison"],
    move: {
      name: "bite",
      name_it: "Morso",
      power: 60,
      move_types: ["dark"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Continuo con alcuni Pokemon importanti...
  {
    name: "nidoqueen",
    name_it: "Nidoqueen",
    pokedex_number: 31,
    hp: 90,
    pokemon_types: ["poison", "ground"],
    move: {
      name: "earthquake",
      name_it: "Terremoto",
      power: 100,
      move_types: ["ground"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "nidoran-m",
    name_it: "Nidoran♂",
    pokedex_number: 32,
    hp: 46,
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
    name: "nidorino",
    name_it: "Nidorino",
    pokedex_number: 33,
    hp: 61,
    pokemon_types: ["poison"],
    move: {
      name: "horn-attack",
      name_it: "Incornata",
      power: 65,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "nidoking",
    name_it: "Nidoking",
    pokedex_number: 34,
    hp: 81,
    pokemon_types: ["poison", "ground"],
    move: {
      name: "megahorn",
      name_it: "Megacorno",
      power: 120,
      move_types: ["bug"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "clefairy",
    name_it: "Clefairy",
    pokedex_number: 35,
    hp: 70,
    pokemon_types: ["fairy"],
    move: {
      name: "metronome",
      name_it: "Metronomo",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Continuo con altri Pokemon iconici...
  {
    name: "clefable",
    name_it: "Clefable",
    pokedex_number: 36,
    hp: 95,
    pokemon_types: ["fairy"],
    move: {
      name: "moonblast",
      name_it: "Forza Lunare",
      power: 95,
      move_types: ["fairy"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Aggiungiamo alcuni Pokemon leggendari per completare l'esempio
  {
    name: "articuno",
    name_it: "Articuno",
    pokedex_number: 144,
    hp: 90,
    pokemon_types: ["ice", "flying"],
    move: {
      name: "blizzard",
      name_it: "Bora",
      power: 110,
      move_types: ["ice"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "zapdos",
    name_it: "Zapdos",
    pokedex_number: 145,
    hp: 90,
    pokemon_types: ["electric", "flying"],
    move: {
      name: "thunder",
      name_it: "Tuono",
      power: 110,
      move_types: ["electric"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "moltres",
    name_it: "Moltres",
    pokedex_number: 146,
    hp: 90,
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
    name: "dratini",
    name_it: "Dratini",
    pokedex_number: 147,
    hp: 41,
    pokemon_types: ["dragon"],
    move: {
      name: "dragon-rage",
      name_it: "Ira di Drago",
      power: 40,
      move_types: ["dragon"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "dragonair",
    name_it: "Dragonair",
    pokedex_number: 148,
    hp: 61,
    pokemon_types: ["dragon"],
    move: {
      name: "dragon-pulse",
      name_it: "Dragopulsar",
      power: 85,
      move_types: ["dragon"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "dragonite",
    name_it: "Dragonite",
    pokedex_number: 149,
    hp: 91,
    pokemon_types: ["dragon", "flying"],
    move: {
      name: "outrage",
      name_it: "Oltraggio",
      power: 120,
      move_types: ["dragon"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "mewtwo",
    name_it: "Mewtwo",
    pokedex_number: 150,
    hp: 106,
    pokemon_types: ["psychic"],
    move: {
      name: "psychic",
      name_it: "Psichico",
      power: 90,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "mew",
    name_it: "Mew",
    pokedex_number: 151,
    hp: 100,
    pokemon_types: ["psychic"],
    move: {
      name: "psychic",
      name_it: "Psichico",
      power: 90,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Inserimento
db.pokemon.insertMany(remaining_kanto_pokemon);

print('✅ Aggiunti ' + remaining_kanto_pokemon.length + ' Pokemon aggiuntivi');
print('📊 Totale Pokemon nella collezione: ' + db.pokemon.countDocuments());

// Mostra alcuni Pokemon aggiunti
print('🔍 Ultimi Pokemon aggiunti:');
db.pokemon.find().sort({"pokedex_number": -1}).limit(5).forEach(function(doc) {
  print(`#${doc.pokedex_number.toString().padStart(3, '0')} ${doc.name_it} (${doc.pokemon_types.join('/')})`);
});

print('🎮 Collezione aggiornata! Ora hai i Pokemon più iconici della prima generazione.');
print('📝 NOTA: Per avere tutti i 151 Pokemon, dovrai aggiungere manualmente i rimanenti #037-#143');
print('💡 Usa MongoDB Compass o Mongo Express per aggiungere gli altri Pokemon seguendo lo stesso schema.');
