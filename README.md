# 🔥 Pokemon Master Trainer - Applicazione di Confronto

Applicazione web completa per il confronto tra Pokemon basata sul gioco da tavolo Pokemon Master Trainer, con calcoli accurati di efficacia tipo e danni.

## 📋 Comandi Rapidi

### 🚀 Avvio Rapido (Consigliato)
```bash
# Comando unico per tutto
./manage.sh start
```

### 🚀 Avvio Manuale
```bash
# 1. Avvia i servizi MongoDB (Docker)
docker-compose up -d

# 2. Avvia il server Node.js
node server.js
```

### 🛑 Spegnimento
```bash
# Spegnimento completo
./manage.sh stop

# Oppure manuale
Ctrl + C (nel terminale del server)
docker-compose down
```

### 📊 Stato dei Servizi
```bash
# Verifica stato Docker
docker-compose ps

# Verifica connessione database
curl http://localhost:3000/api/health
```

## 🌐 Link Utili

| Servizio | URL | Descrizione |
|----------|-----|-------------|
| **Applicazione Web** | http://localhost:3000 | Interfaccia principale per confronto Pokemon |
| **API Health Check** | http://localhost:3000/api/health | Verifica stato del server |
| **Mongo Express** | http://localhost:8081 | Interfaccia web per MongoDB |
| **API Pokemon** | http://localhost:3000/api/pokemon | Endpoint per lista Pokemon |

### 🔑 Credenziali MongoDB
- **Username**: admin
- **Password**: pokemon123
- **Database**: pokemon_db

## 🛠 API Documentation

### GET `/api/pokemon`
Ottiene la lista completa dei Pokemon
```bash
curl http://localhost:3000/api/pokemon
```

### GET `/api/pokemon/:id`
Ottiene un Pokemon specifico per ID
```bash
# Esempio: Pikachu (ID: 25)
curl http://localhost:3000/api/pokemon/25
```

### POST `/api/compare`
Confronta due Pokemon e calcola i danni
```bash
# Esempio: Pikachu vs Sandslash
curl -X POST -H "Content-Type: application/json" \
  -d '{"pokemonX_id": 25, "pokemonY_id": 28}' \
  http://localhost:3000/api/compare
```

### GET `/api/health`
Verifica stato del server
```bash
curl http://localhost:3000/api/health
```

## 📁 Struttura del Progetto

```
Pokemon-Prj/
├── 📄 README.md                # Questa guida principale
├── 🔧 manage.sh                # Script gestione completa applicazione
├── ⚙️  package.json             # Dipendenze e script Node.js
├── 🖥️  server.js                # Server Express API
├── 🎯 typeEffectiveness.js     # Logica calcoli efficacia tipo
├── 🐳 docker-compose.yml       # Configurazione Docker
├── 📋 .env.example             # Template variabili ambiente
├── 📂 config/                  # Configurazioni
│   └── mongodb-schema-validator.json
├── 📊 data/                    # File dati CSV
│   ├── pokemon-master-trainer-empty-2025-08-20.csv
│   └── pokemon-master-trainer-patch-2025-08-20.csv
├── 📚 docs/                    # Documentazione dettagliata
│   ├── INDEX.md               # Indice documentazione
│   ├── API.md                 # Documentazione API completa
│   └── [altri file tecnici]
├── 🗄️  mongo-init/             # Script inizializzazione database
│   ├── 01-init.js
│   ├── 02-populate-gen1.js
│   ├── 03-complete-gen1.js
│   └── 04-complete-all-151.js
├── 🌐 public/                  # Frontend web
│   ├── index.html
│   ├── script.js
│   └── styles.css
└── 🛠️  scripts/                # Script utilità e manutenzione
    ├── fix-missing-moves.js
    ├── generate-patch-csv.js
    ├── import-patch-csv.js
    ├── update-database-from-csv.js
    └── verify-move-types.js
```

## 🎮 Caratteristiche Principali

- ✅ **151 Pokemon** della prima generazione
- ✅ **Calcoli tipo accurati** con tabella efficacia completa
- ✅ **Interfaccia responsive** con ricerca avanzata
- ✅ **Database MongoDB** con validazione schema
- ✅ **API RESTful** per integrazione
- ✅ **Dati Master Trainer** con HP e mosse italiane

## 🔧 Requisiti di Sistema

- **Node.js** 14+
- **Docker** e **Docker Compose**
- **Sistema operativo**: macOS, Linux, Windows

## 📚 Documentazione Dettagliata

Per documentazione tecnica completa, consulta la cartella `docs/`:
- Schema database e validatori
- Guide per importazione dati
- Configurazione avanzata
- Troubleshooting

## 🐛 Risoluzione Problemi

### Server non si avvia
```bash
# Verifica se la porta 3000 è libera
lsof -i :3000

# Verifica Docker
docker-compose logs
```

### Database non risponde
```bash
# Riavvia i servizi Docker
docker-compose restart

# Verifica connessione
docker-compose exec mongo mongosh -u admin -p pokemon123
```

### Reset completo
```bash
# Ferma tutto e pulisce
docker-compose down -v
docker-compose up -d
node server.js
```

---

**Sviluppato per Pokemon Master Trainer Board Game** 🎲
