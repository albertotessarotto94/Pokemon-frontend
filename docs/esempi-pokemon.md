# Script di esempio per aggiungere Pokemon alla collezione

## Collegati a MongoDB

### Via MongoDB Compass:
**Connection String**: `mongodb://admin:pokemon123@localhost:27017/pokemon_db?authSource=admin`

### Via Mongo Express (Web UI):
Apri il browser e vai su: http://localhost:8081
- Username: `admin`
- Password: `pokemon123`

## Esempi di Pokemon da inserire

Copia e incolla questi documenti nella collezione `pokemon`:

### Metagross (Generation 3)
```json
{
  "name": "metagross",
  "name_it": "Metagross",
  "pokedex_number": 376,
  "hp": 80,
  "attack": 135,
  "pokemon_types": ["steel", "psychic"],
  "move": {
    "name": "meteor-mash",
    "name_it": "Meteorpugno",
    "power": 90,
    "move_types": ["steel"]
  },
  "generation": 3,
  "created_at": "2025-08-20T10:00:00Z",
  "updated_at": "2025-08-20T10:00:00Z"
}
```

### Salamence (Generation 3)
```json
{
  "name": "salamence",
  "name_it": "Salamence",
  "pokedex_number": 373,
  "hp": 95,
  "attack": 135,
  "pokemon_types": ["dragon", "flying"],
  "move": {
    "name": "dragon-claw",
    "name_it": "Dragartigli",
    "power": 80,
    "move_types": ["dragon"]
  },
  "generation": 3,
  "created_at": "2025-08-20T10:00:00Z",
  "updated_at": "2025-08-20T10:00:00Z"
}
```

### Garchomp (Aggiungiamo qualche Pokemon forte)
```json
{
  "name": "garchomp",
  "name_it": "Garchomp",
  "pokedex_number": 445,
  "hp": 108,
  "attack": 130,
  "pokemon_types": ["dragon", "ground"],
  "move": {
    "name": "earthquake",
    "name_it": "Terremoto",
    "power": 100,
    "move_types": ["ground"]
  },
  "generation": 3,
  "created_at": "2025-08-20T10:00:00Z",
  "updated_at": "2025-08-20T10:00:00Z"
}
```

### Pikachu (classico)
```json
{
  "name": "pikachu",
  "name_it": "Pikachu",
  "pokedex_number": 25,
  "hp": 35,
  "attack": 55,
  "pokemon_types": ["electric"],
  "move": {
    "name": "thunderbolt",
    "name_it": "Fulmine",
    "power": 90,
    "move_types": ["electric"]
  },
  "generation": 3,
  "created_at": "2025-08-20T10:00:00Z",
  "updated_at": "2025-08-20T10:00:00Z"
}
```

## Query utili per MongoDB

### Trovare tutti i Pokemon:
```javascript
db.pokemon.find()
```

### Trovare Pokemon per tipo:
```javascript
db.pokemon.find({"pokemon_types": "fire"})
```

### Trovare Pokemon con HP superiore a 80:
```javascript
db.pokemon.find({"hp": {$gt: 80}})
```

### Ordinare per attacco (dal più forte):
```javascript
db.pokemon.find().sort({"attack": -1})
```

### Contare i Pokemon:
```javascript
db.pokemon.countDocuments()
```

## Comandi Docker utili

### Vedere i log di MongoDB:
```bash
docker logs pokemon-mongo
```

### Accedere alla shell di MongoDB:
```bash
docker exec -it pokemon-mongo mongosh --username admin --password pokemon123 --authenticationDatabase admin pokemon_db
```

### Backup della collezione:
```bash
docker exec pokemon-mongo mongodump --username admin --password pokemon123 --authenticationDatabase admin --db pokemon_db --collection pokemon --out /tmp/backup
```
