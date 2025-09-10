# 🚀 Setup Pokemon Master Trainer

## ⚡ Avvio Rapido

### 1. Clona e installa dipendenze
```bash
git clone <repository-url>
cd Pokemon-frontend
npm install
```

### 2. Configura MongoDB Atlas
1. Crea un account su [MongoDB Atlas](https://cloud.mongodb.com)
2. Crea un nuovo cluster
3. Crea un database chiamato `pokemon_db` con collezione `pokemon`
4. Ottieni la stringa di connessione

### 3. Configura variabili d'ambiente
Copia `.env.example` in `.env` e inserisci i tuoi dati:

```bash
cp .env.example .env
```

Modifica `.env`:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pokemon_db?retryWrites=true&w=majority&authSource=admin
```

### 4. Importa i dati iniziali
Se hai già un export JSON della collezione Pokemon:
- Importa usando MongoDB Compass o mongoimport
- Oppure usa gli script nella cartella `scripts/`

### 5. Avvia l'applicazione
```bash
# Avvia il server
./manage.sh start

# Ferma il server  
./manage.sh stop

# Testa la connessione Atlas
./manage.sh test-connection
```

## 🌐 Accesso all'Applicazione

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 🛠️ Comandi Utili

```bash
# Verifica stato server
./manage.sh status

# Riavvia applicazione
./manage.sh restart

# Test connessione database
./manage.sh test-connection
```

## 📊 Gestione Database

### Con MongoDB Compass
1. Connetti usando l'URI Atlas
2. Naviga nel database `pokemon_db` > collezione `pokemon`

### Script disponibili
- `scripts/import-patch-csv.js` - Importa dati da CSV
- `scripts/verify-move-types.js` - Verifica tipi mosse
- `scripts/generate-patch-csv.js` - Genera CSV export

## 🔧 Risoluzione Problemi

### Errore di connessione Atlas
- Verifica username/password nel file `.env`
- Controlla che l'IP sia autorizzato su Atlas
- Verifica che il cluster sia attivo

### Server non si avvia
```bash
# Verifica se la porta 3000 è occupata
lsof -i :3000

# Ferma processi Node.js
pkill -f "node server.js"
```

## 🏗️ Architettura

- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (cloud)
- **Frontend**: HTML/CSS/JS vanilla
- **API**: RESTful endpoints per gestione Pokemon
