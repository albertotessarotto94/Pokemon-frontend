# 📋 GUIDA: Come Compilare il CSV per Pokemon Master Trainer

## 🎯 File Generato
Il file `pokemon-master-trainer-patch-2025-08-20.csv` contiene:

| Colonna | Stato | Descrizione |
|---------|-------|-------------|
| `pokedex_number` | ✅ **Compilato** | Numero Pokedex (1-151) |
| `name` | ✅ **Compilato** | Nome inglese del Pokemon |
| `name_it` | ✅ **Compilato** | Nome italiano (per riferimento) |
| `hp` | ❌ **DA COMPILARE** | Punti Salute da Master Trainer |
| `move_name_it` | ❌ **DA COMPILARE** | Nome mossa in italiano da Master Trainer |
| `move_power` | ❌ **DA COMPILARE** | Potenza mossa da Master Trainer |

## 📝 Come Compilare

### 1. Apri il CSV
- **Excel**: Doppio click sul file
- **Google Sheets**: Importa il file
- **LibreOffice Calc**: Apri → Seleziona file

### 2. Compila le Colonne Vuote

#### Colonna `hp` (D):
- Inserisci i **Punti Salute** dal gioco Master Trainer
- Esempi:
  ```
  120
  78
  45
  100
  ```

#### Colonna `move_name_it` (E):
- Inserisci il **nome della mossa in italiano** dal gioco Master Trainer
- Esempi:
  ```
  "Lanciafiamme"
  "Idropompa" 
  "Fulmine"
  "Terremoto"
  "Psichico"
  ```

#### Colonna `move_power` (F):
- Inserisci la **potenza numerica** della mossa da Master Trainer
- Esempi:
  ```
  90
  110
  75
  100
  0    (per mosse di stato)
  ```

### 3. Esempio di Righe Compilate

```csv
pokedex_number,name,name_it,hp,move_name_it,move_power
1,"bulbasaur","Bulbasaur",45,"Frustata",45
4,"charmander","Charmander",39,"Braciere",40
7,"squirtle","Squirtle",44,"Pistola Acqua",40
25,"pikachu","Pikachu",35,"Fulmine",90
```

## 🔧 Dopo la Compilazione

### 1. Salva il File
- Mantieni il formato CSV
- Non cambiare il nome del file

### 2. Applica le Patch
```bash
node import-patch-csv.js
```

### 3. Verifica i Risultati
Lo script mostrerà:
- ✅ Pokemon aggiornati
- ⏭️ Righe saltate (vuote)
- ❌ Eventuali errori

## 💡 Consigli

### ✅ **Buone Pratiche:**
- Compila una riga alla volta
- Usa **HP** esatti da Pokemon Master Trainer
- Usa nomi mosse **esatti** da Master Trainer
- Inserisci `0` per mosse senza danno
- Salva frequentemente il lavoro

### ⚠️ **Attenzione:**
- NON modificare le prime 3 colonne
- NON cancellare righe
- Usa virgolette per nomi con spazi
- HP e Potenza devono essere numeri interi

### 🎯 **Righe Facoltative:**
- Puoi lasciare vuote le righe che non vuoi aggiornare
- Lo script salterà automaticamente le righe vuote
- Puoi compilare solo alcuni Pokemon alla volta

## 🚀 Processo Completo

1. ✅ **Generato CSV** con dati attuali
2. 📝 **Compila** le colonne `move_name_it` e `move_power`
3. 💾 **Salva** il file CSV
4. 🔄 **Esegui** `node import-patch-csv.js`
5. 🎉 **Verifica** che le patch siano applicate

## 📞 Debug

Se hai problemi:
- Controlla che il file CSV sia nella cartella corretta
- Verifica che MongoDB sia in esecuzione
- Controlla gli errori nell'output dello script

Buon lavoro con Pokemon Master Trainer! 🎮
