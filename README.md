# Langues — App d'apprentissage

PWA mobile pour apprendre du vocabulaire en langues étrangères. Fonctionne entièrement hors-ligne, sans compte, sans serveur. Un seul fichier HTML à copier sur le téléphone.

---

## Langues disponibles

| Code    | Paire                      |
|---------|----------------------------|
| `fr-it` | 🇫🇷 Français → 🇮🇹 Italien    |
| `fr-en` | 🇫🇷 Français → 🇬🇧 Anglais    |
| `fr-es` | 🇫🇷 Français → 🇪🇸 Espagnol   |
| `fr-de` | 🇫🇷 Français → 🇩🇪 Allemand   |
| `fr-pt` | 🇫🇷 Français → 🇵🇹 Portugais  |
| `fr-jp` | 🇫🇷 Français → 🇯🇵 Japonais   |

Chaque langue a ses propres données (mots, fiches, phrases) stockées séparément dans `localStorage`.

---

## Écrans

### 🏠 Accueil
Sélection du mode de jeu et des paramètres (taille du quiz, paires par exercice, filtre par tag). Bouton "Commencer le quiz".

### 📚 Banque de mots
- Ajout / modification / suppression de paires de mots (français ↔ langue cible)
- Tags optionnels (`#chapitre1`, `#couleurs`…) pour filtrer et cibler les quiz
- Badges de maîtrise par mot : **Maîtrisé** / **En apprentissage** / **À revoir** / **Jamais pratiqué**
- Recherche plein texte
- Partager 🔗 / Exporter ⬇️ / Importer ⬆️ en JSON

### 📖 Cours (fiches de grammaire)
- Fiches question/réponse regroupées par **leçon**
- Stats globales : leçons · fiches · révisées · réussite
- Stats par leçon avec badge de progression
- Révision interactive : choisir la(les) leçon(s) via un sélecteur multi-choix
- Direction de révision configurable : 🇫🇷→🇮🇹 · 🇮🇹→🇫🇷 · 🔀 Mix
- Bouton ⚡ pour ne réviser que les fiches ratées
- Partager 🔗 / Exporter ⬇️ / Importer ⬆️

### 💬 Phrases & expressions
- Phrases regroupées par **thème** (topic)
- Même structure visuelle que les Cours
- Stats globales : thèmes · phrases · révisées · réussite
- Sélecteur multi-thèmes pour les révisions
- Direction configurable : 🇫🇷→🇮🇹 · 🇮🇹→🇫🇷 · 🔀 Mix
- Partager 🔗 / Exporter ⬇️ / Importer ⬆️

### 📊 Statistiques
- Streak journalier 🔥 et mots vus aujourd'hui
- Score de maîtrise globale et taux de réussite
- Heatmap d'activité sur 12 semaines
- Répartition du vocabulaire (maîtrisé / en cours / à revoir / nouveaux)
- Stats par mode de jeu
- Top 8 mots à revoir (classés par taux d'erreur)
- Top 8 mots maîtrisés
- Top 8 mots les plus pratiqués
- Liste des mots jamais pratiqués

---

## Modes de jeu

| Mode        | Description |
|-------------|-------------|
| 🎯 **Normal**    | Répétition espacée (SRS) — les mots dus en priorité |
| 🔴 **Révision**  | Uniquement les mots avec le plus d'erreurs |
| 💀 **Survie**    | Une erreur = terminé, score = nb de bonnes réponses consécutives |
| ⏱️ **Chrono**    | Temps limité par question (3 à 30 s configurables) |
| 🃏 **Flashcard** | Toutes les cartes à son rythme, avec retournement animé |
| 🎧 **Dictée**    | Écouter la prononciation et taper le mot (TTS requis) |
| 🔀 **Anagramme** | Remettre les lettres mélangées dans le bon ordre |

---

## Types d'exercices (quiz normal)

- **Association texte** — relier les mots français à leurs traductions
- **Association écoute** — relier les sons aux traductions françaises
- **QCM traduction** — choisir la bonne traduction parmi 4 options
- **QCM écoute** — identifier le mot entendu parmi 4 options
- **Saisie libre** — taper la traduction (tolérance 1 faute de frappe)

---

## Fonctionnalités transversales

- **Thème clair / sombre** — persisté dans `localStorage`
- **Texte agrandi** — mode accessibilité activable depuis l'accueil
- **Synthèse vocale** (Web Speech API) — prononciation dans la langue cible
- **SRS** (Spaced Repetition System) — algorithme SM-2 simplifié
- **Hors-ligne** — Service Worker + cache (via `manifest.json` / `sw.js`)
- **Demo automatique** — 30 mots + fiches de cours + phrases pré-chargés si la banque est vide

---

## Build

Le projet se compose de 3 fichiers sources fusionnés en un seul fichier distributable :

```
app.js + style.css + index.html → bundle.html
```

```bash
python3 build.py
# → bundle.html créé (~233 KB)
```

Copier `bundle.html` sur le téléphone et l'ouvrir dans Chrome.

---

## Formats d'import/export JSON

### Mots (`mots_it.json`, etc.)
```json
[
  { "native": "bonjour", "target": "ciao" },
  { "native": "merci",   "target": "grazie", "tags": ["salutations"] }
]
```

### Fiches de cours (`grammar_fr-it.json`)
```json
[
  {
    "lesson": "Articles définis",
    "question": "Masculin singulier",
    "answer": "il (il libro)\nlo (lo zaino)\nl' (l'uomo)"
  }
]
```

### Phrases (`phrases_fr-it.json`)
```json
[
  {
    "native": "Où sont les toilettes ?",
    "target": "Dove sono i bagni?",
    "topic": "Pratique"
  }
]
```

---

## Stack

- HTML / CSS / JavaScript vanilla — zéro dépendance
- `localStorage` pour toute la persistance
- Web Speech API (TTS)
- Service Worker (cache offline)
- `navigator.share` API pour le partage natif Android
