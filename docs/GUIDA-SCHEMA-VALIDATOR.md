# 🛡️ Guida MongoDB Schema Validator

## 📋 Cos'è il Schema Validator
Il JSON Schema Validator di MongoDB garantisce che tutti i documenti inseriti nella collezione `pokemon` rispettino la struttura definita, prevenendo errori di inserimento e mantenendo la consistenza dei dati.

## 🚀 Come Applicare il Validator

### Metodo 1: MongoDB Compass (Interfaccia Grafica)
1. Apri **MongoDB Compass**
2. Connettiti al database: `mongodb://admin:pokemon123@localhost:27017/pokemon_db?authSource=admin`
3. Vai alla collezione `pokemon`
4. Clicca sulla tab **"Validation"**
5. Seleziona **"JSON Schema"** come validation level
6. Copia e incolla il contenuto del file `mongodb-schema-validator.json`
7. Clicca **"Update"**

### Metodo 2: MongoDB Shell (mongosh)
```bash
docker exec -it pokemon-mongo mongosh --username admin --password pokemon123 --authenticationDatabase admin pokemon_db
```

Poi esegui questo comando:
```javascript
db.runCommand({
  collMod: "pokemon",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Pokemon Collection Schema Validator",
      description: "Schema di validazione per la collezione Pokemon della prima generazione",
      required: [
        "name",
        "name_it", 
        "pokedex_number",
        "hp",
        "pokemon_types",
        "move",
        "generation",
        "created_at",
        "updated_at"
      ],
      additionalProperties: false,
      properties: {
        "_id": {
          bsonType: "objectId"
        },
        "name": {
          bsonType: "string",
          pattern: "^[a-z0-9-]+$",
          minLength: 2,
          maxLength: 30
        },
        "name_it": {
          bsonType: "string",
          minLength: 2,
          maxLength: 30
        },
        "pokedex_number": {
          bsonType: "int",
          minimum: 1,
          maximum: 151
        },
        "hp": {
          bsonType: "int",
          minimum: 1,
          maximum: 255
        },
        "pokemon_types": {
          bsonType: "array",
          minItems: 1,
          maxItems: 2,
          uniqueItems: true,
          items: {
            bsonType: "string",
            enum: ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"]
          }
        },
        "move": {
          bsonType: "object",
          required: ["name", "name_it", "power", "move_types"],
          additionalProperties: false,
          properties: {
            "name": {
              bsonType: "string",
              pattern: "^[a-z0-9-]+$",
              minLength: 2,
              maxLength: 30
            },
            "name_it": {
              bsonType: "string",
              minLength: 2,
              maxLength: 30
            },
            "power": {
              bsonType: "int",
              minimum: 0,
              maximum: 250
            },
            "move_types": {
              bsonType: "array",
              minItems: 1,
              maxItems: 1,
              items: {
                bsonType: "string",
                enum: ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"]
              }
            }
          }
        },
        "generation": {
          bsonType: "int",
          enum: [1]
        },
        "created_at": {
          bsonType: "date"
        },
        "updated_at": {
          bsonType: "date"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})
```

## ✅ Validazioni Implementate

### 🔍 **Campi Obbligatori**
- Tutti i campi principali sono richiesti
- Nessun campo aggiuntivo permesso (`additionalProperties: false`)

### 📊 **Validazioni Specifiche**
- **name**: Solo lowercase, lettere, numeri e trattini
- **pokedex_number**: Range 1-151 (prima generazione)
- **hp**: Range 1-255 (valori Pokemon validi)
- **pokemon_types**: 1-2 tipi, solo tipi Pokemon validi
- **move.power**: 0-250 (0 per mosse di stato)
- **generation**: Solo valore 1 permesso

### 🎯 **Vantaggi del Validator**
1. **Prevenzione errori**: Blocca inserimenti con dati incorretti
2. **Consistenza**: Garantisce formato uniforme
3. **Documentazione**: Schema funge da documentazione vivente
4. **Debug facilitato**: Errori chiari quando la validazione fallisce

## 🧪 Test del Validator

Dopo aver applicato il validator, prova questi test:

### ✅ Inserimento Valido
```javascript
db.pokemon.insertOne({
  name: "test-pokemon",
  name_it: "Pokemon Test",
  pokedex_number: 152, // Questo fallirà - fuori range
  hp: 50,
  pokemon_types: ["normal"],
  move: {
    name: "tackle",
    name_it: "Azione",
    power: 40,
    move_types: ["normal"]
  },
  generation: 1,
  created_at: new Date(),
  updated_at: new Date()
})
```

### ❌ Inserimento Non Valido (per testare)
```javascript
db.pokemon.insertOne({
  name: "INVALID", // Maiuscole non permesse
  hp: "cinquanta", // String invece di numero
  pokemon_types: ["invalid-type"] // Tipo non esistente
})
```

## 🔧 Rimozione del Validator (se necessario)
```javascript
db.runCommand({
  collMod: "pokemon",
  validator: {},
  validationLevel: "off"
})
```
