# 📡 API Documentation

Documentazione completa delle API REST per Pokemon Master Trainer.

## 🚀 Setup Veloce

Assicurati che l'applicazione sia in esecuzione:
```bash
./manage.sh start
```

## 🌐 Base URL
```
http://localhost:3000/api
```

## 📊 Database
- **MongoDB Atlas** (cloud database)
- **151 Pokemon** della prima generazione
- **Dati Master Trainer** accurati con HP e mosse italiane

## 📋 Endpoints Disponibili

### 🔍 Health Check
**GET** `/health`

Verifica lo stato del server.

**Esempio:**
```bash
curl http://localhost:3000/api/health
```

**Risposta:**
```json
{
  "success": true,
  "message": "API Pokemon Comparison funzionante",
  "timestamp": "2025-08-21T10:30:00.000Z"
}
```

---

### 📋 Lista Pokemon
**GET** `/pokemon`

Ottiene la lista completa dei 151 Pokemon con informazioni di base.

**Esempio:**
```bash
curl http://localhost:3000/api/pokemon
```

**Risposta:**
```json
{
  "success": true,
  "count": 151,
  "data": [
    {
      "_id": "...",
      "pokedex_number": 1,
      "name": "Bulbasaur",
      "name_it": "Bulbasaur",
      "pokemon_types": ["grass", "poison"],
      "hp": 5,
      "move": {
        "name_it": "Frustata",
        "move_types": ["grass"],
        "power": 2
      }
    }
  ]
}
```

---

### 🎯 Pokemon Singolo
**GET** `/pokemon/:id`

Ottiene i dettagli completi di un Pokemon specifico.

**Parametri:**
- `id` (number): Numero Pokedex (1-151)

**Esempio:**
```bash
# Pikachu (#25)
curl http://localhost:3000/api/pokemon/25
```

**Risposta:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "pokedex_number": 25,
    "name": "Pikachu",
    "name_it": "Pikachu",
    "pokemon_types": ["electric"],
    "hp": 3,
    "move": {
      "name_it": "Tuonoshock",
      "name_en": "Thundershock",
      "move_types": ["electric"],
      "power": 3
    }
  }
}
```

---

### ⚔️ Confronto Pokemon
**POST** `/compare`

Confronta due Pokemon e calcola i danni reciproci con efficacia tipo.

**Body (JSON):**
```json
{
  "pokemonX_id": 25,
  "pokemonY_id": 28
}
```

**Esempio:**
```bash
# Pikachu vs Sandslash
curl -X POST -H "Content-Type: application/json" \
  -d '{"pokemonX_id": 25, "pokemonY_id": 28}' \
  http://localhost:3000/api/compare
```

**Risposta:**
```json
{
  "success": true,
  "data": {
    "pokemonX": {
      "id": 25,
      "name_it": "Pikachu",
      "pokemon_types": ["electric"],
      "hp": 3,
      "move": {
        "name_it": "Tuonoshock",
        "move_types": ["electric"],
        "power": 3
      }
    },
    "pokemonY": {
      "id": 28,
      "name_it": "Sandslash",
      "pokemon_types": ["ground"],
      "hp": 4,
      "move": {
        "name_it": "Lacerazione",
        "move_types": ["normal"],
        "power": 5
      }
    },
    "comparison": {
      "xAttacksY": {
        "attacker": {
          "name": "Pikachu",
          "move": "Tuonoshock",
          "moveType": "electric",
          "basePower": 3
        },
        "defender": {
          "name": "Sandslash",
          "types": ["ground"]
        },
        "damage": {
          "basePower": 3,
          "multiplier": 0,
          "finalDamage": 0,
          "effectiveness": "no_effect",
          "description": "\"Tuonoshock\" di tipo electric acquisisce un moltiplicatore di 0x verso un pokemon di tipo ground"
        }
      },
      "yAttacksX": {
        "attacker": {
          "name": "Sandslash",
          "move": "Lacerazione",
          "moveType": "normal",
          "basePower": 5
        },
        "defender": {
          "name": "Pikachu",
          "types": ["electric"]
        },
        "damage": {
          "basePower": 5,
          "multiplier": 1,
          "finalDamage": 5,
          "effectiveness": "neutral",
          "description": "\"Lacerazione\" di tipo normal acquisisce un moltiplicatore di 1x verso un pokemon di tipo electric"
        }
      }
    }
  }
}
```

## Codici di Efficacia Tipo

| Valore | Significato | Descrizione |
|--------|-------------|-------------|
| `0` | `no_effect` | Nessun effetto (immunità) |
| `0.25` | `not_very_effective` | Estremamente poco efficace |
| `0.5` | `not_very_effective` | Non molto efficace |
| `1` | `neutral` | Efficacia normale |
| `2` | `super_effective` | Super efficace |
| `4` | `super_effective` | Molto super efficace |

## Errori Comuni

### 400 Bad Request
```json
{
  "success": false,
  "error": "ID Pokemon non validi (devono essere tra 1 e 151)"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Pokemon non trovato"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Errore interno del server"
}
```

## 🧪 Test Rapidi

```bash
# Test connessione
curl http://localhost:3000/api/health

# Test Pokemon famosi
curl http://localhost:3000/api/pokemon/1    # Bulbasaur
curl http://localhost:3000/api/pokemon/25   # Pikachu
curl http://localhost:3000/api/pokemon/150  # Mewtwo

# Test confronti interessanti
curl -X POST -H "Content-Type: application/json" -d '{"pokemonX_id": 25, "pokemonY_id": 28}' http://localhost:3000/api/compare  # Electric vs Ground (immunità)
curl -X POST -H "Content-Type: application/json" -d '{"pokemonX_id": 6, "pokemonY_id": 1}' http://localhost:3000/api/compare   # Fire vs Grass (super efficace)
```

## 🔧 Note Tecniche

- **Rate Limiting**: Non implementato (ambiente di sviluppo)
- **Autenticazione**: Non richiesta
- **CORS**: Abilitato per tutti i domini
- **Formato**: JSON esclusivamente
- **Codifica**: UTF-8

## 📚 Risorse Correlate

- **[Setup Applicazione](SETUP.md)** - Configurazione e avvio
- **[Schema Database](pokemon-schema.md)** - Struttura dati Pokemon
- **[Repository GitHub](https://github.com/albertotessarotto94/Pokemon-frontend)** - Codice sorgente
