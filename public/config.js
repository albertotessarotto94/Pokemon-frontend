// Configurazione API per diversi ambienti
const API_CONFIG = {
    // Rileva automaticamente l'ambiente
    getApiBaseUrl() {
        // Se siamo su localhost, usa il server locale
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        
        // Se siamo su GitHub Pages, usa l'API su Vercel
        // SOSTITUISCI questo URL con il tuo URL Vercel dopo il deploy
        return 'https://your-pokemon-api.vercel.app';
    },
    
    // Helper per costruire URL completi
    getApiUrl(endpoint) {
        const baseUrl = this.getApiBaseUrl();
        return `${baseUrl}${endpoint}`;
    }
};

// Esporta la configurazione per essere usata in script.js
window.API_CONFIG = API_CONFIG;