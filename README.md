# Vocabulaire — App d'apprentissage

PWA mobile pour apprendre du vocabulaire en langues étrangères, inspirée de Duolingo. Fonctionne entièrement hors-ligne, sans compte, sans serveur.

## Langues disponibles

- 🇫🇷 → 🇮🇹 Français / Italien
- 🇫🇷 → 🇬🇧 Français / Anglais
- 🇫🇷 → 🇪🇸 Français / Espagnol

## Fonctionnalités

- **Banque de mots** — ajout, modification, suppression, recherche
- **Import / Export JSON** — pour sauvegarder ou éditer sa liste à la main
- **Quiz de 8 questions** — 4 types d'exercices mélangés aléatoirement :
  - Association texte ↔ texte
  - Association audio ↔ texte
  - QCM traduction
  - QCM écoute
- **Synthèse vocale** — prononciation via Web Speech API
- **Banques séparées** par langue

## Utilisation

### En local (fichier unique)

Copier `bundle.html` sur le téléphone et l'ouvrir dans Chrome.

## Format d'import JSON

```json
{
  [
    { "fr": "bonjour", "it": "buongiorno" },
    { "fr": "merci",   "it": "grazie" }
  ]
}
```

## Stack

- HTML / CSS / JS vanilla — zéro dépendance
- Web Speech API (TTS)
- localStorage
- Service Worker (cache offline)
