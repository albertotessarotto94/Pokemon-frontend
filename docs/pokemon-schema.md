# Modello Dati Collezione Pokemon

## Struttura del documento Pokemon

```json
{
  "_id": ObjectId("..."),
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
  "created_at": "2025-08-20T10:00:00Z",
  "updated_at": "2025-08-20T10:00:00Z"
}
```

## Descrizione dei campi

- **name**: Nome del Pokemon in inglese (come nella PokeAPI)
- **name_it**: Nome del Pokemon in italiano
- **pokedex_number**: Numero del Pokedex nazionale
- **hp**: Punti vita base del Pokemon
- **pokemon_types**: Array dei tipi del Pokemon (es: ["fire", "flying"])
- **move**: Oggetto che contiene i dati della mossa
  - **name**: Nome della mossa in inglese
  - **name_it**: Nome della mossa in italiano
  - **power**: Potenza della mossa
  - **move_types**: Array dei tipi della mossa
- **generation**: Generazione di appartenenza (per il tuo caso: 3)
- **created_at**: Timestamp di creazione del documento
- **updated_at**: Timestamp di ultimo aggiornamento

## Esempi di documenti

### Charizard
```json
{
  "name": "charizard",
  "name_it": "Charizard",
  "pokedex_number": 6,
  "hp": 78,
  "attack": 84,
  "pokemon_types": ["fire", "flying"],
  "move": {
    "name": "flamethrower",
    "name_it": "Lanciafiamme",
    "power": 90,
    "move_types": ["fire"]
  },
  "generation": 3
}
```

### Blastoise
```json
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
  "generation": 1
}
```

### Venusaur
```json
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
  "generation": 1
}
```
