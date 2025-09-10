// Pokemon Comparison Frontend JavaScript con Ricerca Avanzata

class PokemonComparison {
    constructor() {
        this.pokemonData = [];
        this.selectedPokemonX = null;
        this.selectedPokemonY = null;
        this.filteredDataX = [];
        this.filteredDataY = [];
        this.highlightedIndexX = -1;
        this.highlightedIndexY = -1;
        
        this.initializeElements();
        this.bindEvents();
        this.loadPokemonData();
    }

    initializeElements() {
        this.elements = {
            // Search elements
            pokemonXSearch: document.getElementById('pokemonXSearch'),
            pokemonYSearch: document.getElementById('pokemonYSearch'),
            pokemonXDropdown: document.getElementById('pokemonXDropdown'),
            pokemonYDropdown: document.getElementById('pokemonYDropdown'),
            pokemonXError: document.getElementById('pokemonXError'),
            pokemonYError: document.getElementById('pokemonYError'),
            
            // Display elements
            pokemonInfoArea: document.getElementById('pokemonInfoArea'),
            pokemonXCard: document.getElementById('pokemonXCard'),
            pokemonYCard: document.getElementById('pokemonYCard'),
            comparisonArea: document.getElementById('comparisonArea'),
            scenarioXAttacksY: document.getElementById('scenarioXAttacksY'),
            scenarioYAttacksX: document.getElementById('scenarioYAttacksX'),
            loading: document.getElementById('loading'),
            errorMessage: document.getElementById('errorMessage')
        };
    }

    bindEvents() {
        // Search input events
        this.elements.pokemonXSearch.addEventListener('input', (e) => {
            this.handleSearchInput('X', e.target.value);
        });

        this.elements.pokemonYSearch.addEventListener('input', (e) => {
            this.handleSearchInput('Y', e.target.value);
        });

        // Focus events
        this.elements.pokemonXSearch.addEventListener('focus', () => {
            this.showDropdown('X');
        });

        this.elements.pokemonYSearch.addEventListener('focus', () => {
            this.showDropdown('Y');
        });

        // Keyboard navigation
        this.elements.pokemonXSearch.addEventListener('keydown', (e) => {
            this.handleKeyNavigation('X', e);
        });

        this.elements.pokemonYSearch.addEventListener('keydown', (e) => {
            this.handleKeyNavigation('Y', e);
        });

        // Click outside to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideDropdown('X');
                this.hideDropdown('Y');
            }
        });

        // Dropdown clicks
        this.elements.pokemonXDropdown.addEventListener('click', (e) => {
            this.handleDropdownClick('X', e);
        });

        this.elements.pokemonYDropdown.addEventListener('click', (e) => {
            this.handleDropdownClick('Y', e);
        });
    }

    // Validation functions
    validateInput(text) {
        // Solo caratteri alfanumerici, nessuno spazio o carattere speciale
        const validPattern = /^[a-zA-Z0-9]*$/;
        return validPattern.test(text);
    }

    showError(position, message) {
        const errorElement = position === 'X' ? this.elements.pokemonXError : this.elements.pokemonYError;
        const searchElement = position === 'X' ? this.elements.pokemonXSearch : this.elements.pokemonYSearch;
        
        errorElement.textContent = message;
        searchElement.classList.add('error');
        
        setTimeout(() => {
            errorElement.textContent = '';
            searchElement.classList.remove('error');
        }, 3000);
    }

    handleSearchInput(position, value) {
        const searchElement = position === 'X' ? this.elements.pokemonXSearch : this.elements.pokemonYSearch;
        
        // Reset error state
        searchElement.classList.remove('error');
        
        // Validate input
        if (value && !this.validateInput(value)) {
            this.showError(position, 'Solo caratteri alfanumerici, niente spazi o simboli');
            return;
        }

        // Filter and show results
        this.filterPokemon(position, value);
        this.showDropdown(position);
        this.resetHighlight(position);
    }

    filterPokemon(position, searchTerm) {
        if (!searchTerm) {
            // Show all Pokemon if search is empty
            if (position === 'X') {
                this.filteredDataX = [...this.pokemonData];
            } else {
                this.filteredDataY = [...this.pokemonData];
            }
        } else {
            // Filter by name (case insensitive)
            const filtered = this.pokemonData.filter(pokemon => 
                pokemon.name_it.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pokemon.pokedex_number.toString().includes(searchTerm)
            );
            
            if (position === 'X') {
                this.filteredDataX = filtered;
            } else {
                this.filteredDataY = filtered;
            }
        }
        
        this.updateDropdown(position);
    }

    updateDropdown(position) {
        const dropdown = position === 'X' ? this.elements.pokemonXDropdown : this.elements.pokemonYDropdown;
        const filteredData = position === 'X' ? this.filteredDataX : this.filteredDataY;
        
        if (filteredData.length === 0) {
            dropdown.innerHTML = `
                <div class="default-option" data-value="">
                    Seleziona Pokemon ${position}...
                </div>
                <div class="no-results">Nessun Pokemon trovato</div>
            `;
        } else {
            const defaultOption = `
                <div class="dropdown-option default-option" data-value="">
                    Seleziona Pokemon ${position}...
                </div>
            `;
            
            const pokemonOptions = filteredData
                .map(pokemon => `
                    <div class="dropdown-option" data-value="${pokemon.pokedex_number}">
                        <span class="pokemon-number">#${pokemon.pokedex_number.toString().padStart(3, '0')}</span>
                        <span class="pokemon-name">${pokemon.name_it}</span>
                    </div>
                `)
                .join('');
            
            dropdown.innerHTML = defaultOption + pokemonOptions;
        }
    }

    showDropdown(position) {
        const dropdown = position === 'X' ? this.elements.pokemonXDropdown : this.elements.pokemonYDropdown;
        dropdown.classList.add('visible');
    }

    hideDropdown(position) {
        const dropdown = position === 'X' ? this.elements.pokemonXDropdown : this.elements.pokemonYDropdown;
        dropdown.classList.remove('visible');
    }

    handleDropdownClick(position, event) {
        const option = event.target.closest('.dropdown-option');
        if (!option) return;

        const pokemonId = option.dataset.value;
        
        if (pokemonId) {
            this.selectPokemon(position, pokemonId);
        } else {
            this.clearSelection(position);
        }
        
        this.hideDropdown(position);
    }

    handleKeyNavigation(position, event) {
        const dropdown = position === 'X' ? this.elements.pokemonXDropdown : this.elements.pokemonYDropdown;
        const isVisible = dropdown.classList.contains('visible');
        
        if (!isVisible) return;

        const options = dropdown.querySelectorAll('.dropdown-option:not(.no-results)');
        let currentIndex = position === 'X' ? this.highlightedIndexX : this.highlightedIndexY;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                currentIndex = Math.min(currentIndex + 1, options.length - 1);
                this.updateHighlight(position, currentIndex, options);
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                currentIndex = Math.max(currentIndex - 1, -1);
                this.updateHighlight(position, currentIndex, options);
                break;
                
            case 'Enter':
                event.preventDefault();
                if (currentIndex >= 0 && options[currentIndex]) {
                    const pokemonId = options[currentIndex].dataset.value;
                    if (pokemonId) {
                        this.selectPokemon(position, pokemonId);
                    } else {
                        this.clearSelection(position);
                    }
                    this.hideDropdown(position);
                }
                break;
                
            case 'Escape':
                event.preventDefault();
                this.hideDropdown(position);
                break;
        }
    }

    updateHighlight(position, index, options) {
        // Remove previous highlights
        options.forEach(option => option.classList.remove('highlighted'));
        
        // Add new highlight
        if (index >= 0 && options[index]) {
            options[index].classList.add('highlighted');
            options[index].scrollIntoView({ block: 'nearest' });
        }
        
        // Update index
        if (position === 'X') {
            this.highlightedIndexX = index;
        } else {
            this.highlightedIndexY = index;
        }
    }

    resetHighlight(position) {
        if (position === 'X') {
            this.highlightedIndexX = -1;
        } else {
            this.highlightedIndexY = -1;
        }
    }

    selectPokemon(position, pokemonId) {
        const pokemon = this.pokemonData.find(p => p.pokedex_number === parseInt(pokemonId));
        if (!pokemon) return;

        const searchElement = position === 'X' ? this.elements.pokemonXSearch : this.elements.pokemonYSearch;
        
        // Update search input
        searchElement.value = `#${pokemon.pokedex_number.toString().padStart(3, '0')} ${pokemon.name_it}`;
        searchElement.classList.add('has-selection');
        
        // Store selection
        if (position === 'X') {
            this.selectedPokemonX = pokemon;
        } else {
            this.selectedPokemonY = pokemon;
        }
        
        this.updateDisplay();
        
        // Perform comparison if both selected
        if (this.selectedPokemonX && this.selectedPokemonY) {
            this.performComparison();
        }
    }

    clearSelection(position) {
        const searchElement = position === 'X' ? this.elements.pokemonXSearch : this.elements.pokemonYSearch;
        
        searchElement.value = '';
        searchElement.classList.remove('has-selection');
        
        if (position === 'X') {
            this.selectedPokemonX = null;
            this.filteredDataX = [...this.pokemonData];
        } else {
            this.selectedPokemonY = null;
            this.filteredDataY = [...this.pokemonData];
        }
        
        this.updateDisplay();
        this.updateDropdown(position);
    }

    showLoading() {
        this.elements.loading.classList.add('visible');
    }

    hideLoading() {
        this.elements.loading.classList.remove('visible');
    }

    showError(message) {
        this.elements.errorMessage.querySelector('p').textContent = message;
        this.elements.errorMessage.classList.add('visible');
        setTimeout(() => {
            this.elements.errorMessage.classList.remove('visible');
        }, 5000);
    }

    async loadPokemonData() {
        try {
            this.showLoading();
            
            const response = await fetch('/api/pokemon');
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Errore nel caricamento Pokemon');
            }

            this.pokemonData = result.data;
            this.filteredDataX = [...this.pokemonData];
            this.filteredDataY = [...this.pokemonData];
            this.updateDropdown('X');
            this.updateDropdown('Y');
            
        } catch (error) {
            console.error('Errore nel caricamento Pokemon:', error);
            this.showError('Errore nel caricamento dei Pokemon. Riprova più tardi.');
        } finally {
            this.hideLoading();
        }
    }

    updateDisplay() {
        // Mostra/nascondi area informazioni Pokemon
        if (this.selectedPokemonX || this.selectedPokemonY) {
            this.elements.pokemonInfoArea.classList.add('visible');
        } else {
            this.elements.pokemonInfoArea.classList.remove('visible');
            this.elements.comparisonArea.classList.remove('visible');
            return;
        }

        // Aggiorna card Pokemon X
        if (this.selectedPokemonX) {
            this.updatePokemonCard(this.elements.pokemonXCard, this.selectedPokemonX);
        } else {
            this.clearPokemonCard(this.elements.pokemonXCard);
        }

        // Aggiorna card Pokemon Y
        if (this.selectedPokemonY) {
            this.updatePokemonCard(this.elements.pokemonYCard, this.selectedPokemonY);
        } else {
            this.clearPokemonCard(this.elements.pokemonYCard);
        }

        // Nascondi area confronto se non entrambi selezionati
        if (!this.selectedPokemonX || !this.selectedPokemonY) {
            this.elements.comparisonArea.classList.remove('visible');
        }
    }

    updatePokemonCard(cardElement, pokemon) {
        const pokedexNumber = cardElement.querySelector('.pokedex-number');
        const nameIt = cardElement.querySelector('.name-it');
        const pokemonTypes = cardElement.querySelector('.pokemon-types');
        const hp = cardElement.querySelector('.pokemon-hp span');
        const moveName = cardElement.querySelector('.move-name span');
        const moveTypes = cardElement.querySelector('.move-types span');
        const movePower = cardElement.querySelector('.move-power span');

        pokedexNumber.textContent = `#${pokemon.pokedex_number.toString().padStart(3, '0')}`;
        nameIt.textContent = pokemon.name_it;
        hp.textContent = pokemon.hp;
        moveName.textContent = pokemon.move.name_it;
        moveTypes.textContent = pokemon.move.move_types.join(', ');
        movePower.textContent = pokemon.move.power;

        // Aggiorna tipi Pokemon
        pokemonTypes.innerHTML = pokemon.pokemon_types
            .map(type => `<span class="type-badge type-${type.toLowerCase()}">${type}</span>`)
            .join('');
    }

    clearPokemonCard(cardElement) {
        const fields = [
            '.pokedex-number', '.name-it', '.pokemon-hp span', 
            '.move-name span', '.move-types span', '.move-power span'
        ];
        
        fields.forEach(selector => {
            const element = cardElement.querySelector(selector);
            if (element) element.textContent = '';
        });

        const pokemonTypes = cardElement.querySelector('.pokemon-types');
        if (pokemonTypes) pokemonTypes.innerHTML = '';
    }

    async performComparison() {
        try {
            this.showLoading();

            const response = await fetch('/api/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pokemonX_id: this.selectedPokemonX.pokedex_number,
                    pokemonY_id: this.selectedPokemonY.pokedex_number
                })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Errore nel confronto');
            }

            this.displayComparison(result.data.comparison);

        } catch (error) {
            console.error('Errore nel confronto:', error);
            this.showError('Errore nel confronto dei Pokemon');
        } finally {
            this.hideLoading();
        }
    }

    displayComparison(comparison) {
        // Mostra area confronto
        this.elements.comparisonArea.classList.add('visible');

        // Scenario X attacca Y
        this.updateScenario(
            this.elements.scenarioXAttacksY, 
            comparison.xAttacksY
        );

        // Scenario Y attacca X
        this.updateScenario(
            this.elements.scenarioYAttacksX, 
            comparison.yAttacksX
        );
    }

    updateScenario(scenarioElement, scenarioData) {
        // Aggiorna nome attaccante
        const attackerName = scenarioElement.querySelector('.attacker-name');
        attackerName.textContent = scenarioData.attacker.name;

        // Aggiorna descrizione mossa
        const moveDescription = scenarioElement.querySelector('.move-description');
        moveDescription.textContent = `${scenarioData.attacker.name} usa ${scenarioData.attacker.move} contro ${scenarioData.defender.name}`;

        // Aggiorna calcoli danno
        const basePower = scenarioElement.querySelector('.base-power span');
        const multiplier = scenarioElement.querySelector('.multiplier span');
        const finalDamage = scenarioElement.querySelector('.final-damage span');
        const effectivenessBadge = scenarioElement.querySelector('.effectiveness-badge span');
        const descriptionText = scenarioElement.querySelector('.description-text');

        basePower.textContent = scenarioData.damage.basePower;
        multiplier.textContent = scenarioData.damage.multiplier;
        finalDamage.textContent = scenarioData.damage.finalDamage;
        descriptionText.textContent = scenarioData.damage.description;

        // Aggiorna badge efficacia
        effectivenessBadge.textContent = this.getEffectivenessText(scenarioData.damage.effectiveness);
        effectivenessBadge.className = `effectiveness-${scenarioData.damage.effectiveness}`;
    }

    getEffectivenessText(effectiveness) {
        const texts = {
            'super_effective': 'Super Efficace',
            'neutral': 'Efficacia Normale',
            'not_very_effective': 'Non Molto Efficace',
            'no_effect': 'Nessun Effetto'
        };
        return texts[effectiveness] || 'Sconosciuto';
    }
}

// Inizializza l'applicazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    new PokemonComparison();
});
