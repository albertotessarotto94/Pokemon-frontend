#!/bin/bash

# Pokemon Master Trainer - Script di Gestione
# Utilizza questo file per gestire l'applicazione

case "$1" in
  start)
    echo "🚀 Avvio Pokemon Master Trainer..."
    echo "📊 Avvio servizi Docker..."
    docker-compose up -d
    
    echo "⏳ Attendo avvio MongoDB..."
    sleep 5
    
    echo "🔥 Avvio server Node.js..."
    echo "📱 Applicazione disponibile su: http://localhost:3000"
    echo "🍃 Mongo Express disponibile su: http://localhost:8081"
    echo ""
    echo "Per fermare l'applicazione: ./manage.sh stop"
    echo ""
    node server.js
    ;;
    
  stop)
    echo "🛑 Arresto Pokemon Master Trainer..."
    echo "🔥 Arresto server Node.js..."
    pkill -f "node server.js"
    
    echo "📊 Arresto servizi Docker..."
    docker-compose down
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
    echo "Docker Containers:"
    docker-compose ps
    echo ""
    echo "Server Status:"
    curl -s http://localhost:3000/api/health | jq . 2>/dev/null || echo "❌ Server non raggiungibile"
    ;;
    
  logs)
    echo "📝 Log dei servizi:"
    docker-compose logs -f
    ;;
    
  reset)
    echo "⚠️  RESET COMPLETO - Questo cancellerà tutti i dati!"
    read -p "Sei sicuro? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo "🗑️  Reset in corso..."
      docker-compose down -v
      echo "🚀 Riavvio servizi..."
      docker-compose up -d
      echo "✅ Reset completato"
    else
      echo "❌ Reset annullato"
    fi
    ;;
    
  *)
    echo "🔥 Pokemon Master Trainer - Script di Gestione"
    echo ""
    echo "Utilizzo: $0 {start|stop|restart|status|logs|reset}"
    echo ""
    echo "Comandi disponibili:"
    echo "  start    - Avvia l'applicazione completa"
    echo "  stop     - Ferma l'applicazione completamente"
    echo "  restart  - Riavvia l'applicazione"
    echo "  status   - Mostra lo stato dei servizi"
    echo "  logs     - Mostra i log in tempo reale"
    echo "  reset    - Reset completo (⚠️  cancella i dati)"
    echo ""
    echo "Link veloci dopo l'avvio:"
    echo "  🌐 App: http://localhost:3000"
    echo "  🍃 MongoDB: http://localhost:8081"
    echo "  🔧 API Health: http://localhost:3000/api/health"
    exit 1
    ;;
esac
