# 🎮 Pokemon Comparison Web App

**App web professionale per il confronto tra Pokemon** basata sui dati del gioco da tavolo Pokemon Master Trainer, con calcoli accurati di efficacia tipo e danni.

🌐 **App Live**: https://pokemon-frontend-albertos-projects.vercel.app/

## ⚡ Avvio Rapido Locale

```bash
# Clone del repository
git clone https://github.com/albertotessarotto94/Pokemon-frontend.git
cd Pokemon-frontend

# Installa dipendenze
npm install

# Configura variabili d'ambiente
cp .env.example .env
# Modifica .env con la tua stringa MongoDB Atlas

# Avvia l'applicazione in locale
npm start
```

**🌐 Accesso locale**: http://localhost:3000

## 🎯 Caratteristiche Complete

- ✅ **151 Pokemon** della prima generazione
- ✅ **Calcoli tipo accurati** con tabella efficacia completa  
- ✅ **Interfaccia responsive** con ricerca avanzata
- ✅ **Database cloud** MongoDB Atlas
- ✅ **API RESTful** per integrazione
- ✅ **Dati Master Trainer** con HP e mosse italiane
- ✅ **Deploy automatico** su Vercel
- ✅ **Accessibile da qualsiasi dispositivo**

## 🛠️ Tecnologie

- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (cloud)
- **Frontend**: HTML/CSS/JavaScript vanilla
- **Hosting**: Vercel (frontend + backend)
- **Deploy**: Automatico via GitHub

## 🚀 Sviluppo e Deploy

### **Sviluppo Locale:**
```bash
# Avvia in modalità sviluppo
npm start               # Server su localhost:3000
npm run dev            # Con nodemon (auto-restart)
```

### **Test API:**
```bash
npm run test:api       # Test connessione API
node scripts/verify-move-types.js  # Verifica dati Pokemon
```

### **Deploy su Vercel:**
```bash
# Ogni push su main triggera deploy automatico
git add .
git commit -m "Nuova funzionalità"
git push origin main
# ⏱️ App aggiornata automaticamente in 1-2 minuti
```

## 🌐 URLs

- **� App Live**: https://pokemon-frontend-albertos-projects.vercel.app/
- **📊 API Endpoints**: 
  - `/api/health` - Status server
  - `/api/pokemon` - Lista Pokemon
  - `/api/pokemon/:id` - Pokemon singolo
  - `/api/compare` - Confronto Pokemon

## 📁 Struttura Progetto

```
Pokemon-frontend/
├── server.js              # Backend Express
├── vercel.json            # Configurazione Vercel
├── package.json           # Dipendenze npm
├── typeEffectiveness.js   # Logica calcoli tipo
├── public/                # Frontend files
│   ├── index.html         # Interfaccia principale
│   ├── script.js          # Logica frontend
│   ├── styles.css         # Stili CSS
│   └── config.js          # Configurazione API
├── scripts/               # Utility database
├── docs/                  # Documentazione
└── data/                  # Dati CSV Pokemon
```

## 🔧 Configurazione

### **Variabili d'ambiente (.env):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pokemon_db
PORT=3000
```

### **Vercel (automatico):**
- Deploy da GitHub main branch
- Variabile `MONGODB_URI` configurata su dashboard Vercel
- SSL e CDN automatici

## 📚 Documentazione

- **[API Reference](docs/API.md)** - Documentazione endpoints completa
- **[Database Schema](docs/pokemon-schema.md)** - Struttura dati Pokemon

## 🎮 Come Usare l'App

1. **Cerca Pokemon** per nome o numero nel menu dropdown
2. **Seleziona due Pokemon** per il confronto
3. **Visualizza risultati** con danni e efficacia
4. **Confronta statistiche** HP, tipi e mosse

## 🤝 Contribuire

1. Fork del repository
2. Crea feature branch (`git checkout -b feature/nuova-funzionalità`)
3. Commit modifiche (`git commit -m 'Aggiunta nuova funzionalità'`)
4. Push al branch (`git push origin feature/nuova-funzionalità`)
5. Apri Pull Request

## 📄 Licenza

MIT License - Vedi [LICENSE](LICENSE) per dettagli

---

**🎉 Creato con ❤️ per gli appassionati di Pokemon!**

