// Tabella di efficacia Pokemon ufficiale Gen 1
// Moltiplicatori: 2.0 = Super efficace, 1.0 = Normale, 0.5 = Non molto efficace, 0.0 = Nessun effetto

const TYPE_EFFECTIVENESS = {
  normal: {
    normal: 1.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 1.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 0.5,
    ghost: 0.0,
    dragon: 1.0,
    dark: 1.0,
    steel: 0.5,
    fairy: 1.0
  },
  fire: {
    normal: 1.0,
    fire: 0.5,
    water: 0.5,
    electric: 1.0,
    grass: 2.0,
    ice: 2.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 2.0,
    rock: 0.5,
    ghost: 1.0,
    dragon: 0.5,
    dark: 1.0,
    steel: 2.0,
    fairy: 1.0
  },
  water: {
    normal: 1.0,
    fire: 2.0,
    water: 0.5,
    electric: 1.0,
    grass: 0.5,
    ice: 1.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 2.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 2.0,
    ghost: 1.0,
    dragon: 0.5,
    dark: 1.0,
    steel: 1.0,
    fairy: 1.0
  },
  electric: {
    normal: 1.0,
    fire: 1.0,
    water: 2.0,
    electric: 0.5,
    grass: 0.5,
    ice: 1.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 0.0,
    flying: 2.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 1.0,
    dragon: 0.5,
    dark: 1.0,
    steel: 1.0,
    fairy: 1.0
  },
  grass: {
    normal: 1.0,
    fire: 0.5,
    water: 2.0,
    electric: 1.0,
    grass: 0.5,
    ice: 1.0,
    fighting: 1.0,
    poison: 0.5,
    ground: 2.0,
    flying: 0.5,
    psychic: 1.0,
    bug: 0.5,
    rock: 2.0,
    ghost: 1.0,
    dragon: 0.5,
    dark: 1.0,
    steel: 0.5,
    fairy: 1.0
  },
  ice: {
    normal: 1.0,
    fire: 0.5,
    water: 0.5,
    electric: 1.0,
    grass: 2.0,
    ice: 0.5,
    fighting: 1.0,
    poison: 1.0,
    ground: 2.0,
    flying: 2.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 1.0,
    dragon: 2.0,
    dark: 1.0,
    steel: 0.5,
    fairy: 1.0
  },
  fighting: {
    normal: 2.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 2.0,
    fighting: 1.0,
    poison: 0.5,
    ground: 1.0,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2.0,
    ghost: 0.0,
    dragon: 1.0,
    dark: 2.0,
    steel: 2.0,
    fairy: 0.5
  },
  poison: {
    normal: 1.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 2.0,
    ice: 1.0,
    fighting: 1.0,
    poison: 0.5,
    ground: 0.5,
    flying: 1.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 0.5,
    ghost: 0.5,
    dragon: 1.0,
    dark: 1.0,
    steel: 0.0,
    fairy: 2.0
  },
  ground: {
    normal: 1.0,
    fire: 2.0,
    water: 1.0,
    electric: 2.0,
    grass: 0.5,
    ice: 1.0,
    fighting: 1.0,
    poison: 2.0,
    ground: 1.0,
    flying: 0.0,
    psychic: 1.0,
    bug: 0.5,
    rock: 2.0,
    ghost: 1.0,
    dragon: 1.0,
    dark: 1.0,
    steel: 2.0,
    fairy: 1.0
  },
  flying: {
    normal: 1.0,
    fire: 1.0,
    water: 1.0,
    electric: 0.5,
    grass: 2.0,
    ice: 1.0,
    fighting: 2.0,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 2.0,
    rock: 0.5,
    ghost: 1.0,
    dragon: 1.0,
    dark: 1.0,
    steel: 0.5,
    fairy: 1.0
  },
  psychic: {
    normal: 1.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 1.0,
    fighting: 2.0,
    poison: 2.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 0.5,
    bug: 1.0,
    rock: 1.0,
    ghost: 1.0,
    dragon: 1.0,
    dark: 0.0,
    steel: 0.5,
    fairy: 1.0
  },
  bug: {
    normal: 1.0,
    fire: 0.5,
    water: 1.0,
    electric: 1.0,
    grass: 2.0,
    ice: 1.0,
    fighting: 0.5,
    poison: 0.5,
    ground: 1.0,
    flying: 0.5,
    psychic: 2.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 0.5,
    dragon: 1.0,
    dark: 2.0,
    steel: 0.5,
    fairy: 0.5
  },
  rock: {
    normal: 1.0,
    fire: 2.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 2.0,
    fighting: 0.5,
    poison: 1.0,
    ground: 0.5,
    flying: 2.0,
    psychic: 1.0,
    bug: 2.0,
    rock: 1.0,
    ghost: 1.0,
    dragon: 1.0,
    dark: 1.0,
    steel: 0.5,
    fairy: 1.0
  },
  ghost: {
    normal: 0.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 1.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 2.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 2.0,
    dragon: 1.0,
    dark: 0.5,
    steel: 1.0,
    fairy: 1.0
  },
  dragon: {
    normal: 1.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 1.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 1.0,
    dragon: 2.0,
    dark: 1.0,
    steel: 0.5,
    fairy: 0.0
  },
  dark: {
    normal: 1.0,
    fire: 1.0,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 1.0,
    fighting: 0.5,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 2.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 2.0,
    dragon: 1.0,
    dark: 0.5,
    steel: 1.0,
    fairy: 0.5
  },
  steel: {
    normal: 1.0,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    grass: 1.0,
    ice: 2.0,
    fighting: 1.0,
    poison: 1.0,
    ground: 1.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 2.0,
    ghost: 1.0,
    dragon: 1.0,
    dark: 1.0,
    steel: 0.5,
    fairy: 2.0
  },
  fairy: {
    normal: 1.0,
    fire: 0.5,
    water: 1.0,
    electric: 1.0,
    grass: 1.0,
    ice: 1.0,
    fighting: 2.0,
    poison: 0.5,
    ground: 1.0,
    flying: 1.0,
    psychic: 1.0,
    bug: 1.0,
    rock: 1.0,
    ghost: 1.0,
    dragon: 2.0,
    dark: 2.0,
    steel: 0.5,
    fairy: 1.0
  }
};

/**
 * Calcola l'efficacia di una mossa contro un Pokemon
 * @param {string} moveType - Tipo della mossa
 * @param {Array<string>} defenderTypes - Tipi del Pokemon che subisce l'attacco
 * @returns {Object} - Oggetto con moltiplicatore e descrizione
 */
function calculateTypeEffectiveness(moveType, defenderTypes) {
  if (!moveType || !defenderTypes || defenderTypes.length === 0) {
    return {
      multiplier: 1.0,
      effectiveness: 'neutral',
      description: 'Efficacia normale'
    };
  }

  let totalMultiplier = 1.0;
  const individualMultipliers = [];

  // Calcola moltiplicatore per ogni tipo del difensore
  for (const defenderType of defenderTypes) {
    const multiplier = TYPE_EFFECTIVENESS[moveType]?.[defenderType] ?? 1.0;
    totalMultiplier *= multiplier;
    individualMultipliers.push({ type: defenderType, multiplier });
  }

  // Determina l'efficacia generale
  let effectiveness;
  let description;

  if (totalMultiplier > 1.0) {
    effectiveness = 'super_effective';
    description = totalMultiplier === 4.0 ? 'Molto super efficace' : 'Super efficace';
  } else if (totalMultiplier < 1.0) {
    if (totalMultiplier === 0.0) {
      effectiveness = 'no_effect';
      description = 'Nessun effetto';
    } else if (totalMultiplier <= 0.25) {
      effectiveness = 'not_very_effective';
      description = 'Estremamente poco efficace';
    } else {
      effectiveness = 'not_very_effective';
      description = 'Non molto efficace';
    }
  } else {
    effectiveness = 'neutral';
    description = 'Efficacia normale';
  }

  return {
    multiplier: totalMultiplier,
    effectiveness,
    description,
    individualMultipliers
  };
}

/**
 * Calcola il danno finale applicando i moltiplicatori di tipo
 * @param {number} basePower - Potenza base della mossa
 * @param {string} moveType - Tipo della mossa
 * @param {Array<string>} defenderTypes - Tipi del Pokemon difensore
 * @returns {Object} - Risultato del calcolo del danno
 */
function calculateDamage(basePower, moveType, defenderTypes) {
  const typeEffectiveness = calculateTypeEffectiveness(moveType, defenderTypes);
  const finalDamage = Math.round(basePower * typeEffectiveness.multiplier);

  return {
    basePower,
    typeEffectiveness,
    finalDamage,
    moveType,
    defenderTypes
  };
}

/**
 * Genera una descrizione dettagliata dell'efficacia
 * @param {string} moveName - Nome della mossa in italiano
 * @param {string} moveType - Tipo della mossa
 * @param {Array<string>} defenderTypes - Tipi del Pokemon difensore
 * @param {number} multiplier - Moltiplicatore calcolato
 * @returns {string} - Descrizione formattata
 */
function generateEffectivenessDescription(moveName, moveType, defenderTypes, multiplier) {
  const typeText = defenderTypes.length > 1 
    ? `${defenderTypes.join('/')}` 
    : defenderTypes[0];
    
  return `"${moveName}" di tipo ${moveType} acquisisce un moltiplicatore di ${multiplier}x verso un pokemon di tipo ${typeText}`;
}

module.exports = {
  TYPE_EFFECTIVENESS,
  calculateTypeEffectiveness,
  calculateDamage,
  generateEffectivenessDescription
};
