const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { calculateDamage, generateEffectivenessDescription } = require('./typeEffectiveness');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configurazione MongoDB
const MONGO_URI = 'mongodb://admin:pokemon123@localhost:27017';
const DB_NAME = 'pokemon_db';
const COLLECTION_NAME = 'pokemon';

let db;

// Connessione MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGO_URI, { authSource: 'admin' });
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connesso a MongoDB');
  } catch (error) {
    console.error('❌ Errore connessione MongoDB:', error);
    process.exit(1);
  }
}

// Endpoint per ottenere tutti i Pokemon per le select
app.get('/api/pokemon', async (req, res) => {
  try {
    const pokemon = await db.collection(COLLECTION_NAME)
      .find({})
      .sort({ pokedex_number: 1 })
      .project({
        pokedex_number: 1,
        name: 1,
        name_it: 1,
        pokemon_types: 1,
        hp: 1,
        'move.name_it': 1,
        'move.move_types': 1,
        'move.power': 1
      })
      .toArray();

    res.json({
      success: true,
      count: pokemon.length,
      data: pokemon
    });
  } catch (error) {
    console.error('Errore nel recupero Pokemon:', error);
    res.status(500).json({
      success: false,
      error: 'Errore nel recupero dei Pokemon'
    });
  }
});

// Endpoint per ottenere un singolo Pokemon per ID
app.get('/api/pokemon/:id', async (req, res) => {
  try {
    const pokemonId = parseInt(req.params.id);
    
    if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 151) {
      return res.status(400).json({
        success: false,
        error: 'ID Pokemon non valido (deve essere tra 1 e 151)'
      });
    }

    const pokemon = await db.collection(COLLECTION_NAME)
      .findOne({ pokedex_number: pokemonId });

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        error: 'Pokemon non trovato'
      });
    }

    res.json({
      success: true,
      data: pokemon
    });
  } catch (error) {
    console.error('Errore nel recupero Pokemon singolo:', error);
    res.status(500).json({
      success: false,
      error: 'Errore nel recupero del Pokemon'
    });
  }
});

// Endpoint per confronto tra due Pokemon
app.post('/api/compare', async (req, res) => {
  try {
    const { pokemonX_id, pokemonY_id } = req.body;

    // Validazione input
    if (!pokemonX_id || !pokemonY_id) {
      return res.status(400).json({
        success: false,
        error: 'ID di entrambi i Pokemon sono richiesti'
      });
    }

    const xId = parseInt(pokemonX_id);
    const yId = parseInt(pokemonY_id);

    if (isNaN(xId) || isNaN(yId) || xId < 1 || xId > 151 || yId < 1 || yId > 151) {
      return res.status(400).json({
        success: false,
        error: 'ID Pokemon non validi (devono essere tra 1 e 151)'
      });
    }

    // Recupera entrambi i Pokemon
    const [pokemonX, pokemonY] = await Promise.all([
      db.collection(COLLECTION_NAME).findOne({ pokedex_number: xId }),
      db.collection(COLLECTION_NAME).findOne({ pokedex_number: yId })
    ]);

    if (!pokemonX || !pokemonY) {
      return res.status(404).json({
        success: false,
        error: 'Uno o entrambi i Pokemon non sono stati trovati'
      });
    }

    // Calcola i danni in entrambe le direzioni
    const xAttacksY = calculateDamage(
      pokemonX.move.power,
      pokemonX.move.move_types[0],
      pokemonY.pokemon_types
    );

    const yAttacksX = calculateDamage(
      pokemonY.move.power,
      pokemonY.move.move_types[0],
      pokemonX.pokemon_types
    );

    // Genera descrizioni
    const xAttacksYDescription = generateEffectivenessDescription(
      pokemonX.move.name_it,
      pokemonX.move.move_types[0],
      pokemonY.pokemon_types,
      xAttacksY.typeEffectiveness.multiplier
    );

    const yAttacksXDescription = generateEffectivenessDescription(
      pokemonY.move.name_it,
      pokemonY.move.move_types[0],
      pokemonX.pokemon_types,
      yAttacksX.typeEffectiveness.multiplier
    );

    res.json({
      success: true,
      data: {
        pokemonX: {
          id: pokemonX.pokedex_number,
          name_it: pokemonX.name_it,
          pokemon_types: pokemonX.pokemon_types,
          hp: pokemonX.hp,
          move: {
            name_it: pokemonX.move.name_it,
            move_types: pokemonX.move.move_types,
            power: pokemonX.move.power
          }
        },
        pokemonY: {
          id: pokemonY.pokedex_number,
          name_it: pokemonY.name_it,
          pokemon_types: pokemonY.pokemon_types,
          hp: pokemonY.hp,
          move: {
            name_it: pokemonY.move.name_it,
            move_types: pokemonY.move.move_types,
            power: pokemonY.move.power
          }
        },
        comparison: {
          xAttacksY: {
            attacker: {
              name: pokemonX.name_it,
              move: pokemonX.move.name_it,
              moveType: pokemonX.move.move_types[0],
              basePower: pokemonX.move.power
            },
            defender: {
              name: pokemonY.name_it,
              types: pokemonY.pokemon_types
            },
            damage: {
              basePower: xAttacksY.basePower,
              multiplier: xAttacksY.typeEffectiveness.multiplier,
              finalDamage: xAttacksY.finalDamage,
              effectiveness: xAttacksY.typeEffectiveness.effectiveness,
              description: xAttacksYDescription
            }
          },
          yAttacksX: {
            attacker: {
              name: pokemonY.name_it,
              move: pokemonY.move.name_it,
              moveType: pokemonY.move.move_types[0],
              basePower: pokemonY.move.power
            },
            defender: {
              name: pokemonX.name_it,
              types: pokemonX.pokemon_types
            },
            damage: {
              basePower: yAttacksX.basePower,
              multiplier: yAttacksX.typeEffectiveness.multiplier,
              finalDamage: yAttacksX.finalDamage,
              effectiveness: yAttacksX.typeEffectiveness.effectiveness,
              description: yAttacksXDescription
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('Errore nel confronto Pokemon:', error);
    res.status(500).json({
      success: false,
      error: 'Errore nel confronto dei Pokemon'
    });
  }
});

// Endpoint di test
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Pokemon Comparison funzionante',
    timestamp: new Date().toISOString()
  });
});

// Gestione errori 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint non trovato'
  });
});

// Avvio server
async function startServer() {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server avviato su porta ${PORT}`);
    console.log(`📊 API disponibile su http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend disponibile su http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
