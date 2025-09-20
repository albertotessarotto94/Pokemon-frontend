# Pokemon Comparison - GitHub Pages Setup

## 🎯 Obiettivo
Questa guida ti aiuta a pubblicare l'app Pokemon online usando GitHub Pages per il frontend e Vercel per il backend.

## 📋 Prerequisiti
- Account GitHub (gratuito)
- Account Vercel (gratuito)
- Accesso a MongoDB Atlas (già configurato)

## 🚀 Passo 1: Deploy del Backend su Vercel

1. **Vai su [Vercel.com](https://vercel.com)** e fai login con GitHub
2. **Clicca "Add New Project"**
3. **Seleziona questo repository** dalla lista
4. **Configurazione automatica**: Vercel rileverà automaticamente che è un progetto Node.js
5. **Aggiungi variabile ambiente**:
   - Nome: `MONGODB_URI`
   - Valore: La tua stringa di connessione MongoDB Atlas
6. **Clicca Deploy**

⏱️ Il deploy richiede 2-3 minuti. Vercel ti darà un URL tipo: `https://your-pokemon-api.vercel.app`

## 🌐 Passo 2: Configurare il Frontend

1. **Aggiorna il file `public/config.js`**:
   - Sostituisci `'https://your-pokemon-api.vercel.app'` con il tuo URL Vercel reale
   
2. **Commit e push delle modifiche**:
   ```bash
   git add .
   git commit -m "Configure API URL for production"
   git push origin main
   ```

## 📄 Passo 3: Attivare GitHub Pages

1. **Vai nelle Impostazioni del repository** su GitHub
2. **Sezione "Pages"** nel menu laterale
3. **Source**: Seleziona "GitHub Actions"
4. **Il workflow si avvierà automaticamente**

⏱️ Dopo 2-3 minuti, la tua app sarà online su: `https://tuousername.github.io/Pokemon-frontend`

## 🔧 Come Aggiornare l'App

1. **Modifica i file** che vuoi cambiare
2. **Commit e push**:
   ```bash
   git add .
   git commit -m "Descrizione modifiche"
   git push origin main
   ```
3. **GitHub Pages si aggiorna automaticamente**

## 🆘 Risoluzione Problemi

### L'app non carica i Pokemon
- Verifica che l'URL Vercel sia corretto in `public/config.js`
- Controlla che MongoDB Atlas accetti connessioni da Vercel (IP 0.0.0.0/0)

### Errori nel deploy
- Controlla la tab "Actions" su GitHub per vedere i log di deploy
- Verifica che tutti i file siano stati pushati correttamente

## 📚 Link Utili
- **Frontend Live**: `https://tuousername.github.io/Pokemon-frontend`
- **Backend Live**: `https://your-pokemon-api.vercel.app`
- **GitHub Actions**: Tab "Actions" del repository
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)

---

✅ **Una volta completato, avrai un'app Pokemon sempre online e accessibile da qualsiasi dispositivo!**