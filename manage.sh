#!/bin/bash

# Pokemon Master Trainer - Script di Gestione
# Utilizza questo file per gestire l'applicazione

case "$1" in
  start)
    echo "🚀 Avvio Pokemon Master Trainer..."
    echo "☁️  Connessione a MongoDB Atlas..."
    
    echo "🔥 Avvio server Node.js..."
    echo "📱 Applicazione disponibile su: http://localhost:3000"
    echo ""
    echo "Per fermare l'applicazione: ./manage.sh stop"
    echo ""
    node server.js
    ;;
    
  stop)
    echo "🛑 Arresto Pokemon Master Trainer..."
    echo "🔥 Arresto server Node.js..."
    pkill -f "node server.js"
    echo "✅ Applicazione arrestata completamente"
    ;;
    
  restart)
    echo "🔄 Riavvio Pokemon Master Trainer..."
    $0 stop
    sleep 3
    $0 start
    ;;
    
  status)
    echo "📊 Stato Pokemon Master Trainer:"
    echo ""
    echo "Server Status:"
    curl -s http://localhost:3000/api/health | jq . 2>/dev/null || echo "❌ Server non raggiungibile"
    ;;
    
  logs)
    echo "📝 Log del server Node.js:"
    echo "ℹ️  I log vengono mostrati direttamente nel terminale quando avvii con './manage.sh start'"
    ;;
    
  test-connection)
    echo "🔍 Test connessione MongoDB Atlas..."
    node -e "
    require('dotenv').config();
    const { MongoClient } = require('mongodb');
    
    async function testConnection() {
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('✅ Connessione ad Atlas riuscita!');
        const db = client.db('pokemon_db');
        const count = await db.collection('pokemon').countDocuments();
        console.log(\`📊 Trovati \${count} Pokemon nel database\`);
        await client.close();
      } catch (error) {
        console.error('❌ Errore connessione:', error.message);
      }
    }
    
    testConnection();
    "
    ;;
    
  *)
    echo "🔥 Pokemon Master Trainer - Script di Gestione"
    echo ""
    echo "Utilizzo: $0 {start|stop|restart|status|logs|test-connection}"
    echo ""
    echo "Comandi disponibili:"
    echo "  start           - Avvia l'applicazione"
    echo "  stop            - Ferma l'applicazione"
    echo "  restart         - Riavvia l'applicazione"
    echo "  status          - Mostra lo stato del server"
    echo "  logs            - Info sui log del server"
    echo "  test-connection - Testa la connessione a MongoDB Atlas"
    echo ""
    echo "Link veloci dopo l'avvio:"
    echo "  🌐 App: http://localhost:3000"
    echo "  🔧 API Health: http://localhost:3000/api/health"
    echo ""
    echo "💡 Database: MongoDB Atlas (cloud)"
    exit 1
    ;;
esac
