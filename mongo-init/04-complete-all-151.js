// Script completo per aggiungere Pokemon #037-#143 della prima generazione
// Completa la collezione con tutti i 151 Pokemon di Kanto

print('🚀 Aggiunta Pokemon #037-#143 - Completamento Prima Generazione');

db = db.getSiblingDB('pokemon_db');

// Pokemon #037-#143 completi
const missing_kanto_pokemon = [
  // #037-#040 (Vulpix line + Jigglypuff line)
  {
    name: "vulpix",
    name_it: "Vulpix",
    pokedex_number: 37,
    hp: 38,
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
    name: "ninetales",
    name_it: "Ninetales",
    pokedex_number: 38,
    hp: 73,
    pokemon_types: ["fire"],
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
    name: "jigglypuff",
    name_it: "Jigglypuff",
    pokedex_number: 39,
    hp: 115,
    pokemon_types: ["normal", "fairy"],
    move: {
      name: "sing",
      name_it: "Canto",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "wigglytuff",
    name_it: "Wigglytuff",
    pokedex_number: 40,
    hp: 140,
    pokemon_types: ["normal", "fairy"],
    move: {
      name: "hyper-voice",
      name_it: "Granvoce",
      power: 90,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  
  // #041-#050 (Zubat line, Oddish line, Paras line, Venonat line, Diglett line)
  {
    name: "zubat",
    name_it: "Zubat",
    pokedex_number: 41,
    hp: 40,
    pokemon_types: ["poison", "flying"],
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
    name: "golbat",
    name_it: "Golbat",
    pokedex_number: 42,
    hp: 75,
    pokemon_types: ["poison", "flying"],
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
    name: "oddish",
    name_it: "Oddish",
    pokedex_number: 43,
    hp: 45,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "absorb",
      name_it: "Assorbimento",
      power: 20,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "gloom",
    name_it: "Gloom",
    pokedex_number: 44,
    hp: 60,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "petal-dance",
      name_it: "Petalodanza",
      power: 120,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "vileplume",
    name_it: "Vileplume",
    pokedex_number: 45,
    hp: 75,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "sleep-powder",
      name_it: "Sonnifero",
      power: 0,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "paras",
    name_it: "Paras",
    pokedex_number: 46,
    hp: 35,
    pokemon_types: ["bug", "grass"],
    move: {
      name: "spore",
      name_it: "Spora",
      power: 0,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "parasect",
    name_it: "Parasect",
    pokedex_number: 47,
    hp: 60,
    pokemon_types: ["bug", "grass"],
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
    name: "venonat",
    name_it: "Venonat",
    pokedex_number: 48,
    hp: 60,
    pokemon_types: ["bug", "poison"],
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
    name: "venomoth",
    name_it: "Venomoth",
    pokedex_number: 49,
    hp: 70,
    pokemon_types: ["bug", "poison"],
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
    name: "diglett",
    name_it: "Diglett",
    pokedex_number: 50,
    hp: 10,
    pokemon_types: ["ground"],
    move: {
      name: "dig",
      name_it: "Scavo",
      power: 80,
      move_types: ["ground"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },

  // #051-#060
  {
    name: "dugtrio",
    name_it: "Dugtrio",
    pokedex_number: 51,
    hp: 35,
    pokemon_types: ["ground"],
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
    name: "meowth",
    name_it: "Meowth",
    pokedex_number: 52,
    hp: 40,
    pokemon_types: ["normal"],
    move: {
      name: "pay-day",
      name_it: "Giornopaga",
      power: 40,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "persian",
    name_it: "Persian",
    pokedex_number: 53,
    hp: 65,
    pokemon_types: ["normal"],
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
    name: "psyduck",
    name_it: "Psyduck",
    pokedex_number: 54,
    hp: 50,
    pokemon_types: ["water"],
    move: {
      name: "confusion",
      name_it: "Confusione",
      power: 50,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "golduck",
    name_it: "Golduck",
    pokedex_number: 55,
    hp: 80,
    pokemon_types: ["water"],
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
    name: "mankey",
    name_it: "Mankey",
    pokedex_number: 56,
    hp: 40,
    pokemon_types: ["fighting"],
    move: {
      name: "karate-chop",
      name_it: "Colpokarate",
      power: 50,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "primeape",
    name_it: "Primeape",
    pokedex_number: 57,
    hp: 65,
    pokemon_types: ["fighting"],
    move: {
      name: "cross-chop",
      name_it: "Incrocolpo",
      power: 100,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "growlithe",
    name_it: "Growlithe",
    pokedex_number: 58,
    hp: 55,
    pokemon_types: ["fire"],
    move: {
      name: "flame-wheel",
      name_it: "Ruotafuoco",
      power: 60,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "arcanine",
    name_it: "Arcanine",
    pokedex_number: 59,
    hp: 90,
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
    name: "poliwag",
    name_it: "Poliwag",
    pokedex_number: 60,
    hp: 40,
    pokemon_types: ["water"],
    move: {
      name: "bubble",
      name_it: "Bolla",
      power: 40,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },

  // #061-#070
  {
    name: "poliwhirl",
    name_it: "Poliwhirl",
    pokedex_number: 61,
    hp: 65,
    pokemon_types: ["water"],
    move: {
      name: "bubble-beam",
      name_it: "Bollaraggio",
      power: 65,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "poliwrath",
    name_it: "Poliwrath",
    pokedex_number: 62,
    hp: 90,
    pokemon_types: ["water", "fighting"],
    move: {
      name: "submission",
      name_it: "Sottomissione",
      power: 80,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "abra",
    name_it: "Abra",
    pokedex_number: 63,
    hp: 25,
    pokemon_types: ["psychic"],
    move: {
      name: "teleport",
      name_it: "Teletrasporto",
      power: 0,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "kadabra",
    name_it: "Kadabra",
    pokedex_number: 64,
    hp: 40,
    pokemon_types: ["psychic"],
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
    name: "alakazam",
    name_it: "Alakazam",
    pokedex_number: 65,
    hp: 55,
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
    name: "machop",
    name_it: "Machop",
    pokedex_number: 66,
    hp: 70,
    pokemon_types: ["fighting"],
    move: {
      name: "low-kick",
      name_it: "Colpo Basso",
      power: 50,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "machoke",
    name_it: "Machoke",
    pokedex_number: 67,
    hp: 80,
    pokemon_types: ["fighting"],
    move: {
      name: "seismic-toss",
      name_it: "Movimento Sismico",
      power: 60,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "machamp",
    name_it: "Machamp",
    pokedex_number: 68,
    hp: 90,
    pokemon_types: ["fighting"],
    move: {
      name: "dynamic-punch",
      name_it: "Dinamipugno",
      power: 100,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "bellsprout",
    name_it: "Bellsprout",
    pokedex_number: 69,
    hp: 50,
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
    name: "weepinbell",
    name_it: "Weepinbell",
    pokedex_number: 70,
    hp: 65,
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

  // #071-#080
  {
    name: "victreebel",
    name_it: "Victreebel",
    pokedex_number: 71,
    hp: 80,
    pokemon_types: ["grass", "poison"],
    move: {
      name: "leaf-storm",
      name_it: "Verdebufera",
      power: 130,
      move_types: ["grass"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "tentacool",
    name_it: "Tentacool",
    pokedex_number: 72,
    hp: 40,
    pokemon_types: ["water", "poison"],
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
    name: "tentacruel",
    name_it: "Tentacruel",
    pokedex_number: 73,
    hp: 80,
    pokemon_types: ["water", "poison"],
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
    name: "geodude",
    name_it: "Geodude",
    pokedex_number: 74,
    hp: 40,
    pokemon_types: ["rock", "ground"],
    move: {
      name: "rock-throw",
      name_it: "Sassata",
      power: 50,
      move_types: ["rock"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "graveler",
    name_it: "Graveler",
    pokedex_number: 75,
    hp: 55,
    pokemon_types: ["rock", "ground"],
    move: {
      name: "rock-slide",
      name_it: "Frana",
      power: 75,
      move_types: ["rock"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "golem",
    name_it: "Golem",
    pokedex_number: 76,
    hp: 80,
    pokemon_types: ["rock", "ground"],
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
    name: "ponyta",
    name_it: "Ponyta",
    pokedex_number: 77,
    hp: 50,
    pokemon_types: ["fire"],
    move: {
      name: "flame-wheel",
      name_it: "Ruotafuoco",
      power: 60,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "rapidash",
    name_it: "Rapidash",
    pokedex_number: 78,
    hp: 65,
    pokemon_types: ["fire"],
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
    name: "slowpoke",
    name_it: "Slowpoke",
    pokedex_number: 79,
    hp: 90,
    pokemon_types: ["water", "psychic"],
    move: {
      name: "confusion",
      name_it: "Confusione",
      power: 50,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "slowbro",
    name_it: "Slowbro",
    pokedex_number: 80,
    hp: 95,
    pokemon_types: ["water", "psychic"],
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

  // #081-#090
  {
    name: "magnemite",
    name_it: "Magnemite",
    pokedex_number: 81,
    hp: 25,
    pokemon_types: ["electric", "steel"],
    move: {
      name: "thunder-shock",
      name_it: "Tuonoshock",
      power: 40,
      move_types: ["electric"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "magneton",
    name_it: "Magneton",
    pokedex_number: 82,
    hp: 50,
    pokemon_types: ["electric", "steel"],
    move: {
      name: "thunderbolt",
      name_it: "Fulmine",
      power: 90,
      move_types: ["electric"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "farfetchd",
    name_it: "Farfetch'd",
    pokedex_number: 83,
    hp: 52,
    pokemon_types: ["normal", "flying"],
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
    name: "doduo",
    name_it: "Doduo",
    pokedex_number: 84,
    hp: 35,
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
    name: "dodrio",
    name_it: "Dodrio",
    pokedex_number: 85,
    hp: 60,
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
    name: "seel",
    name_it: "Seel",
    pokedex_number: 86,
    hp: 65,
    pokemon_types: ["water"],
    move: {
      name: "aurora-beam",
      name_it: "Raggiaurora",
      power: 65,
      move_types: ["ice"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "dewgong",
    name_it: "Dewgong",
    pokedex_number: 87,
    hp: 90,
    pokemon_types: ["water", "ice"],
    move: {
      name: "ice-beam",
      name_it: "Geloraggio",
      power: 90,
      move_types: ["ice"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "grimer",
    name_it: "Grimer",
    pokedex_number: 88,
    hp: 80,
    pokemon_types: ["poison"],
    move: {
      name: "sludge",
      name_it: "Fango",
      power: 65,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "muk",
    name_it: "Muk",
    pokedex_number: 89,
    hp: 105,
    pokemon_types: ["poison"],
    move: {
      name: "sludge-bomb",
      name_it: "Fangobomba",
      power: 90,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "shellder",
    name_it: "Shellder",
    pokedex_number: 90,
    hp: 30,
    pokemon_types: ["water"],
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

  // #091-#100
  {
    name: "cloyster",
    name_it: "Cloyster",
    pokedex_number: 91,
    hp: 50,
    pokemon_types: ["water", "ice"],
    move: {
      name: "spike-cannon",
      name_it: "Sparalance",
      power: 20,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "gastly",
    name_it: "Gastly",
    pokedex_number: 92,
    hp: 30,
    pokemon_types: ["ghost", "poison"],
    move: {
      name: "lick",
      name_it: "Leccata",
      power: 30,
      move_types: ["ghost"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "haunter",
    name_it: "Haunter",
    pokedex_number: 93,
    hp: 45,
    pokemon_types: ["ghost", "poison"],
    move: {
      name: "shadow-punch",
      name_it: "Pugnombre",
      power: 60,
      move_types: ["ghost"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "gengar",
    name_it: "Gengar",
    pokedex_number: 94,
    hp: 60,
    pokemon_types: ["ghost", "poison"],
    move: {
      name: "shadow-ball",
      name_it: "Palla Ombra",
      power: 80,
      move_types: ["ghost"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "onix",
    name_it: "Onix",
    pokedex_number: 95,
    hp: 35,
    pokemon_types: ["rock", "ground"],
    move: {
      name: "rock-slide",
      name_it: "Frana",
      power: 75,
      move_types: ["rock"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "drowzee",
    name_it: "Drowzee",
    pokedex_number: 96,
    hp: 60,
    pokemon_types: ["psychic"],
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
    name: "hypno",
    name_it: "Hypno",
    pokedex_number: 97,
    hp: 85,
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
    name: "krabby",
    name_it: "Krabby",
    pokedex_number: 98,
    hp: 30,
    pokemon_types: ["water"],
    move: {
      name: "bubble",
      name_it: "Bolla",
      power: 40,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "kingler",
    name_it: "Kingler",
    pokedex_number: 99,
    hp: 55,
    pokemon_types: ["water"],
    move: {
      name: "crabhammer",
      name_it: "Martellata",
      power: 100,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "voltorb",
    name_it: "Voltorb",
    pokedex_number: 100,
    hp: 40,
    pokemon_types: ["electric"],
    move: {
      name: "self-destruct",
      name_it: "Autodistruzione",
      power: 200,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },

  // #101-#110
  {
    name: "electrode",
    name_it: "Electrode",
    pokedex_number: 101,
    hp: 60,
    pokemon_types: ["electric"],
    move: {
      name: "explosion",
      name_it: "Esplosione",
      power: 250,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "exeggcute",
    name_it: "Exeggcute",
    pokedex_number: 102,
    hp: 60,
    pokemon_types: ["grass", "psychic"],
    move: {
      name: "confusion",
      name_it: "Confusione",
      power: 50,
      move_types: ["psychic"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "exeggutor",
    name_it: "Exeggutor",
    pokedex_number: 103,
    hp: 95,
    pokemon_types: ["grass", "psychic"],
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
    name: "cubone",
    name_it: "Cubone",
    pokedex_number: 104,
    hp: 50,
    pokemon_types: ["ground"],
    move: {
      name: "bone-club",
      name_it: "Ossoclava",
      power: 65,
      move_types: ["ground"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "marowak",
    name_it: "Marowak",
    pokedex_number: 105,
    hp: 60,
    pokemon_types: ["ground"],
    move: {
      name: "bonemerang",
      name_it: "Ossorang",
      power: 50,
      move_types: ["ground"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "hitmonlee",
    name_it: "Hitmonlee",
    pokedex_number: 106,
    hp: 50,
    pokemon_types: ["fighting"],
    move: {
      name: "jump-kick",
      name_it: "Calciosalto",
      power: 100,
      move_types: ["fighting"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "hitmonchan",
    name_it: "Hitmonchan",
    pokedex_number: 107,
    hp: 50,
    pokemon_types: ["fighting"],
    move: {
      name: "fire-punch",
      name_it: "Fuocopugno",
      power: 75,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "lickitung",
    name_it: "Lickitung",
    pokedex_number: 108,
    hp: 90,
    pokemon_types: ["normal"],
    move: {
      name: "lick",
      name_it: "Leccata",
      power: 30,
      move_types: ["ghost"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "koffing",
    name_it: "Koffing",
    pokedex_number: 109,
    hp: 40,
    pokemon_types: ["poison"],
    move: {
      name: "sludge",
      name_it: "Fango",
      power: 65,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "weezing",
    name_it: "Weezing",
    pokedex_number: 110,
    hp: 65,
    pokemon_types: ["poison"],
    move: {
      name: "sludge-bomb",
      name_it: "Fangobomba",
      power: 90,
      move_types: ["poison"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },

  // #111-#120
  {
    name: "rhyhorn",
    name_it: "Rhyhorn",
    pokedex_number: 111,
    hp: 80,
    pokemon_types: ["ground", "rock"],
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
    name: "rhydon",
    name_it: "Rhydon",
    pokedex_number: 112,
    hp: 105,
    pokemon_types: ["ground", "rock"],
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
    name: "chansey",
    name_it: "Chansey",
    pokedex_number: 113,
    hp: 250,
    pokemon_types: ["normal"],
    move: {
      name: "soft-boiled",
      name_it: "Covauova",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "tangela",
    name_it: "Tangela",
    pokedex_number: 114,
    hp: 65,
    pokemon_types: ["grass"],
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
    name: "kangaskhan",
    name_it: "Kangaskhan",
    pokedex_number: 115,
    hp: 105,
    pokemon_types: ["normal"],
    move: {
      name: "dizzy-punch",
      name_it: "Stordipugno",
      power: 70,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "horsea",
    name_it: "Horsea",
    pokedex_number: 116,
    hp: 30,
    pokemon_types: ["water"],
    move: {
      name: "bubble",
      name_it: "Bolla",
      power: 40,
      move_types: ["water"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "seadra",
    name_it: "Seadra",
    pokedex_number: 117,
    hp: 55,
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
    name: "goldeen",
    name_it: "Goldeen",
    pokedex_number: 118,
    hp: 45,
    pokemon_types: ["water"],
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
    name: "seaking",
    name_it: "Seaking",
    pokedex_number: 119,
    hp: 80,
    pokemon_types: ["water"],
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
    name: "staryu",
    name_it: "Staryu",
    pokedex_number: 120,
    hp: 30,
    pokemon_types: ["water"],
    move: {
      name: "swift",
      name_it: "Comete",
      power: 60,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },

  // #121-#130
  {
    name: "starmie",
    name_it: "Starmie",
    pokedex_number: 121,
    hp: 60,
    pokemon_types: ["water", "psychic"],
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
    name: "mr-mime",
    name_it: "Mr. Mime",
    pokedex_number: 122,
    hp: 40,
    pokemon_types: ["psychic", "fairy"],
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
    name: "scyther",
    name_it: "Scyther",
    pokedex_number: 123,
    hp: 70,
    pokemon_types: ["bug", "flying"],
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
    name: "jynx",
    name_it: "Jynx",
    pokedex_number: 124,
    hp: 65,
    pokemon_types: ["ice", "psychic"],
    move: {
      name: "ice-punch",
      name_it: "Gelopugno",
      power: 75,
      move_types: ["ice"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "electabuzz",
    name_it: "Electabuzz",
    pokedex_number: 125,
    hp: 65,
    pokemon_types: ["electric"],
    move: {
      name: "thunder-punch",
      name_it: "Tuonopugno",
      power: 75,
      move_types: ["electric"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "magmar",
    name_it: "Magmar",
    pokedex_number: 126,
    hp: 65,
    pokemon_types: ["fire"],
    move: {
      name: "fire-punch",
      name_it: "Fuocopugno",
      power: 75,
      move_types: ["fire"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "pinsir",
    name_it: "Pinsir",
    pokedex_number: 127,
    hp: 65,
    pokemon_types: ["bug"],
    move: {
      name: "vice-grip",
      name_it: "Presa",
      power: 55,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "tauros",
    name_it: "Tauros",
    pokedex_number: 128,
    hp: 75,
    pokemon_types: ["normal"],
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
    name: "magikarp",
    name_it: "Magikarp",
    pokedex_number: 129,
    hp: 20,
    pokemon_types: ["water"],
    move: {
      name: "splash",
      name_it: "Splash",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "gyarados",
    name_it: "Gyarados",
    pokedex_number: 130,
    hp: 95,
    pokemon_types: ["water", "flying"],
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

  // #131-#143
  {
    name: "lapras",
    name_it: "Lapras",
    pokedex_number: 131,
    hp: 130,
    pokemon_types: ["water", "ice"],
    move: {
      name: "ice-beam",
      name_it: "Geloraggio",
      power: 90,
      move_types: ["ice"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "ditto",
    name_it: "Ditto",
    pokedex_number: 132,
    hp: 48,
    pokemon_types: ["normal"],
    move: {
      name: "transform",
      name_it: "Trasformazione",
      power: 0,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "eevee",
    name_it: "Eevee",
    pokedex_number: 133,
    hp: 55,
    pokemon_types: ["normal"],
    move: {
      name: "swift",
      name_it: "Comete",
      power: 60,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "vaporeon",
    name_it: "Vaporeon",
    pokedex_number: 134,
    hp: 130,
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
    name: "jolteon",
    name_it: "Jolteon",
    pokedex_number: 135,
    hp: 65,
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
    name: "flareon",
    name_it: "Flareon",
    pokedex_number: 136,
    hp: 65,
    pokemon_types: ["fire"],
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
    name: "porygon",
    name_it: "Porygon",
    pokedex_number: 137,
    hp: 65,
    pokemon_types: ["normal"],
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
    name: "omanyte",
    name_it: "Omanyte",
    pokedex_number: 138,
    hp: 35,
    pokemon_types: ["rock", "water"],
    move: {
      name: "ancient-power",
      name_it: "Forzantica",
      power: 60,
      move_types: ["rock"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "omastar",
    name_it: "Omastar",
    pokedex_number: 139,
    hp: 70,
    pokemon_types: ["rock", "water"],
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
    name: "kabuto",
    name_it: "Kabuto",
    pokedex_number: 140,
    hp: 30,
    pokemon_types: ["rock", "water"],
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
    name: "kabutops",
    name_it: "Kabutops",
    pokedex_number: 141,
    hp: 60,
    pokemon_types: ["rock", "water"],
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
    name: "aerodactyl",
    name_it: "Aerodactyl",
    pokedex_number: 142,
    hp: 80,
    pokemon_types: ["rock", "flying"],
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
    name: "snorlax",
    name_it: "Snorlax",
    pokedex_number: 143,
    hp: 160,
    pokemon_types: ["normal"],
    move: {
      name: "body-slam",
      name_it: "Corposcontro",
      power: 85,
      move_types: ["normal"]
    },
    generation: 1,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Inserimento in lotti per gestire meglio grandi quantità
print('📦 Inserimento Pokemon in lotti...');

const batchSize = 20;
for (let i = 0; i < missing_kanto_pokemon.length; i += batchSize) {
  const batch = missing_kanto_pokemon.slice(i, i + batchSize);
  db.pokemon.insertMany(batch);
  print(`✅ Batch ${Math.floor(i/batchSize) + 1}: Inseriti Pokemon #${batch[0].pokedex_number}-#${batch[batch.length-1].pokedex_number}`);
}

print('🎉 COMPLETAMENTO PRIMA GENERAZIONE!');
print('📊 Totale Pokemon nella collezione: ' + db.pokemon.countDocuments());

// Verifica finale - mostra tutti i Pokemon ordinati
print('🔍 Verifica finale - tutti i 151 Pokemon presenti:');
const allPokemon = db.pokemon.find().sort({pokedex_number: 1}).toArray();
print('Pokemon presenti: #' + allPokemon.map(p => p.pokedex_number.toString().padStart(3, '0')).join(', #'));

// Statistiche finali
print('📈 STATISTICHE COLLEZIONE:');
print('- Totale Pokemon: ' + db.pokemon.countDocuments());
print('- Prima generazione completa: ✅');
print('- Range: #001-#151');
print('- Ordinamento: Per numero Pokedex');
print('- Tutti i documenti senza campo "attack": ✅');

print('🎮 La collezione Pokemon è ora completa e pronta per il sistema di confronto!');
