/* ============================================================
   APP.JS — Apprentissage de vocabulaire (multi-langue)
   ============================================================ */
'use strict';

/* ============================================================
   LANGUAGE CONFIG
   ============================================================ */
const LANGUAGES = {
  'fr-it': { label: 'Français → Italien',    labelEn: 'French → Italian',    nativeFlag: '🇫🇷', targetFlag: '🇮🇹', ttsLang: 'it-IT', ttsPfx: 'it', filename: 'mots_it.json', title: '🇮🇹 Italiano',   subtitle: 'Apprentissage de l\'italien'    },
  'fr-en': { label: 'Français → Anglais',    labelEn: 'French → English',    nativeFlag: '🇫🇷', targetFlag: '🇬🇧', ttsLang: 'en-US', ttsPfx: 'en', filename: 'mots_en.json', title: '🇬🇧 English',    subtitle: 'Apprentissage de l\'anglais'    },
  'fr-es': { label: 'Français → Espagnol',   labelEn: 'French → Spanish',    nativeFlag: '🇫🇷', targetFlag: '🇪🇸', ttsLang: 'es-ES', ttsPfx: 'es', filename: 'mots_es.json', title: '🇪🇸 Español',    subtitle: 'Apprentissage de l\'espagnol'   },
  'fr-de': { label: 'Français → Allemand',   labelEn: 'French → German',     nativeFlag: '🇫🇷', targetFlag: '🇩🇪', ttsLang: 'de-DE', ttsPfx: 'de', filename: 'mots_de.json', title: '🇩🇪 Deutsch',    subtitle: 'Apprentissage de l\'allemand'   },
  'fr-pt': { label: 'Français → Portugais',  labelEn: 'French → Portuguese', nativeFlag: '🇫🇷', targetFlag: '🇵🇹', ttsLang: 'pt-PT', ttsPfx: 'pt', filename: 'mots_pt.json', title: '🇵🇹 Português',  subtitle: 'Apprentissage du portugais'     },
  'fr-jp': { label: 'Français → Japonais',   labelEn: 'French → Japanese',   nativeFlag: '🇫🇷', targetFlag: '🇯🇵', ttsLang: 'ja-JP', ttsPfx: 'ja', filename: 'mots_jp.json', title: '🇯🇵 日本語',      subtitle: 'Apprentissage du japonais'      },
};

/* ============================================================
   UI LANGUAGE (i18n)
   ============================================================ */
const UI_LANG_KEY = 'app_ui_lang';
function detectUILang() {
  const saved = localStorage.getItem(UI_LANG_KEY);
  if (saved === 'fr' || saved === 'en') return saved;
  return (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}
let uiLang = detectUILang();

const T = {
  fr: {
    nav_home: 'Accueil', nav_bank: 'Banque', nav_grammar: 'Cours', nav_phrases: 'Phrases', nav_stats: 'Stats',
    start_quiz: 'Commencer le quiz',
    backup_bar: 'Pensez à sauvegarder vos mots depuis la <strong>Banque</strong> !',
    backup_score: 'Pensez à sauvegarder vos mots via <strong>Partager</strong> ou <strong>Exporter</strong> dans la Banque !',
    bank_title: 'Ma banque de mots', search_placeholder: 'Rechercher un mot…',
    empty_bank: 'Aucun mot trouvé', empty_bank2: 'Ajoutez votre premier mot ci-dessus !',
    btn_add: '+ Ajouter', stats_title: 'Statistiques',
    grammar_title: 'Fiches de cours', phrases_title: 'Phrases & expressions',
    modal_add_word: 'Ajouter un mot', modal_edit_word: 'Modifier le mot',
    modal_add_phrase: 'Ajouter une phrase', modal_edit_phrase: 'Modifier la phrase',
    modal_add_grammar: 'Ajouter une fiche', modal_edit_grammar: 'Modifier la fiche',
    modal_choose_lang: 'Choisir une langue', modal_help: 'Comment ça marche',
    modal_legend: 'Code couleur des mots', modal_lessons: 'Choisir les leçons',
    modal_topics: 'Choisir les thèmes',
    modal_import_words: 'Importer des mots', modal_import_grammar: 'Importer des fiches', modal_import_phrases: 'Importer des phrases',
    quiz_done: 'Quiz terminé !', score_replay: '🔁 Rejouer', score_home: '🏠 Accueil',
    label_tags: '🏷️ Tags', label_tags_hint: '(optionnel, ex: chapitre1, couleurs)',
    placeholder_tags: 'ex: #chapitre1, #couleurs', btn_save: '💾 Sauvegarder',
    native_lang: 'Français',
    label_lesson: 'Leçon', label_question: 'Question / Titre', label_answer: 'Réponse',
    placeholder_lesson: 'ex: Articles définis', placeholder_question: 'ex: Masculin singulier',
    label_phrase_native: '🇫🇷 Phrase en français', placeholder_phrase_native: 'ex: Comment allez-vous ?',
    placeholder_phrase_target: 'ex: Come state?',
    label_phrase_topic: '📌 Thème', label_phrase_topic_hint: '(optionnel)', placeholder_phrase_topic: 'ex: Salutations',
    import_how_words: 'Comment souhaitez-vous importer ces mots ?',
    import_how_grammar: 'Comment souhaitez-vous importer ces fiches ?',
    import_how_phrases: 'Comment souhaitez-vous importer ces phrases ?',
    btn_merge: '🔀 Fusionner', btn_replace: '🔄 Remplacer',
    merge_words_desc: 'Ajoute les nouveaux mots sans supprimer les existants',
    replace_words_desc: 'Supprime tous les mots existants et importe ceux-ci',
    merge_grammar_desc: 'Ajoute les nouvelles fiches sans supprimer les existantes',
    replace_grammar_desc: 'Supprime toutes les fiches existantes et importe celles-ci',
    merge_phrases_desc: 'Ajoute les nouvelles phrases sans supprimer les existantes',
    replace_phrases_desc: 'Supprime toutes les phrases existantes et importe celles-ci',
    help_tip1: 'Ajoutez des paires de mots dans la <strong>Banque</strong>',
    help_tip2: 'Choisissez un mode de jeu et lancez un quiz',
    help_tip3: 'Exercices variés : écoute, association, traduction, anagramme…',
    help_tip4: 'Consultez vos <strong>Stats</strong> pour suivre votre progression',
    help_tip5: 'Exportez régulièrement depuis la Banque pour ne pas perdre vos mots',
    legend_mastered: 'Maîtrisé — vu ≥ 3 fois, moins de 25 % d\'erreurs',
    legend_learning: 'En apprentissage — vu au moins une fois',
    legend_review: 'À revoir — plus de 50 % d\'erreurs',
    legend_never: 'Jamais pratiqué — pas encore vu en quiz',
    tts_warning: '⚠️ La synthèse vocale n\'est pas disponible sur ce navigateur. Les exercices audio seront remplacés.',
    mastery_mastered: 'Maîtrisé', mastery_learning: 'En apprentissage',
    mastery_review: 'À revoir', mastery_never: 'Jamais pratiqué',
    mode_normal: 'Normal', mode_revision: 'Révision', mode_survival: 'Survie',
    mode_chrono: 'Chrono', mode_flashcard: 'Flashcards', mode_dictee: 'Dictée', mode_anagram: 'Anagramme',
    mode_desc_0: 'Les mots à réviser en priorité selon votre historique (répétition espacée).',
    mode_desc_1: 'Seulement vos mots avec le plus d\'erreurs — ciblez vos points faibles.',
    mode_desc_2: 'Répondez sans vous tromper — une seule erreur et c\'est terminé !',
    mode_desc_3: 'Répondez avant que le temps ne s\'écoule — restez concentré !',
    mode_desc_4: 'Parcourez toutes vos cartes à votre rythme — tapez pour voir la traduction.',
    mode_desc_5: 'Écoutez le mot prononcé et tapez ce que vous entendez (synthèse vocale requise).',
    mode_desc_6: 'Les lettres du mot sont mélangées — remettez-les dans le bon ordre.',
    settings_questions: 'Questions par quiz', settings_pairs: 'Paires par exercice',
    settings_filter_tag: 'Filtrer par tag', settings_all: 'Tous',
    settings_time: 'Temps par question', settings_direction: 'Sens', settings_cards: 'Nombre de cartes',
    quiz_text_match: 'Association — Texte', quiz_audio_match: 'Association — Écoute',
    quiz_match_instr: 'Associez chaque mot français à sa traduction.',
    quiz_audio_instr: 'Associez chaque son à la bonne traduction française.',
    quiz_listen_instr: 'Quelle est la traduction française ?',
    quiz_free_placeholder: 'Tapez la traduction…', btn_validate: 'Valider ✓',
    quiz_dictee_instr: 'Tapez ce que vous entendez dans la langue cible.',
    quiz_dictee_placeholder: 'Tapez ce que vous entendez…',
    fc_tap_hint: 'Tapez pour retourner', fc_prev: '← Préc.', fc_next: 'Suivant →', fc_finish: '✓ Terminer',
    score_excellent: 'Excellent ! Vous maîtrisez ce vocabulaire !',
    score_good: 'Très bien ! Continuez comme ça !',
    score_ok: 'Continuez vos efforts, vous progressez !',
    score_low: 'Entraînez-vous encore, vous pouvez y arriver !',
    score_flashcard: 'Révision terminée !', score_cards: 'cartes',
    reveal_answer: 'Voir la réponse', reveal_question: 'Voir la question',
    btn_to_review: '✗ À revoir', btn_known: '✓ Connu',
    gr_perfect: 'Parfait ! Toutes les fiches maîtrisées !',
    gr_good: 'Très bien ! Quelques fiches à revoir.',
    gr_ok: 'Continuez à pratiquer !', gr_low: 'À force de révisions, vous y arriverez !',
    btn_retry: '🔁 Réessayer', btn_back_grammar: '📖 Retour aux cours',
    reveal_translation: 'Révéler la traduction', reveal_original: 'Révéler la phrase originale',
    pr_perfect: 'Parfait ! Toutes les phrases connues !',
    pr_good: 'Très bien ! Quelques phrases à revoir.',
    pr_ok: 'Continuez à pratiquer !', pr_low: 'À force de révisions, vous y arriverez !',
    btn_back_phrases: '💬 Retour aux phrases',
    stat_streak1: 'jour de suite', stat_streakN: 'jours de suite',
    stat_today: 'mots vus auj.', stat_mastery: 'maîtrise globale', stat_accuracy: 'réussite quiz',
    stat_activity: '📅 Activité des 12 dernières semaines',
    stat_vocab_section: '📊 Répartition du vocabulaire',
    stat_by_mode: '🎮 Par mode de jeu',
    stat_to_review: '🔴 Mots à revoir', stat_to_review_hint: '— classés par taux d\'erreurs',
    stat_mastered_section: '✅ Mots maîtrisés',
    stat_practiced: '🔵 Les plus pratiqués', stat_practiced_hint: '— nombre de fois vus en quiz',
    stat_never_section: '😶 Jamais pratiqués',
    stat_empty: 'Aucune donnée', stat_empty_hint: 'Faites des quiz pour voir vos statistiques !',
    seg_mastered: 'Maîtrisés', seg_learning: 'En cours', seg_review: 'À revoir', seg_never: 'Nouveaux',
    stat_best: 'Meilleur', stat_avg_prefix: 'moy.',
    pct_failed: '% raté', pct_correct: '% juste', stat_times: 'fois',
    session1: 'session', sessionN: 'sessions',
    grammar_stat_lessons: 'Leçons', grammar_stat_cards: 'Fiches',
    grammar_stat_reviewed: 'Révisées', grammar_stat_success: 'Réussite',
    grammar_btn_review: 'Réviser',
    grammar_no_cards: 'Aucune fiche de cours', grammar_no_cards2: 'Créez votre première fiche ci-dessus !',
    phrases_stat_topics: 'Thèmes', phrases_stat_count: 'Phrases',
    phrases_stat_reviewed: 'Révisées', phrases_stat_success: 'Réussite',
    phrases_no_phrases: 'Aucune phrase', phrases_no_phrases2: 'Ajoutez votre première phrase ci-dessus !',
    phrases_none_topic: 'Sans thème', phrases_btn_review: 'Réviser',
    picker_all: 'Tout', picker_none: 'Aucun',
    months: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
    heatmap_less: 'Moins', heatmap_more: 'Plus',
    alert_bank_empty: 'Votre banque de mots est vide.',
    alert_no_grammar_export: 'Aucune fiche à exporter.',
    alert_no_grammar_share: 'Aucune fiche à partager.',
    alert_no_phrase_export: 'Aucune phrase à exporter.',
    alert_no_phrase_share: 'Aucune phrase à partager.',
    alert_invalid_json: 'Fichier JSON invalide.',
    alert_invalid_array: 'Le fichier doit contenir un tableau de mots.',
    alert_no_valid_words: 'Aucun mot valide trouvé dans ce fichier.',
    alert_no_valid_grammar: 'Aucune fiche valide trouvée.',
    alert_no_valid_phrases: 'Aucune phrase valide trouvée.',
    alert_invalid_format: 'Format invalide.',
    alert_no_grammar_review: 'Aucune fiche à revoir pour le moment.',
    alert_no_phrase_review: 'Aucune phrase à revoir pour le moment.',
    alert_dictee_no_tts: 'La dictée nécessite la synthèse vocale, qui n\'est pas disponible sur ce navigateur.',
    alert_revision_no_words: 'Pas assez de mots à revoir pour ce mode. Faites d\'abord des quiz en mode Normal !',
    alert_flashcard_empty: 'Ajoutez des mots dans votre banque pour utiliser les flashcards.',
    confirm_quit: 'Quitter ?',
    confirm_delete_word: 'Supprimer ce mot ?',
    confirm_delete_grammar: 'Supprimer cette fiche ?',
    confirm_delete_phrase: 'Supprimer cette phrase ?',
    err_fields_required: 'Les deux champs sont requis.',
    err_word_exists: 'Ce mot existe déjà dans votre banque.',
    err_all_fields: 'Tous les champs sont requis.',
    err_phrase_fields: 'Les deux champs de texte sont requis.',
    merge_all_existed_words: 'Tous les mots existaient déjà.',
    merge_all_existed_grammar: 'Toutes les fiches existaient déjà.',
    merge_all_existed_phrases: 'Toutes les phrases existaient déjà.',
  },
  en: {
    nav_home: 'Home', nav_bank: 'Bank', nav_grammar: 'Lessons', nav_phrases: 'Phrases', nav_stats: 'Stats',
    start_quiz: 'Start quiz',
    backup_bar: 'Remember to save your words from the <strong>Bank</strong>!',
    backup_score: 'Remember to save your words via <strong>Share</strong> or <strong>Export</strong> in the Bank!',
    bank_title: 'My word bank', search_placeholder: 'Search a word…',
    empty_bank: 'No words found', empty_bank2: 'Add your first word above!',
    btn_add: '+ Add', stats_title: 'Statistics',
    grammar_title: 'Lesson cards', phrases_title: 'Phrases & expressions',
    modal_add_word: 'Add a word', modal_edit_word: 'Edit word',
    modal_add_phrase: 'Add a phrase', modal_edit_phrase: 'Edit phrase',
    modal_add_grammar: 'Add a card', modal_edit_grammar: 'Edit card',
    modal_choose_lang: 'Choose a language', modal_help: 'How it works',
    modal_legend: 'Word color code', modal_lessons: 'Choose lessons',
    modal_topics: 'Choose topics',
    modal_import_words: 'Import words', modal_import_grammar: 'Import cards', modal_import_phrases: 'Import phrases',
    quiz_done: 'Quiz done!', score_replay: '🔁 Play again', score_home: '🏠 Home',
    label_tags: '🏷️ Tags', label_tags_hint: '(optional, e.g. chapter1, colors)',
    placeholder_tags: 'e.g. #chapter1, #colors', btn_save: '💾 Save',
    native_lang: 'French',
    label_lesson: 'Lesson', label_question: 'Question / Title', label_answer: 'Answer',
    placeholder_lesson: 'e.g. Definite articles', placeholder_question: 'e.g. Masculine singular',
    label_phrase_native: '🇫🇷 Phrase in French', placeholder_phrase_native: 'e.g. How are you?',
    placeholder_phrase_target: 'e.g. Come state?',
    label_phrase_topic: '📌 Topic', label_phrase_topic_hint: '(optional)', placeholder_phrase_topic: 'e.g. Greetings',
    import_how_words: 'How would you like to import these words?',
    import_how_grammar: 'How would you like to import these cards?',
    import_how_phrases: 'How would you like to import these phrases?',
    btn_merge: '🔀 Merge', btn_replace: '🔄 Replace',
    merge_words_desc: 'Add new words without deleting existing ones',
    replace_words_desc: 'Delete all existing words and import these',
    merge_grammar_desc: 'Add new cards without deleting existing ones',
    replace_grammar_desc: 'Delete all existing cards and import these',
    merge_phrases_desc: 'Add new phrases without deleting existing ones',
    replace_phrases_desc: 'Delete all existing phrases and import these',
    help_tip1: 'Add word pairs in the <strong>Bank</strong>',
    help_tip2: 'Choose a game mode and start a quiz',
    help_tip3: 'Varied exercises: listening, matching, translation, anagram…',
    help_tip4: 'Check your <strong>Stats</strong> to track your progress',
    help_tip5: 'Export regularly from the Bank to keep your words safe',
    legend_mastered: 'Mastered — seen ≥ 3 times, less than 25% errors',
    legend_learning: 'Learning — seen at least once',
    legend_review: 'To review — more than 50% errors',
    legend_never: 'Never practiced — not yet seen in a quiz',
    tts_warning: '⚠️ Text-to-speech is not available on this browser. Audio exercises will be replaced.',
    mastery_mastered: 'Mastered', mastery_learning: 'Learning',
    mastery_review: 'To review', mastery_never: 'Never practiced',
    mode_normal: 'Normal', mode_revision: 'Review', mode_survival: 'Survival',
    mode_chrono: 'Chrono', mode_flashcard: 'Flashcards', mode_dictee: 'Dictation', mode_anagram: 'Anagram',
    mode_desc_0: 'Words to review first based on your history (spaced repetition).',
    mode_desc_1: 'Only your most error-prone words — target your weak points.',
    mode_desc_2: 'Answer without mistakes — one error and it\'s over!',
    mode_desc_3: 'Answer before time runs out — stay focused!',
    mode_desc_4: 'Browse all your cards at your own pace — tap to see the translation.',
    mode_desc_5: 'Listen to the word and type what you hear (text-to-speech required).',
    mode_desc_6: 'The word\'s letters are shuffled — put them back in the right order.',
    settings_questions: 'Questions per quiz', settings_pairs: 'Pairs per exercise',
    settings_filter_tag: 'Filter by tag', settings_all: 'All',
    settings_time: 'Time per question', settings_direction: 'Direction', settings_cards: 'Number of cards',
    quiz_text_match: 'Matching — Text', quiz_audio_match: 'Matching — Listen',
    quiz_match_instr: 'Match each French word to its translation.',
    quiz_audio_instr: 'Match each sound to the correct French translation.',
    quiz_listen_instr: 'What is the French translation?',
    quiz_free_placeholder: 'Type the translation…', btn_validate: 'Submit ✓',
    quiz_dictee_instr: 'Type what you hear in the target language.',
    quiz_dictee_placeholder: 'Type what you hear…',
    fc_tap_hint: 'Tap to flip', fc_prev: '← Prev', fc_next: 'Next →', fc_finish: '✓ Finish',
    score_excellent: 'Excellent! You\'ve mastered this vocabulary!',
    score_good: 'Well done! Keep it up!',
    score_ok: 'Keep at it, you\'re improving!',
    score_low: 'Keep practicing, you can do it!',
    score_flashcard: 'Review done!', score_cards: 'cards',
    reveal_answer: 'Show answer', reveal_question: 'Show question',
    btn_to_review: '✗ Review', btn_known: '✓ Known',
    gr_perfect: 'Perfect! All cards mastered!',
    gr_good: 'Great! A few cards to review.',
    gr_ok: 'Keep practicing!', gr_low: 'With practice, you\'ll get there!',
    btn_retry: '🔁 Try again', btn_back_grammar: '📖 Back to lessons',
    reveal_translation: 'Reveal translation', reveal_original: 'Reveal original phrase',
    pr_perfect: 'Perfect! All phrases known!',
    pr_good: 'Great! A few phrases to review.',
    pr_ok: 'Keep practicing!', pr_low: 'With practice, you\'ll get there!',
    btn_back_phrases: '💬 Back to phrases',
    stat_streak1: 'day in a row', stat_streakN: 'days in a row',
    stat_today: 'words seen today', stat_mastery: 'overall mastery', stat_accuracy: 'quiz accuracy',
    stat_activity: '📅 Activity over the last 12 weeks',
    stat_vocab_section: '📊 Vocabulary breakdown',
    stat_by_mode: '🎮 By game mode',
    stat_to_review: '🔴 Words to review', stat_to_review_hint: '— ranked by error rate',
    stat_mastered_section: '✅ Mastered words',
    stat_practiced: '🔵 Most practiced', stat_practiced_hint: '— number of times seen in quizzes',
    stat_never_section: '😶 Never practiced',
    stat_empty: 'No data', stat_empty_hint: 'Take some quizzes to see your stats!',
    seg_mastered: 'Mastered', seg_learning: 'Learning', seg_review: 'Review', seg_never: 'New',
    stat_best: 'Best', stat_avg_prefix: 'avg.',
    pct_failed: '% missed', pct_correct: '% correct', stat_times: 'times',
    session1: 'session', sessionN: 'sessions',
    grammar_stat_lessons: 'Lessons', grammar_stat_cards: 'Cards',
    grammar_stat_reviewed: 'Reviewed', grammar_stat_success: 'Success',
    grammar_btn_review: 'Review',
    grammar_no_cards: 'No lesson cards', grammar_no_cards2: 'Create your first card above!',
    phrases_stat_topics: 'Topics', phrases_stat_count: 'Phrases',
    phrases_stat_reviewed: 'Reviewed', phrases_stat_success: 'Success',
    phrases_no_phrases: 'No phrases', phrases_no_phrases2: 'Add your first phrase above!',
    phrases_none_topic: 'No topic', phrases_btn_review: 'Review',
    picker_all: 'All', picker_none: 'None',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    heatmap_less: 'Less', heatmap_more: 'More',
    alert_bank_empty: 'Your word bank is empty.',
    alert_no_grammar_export: 'No cards to export.',
    alert_no_grammar_share: 'No cards to share.',
    alert_no_phrase_export: 'No phrases to export.',
    alert_no_phrase_share: 'No phrases to share.',
    alert_invalid_json: 'Invalid JSON file.',
    alert_invalid_array: 'The file must contain an array of words.',
    alert_no_valid_words: 'No valid words found in this file.',
    alert_no_valid_grammar: 'No valid cards found.',
    alert_no_valid_phrases: 'No valid phrases found.',
    alert_invalid_format: 'Invalid format.',
    alert_no_grammar_review: 'No cards to review at the moment.',
    alert_no_phrase_review: 'No phrases to review at the moment.',
    alert_dictee_no_tts: 'Dictation requires text-to-speech, which is not available on this browser.',
    alert_revision_no_words: 'Not enough words to review for this mode. First do some quizzes in Normal mode!',
    alert_flashcard_empty: 'Add words to your bank to use flashcards.',
    confirm_quit: 'Quit?',
    confirm_delete_word: 'Delete this word?',
    confirm_delete_grammar: 'Delete this card?',
    confirm_delete_phrase: 'Delete this phrase?',
    err_fields_required: 'Both fields are required.',
    err_word_exists: 'This word already exists in your bank.',
    err_all_fields: 'All fields are required.',
    err_phrase_fields: 'Both text fields are required.',
    merge_all_existed_words: 'All words already existed.',
    merge_all_existed_grammar: 'All cards already existed.',
    merge_all_existed_phrases: 'All phrases already existed.',
  }
};

function t(key) { return (T[uiLang] || T.fr)[key] || key; }

function langLabel() { return uiLang === 'en' ? (lang().labelEn || lang().label) : lang().label; }
function langTargetName() { return langLabel().split('→')[1].trim(); }

/* Pluralization helpers */
function pWords(n)   { return uiLang === 'en' ? `${n} word${n !== 1 ? 's' : ''}` : `${n} mot${n !== 1 ? 's' : ''}`; }
function pCards(n)   { return uiLang === 'en' ? `${n} card${n !== 1 ? 's' : ''}` : `${n} fiche${n !== 1 ? 's' : ''}`; }
function pPhrases(n) { return `${n} phrase${n !== 1 ? 's' : ''}`; }
function pSessions(n){ return `${n} ${n !== 1 ? t('sessionN') : t('session1')}`; }

function setUILang(newLang) {
  uiLang = newLang;
  localStorage.setItem(UI_LANG_KEY, newLang);
  translatePage();
  updateLangToggle();
  renderModeSelector();
  renderQuizSettings();
  updateHomeStats();
  renderWordList(document.getElementById('search-input')?.value || '');
  renderTagFilterBar();
  renderStats();
  renderGrammarScreen();
  renderPhrasesScreen();
  updateFormLabels();
  updatePhraseFormLabels();
  renderLanguageSelector();
  updateBankHeader();
}

function updateLangToggle() {
  const btn = document.getElementById('btn-ui-lang');
  if (btn) btn.textContent = uiLang === 'fr' ? 'EN' : 'FR';
}

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
}

const LANG_KEY = 'app_current_lang';
let currentLangKey = localStorage.getItem(LANG_KEY) || 'fr-it';
function lang() { return LANGUAGES[currentLangKey]; }

/* ============================================================
   STORAGE
   ============================================================ */
function storageKey() { return 'words_' + currentLangKey; }

// Migrate old fr/it fields to native/target + ensure stat fields exist
function migrateWord(w) {
  if (w.native === undefined && w.fr !== undefined) {
    return { id: w.id, native: w.fr, target: w.it, created_at: w.created_at, last_seen: w.last_seen, seen_count: 0, error_count: 0 };
  }
  if (w.seen_count   === undefined) w.seen_count   = 0;
  if (w.error_count  === undefined) w.error_count  = 0;
  if (w.srs_interval === undefined) w.srs_interval = 1;
  if (w.srs_ease     === undefined) w.srs_ease     = 2.5;
  if (w.srs_reps     === undefined) w.srs_reps     = 0;
  if (w.srs_next_review === undefined) w.srs_next_review = null;
  if (w.tags         === undefined) w.tags         = [];
  return w;
}

function loadWords() {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(migrateWord);
  } catch (e) {
    console.error('loadWords error:', e);
    return [];
  }
}

function saveWords(words) {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(words));
  } catch (e) {
    console.error('saveWords error:', e);
  }
}

function getWords() { return loadWords(); }

function parseTags(str) {
  return (str || '').split(/[,\s]+/)
    .map(t => t.trim().replace(/^#/, '').toLowerCase())
    .filter(Boolean);
}

function getAllTags() {
  const tagSet = new Set();
  getWords().forEach(w => (w.tags || []).forEach(t => tagSet.add(t)));
  return [...tagSet].sort();
}

let currentTagFilter = null; // null = all words, string = filter by tag

function createWord(native, target, tags = []) {
  return {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36),
    native: native.trim(),
    target: target.trim(),
    tags:   tags,
    created_at: new Date().toISOString(),
    last_seen: null
  };
}

function addWord(native, target, tags = []) {
  const words = getWords();
  const word = createWord(native, target, tags);
  words.unshift(word);
  saveWords(words);
  return word;
}

function updateWord(id, native, target, tags = []) {
  const words = getWords();
  const idx = words.findIndex(w => w.id === id);
  if (idx === -1) return false;
  words[idx].native = native.trim();
  words[idx].target = target.trim();
  words[idx].tags   = tags;
  saveWords(words);
  return true;
}

function deleteWord(id) {
  saveWords(getWords().filter(w => w.id !== id));
}

/* ============================================================
   GRAMMAR CARDS STORAGE
   ============================================================ */
function grammarStorageKey() { return 'grammar_' + currentLangKey; }

function getGrammarCards() {
  try {
    const raw = localStorage.getItem(grammarStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(c => {
      if (c.last_known === undefined) c.last_known = null;
      return c;
    });
  } catch (e) { return []; }
}

function saveGrammarCards(cards) {
  try {
    localStorage.setItem(grammarStorageKey(), JSON.stringify(cards));
  } catch (e) { console.error('saveGrammarCards error:', e); }
}

function addGrammarCard(lesson, question, answer) {
  const cards = getGrammarCards();
  const card = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36),
    lesson: lesson.trim(),
    question: question.trim(),
    answer: answer.trim(),
    seen_count: 0,
    error_count: 0,
    last_known: null
  };
  cards.push(card);
  saveGrammarCards(cards);
  return card;
}

function updateGrammarCard(id, lesson, question, answer) {
  const cards = getGrammarCards();
  const idx = cards.findIndex(c => c.id === id);
  if (idx === -1) return false;
  cards[idx].lesson   = lesson.trim();
  cards[idx].question = question.trim();
  cards[idx].answer   = answer.trim();
  saveGrammarCards(cards);
  return true;
}

function deleteGrammarCard(id) {
  saveGrammarCards(getGrammarCards().filter(c => c.id !== id));
}

/* ============================================================
   PHRASES STORAGE
   ============================================================ */
function phrasesStorageKey() { return 'phrases_' + currentLangKey; }

function getPhrases() {
  try {
    const raw = localStorage.getItem(phrasesStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(p => {
      if (p.last_known === undefined) p.last_known = null;
      if (p.topic      === undefined) p.topic      = '';
      if (p.seen_count === undefined) p.seen_count  = 0;
      return p;
    });
  } catch { return []; }
}

function savePhrases(phrases) {
  try { localStorage.setItem(phrasesStorageKey(), JSON.stringify(phrases)); } catch (e) { console.error(e); }
}

function addPhrase(native, target, topic) {
  const phrases = getPhrases();
  const phrase = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36),
    native: native.trim(),
    target: target.trim(),
    topic:  topic.trim(),
    last_known: null,
    seen_count: 0
  };
  phrases.push(phrase);
  savePhrases(phrases);
  return phrase;
}

function updatePhrase(id, native, target, topic) {
  const phrases = getPhrases();
  const idx = phrases.findIndex(p => p.id === id);
  if (idx === -1) return false;
  phrases[idx].native = native.trim();
  phrases[idx].target = target.trim();
  phrases[idx].topic  = topic.trim();
  savePhrases(phrases);
  return true;
}

function deletePhrase(id) {
  savePhrases(getPhrases().filter(p => p.id !== id));
}

function updateLastSeen(ids) {
  const words = getWords();
  const now = new Date().toISOString();
  ids.forEach(id => {
    const w = words.find(w => w.id === id);
    if (w) w.last_seen = now;
  });
  saveWords(words);
}

function recordAnswer(wordId, isCorrect) {
  const words = getWords();
  const w = words.find(w => w.id === wordId);
  if (!w) return;
  w.seen_count = (w.seen_count || 0) + 1;
  if (!isCorrect) w.error_count = (w.error_count || 0) + 1;
  updateWordSRS(w, isCorrect);
  saveWords(words);
  if (!isCorrect && quizState && !quizState.isFlashcard) {
    if (!quizState.failedWordIds) quizState.failedWordIds = [];
    if (!quizState.failedWordIds.includes(wordId)) quizState.failedWordIds.push(wordId);
  }
}

function updateWordSRS(word, isCorrect) {
  if (isCorrect) {
    word.srs_reps = (word.srs_reps || 0) + 1;
    const ease = word.srs_ease || 2.5;
    if (word.srs_reps === 1)      word.srs_interval = 1;
    else if (word.srs_reps === 2) word.srs_interval = 3;
    else word.srs_interval = Math.round((word.srs_interval || 1) * ease);
    word.srs_ease = Math.min(3.0, ease + 0.05);
  } else {
    word.srs_reps = 0;
    word.srs_ease = Math.max(1.3, (word.srs_ease || 2.5) - 0.15);
    word.srs_interval = 1;
  }
  const d = new Date();
  d.setDate(d.getDate() + (word.srs_interval || 1));
  word.srs_next_review = d.toISOString().slice(0, 10);
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const d = [];
  for (let i = 0; i <= m; i++) { d[i] = [i]; }
  for (let j = 0; j <= n; j++) { d[0][j] = j; }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = a[i-1] === b[j-1] ? d[i-1][j-1] : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
    }
  }
  return d[m][n];
}

function isCloseEnough(input, correct) {
  const a = input.toLowerCase().trim();
  const b = correct.toLowerCase().trim();
  if (a === b) return true;
  if (b.length >= 5 && levenshtein(a, b) <= 1) return true;
  return false;
}

/* ============================================================
   QUIZ HISTORY & STREAK
   ============================================================ */
function historyKey() { return 'quiz_history_' + currentLangKey; }

function getQuizHistory() {
  try {
    const raw = localStorage.getItem(historyKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch(e) { return []; }
}

function addQuizToHistory(score, total, wordsSeen) {
  const history = getQuizHistory();
  history.push({ date: todayStr(), score, total, wordsSeen, mode: currentGameMode });
  if (history.length > 60) history.splice(0, history.length - 60);
  localStorage.setItem(historyKey(), JSON.stringify(history));
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

function computeStreak(history) {
  if (!history.length) return 0;
  const days = [...new Set(history.map(s => s.date))].sort().reverse();
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 0;
  let cur = days[0];
  for (const day of days) {
    if (day === cur) {
      streak++;
      cur = new Date(new Date(cur).getTime() - 86400000).toISOString().slice(0, 10);
    } else { break; }
  }
  return streak;
}

function countTodaySeen(history) {
  return history.filter(s => s.date === todayStr()).reduce((sum, s) => sum + (s.wordsSeen || 0), 0);
}

function categorizeWords(words) {
  const mastered = [], learning = [], toReview = [], never = [];
  for (const w of words) {
    const seen = w.seen_count || 0;
    const errors = w.error_count || 0;
    if (seen === 0)                                         never.push(w);
    else if (seen >= 3 && errors / seen <= 0.25)           mastered.push(w);
    else if (errors / seen > 0.5)                          toReview.push(w);
    else                                                   learning.push(w);
  }
  return { mastered, learning, toReview, never };
}

function globalScore(words) {
  if (!words.length) return null;
  const { mastered, learning, toReview, never } = categorizeWords(words);
  const score = (mastered.length * 100 + learning.length * 60 + toReview.length * 20) / words.length;
  return Math.round(score);
}

/* ============================================================
   TTS MODULE
   ============================================================ */
let targetVoice = null;
let ttsSupported = true;

function initTTS() {
  if (!window.speechSynthesis) {
    ttsSupported = false;
    document.getElementById('tts-warning').classList.remove('hidden');
    return;
  }
  function loadVoices() {
    const voices = speechSynthesis.getVoices();
    targetVoice = voices.find(v => v.lang.startsWith(lang().ttsPfx)) || null;
  }
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

function refreshTTSVoice() {
  if (!window.speechSynthesis) return;
  const voices = speechSynthesis.getVoices();
  targetVoice = voices.find(v => v.lang.startsWith(lang().ttsPfx)) || null;
}

function speak(text, onEnd) {
  if (!ttsSupported || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang().ttsLang;
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  if (targetVoice) utterance.voice = targetVoice;
  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }
  setTimeout(() => {
    try { speechSynthesis.speak(utterance); }
    catch (e) { if (onEnd) onEnd(); }
  }, 50);
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screenId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.target === screenId);
  });
  document.getElementById('bottom-nav').style.display = screenId === 'quiz' ? 'none' : 'flex';
}

/* ============================================================
   LANGUAGE SWITCHER
   ============================================================ */
function switchLanguage(key) {
  if (!LANGUAGES[key] || key === currentLangKey) return;
  currentLangKey = key;
  localStorage.setItem(LANG_KEY, key);
  currentTagFilter = null; // reset tag filter on lang change
  refreshTTSVoice();
  renderLanguageSelector();
  updateAppHeader();
  updateBankHeader();
  updateFormLabels();
  document.getElementById('search-input').value = '';
  renderTagFilterBar();
  renderWordList('');
  updateHomeStats();
  renderStats();
  renderModeSelector();
  renderQuizSettings();
  renderGrammarScreen();
  renderPhrasesScreen();
  seedDemoIfEmpty();
}

function renderModeSelector() {
  const container = document.getElementById('mode-selector');
  if (!container) return;
  const modes = [
    { id: GameMode.NORMAL,    label: t('mode_normal'),    icon: '🎯', cls: '' },
    { id: GameMode.REVISION,  label: t('mode_revision'),  icon: '🔴', cls: 'mode-revision' },
    { id: GameMode.SURVIVAL,  label: t('mode_survival'),  icon: '💀', cls: 'mode-danger' },
    { id: GameMode.CHRONO,    label: t('mode_chrono'),    icon: '⏱️', cls: 'mode-chrono' },
    { id: GameMode.FLASHCARD, label: t('mode_flashcard'), icon: '🃏', cls: 'mode-flashcard' },
    { id: GameMode.DICTEE,    label: t('mode_dictee'),    icon: '🎧', cls: 'mode-dictee' },
    { id: GameMode.ANAGRAM,   label: t('mode_anagram'),   icon: '🔀', cls: 'mode-anagram' },
  ];
  container.innerHTML = modes.map(m => `
    <button class="mode-pill ${m.cls}${currentGameMode === m.id ? ' active' : ''}" data-mode="${m.id}">
      <span class="mode-pill-icon">${m.icon}</span>
      <span>${m.label}</span>
    </button>
  `).join('');
  container.querySelectorAll('.mode-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGameMode = parseInt(btn.dataset.mode);
      renderModeSelector();
      renderQuizSettings();
      updateHomeStats();
    });
  });
  // Centre le mode actif dans le carousel
  const active = container.querySelector('.mode-pill.active');
  if (active) {
    const offset = active.offsetLeft - (container.clientWidth - active.offsetWidth) / 2;
    container.scrollLeft = Math.max(0, offset);
  }
  renderModeDesc();
}

// Index matches GameMode: 0=NORMAL, 1=REVISION, 2=SURVIVAL, 3=CHRONO, 4=FLASHCARD, 5=DICTEE, 6=ANAGRAM
function getModeDesc(modeId) { return t('mode_desc_' + modeId); }

function renderModeDesc() {
  const container = document.getElementById('mode-desc');
  if (!container) return;
  const s          = getSettings();
  const isChrono   = currentGameMode === GameMode.CHRONO;
  const isFC       = currentGameMode === GameMode.FLASHCARD;
  const times      = [3, 5, 7, 10, 15, 30];
  const cur        = chronoTime();
  const fcDir      = s.fcDirection || 'mix';
  const fcCount    = s.fcCount !== undefined ? s.fcCount : 0;
  const wordCount  = getWords().length;
  const fcCounts   = [10, 25, 50, 100].filter(n => n < wordCount);

  container.innerHTML = `
    <p class="mode-desc-text">${getModeDesc(currentGameMode)}</p>
    ${isChrono ? `
    <div class="mode-desc-chrono">
      <span class="settings-label">${t('settings_time')}</span>
      <div class="settings-pills">
        ${times.map(n => `<button class="settings-pill${cur === n ? ' active' : ''}" data-chrono="${n}">${n}s</button>`).join('')}
      </div>
    </div>` : ''}
    ${isFC ? `
    <div class="mode-desc-chrono">
      <span class="settings-label">${t('settings_direction')}</span>
      <div class="settings-pills">
        <button class="settings-pill${fcDir === 'mix'          ? ' active' : ''}" data-fcdir="mix">🔀 Mix</button>
        <button class="settings-pill${fcDir === 'native-target'? ' active' : ''}" data-fcdir="native-target">${lang().nativeFlag}→${lang().targetFlag}</button>
        <button class="settings-pill${fcDir === 'target-native'? ' active' : ''}" data-fcdir="target-native">${lang().targetFlag}→${lang().nativeFlag}</button>
      </div>
    </div>
    <div class="mode-desc-chrono">
      <span class="settings-label">${t('settings_cards')}</span>
      <div class="settings-pills">
        ${fcCounts.map(n => `<button class="settings-pill${fcCount === n ? ' active' : ''}" data-fccount="${n}">${n}</button>`).join('')}
        <button class="settings-pill${fcCount === 0 ? ' active' : ''}" data-fccount="0">${t('settings_all')} (${wordCount})</button>
      </div>
    </div>` : ''}
  `;

  container.querySelectorAll('[data-chrono]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = getSettings(); s.chronoTime = parseInt(btn.dataset.chrono); saveSettings(s); renderModeDesc();
    });
  });
  container.querySelectorAll('[data-fcdir]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = getSettings(); s.fcDirection = btn.dataset.fcdir; saveSettings(s); renderModeDesc();
    });
  });
  container.querySelectorAll('[data-fccount]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = getSettings(); s.fcCount = parseInt(btn.dataset.fccount); saveSettings(s); renderModeDesc();
    });
  });
}

function renderLanguageSelector() {
  const container = document.getElementById('lang-modal-grid');
  if (!container) return;
  container.innerHTML = Object.entries(LANGUAGES).map(([key, l]) => {
    let words = 0, grammar = 0, phrases = 0;
    try { const r = localStorage.getItem('words_'   + key); words   = r ? JSON.parse(r).length : 0; } catch(e) {}
    try { const r = localStorage.getItem('grammar_' + key); grammar = r ? JSON.parse(r).length : 0; } catch(e) {}
    try { const r = localStorage.getItem('phrases_' + key); phrases = r ? JSON.parse(r).length : 0; } catch(e) {}
    const parts = [
      pWords(words),
      grammar > 0 ? pCards(grammar) : null,
      phrases > 0 ? pPhrases(phrases) : null,
    ].filter(Boolean).join(' · ');
    return `
      <button class="lang-modal-card${key === currentLangKey ? ' active' : ''}" data-lang="${key}">
        <span class="lang-modal-flag">${l.targetFlag}</span>
        <span class="lang-modal-name">${l.label.split('→')[1].trim()}</span>
        <span class="lang-modal-count">${parts}</span>
      </button>`;
  }).join('');
  container.querySelectorAll('.lang-modal-card').forEach(btn => {
    btn.addEventListener('click', () => { switchLanguage(btn.dataset.lang); closeModal('modal-lang'); });
  });
}

function updateAppHeader() {
  const title = document.getElementById('app-title');
  if (title) title.textContent = lang().title;
  const chipFlag = document.getElementById('lang-chip-flag');
  if (chipFlag) chipFlag.textContent = lang().targetFlag;
}

function updateBankHeader() {
  const el = document.getElementById('bank-lang-label');
  if (el) el.textContent = langLabel();
  const el2 = document.getElementById('stats-lang-label');
  if (el2) el2.textContent = langLabel();
}

function updateFormLabels() {
  const labelNative = document.getElementById('label-native');
  const labelTarget = document.getElementById('label-target');
  const inputTarget = document.getElementById('input-target');
  if (labelNative) labelNative.textContent = `${lang().nativeFlag} ${t('native_lang')}`;
  if (labelTarget) labelTarget.textContent = `${lang().targetFlag} ${langTargetName()}`;
  const placeholders = { 'fr-it': 'il gatto', 'fr-en': 'the cat', 'fr-es': 'el gato', 'fr-pt': 'o gato', 'fr-jp': 'ねこ' };
  if (inputTarget) inputTarget.placeholder = `ex: ${placeholders[currentLangKey] || '...'}`;
}

/* ============================================================
   QUIZ SETTINGS UI
   ============================================================ */
function renderQuizSettings() {
  const container = document.getElementById('quiz-settings');
  if (!container) return;
  if (currentGameMode === GameMode.FLASHCARD || currentGameMode === GameMode.SURVIVAL) { container.innerHTML = ''; container.style.display = 'none'; return; }
  container.style.display = '';
  const s = getSettings();
  const qSizes = [5, 8, 10, 15, 20, 25, 30];
  const mSizes = [3, 4, 5, 6, 7, 8];
  const hidePairs = currentGameMode === GameMode.ANAGRAM || currentGameMode === GameMode.DICTEE;
  const allTags = getAllTags();
  const tagRow = allTags.length > 0 ? `
    <div class="settings-row">
      <span class="settings-label">${t('settings_filter_tag')}</span>
      <div class="settings-pills">
        <button class="settings-pill${currentTagFilter === null ? ' active' : ''}" data-tag-filter="">${t('settings_all')}</button>
        ${allTags.map(tag => `<button class="settings-pill${currentTagFilter === tag ? ' active' : ''}" data-tag-filter="${escHtml(tag)}">#${escHtml(tag)}</button>`).join('')}
      </div>
    </div>` : '';

  container.innerHTML = `
    <div class="settings-row">
      <span class="settings-label">${t('settings_questions')}</span>
      <div class="settings-pills">
        ${qSizes.map(n => `<button class="settings-pill${s.quizSize === n ? ' active' : ''}" data-setting="quizSize" data-value="${n}">${n}</button>`).join('')}
      </div>
    </div>
    ${hidePairs ? '' : `
    <div class="settings-row">
      <span class="settings-label">${t('settings_pairs')}</span>
      <div class="settings-pills">
        ${mSizes.map(n => `<button class="settings-pill${s.matchSize === n ? ' active' : ''}${n > s.quizSize ? ' disabled' : ''}" data-setting="matchSize" data-value="${n}" ${n > s.quizSize ? 'disabled' : ''}>${n}</button>`).join('')}
      </div>
    </div>`}
    ${tagRow}
  `;
  container.querySelectorAll('.settings-pill[data-setting]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = getSettings();
      s[btn.dataset.setting] = parseInt(btn.dataset.value);
      if (s.matchSize > s.quizSize) s.matchSize = s.quizSize;
      saveSettings(s);
      renderQuizSettings();
      updateHomeStats();
    });
  });
  container.querySelectorAll('[data-tag-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTagFilter = btn.dataset.tagFilter === '' ? null : btn.dataset.tagFilter;
      renderTagFilterBar();
      renderQuizSettings();
      updateHomeStats();
    });
  });

  const tipEl = document.getElementById('tip-quiz-size');
  if (tipEl) {
    const qs = s.quizSize;
    const ms = Math.min(s.matchSize, s.quizSize);
    tipEl.textContent = `Lancez un quiz de ${qs} question${qs > 1 ? 's' : ''} (${ms} paires par exercice d'association)`;
  }
}

/* ============================================================
   HOME SCREEN
   ============================================================ */
function updateHomeStats() {
  const allWords = getWords();
  const words = currentTagFilter ? allWords.filter(w => (w.tags || []).includes(currentTagFilter)) : allWords;
  const count = words.length;
  const min = currentGameMode === GameMode.FLASHCARD ? 1 : quizSize();
  const countEl = document.getElementById('word-count');
  const chipCount = document.getElementById('lang-chip-count');
  if (chipCount) chipCount.textContent = allWords.length; // always total, not filtered
  const startBtn = document.getElementById('btn-start-quiz');
  const hintEl = document.getElementById('quiz-hint');
  if (countEl) countEl.textContent = count;
  if (startBtn) {
    startBtn.disabled = count < min;
    if (hintEl) {
      if (count < min) {
        hintEl.classList.remove('hidden');
        const remaining = min - count;
        hintEl.innerHTML = uiLang === 'en'
          ? `Add <strong>${remaining} more word${remaining !== 1 ? 's' : ''}</strong> to start a quiz.`
          : `Ajoutez encore <strong>${remaining} mot${remaining > 1 ? 's' : ''}</strong> pour commencer un quiz.`;
      } else {
        hintEl.classList.add('hidden');
      }
    }
  }
}

/* ============================================================
   BANK SCREEN — WORD LIST
   ============================================================ */
function renderTagFilterBar() {
  const bar = document.getElementById('tag-filter-bar');
  if (!bar) return;
  const tags = getAllTags();
  if (tags.length === 0) { bar.innerHTML = ''; bar.classList.add('hidden'); return; }
  bar.classList.remove('hidden');
  bar.innerHTML = [null, ...tags].map(tag =>
    `<button class="word-tag-chip${currentTagFilter === tag ? ' active' : ''}" data-tag="${tag === null ? '' : escHtml(tag)}">${tag === null ? t('settings_all') : '#' + escHtml(tag)}</button>`
  ).join('');
  bar.querySelectorAll('.word-tag-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.tag;
      currentTagFilter = v === '' ? null : v;
      renderTagFilterBar();
      renderWordList(document.getElementById('search-input').value);
      renderQuizSettings();
      updateHomeStats();
    });
  });
}

function renderWordList(filter) {
  filter = (filter || '').toLowerCase().trim();
  const words = getWords();
  const list = document.getElementById('word-list');
  const emptyEl = document.getElementById('word-list-empty');
  if (!list) return;

  // Apply tag filter first, then text search
  let filtered = currentTagFilter
    ? words.filter(w => (w.tags || []).includes(currentTagFilter))
    : words;
  if (filter) {
    filtered = filtered.filter(w =>
      w.native.toLowerCase().includes(filter) ||
      w.target.toLowerCase().includes(filter) ||
      (w.tags || []).some(t => t.includes(filter) || ('#' + t).includes(filter))
    );
  }

  if (filtered.length === 0) {
    list.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  list.innerHTML = filtered.map(word => {
    const tagsHtml = (word.tags || []).length > 0
      ? `<div class="word-tags">${(word.tags || []).map(t => `<span class="word-tag-chip sm">#${escHtml(t)}</span>`).join('')}</div>`
      : '';
    return `
    <li class="word-item" data-id="${escHtml(word.id)}">
      <div class="word-texts">
        <div class="word-native">${escHtml(word.native)}</div>
        <div class="word-target">${lang().targetFlag} ${escHtml(word.target)}</div>
        ${tagsHtml}
      </div>
      ${getMasteryBadge(word)}
      <div class="word-actions">
        <button class="btn-icon-sm edit" data-action="edit" data-id="${escHtml(word.id)}" title="Modifier">✏️</button>
        <button class="btn-icon-sm delete" data-action="delete" data-id="${escHtml(word.id)}" title="Supprimer">🗑️</button>
      </div>
    </li>`;
  }).join('');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getMasteryBadge(word) {
  const seen   = word.seen_count  || 0;
  const errors = word.error_count || 0;
  let cls, title;
  if (seen === 0)                                  { cls = 'never';    title = t('mastery_never'); }
  else if (seen >= 3 && errors / seen <= 0.25)     { cls = 'mastered'; title = t('mastery_mastered'); }
  else if (errors / seen > 0.5)                    { cls = 'review';   title = t('mastery_review'); }
  else                                             { cls = 'learning'; title = t('mastery_learning'); }
  return `<span class="word-mastery word-mastery-${cls}" title="${title}"></span>`;
}

/* ============================================================
   MODALS
   ============================================================ */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

function openAddWordModal() {
  document.getElementById('modal-word-title').textContent = t('modal_add_word');
  document.getElementById('edit-word-id').value = '';
  document.getElementById('input-native').value = '';
  document.getElementById('input-target').value = '';
  document.getElementById('input-tags').value   = '';
  document.getElementById('form-error').classList.add('hidden');
  updateFormLabels();
  openModal('modal-add-word');
  setTimeout(() => document.getElementById('input-native').focus(), 150);
}

function openEditWordModal(id) {
  const word = getWords().find(w => w.id === id);
  if (!word) return;
  document.getElementById('modal-word-title').textContent = t('modal_edit_word');
  document.getElementById('edit-word-id').value = word.id;
  document.getElementById('input-native').value = word.native;
  document.getElementById('input-target').value = word.target;
  document.getElementById('input-tags').value   = (word.tags || []).map(t => '#' + t).join(', ');
  document.getElementById('form-error').classList.add('hidden');
  updateFormLabels();
  openModal('modal-add-word');
  setTimeout(() => document.getElementById('input-native').focus(), 150);
}

/* ============================================================
   EXPORT
   ============================================================ */
/* ============================================================
   BACKUP TRACKING
   ============================================================ */
const BACKUP_KEY = 'app_backup';

function getBackupInfo() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? JSON.parse(raw) : { wordCount: 0, sessions: 0 };
  } catch(e) { return { wordCount: 0, sessions: 0 }; }
}

function markBackup() {
  const info = { wordCount: getWords().length, sessions: 0 };
  localStorage.setItem(BACKUP_KEY, JSON.stringify(info));
  updateBackupBadge();
}

function incrementSession() {
  const info = getBackupInfo();
  info.sessions = (info.sessions || 0) + 1;
  localStorage.setItem(BACKUP_KEY, JSON.stringify(info));
  updateBackupBadge();
}

function needsBackup() {
  const info = getBackupInfo();
  const currentCount = getWords().length;
  const newWords = currentCount - (info.wordCount || 0);
  return newWords >= 5 || (info.sessions || 0) >= 3;
}

function updateBackupBadge() {
  const needs = needsBackup();
  const badge = document.getElementById('backup-badge');
  if (badge) badge.classList.toggle('hidden', !needs);
  const bar = document.getElementById('home-backup-bar');
  if (bar) bar.classList.toggle('hidden', !needs);
}

/* ============================================================
   EXPORT / SHARE
   ============================================================ */
function buildExportData() {
  const words = getWords();
  if (words.length === 0) { alert(t('alert_bank_empty')); return null; }
  return words.map(({ native, target, tags }) => {
    const obj = { native, target };
    if (tags && tags.length > 0) obj.tags = tags;
    return obj;
  });
}

function downloadJson(json, filename) {
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function exportWords() {
  const data = buildExportData();
  if (!data) return;
  downloadJson(JSON.stringify(data, null, 2), lang().filename);
  markBackup();
}

function exportGrammarCards() {
  const cards = getGrammarCards();
  if (cards.length === 0) { alert(t('alert_no_grammar_export')); return; }
  downloadJson(JSON.stringify(cards, null, 2), 'grammar_' + currentLangKey + '.json');
}

async function shareGrammarCards() {
  const cards = getGrammarCards();
  if (cards.length === 0) { alert(t('alert_no_grammar_share')); return; }
  const json = JSON.stringify(cards, null, 2);
  const filename = 'grammar_' + currentLangKey + '.txt';
  if (navigator.share) {
    const file = new File([json], filename, { type: 'text/plain' });
    const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });
    try {
      if (canShareFile) {
        await navigator.share({ files: [file], title: t('grammar_title') + ' — ' + lang().title });
      } else {
        await navigator.share({ title: t('grammar_title') + ' — ' + lang().title, text: json });
      }
    } catch(e) {
      if (e.name !== 'AbortError') exportGrammarCards();
    }
  } else {
    exportGrammarCards();
  }
}

async function shareWords() {
  const data = buildExportData();
  if (!data) return;
  const json = JSON.stringify(data, null, 2);

  if (navigator.share) {
    // Use text/plain — widely supported on Android Chrome (application/json often blocked)
    const txtFilename = lang().filename.replace('.json', '.txt');
    const file = new File([json], txtFilename, { type: 'text/plain' });
    const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });
    try {
      if (canShareFile) {
        await navigator.share({ files: [file], title: t('bank_title') + ' — ' + lang().title });
      } else {
        await navigator.share({ title: t('bank_title') + ' — ' + lang().title, text: json });
      }
      markBackup();
    } catch(e) {
      if (e.name !== 'AbortError') exportWords();
    }
  } else {
    exportWords();
  }
}

/* ============================================================
   IMPORT
   ============================================================ */
let pendingImportData = null;
let importContext = 'words'; // 'words' | 'grammar' | 'phrases'

function _openImportModal(file, count, noun, text, mergeDesc, replaceDesc, context, title) {
  const titleEl = document.getElementById('import-modal-title');
  if (titleEl) titleEl.textContent = title || 'Importer des mots';
  document.getElementById('import-filename').textContent = '📄 ' + file.name;
  document.getElementById('import-count').textContent = `${count} ${noun}`;
  document.getElementById('import-modal-text').textContent = text;
  document.getElementById('import-merge-desc').textContent   = mergeDesc;
  document.getElementById('import-replace-desc').textContent = replaceDesc;
  importContext = context;
  openModal('modal-import');
}

function handleImportFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    let data;
    try { data = JSON.parse(e.target.result); }
    catch (err) { alert(t('alert_invalid_json')); return; }

    if (!Array.isArray(data)) { alert(t('alert_invalid_array')); return; }

    const valid = data.filter(item =>
      item && typeof item === 'object' &&
      (typeof item.native === 'string' || typeof item.fr === 'string') &&
      (typeof item.target === 'string' || typeof item.it === 'string')
    ).map(item => ({
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      native: (item.native || item.fr || '').trim(),
      target: (item.target || item.it || '').trim(),
      tags: Array.isArray(item.tags) ? item.tags.map(t => String(t).trim().toLowerCase()).filter(Boolean) : [],
      created_at: new Date().toISOString(),
      last_seen: null
    })).filter(w => w.native && w.target);

    if (valid.length === 0) { alert(t('alert_no_valid_words')); return; }
    pendingImportData = valid;
    const n = valid.length;
    _openImportModal(file,
      pWords(n),
      '',
      t('import_how_words'),
      t('merge_words_desc'),
      t('replace_words_desc'),
      'words',
      t('modal_import_words'));
  };
  reader.readAsText(file);
}

function handleGrammarImportFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    let data;
    try { data = JSON.parse(e.target.result); }
    catch { alert(t('alert_invalid_json')); return; }
    if (!Array.isArray(data)) { alert(t('alert_invalid_format')); return; }
    const valid = data.filter(c => c && typeof c.lesson === 'string' && typeof c.question === 'string' && typeof c.answer === 'string');
    if (valid.length === 0) { alert(t('alert_no_valid_grammar')); return; }
    pendingImportData = valid;
    const n = valid.length;
    _openImportModal(file,
      pCards(n),
      '',
      t('import_how_grammar'),
      t('merge_grammar_desc'),
      t('replace_grammar_desc'),
      'grammar',
      t('modal_import_grammar'));
  };
  reader.readAsText(file);
}

function mergeImport() {
  if (!pendingImportData) return;
  closeModal('modal-import');
  if (importContext === 'grammar') {
    const existing = getGrammarCards();
    const toAdd = pendingImportData
      .filter(c => !existing.some(e => e.lesson === c.lesson && e.question === c.question))
      .map(c => ({ ...c,
        id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
        last_known: null, seen_count: c.seen_count || 0, error_count: c.error_count || 0 }));
    saveGrammarCards([...existing, ...toAdd]);
    pendingImportData = null;
    renderGrammarScreen();
    const n = toAdd.length;
    alert(n === 0 ? t('merge_all_existed_grammar') : (uiLang === 'en' ? `${n} new card${n !== 1 ? 's' : ''} added.` : `${n} nouvelle${n > 1 ? 's' : ''} fiche${n > 1 ? 's' : ''} ajoutée${n > 1 ? 's' : ''}.`));
  } else if (importContext === 'phrases') {
    const existing = getPhrases();
    const toAdd = pendingImportData
      .filter(p => !existing.some(e => e.native.toLowerCase() === p.native.toLowerCase() && e.target.toLowerCase() === p.target.toLowerCase()))
      .map(p => ({ ...p,
        id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
        last_known: null, seen_count: 0, topic: p.topic || '' }));
    savePhrases([...existing, ...toAdd]);
    pendingImportData = null;
    renderPhrasesScreen();
    const n = toAdd.length;
    alert(n === 0 ? t('merge_all_existed_phrases') : (uiLang === 'en' ? `${n} new phrase${n !== 1 ? 's' : ''} added.` : `${n} nouvelle${n > 1 ? 's' : ''} phrase${n > 1 ? 's' : ''} ajoutée${n > 1 ? 's' : ''}.`));
  } else {
    const existing = getWords();
    const toAdd = pendingImportData.filter(newWord =>
      !existing.some(e =>
        e.native.toLowerCase() === newWord.native.toLowerCase() &&
        e.target.toLowerCase() === newWord.target.toLowerCase()
      )
    );
    saveWords([...toAdd, ...existing]);
    pendingImportData = null;
    renderTagFilterBar();
    renderWordList(document.getElementById('search-input').value);
    updateHomeStats();
    const n = toAdd.length;
    const msg = n === 0
      ? t('merge_all_existed_words')
      : (uiLang === 'en' ? `${n} new word${n !== 1 ? 's' : ''} added.` : `${n} nouveau${n > 1 ? 'x' : ''} mot${n > 1 ? 's' : ''} ajouté${n > 1 ? 's' : ''}.`);
    alert(msg);
  }
}

function replaceImport() {
  if (!pendingImportData) return;
  closeModal('modal-import');
  if (importContext === 'grammar') {
    if (!confirm(uiLang === 'en' ? `Replace ALL your existing cards with the ${pendingImportData.length} imported cards?` : `Remplacer TOUTES vos fiches existantes par les ${pendingImportData.length} fiches importées ?`)) return;
    const newCards = pendingImportData.map(c => ({ ...c,
      id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
      last_known: null, seen_count: c.seen_count || 0, error_count: c.error_count || 0 }));
    saveGrammarCards(newCards);
    pendingImportData = null;
    renderGrammarScreen();
  } else if (importContext === 'phrases') {
    if (!confirm(uiLang === 'en' ? `Replace ALL your existing phrases with the ${pendingImportData.length} imported phrases?` : `Remplacer TOUTES vos phrases existantes par les ${pendingImportData.length} phrases importées ?`)) return;
    const newPhrases = pendingImportData.map(p => ({ ...p,
      id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
      last_known: null, seen_count: 0, topic: p.topic || '' }));
    savePhrases(newPhrases);
    pendingImportData = null;
    renderPhrasesScreen();
  } else {
    if (!confirm(uiLang === 'en' ? `Replace ALL your existing words with the ${pendingImportData.length} imported words?` : `Remplacer TOUS vos mots existants par les ${pendingImportData.length} mots importés ?`)) return;
    saveWords(pendingImportData);
    pendingImportData = null;
    renderTagFilterBar();
    renderWordList(document.getElementById('search-input').value);
    updateHomeStats();
  }
}

/* ============================================================
   UTILITY
   ============================================================ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) { return shuffle(arr).slice(0, n); }

/* ============================================================
   QUIZ ENGINE
   ============================================================ */
/* ============================================================
   SETTINGS
   ============================================================ */
const SETTINGS_KEY = 'app_settings';
function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { quizSize: 8, matchSize: 5, ...JSON.parse(raw) };
  } catch(e) {}
  return { quizSize: 8, matchSize: 5 };
}
function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch(e) {}
}
function quizSize()   { return getSettings().quizSize; }
function matchSize()  { return Math.min(getSettings().matchSize, quizSize()); }
function chronoTime() { return getSettings().chronoTime || 30; }

const QuizType  = { TEXT_MATCH: 0, AUDIO_MATCH: 1, MCQ_TRANSLATE: 2, MCQ_LISTEN: 3, FREE_INPUT: 4, DICTEE: 5, ANAGRAM: 6 };
const GameMode  = { NORMAL: 0, REVISION: 1, SURVIVAL: 2, CHRONO: 3, FLASHCARD: 4, DICTEE: 5, ANAGRAM: 6 };
let currentGameMode = GameMode.NORMAL;

function getSRSSessionWords(pool, n) {
  const today = todayStr();
  const due    = pool.filter(w => !w.srs_next_review || w.srs_next_review <= today);
  const notDue = pool.filter(w =>  w.srs_next_review && w.srs_next_review >  today);
  due.sort((a, b) => (a.srs_next_review || '') < (b.srs_next_review || '') ? -1 : 1);
  return [...due, ...shuffle(notDue)].slice(0, n);
}

function getRevisionPool(allWords) {
  return allWords.filter(w => (w.seen_count || 0) > 0 && (w.error_count || 0) / w.seen_count > 0.3);
}

let quizState = null;
let grammarReviewState = null;
let phraseReviewState  = null;
let quitTarget = 'home'; // 'home' | 'grammar' | 'phrases'
let chronoTimer = null;

function buildQuiz() {
  const rawWords = getWords();
  const allWords = currentTagFilter ? rawWords.filter(w => (w.tags || []).includes(currentTagFilter)) : rawWords;
  const QS = quizSize();
  const MS = matchSize();

  // --- word pool ---
  let pool;
  if (currentGameMode === GameMode.REVISION) {
    pool = getRevisionPool(allWords);
    if (pool.length < QS) pool = allWords; // fallback
  } else {
    pool = allWords;
  }
  if (pool.length < QS) return null;

  // --- session words ---
  const isSurvival = currentGameMode === GameMode.SURVIVAL;
  let sessionWords;
  if (currentGameMode === GameMode.NORMAL) {
    sessionWords = getSRSSessionWords(pool, QS);
  } else if (currentGameMode === GameMode.REVISION) {
    sessionWords = [...pool].sort((a, b) =>
      (b.error_count / Math.max(b.seen_count, 1)) - (a.error_count / Math.max(a.seen_count, 1))
    ).slice(0, QS);
  } else if (isSurvival || currentGameMode === GameMode.ANAGRAM) {
    sessionWords = shuffle([...pool]); // tous les mots, mélangés
  } else {
    sessionWords = pickRandom(pool, QS);
  }

  // --- question count ---
  const numQ = isSurvival ? 9999 : QS;

  // --- type pool ---
  let typeOptions;
  if (currentGameMode === GameMode.DICTEE) {
    typeOptions = [QuizType.DICTEE];
  } else if (currentGameMode === GameMode.ANAGRAM) {
    typeOptions = [QuizType.ANAGRAM];
  } else {
    const baseMCQ   = ttsSupported ? [QuizType.MCQ_TRANSLATE, QuizType.MCQ_LISTEN] : [QuizType.MCQ_TRANSLATE];
    const baseMatch = ttsSupported ? [QuizType.TEXT_MATCH, QuizType.AUDIO_MATCH]   : [QuizType.TEXT_MATCH];
    const isFastChrono = currentGameMode === GameMode.CHRONO && chronoTime() <= 5;
    if (isFastChrono) {
      typeOptions = baseMCQ;
    } else if (currentGameMode === GameMode.CHRONO || isSurvival) {
      typeOptions = [...baseMCQ, QuizType.FREE_INPUT];
    } else {
      typeOptions = [...baseMCQ, ...baseMatch, QuizType.FREE_INPUT];
    }
  }

  const shuffledOpts = shuffle([...typeOptions]);
  const typePool = [];
  for (let i = 0; i < numQ; i++) typePool.push(shuffledOpts[i % shuffledOpts.length]);

  // --- rotating word queue (évite les répétitions entre exercices) ---
  const wordQueue = shuffle([...sessionWords]);
  let wIdx = 0;
  function nextWord() {
    const w = wordQueue[wIdx % wordQueue.length];
    wIdx++;
    return w;
  }
  function nextMatchWords(n) {
    const start = wIdx % wordQueue.length;
    const words = Array.from({ length: n }, (_, k) => wordQueue[(start + k) % wordQueue.length]);
    wIdx += n;
    return words;
  }

  // --- build questions ---
  const questions = [];
  for (let i = 0; i < numQ; i++) {
    const type = typePool[i];
    let q;
    if (type === QuizType.TEXT_MATCH || type === QuizType.AUDIO_MATCH) {
      const words = isSurvival ? pickRandom(sessionWords, MS) : nextMatchWords(MS);
      q = { type, words };
    } else if (type === QuizType.FREE_INPUT || type === QuizType.DICTEE || type === QuizType.ANAGRAM) {
      let questionWord = isSurvival
        ? sessionWords[Math.floor(Math.random() * sessionWords.length)]
        : nextWord();
      if (type === QuizType.ANAGRAM) {
        const anagramPool = sessionWords.filter(w => Array.from(w.target).filter(c => c !== ' ').length >= 3);
        if (anagramPool.length > 0) {
          questionWord = anagramPool[Math.floor(Math.random() * anagramPool.length)];
        }
      }
      q = { type, word: questionWord };
    } else {
      const questionWord = isSurvival
        ? sessionWords[Math.floor(Math.random() * sessionWords.length)]
        : nextWord();
      const needed = MS - 1;
      const distractorPool = allWords.filter(w => w.id !== questionWord.id);
      const distractors = pickRandom(distractorPool, needed);
      while (distractors.length < needed) {
        const pad = sessionWords.find(w => w.id !== questionWord.id && !distractors.some(d => d.id === w.id));
        if (pad) distractors.push(pad); else break;
      }
      q = { type, word: questionWord, distractors };
    }
    questions.push(q);
  }
  return { questions, currentIndex: 0, score: 0, sessionWords, totalQuestions: numQ, isSurvival };
}

function startQuiz() {
  if (currentGameMode === GameMode.FLASHCARD) { startFlashcard(); return; }
  if (currentGameMode === GameMode.DICTEE && !ttsSupported) {
    alert(t('alert_dictee_no_tts'));
    return;
  }
  const state = buildQuiz();
  if (!state) {
    if (currentGameMode === GameMode.REVISION) {
      alert(t('alert_revision_no_words'));
    } else {
      alert(uiLang === 'en' ? `You need at least ${quizSize()} words to start a quiz.` : `Vous avez besoin d'au moins ${quizSize()} mots pour commencer un quiz.`);
    }
    return;
  }
  quizState = state;
  showScreen('quiz');
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  if (!quizState) return;
  stopChronoTimer();
  const { questions, currentIndex } = quizState;
  const q = questions[currentIndex];
  const total = quizState.totalQuestions;

  if (quizState.isSurvival) {
    document.getElementById('quiz-progress-bar').style.width = '0%';
    document.getElementById('quiz-counter').textContent = `💀 ${quizState.score}`;
  } else {
    const progress = (currentIndex / total) * 100;
    document.getElementById('quiz-progress-bar').style.width = progress + '%';
    document.getElementById('quiz-counter').textContent = `Q ${currentIndex + 1} / ${total}`;
  }

  const content = document.getElementById('quiz-content');
  content.innerHTML = '';
  if (quizState.isFlashcard) { renderFlashcard(); return; }
  switch (q.type) {
    case QuizType.TEXT_MATCH:    renderTextMatch(q, content);    break;
    case QuizType.AUDIO_MATCH:   renderAudioMatch(q, content);   break;
    case QuizType.MCQ_TRANSLATE: renderMCQTranslate(q, content); break;
    case QuizType.MCQ_LISTEN:    renderMCQListen(q, content);    break;
    case QuizType.FREE_INPUT:    renderFreeInput(q, content);    break;
    case QuizType.DICTEE:        renderDictee(q, content);       break;
    case QuizType.ANAGRAM:       renderAnagram(q, content);      break;
  }
  if (currentGameMode === GameMode.CHRONO) startChronoTimer(content);
}

/* ---- TEXT MATCH ---- */
function renderTextMatch(q, container) {
  const words = q.words;
  const shuffledTarget = shuffle(words.map(w => ({ id: w.id, text: w.target })));
  const shuffledNative = shuffle(words.map(w => ({ id: w.id, text: w.native })));

  container.innerHTML = `
    <div class="quiz-type-label">${t('quiz_text_match')}</div>
    <p class="match-instruction">${t('quiz_match_instr')}</p>
    <div class="match-grid" id="match-grid">
      ${shuffledNative.map((n, i) => `
        <div class="match-card" data-id="${escHtml(n.id)}" data-side="left">${escHtml(n.text)}</div>
        <div class="match-card" data-id="${escHtml(shuffledTarget[i].id)}" data-side="right">${escHtml(shuffledTarget[i].text)}</div>
      `).join('')}
    </div>
  `;
  initMatchGame(container, words, false);
}

/* ---- AUDIO MATCH ---- */
function renderAudioMatch(q, container) {
  const words = q.words;
  const shuffledNative = shuffle(words.map(w => ({ id: w.id, text: w.native })));
  const shuffledAudio  = shuffle(words.map(w => ({ id: w.id, tts: w.target })));

  container.innerHTML = `
    <div class="quiz-type-label">${t('quiz_audio_match')}</div>
    <p class="match-instruction">${t('quiz_audio_instr')}</p>
    <div class="match-grid" id="match-grid">
      ${shuffledAudio.map((audio, i) => `
        <div class="match-card audio-card" data-id="${escHtml(audio.id)}" data-it="${escHtml(audio.tts)}" data-side="left">🔊</div>
        <div class="match-card" data-id="${escHtml(shuffledNative[i].id)}" data-side="right">${escHtml(shuffledNative[i].text)}</div>
      `).join('')}
    </div>
  `;
  initMatchGame(container, words, true);
}

/* ---- MATCH GAME LOGIC ---- */
function initMatchGame(container, words, isAudio) {
  let selectedLeft = null;
  let selectedRight = null;
  let matchedCount = 0;
  let isLocked = false;
  const wordErrors = {}; // wordId -> error count during this match

  function handleCardClick(card) {
    if (isLocked) return;
    if (card.classList.contains('matched')) return;

    const side = card.dataset.side;

    if (side === 'left') {
      if (selectedLeft === card) {
        card.classList.remove('selected');
        selectedLeft = null;
        return;
      }
      if (selectedLeft) selectedLeft.classList.remove('selected');
      selectedLeft = card;
      card.classList.add('selected');
      if (isAudio && card.dataset.it) speak(card.dataset.it);
    } else {
      if (selectedRight === card) {
        card.classList.remove('selected');
        selectedRight = null;
        return;
      }
      if (selectedRight) selectedRight.classList.remove('selected');
      selectedRight = card;
      card.classList.add('selected');
    }

    if (selectedLeft && selectedRight) {
      isLocked = true;
      if (selectedLeft.dataset.id === selectedRight.dataset.id) {
        selectedLeft.classList.remove('selected');
        selectedRight.classList.remove('selected');
        selectedLeft.classList.add('matched');
        selectedRight.classList.add('matched');
        matchedCount++;
        selectedLeft = null;
        selectedRight = null;
        isLocked = false;
        if (matchedCount === words.length) {
          // Batch record stats for all words in this match
          const allWords = getWords();
          words.forEach(w => {
            const stored = allWords.find(sw => sw.id === w.id);
            if (stored) {
              const hadError = (wordErrors[w.id] || 0) > 0;
              stored.seen_count  = (stored.seen_count  || 0) + 1;
              stored.error_count = (stored.error_count || 0) + (hadError ? 1 : 0);
              updateWordSRS(stored, !hadError);
              if (hadError && quizState && !quizState.isFlashcard) {
                if (!quizState.failedWordIds) quizState.failedWordIds = [];
                if (!quizState.failedWordIds.includes(w.id)) quizState.failedWordIds.push(w.id);
              }
            }
          });
          saveWords(allWords);
          quizState.score++;
          setTimeout(() => advanceQuiz(true), 400);
        }
      } else {
        wordErrors[selectedLeft.dataset.id] = (wordErrors[selectedLeft.dataset.id] || 0) + 1;
        selectedLeft.classList.add('incorrect');
        selectedRight.classList.add('incorrect');
        setTimeout(() => {
          if (selectedLeft) selectedLeft.classList.remove('selected', 'incorrect');
          if (selectedRight) selectedRight.classList.remove('selected', 'incorrect');
          selectedLeft = null;
          selectedRight = null;
          isLocked = false;
        }, 600);
      }
    }
  }

  container.querySelectorAll('.match-card').forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
  });
}

/* ---- MCQ_TRANSLATE ---- */
function renderMCQTranslate(q, container) {
  const { word, distractors } = q;
  const options = shuffle([word, ...distractors]);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  container.innerHTML = `
    <div class="quiz-type-label">${uiLang === 'en' ? 'Translation' : 'Traduction'} — FR → ${lang().targetFlag}</div>
    <div class="mcq-question">
      <div class="mcq-word">${escHtml(word.native)}</div>
    </div>
    <div class="mcq-options">
      ${options.map((opt, i) => `
        <button class="mcq-option" data-correct="${opt.id === word.id}" data-id="${escHtml(opt.id)}">
          <span class="mcq-option-letter">${letters[i]}</span>
          <span class="mcq-option-text">${escHtml(opt.target)}</span>
        </button>
      `).join('')}
    </div>
  `;
  attachMCQListeners(container, word.id);
}

/* ---- MCQ_LISTEN ---- */
function renderMCQListen(q, container) {
  const { word, distractors } = q;
  const options = shuffle([word, ...distractors]);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  container.innerHTML = `
    <div class="quiz-type-label">${uiLang === 'en' ? 'Listen &amp; Translate' : 'Écoute &amp; Traduction'} — ${lang().targetFlag} → FR</div>
    <div class="audio-btn-wrapper">
      <button class="btn-audio" id="btn-play-audio" title="Écouter">🔊</button>
    </div>
    <p class="match-instruction">${t('quiz_listen_instr')}</p>
    <div class="mcq-options">
      ${options.map((opt, i) => `
        <button class="mcq-option" data-correct="${opt.id === word.id}" data-id="${escHtml(opt.id)}">
          <span class="mcq-option-letter">${letters[i]}</span>
          <span class="mcq-option-text">${escHtml(opt.native)}</span>
        </button>
      `).join('')}
    </div>
  `;

  const audioBtn = container.querySelector('#btn-play-audio');
  function playAudio() {
    audioBtn.classList.add('speaking');
    speak(word.target, () => audioBtn.classList.remove('speaking'));
  }
  audioBtn.addEventListener('click', playAudio);
  setTimeout(playAudio, 300);

  attachMCQListeners(container, word.id);
}

/* ---- FREE INPUT ---- */
function renderFreeInput(q, container) {
  const { word } = q;
  container.innerHTML = `
    <div class="quiz-type-label">${uiLang === 'en' ? 'Free input' : 'Saisie libre'} — FR → ${lang().targetFlag}</div>
    <div class="mcq-question">
      <div class="mcq-word">${escHtml(word.native)}</div>
    </div>
    <div class="free-input-area">
      <input type="text" id="free-input" class="free-input-field"
        placeholder="${t('quiz_free_placeholder')}"
        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
      <button id="free-input-submit" class="btn btn-primary btn-full">${t('btn_validate')}</button>
      <div id="free-input-hint" class="free-input-hint hidden"></div>
    </div>
  `;
  const input  = container.querySelector('#free-input');
  const submit = container.querySelector('#free-input-submit');
  const hint   = container.querySelector('#free-input-hint');
  let answered = false;

  function evaluate() {
    if (answered) return;
    answered = true;
    stopChronoTimer();
    submit.disabled = true;
    input.disabled  = true;
    const isCorrect = isCloseEnough(input.value, word.target);
    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
      hint.textContent = `✓ ${word.target}`;
      hint.classList.remove('hidden');
    }
    recordAnswer(word.id, isCorrect);
    if (isCorrect) quizState.score++;
    setTimeout(() => advanceQuiz(isCorrect), 1300);
  }

  submit.addEventListener('click', evaluate);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') evaluate(); });
  setTimeout(() => input.focus(), 100);
}

/* ---- DICTEE ---- */
function renderDictee(q, container) {
  const { word } = q;
  container.innerHTML = `
    <div class="quiz-type-label">${uiLang === 'en' ? 'Dictation' : 'Dictée'} — ${uiLang === 'en' ? 'Listen &amp; Write in' : 'Écoutez &amp; Écrivez en'} ${lang().targetFlag}</div>
    <div class="audio-btn-wrapper">
      <button class="btn-audio" id="btn-play-dictee" title="Écouter">🔊</button>
    </div>
    <p class="match-instruction">${t('quiz_dictee_instr')}</p>
    <div class="free-input-area">
      <input type="text" id="dictee-input" class="free-input-field"
        placeholder="${t('quiz_dictee_placeholder')}"
        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
      <button id="dictee-submit" class="btn btn-primary btn-full">${t('btn_validate')}</button>
      <div id="dictee-hint" class="free-input-hint hidden"></div>
    </div>
  `;
  const audioBtn = container.querySelector('#btn-play-dictee');
  const input    = container.querySelector('#dictee-input');
  const submit   = container.querySelector('#dictee-submit');
  const hint     = container.querySelector('#dictee-hint');
  let answered   = false;

  function playAudio() {
    audioBtn.classList.add('speaking');
    speak(word.target, () => audioBtn.classList.remove('speaking'));
  }
  function evaluate() {
    if (answered) return;
    answered = true;
    stopChronoTimer();
    submit.disabled = true;
    input.disabled  = true;
    const isCorrect = isCloseEnough(input.value, word.target);
    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
      hint.textContent = `✓ ${word.target}`;
      hint.classList.remove('hidden');
    }
    recordAnswer(word.id, isCorrect);
    if (isCorrect) quizState.score++;
    setTimeout(() => advanceQuiz(isCorrect), 1300);
  }
  audioBtn.addEventListener('click', playAudio);
  submit.addEventListener('click', evaluate);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') evaluate(); });
  setTimeout(playAudio, 300);
  setTimeout(() => input.focus(), 700);
}

/* ---- ANAGRAM ---- */
function renderAnagram(q, container) {
  const { word } = q;
  const chars = Array.from(word.target);
  // Fallback to free input for very short words
  if (chars.filter(c => c !== ' ').length < 3) {
    renderFreeInput(q, container);
    return;
  }

  // Separate letters from spaces
  const letterChars = chars.filter(c => c !== ' ');

  // Shuffle only letters, ensure result differs from original
  let shuffled = shuffle([...letterChars]);
  for (let attempt = 0; shuffled.join('') === letterChars.join('') && attempt < 20; attempt++) {
    shuffled = shuffle([...letterChars]);
  }

  container.innerHTML = `
    <div class="quiz-type-label">${uiLang === 'en' ? 'Anagram' : 'Anagramme'} — FR → ${lang().targetFlag}</div>
    <div class="mcq-question">
      <div class="mcq-word">${escHtml(word.native)}</div>
    </div>
    <div id="anagram-answer" class="anagram-answer">
      ${chars.map((ch, i) => ch === ' '
        ? `<span class="anagram-slot filled" data-space="true" style="border-style:dashed;opacity:0.5;">·</span>`
        : `<span class="anagram-slot">_</span>`
      ).join('')}
    </div>
    <div id="anagram-tiles" class="anagram-tiles">
      ${shuffled.map((ch, i) => `<button class="anagram-tile" data-i="${i}">${escHtml(ch)}</button>`).join('')}
    </div>
    <div id="anagram-hint" class="free-input-hint hidden"></div>
  `;

  const answerEl = container.querySelector('#anagram-answer');
  const tilesEl  = container.querySelector('#anagram-tiles');
  const hintEl   = container.querySelector('#anagram-hint');
  const placed   = []; // indices into shuffled[] (letters only)
  let done       = false;

  // Letter slots only (exclude pre-filled space slots)
  function getLetterSlots() {
    return [...answerEl.querySelectorAll('.anagram-slot:not([data-space])')];
  }

  function redrawAnswer() {
    const letterSlots = getLetterSlots();
    letterSlots.forEach((slot, i) => {
      if (i < placed.length) {
        slot.textContent = shuffled[placed[i]];
        slot.classList.add('filled');
        slot.dataset.pi = i;
      } else {
        slot.textContent = '_';
        slot.classList.remove('filled', 'correct', 'incorrect');
        delete slot.dataset.pi;
      }
    });
    answerEl.querySelectorAll('.anagram-slot[data-pi]').forEach(slot => {
      slot.onclick = () => {
        if (done) return;
        const pi = parseInt(slot.dataset.pi);
        const removedIdx = placed.splice(pi, 1)[0];
        const tile = tilesEl.querySelector(`[data-i="${removedIdx}"]`);
        if (tile) { tile.disabled = false; tile.classList.remove('used'); }
        redrawAnswer();
      };
    });
    if (placed.length === letterChars.length && !done) validateAnagram();
  }

  function validateAnagram() {
    done = true;
    stopChronoTimer();
    // Reconstruct full answer with spaces at correct positions
    let letterIdx = 0;
    const answer = chars.map((ch) => {
      if (ch === ' ') return ' ';
      return shuffled[placed[letterIdx++]] || '';
    }).join('');
    const isCorrect = answer.toLowerCase() === word.target.toLowerCase();
    answerEl.querySelectorAll('.anagram-slot:not([data-space])').forEach(s => s.classList.add(isCorrect ? 'correct' : 'incorrect'));
    tilesEl.querySelectorAll('.anagram-tile').forEach(t => t.disabled = true);
    if (!isCorrect) {
      hintEl.textContent = `✓ ${word.target}`;
      hintEl.classList.remove('hidden');
    }
    recordAnswer(word.id, isCorrect);
    if (isCorrect) quizState.score++;
    setTimeout(() => advanceQuiz(isCorrect), 1500);
  }

  tilesEl.querySelectorAll('.anagram-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      if (done || tile.disabled) return;
      tile.disabled = true;
      tile.classList.add('used');
      placed.push(parseInt(tile.dataset.i));
      redrawAnswer();
    });
  });
  redrawAnswer();
}

/* ---- FLASHCARDS ---- */
function startFlashcard() {
  const s       = getSettings();
  const fcDir   = s.fcDirection || 'mix';
  const fcCount = s.fcCount !== undefined ? s.fcCount : 0;
  const all     = shuffle(getWords());
  if (all.length === 0) { alert(t('alert_flashcard_empty')); return; }
  const selected = (fcCount === 0 || fcCount >= all.length) ? all : all.slice(0, fcCount);
  const cards = selected.map(w => {
    const dir = fcDir === 'mix' ? (Math.random() < 0.5 ? 'native-target' : 'target-native') : fcDir;
    return { word: w, dir };
  });
  quizState = { isFlashcard: true, cards, currentIndex: 0, flipped: false, totalQuestions: cards.length, score: 0 };
  showScreen('quiz');
  stopChronoTimer();
  renderFlashcard();
}

function renderFlashcard() {
  if (!quizState || !quizState.isFlashcard) return;
  const { cards, currentIndex, totalQuestions } = quizState;
  const { word, dir } = cards[currentIndex];
  const isNT      = dir !== 'target-native';
  const frontFlag = isNT ? lang().nativeFlag  : lang().targetFlag;
  const frontWord = isNT ? word.native        : word.target;
  const backFlag  = isNT ? lang().targetFlag  : lang().nativeFlag;
  const backWord  = isNT ? word.target        : word.native;

  const progress = (currentIndex / totalQuestions) * 100;
  document.getElementById('quiz-progress-bar').style.width = progress + '%';
  document.getElementById('quiz-counter').textContent = `🃏 ${currentIndex + 1} / ${totalQuestions}`;

  const content = document.getElementById('quiz-content');
  content.innerHTML = `
    <div class="quiz-type-label">Flashcard — ${frontFlag} / ${backFlag}</div>
    <div class="flashcard-scene" id="fc-scene">
      <div class="flashcard${quizState.flipped ? ' flashcard-flipped' : ''}" id="flashcard">
        <div class="flashcard-face flashcard-front">
          <div class="flashcard-lang">${frontFlag}</div>
          <div class="flashcard-word">${escHtml(frontWord)}</div>
          <div class="flashcard-tap-hint">${t('fc_tap_hint')}</div>
        </div>
        <div class="flashcard-face flashcard-back">
          <div class="flashcard-lang">${backFlag}</div>
          <div class="flashcard-word flashcard-word-back">${escHtml(backWord)}</div>
          <button class="btn-audio flashcard-audio" id="fc-audio">🔊</button>
        </div>
      </div>
    </div>
    <div class="flashcard-nav">
      ${currentIndex > 0 ? `<button class="btn btn-secondary flashcard-btn" id="fc-prev">${t('fc_prev')}</button>` : ''}
      <button class="btn btn-primary flashcard-btn" id="fc-next">
        ${currentIndex + 1 >= totalQuestions ? t('fc_finish') : t('fc_next')}
      </button>
    </div>
  `;

  const card  = content.querySelector('#flashcard');
  const scene = content.querySelector('#fc-scene');

  scene.addEventListener('click', () => {
    quizState.flipped = !quizState.flipped;
    card.classList.toggle('flashcard-flipped', quizState.flipped);
    if (quizState.flipped) {
      setTimeout(() => {
        const ab = content.querySelector('#fc-audio');
        if (ab) {
          ab.onclick = e => {
            e.stopPropagation();
            ab.classList.add('speaking');
            speak(word.target, () => ab.classList.remove('speaking'));
          };
          ab.classList.add('speaking');
          speak(word.target, () => ab.classList.remove('speaking'));
        }
      }, 300);
    }
  });

  if (quizState.flipped) {
    const ab = content.querySelector('#fc-audio');
    if (ab) {
      ab.onclick = e => {
        e.stopPropagation();
        ab.classList.add('speaking');
        speak(word.target, () => ab.classList.remove('speaking'));
      };
    }
  }

  const prevBtn = content.querySelector('#fc-prev');
  const nextBtn = content.querySelector('#fc-next');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    quizState.currentIndex--; quizState.flipped = false; renderFlashcard();
  });
  nextBtn.addEventListener('click', () => {
    if (currentIndex + 1 >= totalQuestions) finishFlashcard();
    else { quizState.currentIndex++; quizState.flipped = false; renderFlashcard(); }
  });
}

function finishFlashcard() {
  const total = quizState ? quizState.totalQuestions : 0;
  if (quizState) {
    updateLastSeen(quizState.cards.map(c => c.word.id));
    incrementSession();
    addQuizToHistory(total, total, total);
  }
  document.getElementById('quiz-progress-bar').style.width = '100%';
  document.getElementById('score-emoji').textContent = '🃏';
  document.getElementById('score-value').textContent = total;
  document.getElementById('score-total').textContent = ' ' + t('score_cards');
  document.getElementById('score-message').textContent = t('score_flashcard');
  const backupEl = document.getElementById('score-backup-reminder');
  if (backupEl) backupEl.classList.add('hidden');
  const retryBtnFC = document.getElementById('btn-retry-errors');
  if (retryBtnFC) retryBtnFC.classList.add('hidden');
  openModal('modal-score');
}

/* ---- RETRY FAILED WORDS ---- */
function startRetryQuiz(failedWordIds) {
  const allWords = getWords();
  const retryWords = allWords.filter(w => failedWordIds.includes(w.id));
  if (retryWords.length === 0) return;
  const MS = matchSize();
  const typeOptions = ttsSupported
    ? [QuizType.MCQ_TRANSLATE, QuizType.MCQ_LISTEN, QuizType.FREE_INPUT]
    : [QuizType.MCQ_TRANSLATE, QuizType.FREE_INPUT];
  const shuffledOpts = shuffle([...typeOptions]);
  const questions = retryWords.map((word, i) => {
    let type = shuffledOpts[i % shuffledOpts.length];
    const distractorPool = allWords.filter(w => w.id !== word.id);
    if ((type === QuizType.MCQ_TRANSLATE || type === QuizType.MCQ_LISTEN) && distractorPool.length === 0) {
      type = QuizType.FREE_INPUT;
    }
    if (type === QuizType.FREE_INPUT) return { type, word };
    const distractors = pickRandom(distractorPool, Math.min(MS - 1, distractorPool.length));
    return { type, word, distractors };
  });
  quizState = {
    questions,
    currentIndex: 0,
    score: 0,
    sessionWords: retryWords,
    totalQuestions: retryWords.length,
    isSurvival: false,
    isRetry: true,
  };
  showScreen('quiz');
  renderCurrentQuestion();
}

/* ---- CHRONO TIMER ---- */
function startChronoTimer(content) {
  const bar = document.getElementById('quiz-timer-bar');
  const container = document.getElementById('quiz-timer-container');
  if (!bar || !container) return;
  const seconds = chronoTime();
  const questionIndex = quizState ? quizState.currentIndex : -1;
  container.classList.remove('hidden');
  bar.style.transition = 'none';
  bar.style.width = '100%';
  bar.className = 'quiz-timer-bar';
  bar.offsetHeight; // force reflow
  bar.style.transition = `width ${seconds}s linear`;
  bar.style.width = '0%';

  let remaining = seconds;
  chronoTimer = setInterval(() => {
    remaining--;
    if (remaining <= 10) bar.className = 'quiz-timer-bar timer-warning';
    if (remaining <= 5)  bar.className = 'quiz-timer-bar timer-danger';
    if (remaining <= 0) {
      clearInterval(chronoTimer);
      chronoTimer = null;
      // Guard: ignore if question already changed
      if (!quizState || quizState.currentIndex !== questionIndex) return;
      content.querySelectorAll('button:not(:disabled), input').forEach(el => el.disabled = true);
      content.style.opacity = '0.5';
      setTimeout(() => {
        if (!quizState || quizState.currentIndex !== questionIndex) return;
        content.style.opacity = '';
        advanceQuiz(false);
      }, 700);
    }
  }, 1000);
}

function stopChronoTimer() {
  if (chronoTimer) { clearInterval(chronoTimer); chronoTimer = null; }
  const c = document.getElementById('quiz-timer-container');
  if (c) c.classList.add('hidden');
}

/* ---- MCQ SHARED LISTENER ---- */
function attachMCQListeners(container, correctId) {
  if (!quizState) return;
  const buttons = container.querySelectorAll('.mcq-option');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.correct === 'true';
      buttons.forEach(b => b.disabled = true);
      stopChronoTimer();
      if (isCorrect) {
        btn.classList.add('correct');
        quizState.score++;
      } else {
        btn.classList.add('incorrect');
        buttons.forEach(b => { if (b.dataset.correct === 'true') b.classList.add('correct'); });
      }
      recordAnswer(correctId, isCorrect);
      setTimeout(() => advanceQuiz(isCorrect), 1200);
    });
  });
}

/* ---- ADVANCE / FINISH ---- */
function advanceQuiz(wasCorrect) {
  if (!quizState) return;
  if (quizState.isSurvival && !wasCorrect) { finishQuiz(); return; }
  quizState.currentIndex++;
  if (quizState.currentIndex >= quizState.totalQuestions) finishQuiz();
  else renderCurrentQuestion();
}

function finishQuiz() {
  if (!quizState) return;
  stopChronoTimer();
  const score = quizState.score;
  const total = quizState.totalQuestions;
  document.getElementById('quiz-progress-bar').style.width = '100%';
  const seenCount = quizState.isSurvival ? quizState.currentIndex + 1 : quizState.totalQuestions;
  const seenIds = quizState.isSurvival
    ? quizState.questions.slice(0, quizState.currentIndex + 1).map(q => (q.word || (q.words && q.words[0]))?.id).filter(Boolean)
    : [...new Set(quizState.questions.slice(0, quizState.currentIndex).flatMap(q =>
        q.words ? q.words.map(w => w.id) : (q.word ? [q.word.id] : [])
      ))];
  updateLastSeen(seenIds);
  incrementSession();
  addQuizToHistory(score, quizState.isSurvival ? score : total, seenCount);

  let emoji, message;
  if (quizState.isSurvival) {
    if (score >= 20)      { emoji = '🏆'; message = uiLang === 'en' ? `Incredible! ${score} words without a mistake!` : `Incroyable ! ${score} mots sans faute !`; }
    else if (score >= 10) { emoji = '🔥'; message = uiLang === 'en' ? `Excellent! ${score} words in a row!` : `Excellent ! ${score} mots consécutifs !`; }
    else if (score >= 5)  { emoji = '👍'; message = uiLang === 'en' ? `Well done! ${score} consecutive words!` : `Bien joué ! ${score} mots d'affilée !`; }
    else                  { emoji = '💀'; message = uiLang === 'en' ? `${score} word${score !== 1 ? 's' : ''} — try again!` : `${score} mot${score > 1 ? 's' : ''} — réessayez !`; }
    document.getElementById('score-value').textContent = score;
    document.getElementById('score-total').textContent = ' 🔥';
  } else {
    const ratio = score / total;
    if (ratio >= 0.875)      { emoji = '🏆'; message = t('score_excellent'); }
    else if (ratio >= 0.625) { emoji = '⭐'; message = t('score_good'); }
    else if (ratio >= 0.375) { emoji = '👍'; message = t('score_ok'); }
    else                     { emoji = '💪'; message = t('score_low'); }
    document.getElementById('score-value').textContent = score;
    document.getElementById('score-total').textContent = `/ ${total}`;
  }

  document.getElementById('score-emoji').textContent = emoji;
  document.getElementById('score-message').textContent = message;

  const backupEl = document.getElementById('score-backup-reminder');
  if (backupEl) { backupEl.innerHTML = t('backup_score'); backupEl.classList.toggle('hidden', !needsBackup()); }

  const failedIds = quizState ? (quizState.failedWordIds || []) : [];
  const retryBtn = document.getElementById('btn-retry-errors');
  if (retryBtn) {
    const showRetry = failedIds.length > 0 && !quizState.isSurvival && !quizState.isRetry;
    retryBtn.classList.toggle('hidden', !showRetry);
    if (showRetry) {
      retryBtn.textContent = uiLang === 'en' ? `⚡ Retry ${failedIds.length} missed` : `⚡ Réviser les ${failedIds.length} raté${failedIds.length > 1 ? 's' : ''}`;
      retryBtn._failedIds = failedIds.slice();
    }
  }

  openModal('modal-score');
}

/* ============================================================
   DEMO WORDS (per language)
   ============================================================ */
const DEMO_WORDS = {
  'fr-it': [
    { native: 'bonjour',          target: 'ciao'        },
    { native: 'merci',            target: 'grazie'      },
    { native: "s'il vous plaît",  target: 'per favore'  },
    { native: 'oui',              target: 'sì'          },
    { native: 'non',              target: 'no'          },
    { native: 'eau',              target: 'acqua'       },
    { native: 'pain',             target: 'pane'        },
    { native: 'maison',           target: 'casa'        },
    { native: 'voiture',          target: 'macchina'    },
    { native: 'chat',             target: 'gatto'       },
    { native: 'chien',            target: 'cane'        },
    { native: 'livre',            target: 'libro'       },
    { native: 'table',            target: 'tavolo'      },
    { native: 'chaise',           target: 'sedia'       },
    { native: 'fenêtre',          target: 'finestra'    },
    { native: 'porte',            target: 'porta'       },
    { native: 'ami',              target: 'amico'       },
    { native: 'famille',          target: 'famiglia'    },
    { native: 'manger',           target: 'mangiare'    },
    { native: 'boire',            target: 'bere'        },
    { native: 'dormir',           target: 'dormire'     },
    { native: 'parler',           target: 'parlare'     },
    { native: 'aller',            target: 'andare'      },
    { native: 'venir',            target: 'venire'      },
    { native: 'grand',            target: 'grande'      },
    { native: 'petit',            target: 'piccolo'     },
    { native: 'beau',             target: 'bello'       },
    { native: 'rouge',            target: 'rosso'       },
    { native: 'bleu',             target: 'blu'         },
    { native: 'blanc',            target: 'bianco'      },
  ],
  'fr-en': [
    { native: 'bonjour',          target: 'hello'       },
    { native: 'merci',            target: 'thank you'   },
    { native: "s'il vous plaît",  target: 'please'      },
    { native: 'oui',              target: 'yes'         },
    { native: 'non',              target: 'no'          },
    { native: 'eau',              target: 'water'       },
    { native: 'pain',             target: 'bread'       },
    { native: 'maison',           target: 'house'       },
    { native: 'voiture',          target: 'car'         },
    { native: 'chat',             target: 'cat'         },
    { native: 'chien',            target: 'dog'         },
    { native: 'livre',            target: 'book'        },
    { native: 'table',            target: 'table'       },
    { native: 'chaise',           target: 'chair'       },
    { native: 'fenêtre',          target: 'window'      },
    { native: 'porte',            target: 'door'        },
    { native: 'ami',              target: 'friend'      },
    { native: 'famille',          target: 'family'      },
    { native: 'manger',           target: 'to eat'      },
    { native: 'boire',            target: 'to drink'    },
    { native: 'dormir',           target: 'to sleep'    },
    { native: 'parler',           target: 'to speak'    },
    { native: 'aller',            target: 'to go'       },
    { native: 'venir',            target: 'to come'     },
    { native: 'grand',            target: 'big'         },
    { native: 'petit',            target: 'small'       },
    { native: 'beau',             target: 'beautiful'   },
    { native: 'rouge',            target: 'red'         },
    { native: 'bleu',             target: 'blue'        },
    { native: 'blanc',            target: 'white'       },
  ],
  'fr-es': [
    { native: 'bonjour',          target: 'hola'        },
    { native: 'merci',            target: 'gracias'     },
    { native: "s'il vous plaît",  target: 'por favor'   },
    { native: 'oui',              target: 'sí'          },
    { native: 'non',              target: 'no'          },
    { native: 'eau',              target: 'agua'        },
    { native: 'pain',             target: 'pan'         },
    { native: 'maison',           target: 'casa'        },
    { native: 'voiture',          target: 'coche'       },
    { native: 'chat',             target: 'gato'        },
    { native: 'chien',            target: 'perro'       },
    { native: 'livre',            target: 'libro'       },
    { native: 'table',            target: 'mesa'        },
    { native: 'chaise',           target: 'silla'       },
    { native: 'fenêtre',          target: 'ventana'     },
    { native: 'porte',            target: 'puerta'      },
    { native: 'ami',              target: 'amigo'       },
    { native: 'famille',          target: 'familia'     },
    { native: 'manger',           target: 'comer'       },
    { native: 'boire',            target: 'beber'       },
    { native: 'dormir',           target: 'dormir'      },
    { native: 'parler',           target: 'hablar'      },
    { native: 'aller',            target: 'ir'          },
    { native: 'venir',            target: 'venir'       },
    { native: 'grand',            target: 'grande'      },
    { native: 'petit',            target: 'pequeño'     },
    { native: 'beau',             target: 'hermoso'     },
    { native: 'rouge',            target: 'rojo'        },
    { native: 'bleu',             target: 'azul'        },
    { native: 'blanc',            target: 'blanco'      },
  ],
  'fr-de': [
    { native: 'bonjour',          target: 'Hallo'       },
    { native: 'merci',            target: 'Danke'       },
    { native: "s'il vous plaît",  target: 'bitte'       },
    { native: 'oui',              target: 'ja'          },
    { native: 'non',              target: 'nein'        },
    { native: 'eau',              target: 'Wasser'      },
    { native: 'pain',             target: 'Brot'        },
    { native: 'maison',           target: 'Haus'        },
    { native: 'voiture',          target: 'Auto'        },
    { native: 'chat',             target: 'Katze'       },
    { native: 'chien',            target: 'Hund'        },
    { native: 'livre',            target: 'Buch'        },
    { native: 'table',            target: 'Tisch'       },
    { native: 'chaise',           target: 'Stuhl'       },
    { native: 'fenêtre',          target: 'Fenster'     },
    { native: 'porte',            target: 'Tür'         },
    { native: 'ami',              target: 'Freund'      },
    { native: 'famille',          target: 'Familie'     },
    { native: 'manger',           target: 'essen'       },
    { native: 'boire',            target: 'trinken'     },
    { native: 'dormir',           target: 'schlafen'    },
    { native: 'parler',           target: 'sprechen'    },
    { native: 'aller',            target: 'gehen'       },
    { native: 'venir',            target: 'kommen'      },
    { native: 'grand',            target: 'groß'        },
    { native: 'petit',            target: 'klein'       },
    { native: 'beau',             target: 'schön'       },
    { native: 'rouge',            target: 'rot'         },
    { native: 'bleu',             target: 'blau'        },
    { native: 'blanc',            target: 'weiß'        },
  ],
  'fr-pt': [
    { native: 'bonjour',          target: 'olá'         },
    { native: 'merci',            target: 'obrigado'    },
    { native: "s'il vous plaît",  target: 'por favor'   },
    { native: 'oui',              target: 'sim'         },
    { native: 'non',              target: 'não'         },
    { native: 'eau',              target: 'água'        },
    { native: 'pain',             target: 'pão'         },
    { native: 'maison',           target: 'casa'        },
    { native: 'voiture',          target: 'carro'       },
    { native: 'chat',             target: 'gato'        },
    { native: 'chien',            target: 'cão'         },
    { native: 'livre',            target: 'livro'       },
    { native: 'table',            target: 'mesa'        },
    { native: 'chaise',           target: 'cadeira'     },
    { native: 'fenêtre',          target: 'janela'      },
    { native: 'porte',            target: 'porta'       },
    { native: 'ami',              target: 'amigo'       },
    { native: 'famille',          target: 'família'     },
    { native: 'manger',           target: 'comer'       },
    { native: 'boire',            target: 'beber'       },
    { native: 'dormir',           target: 'dormir'      },
    { native: 'parler',           target: 'falar'       },
    { native: 'aller',            target: 'ir'          },
    { native: 'venir',            target: 'vir'         },
    { native: 'grand',            target: 'grande'      },
    { native: 'petit',            target: 'pequeno'     },
    { native: 'beau',             target: 'bonito'      },
    { native: 'rouge',            target: 'vermelho'    },
    { native: 'bleu',             target: 'azul'        },
    { native: 'blanc',            target: 'branco'      },
  ],
  'fr-jp': [
    { native: 'bonjour',          target: 'こんにちは'     },
    { native: 'merci',            target: 'ありがとう'     },
    { native: "s'il vous plaît",  target: 'おねがいします' },
    { native: 'oui',              target: 'はい'           },
    { native: 'non',              target: 'いいえ'         },
    { native: 'eau',              target: 'みず'           },
    { native: 'pain',             target: 'パン'           },
    { native: 'maison',           target: 'いえ'           },
    { native: 'voiture',          target: 'くるま'         },
    { native: 'chat',             target: 'ねこ'           },
    { native: 'chien',            target: 'いぬ'           },
    { native: 'livre',            target: 'ほん'           },
    { native: 'table',            target: 'テーブル'       },
    { native: 'chaise',           target: 'いす'           },
    { native: 'fenêtre',          target: 'まど'           },
    { native: 'porte',            target: 'ドア'           },
    { native: 'ami',              target: 'ともだち'       },
    { native: 'famille',          target: 'かぞく'         },
    { native: 'manger',           target: 'たべる'         },
    { native: 'boire',            target: 'のむ'           },
    { native: 'dormir',           target: 'ねる'           },
    { native: 'parler',           target: 'はなす'         },
    { native: 'aller',            target: 'いく'           },
    { native: 'venir',            target: 'くる'           },
    { native: 'grand',            target: 'おおきい'       },
    { native: 'petit',            target: 'ちいさい'       },
    { native: 'beau',             target: 'きれい'         },
    { native: 'rouge',            target: 'あか'           },
    { native: 'bleu',             target: 'あお'           },
    { native: 'blanc',            target: 'しろ'           },
  ],
};

const DEMO_GRAMMAR = {
  'fr-it': [
    { lesson: 'Articles définis', question: 'Masculin singulier', answer: 'il (il libro — le livre)\nlo (lo zaino — le sac) devant s+cons, z, gn…\nl\' (l\'uomo — l\'homme) devant voyelle' },
    { lesson: 'Articles définis', question: 'Féminin singulier',  answer: 'la (la casa — la maison)\nl\' (l\'amica — l\'amie) devant voyelle' },
    { lesson: 'Articles définis', question: 'Pluriel masculin',   answer: 'i (i libri — les livres)\ngli (gli zaini, gli uomini) devant s+cons, z, voyelle' },
    { lesson: 'Articles définis', question: 'Pluriel féminin',    answer: 'le (le case — les maisons)' },
    { lesson: 'Articles indéfinis', question: 'Masculin singulier', answer: 'un (un libro)\nuno (uno zaino) devant s+cons, z, gn…' },
    { lesson: 'Articles indéfinis', question: 'Féminin singulier',  answer: 'una (una casa)\nun\' (un\'amica) devant voyelle' },
    { lesson: 'Verbe ESSERE (être)', question: 'Présent indicatif', answer: 'io sono — je suis\ntu sei — tu es\nlui/lei è — il/elle est\nnoi siamo — nous sommes\nvoi siete — vous êtes\nloro sono — ils/elles sont' },
    { lesson: 'Verbe AVERE (avoir)', question: 'Présent indicatif', answer: 'io ho — j\'ai\ntu hai — tu as\nlui/lei ha — il/elle a\nnoi abbiamo — nous avons\nvoi avete — vous avez\nloro hanno — ils/elles ont' },
    { lesson: 'Verbe ANDARE (aller)', question: 'Présent indicatif', answer: 'io vado — je vais\ntu vai — tu vas\nlui/lei va — il/elle va\nnoi andiamo — nous allons\nvoi andate — vous allez\nloro vanno — ils/elles vont' },
  ],
  'fr-en': [
    { lesson: 'Temps verbaux', question: 'Present simple (usage)', answer: 'Actions habituelles / vérités générales\nex: I eat breakfast every day.\nex: The sun rises in the east.' },
    { lesson: 'Temps verbaux', question: 'Present continuous (usage)', answer: 'Action en cours maintenant\nex: I am eating right now.\nex: She is studying for her exam.' },
    { lesson: 'Temps verbaux', question: 'Past simple (usage)', answer: 'Action terminée dans le passé\nex: I went to Paris last year.\nex: She called me yesterday.' },
    { lesson: 'Articles', question: 'A / An', answer: 'A + consonne : a book, a car\nAn + voyelle : an apple, an hour\nPour un objet non spécifique' },
    { lesson: 'Articles', question: 'The', answer: 'Objet spécifique ou déjà mentionné\nex: The book on the table.\nex: The sun, the moon' },
    { lesson: 'Pronoms', question: 'Pronoms sujets', answer: 'I · you · he / she / it\nwe · you · they' },
    { lesson: 'Pronoms', question: 'Pronoms compléments', answer: 'me · you · him / her / it\nus · you · them' },
  ],
  'fr-es': [
    { lesson: 'Articles définis', question: 'Singulier', answer: 'el (masculin) : el libro — le livre\nla (féminin) : la casa — la maison' },
    { lesson: 'Articles définis', question: 'Pluriel', answer: 'los (masculin) : los libros\nlas (féminin) : las casas' },
    { lesson: 'Verbe SER (être permanent)', question: 'Présent indicatif', answer: 'yo soy — je suis\ntú eres — tu es\nél/ella es — il/elle est\nnosotros somos — nous sommes\nvosotros sois — vous êtes\nellos son — ils/elles sont' },
    { lesson: 'Verbe ESTAR (être temporaire)', question: 'Présent indicatif', answer: 'yo estoy\ntú estás\nél/ella está\nnosotros estamos\nvosotros estáis\nellos están' },
    { lesson: 'Verbe TENER (avoir)', question: 'Présent indicatif', answer: 'yo tengo\ntú tienes\nél/ella tiene\nnosotros tenemos\nvosotros tenéis\nellos tienen' },
    { lesson: 'Genres', question: 'Masculin / Féminin', answer: 'Masculin → souvent en -o : libro, gato\nFéminin → souvent en -a : mesa, gata\nExceptions : el día, la mano' },
  ],
  'fr-de': [
    { lesson: 'Articles définis (nominatif)', question: 'Masculin / Féminin / Neutre / Pluriel', answer: 'der (masc.) : der Mann\ndie (fém.) : die Frau\ndas (neutre) : das Kind\ndie (plur.) : die Kinder' },
    { lesson: 'Articles indéfinis (nominatif)', question: 'Masculin / Féminin / Neutre', answer: 'ein (masc.) : ein Mann\neine (fém.) : eine Frau\nein (neutre) : ein Kind' },
    { lesson: 'Verbe SEIN (être)', question: 'Présent', answer: 'ich bin — je suis\ndu bist — tu es\ner/sie/es ist — il/elle est\nwir sind — nous sommes\nihr seid — vous êtes\nsie/Sie sind — ils sont / vous êtes (poli)' },
    { lesson: 'Verbe HABEN (avoir)', question: 'Présent', answer: 'ich habe\ndu hast\ner/sie/es hat\nwir haben\nihr habt\nsie/Sie haben' },
    { lesson: 'Genres', question: 'Les 3 genres en allemand', answer: 'Masculin (der) : der Mann, der Hund\nFéminin (die) : die Frau, die Katze\nNeutre (das) : das Kind, das Buch\n→ À apprendre avec chaque nom !' },
  ],
  'fr-pt': [
    { lesson: 'Articles définis', question: 'Singulier', answer: 'o (masculin) : o livro — le livre\na (féminin) : a casa — la maison' },
    { lesson: 'Articles définis', question: 'Pluriel', answer: 'os (masculin) : os livros\nas (féminin) : as casas' },
    { lesson: 'Verbe SER (être)', question: 'Présent indicatif', answer: 'eu sou — je suis\ntu és — tu es\nele/ela é — il/elle est\nnós somos — nous sommes\nvós sois — vous êtes\neles são — ils/elles sont' },
    { lesson: 'Verbe ESTAR (être)', question: 'Présent indicatif', answer: 'eu estou\ntu estás\nele/ela está\nnós estamos\nvós estais\neles estão' },
    { lesson: 'Verbe TER (avoir)', question: 'Présent indicatif', answer: 'eu tenho\ntu tens\nele/ela tem\nnós temos\nvós tendes\neles têm' },
  ],
  'fr-jp': [
    { lesson: 'Hiragana — voyelles', question: 'Les 5 voyelles de base', answer: 'あ (a)  い (i)  う (u)\nえ (e)  お (o)' },
    { lesson: 'Hiragana — k', question: 'Rangée か', answer: 'か (ka)  き (ki)  く (ku)\nけ (ke)  こ (ko)' },
    { lesson: 'Hiragana — s', question: 'Rangée さ', answer: 'さ (sa)  し (shi)  す (su)\nせ (se)  そ (so)' },
    { lesson: 'Structures de base', question: '〜は〜です (X est Y)', answer: 'わたしはフランスじんです。\n→ Je suis français(e).\n\nこれはほんです。\n→ C\'est un livre.' },
    { lesson: 'Structures de base', question: '〜が好きです (j\'aime)', answer: 'ねこがすきです。\n→ J\'aime les chats.\n\nにほんごがすきです。\n→ J\'aime le japonais.' },
    { lesson: 'Chiffres', question: '1 à 10', answer: '1 いち  2 に  3 さん\n4 し/よん  5 ご  6 ろく\n7 しち/なな  8 はち\n9 く/きゅう  10 じゅう' },
  ],
};

const DEMO_PHRASES = {
  'fr-it': [
    { native: 'Bonjour, comment allez-vous ?',  target: 'Buongiorno, come sta?',         topic: 'Salutations' },
    { native: 'Je m\'appelle Marie.',            target: 'Mi chiamo Marie.',               topic: 'Salutations' },
    { native: 'Enchanté(e) de vous rencontrer.', target: 'Piacere di conoscerla.',         topic: 'Salutations' },
    { native: 'Où sont les toilettes ?',         target: 'Dove sono i bagni?',             topic: 'Pratique' },
    { native: 'Combien ça coûte ?',              target: 'Quanto costa?',                  topic: 'Pratique' },
    { native: 'Je voudrais un café, s\'il vous plaît.', target: 'Vorrei un caffè, per favore.', topic: 'Restaurant' },
    { native: 'L\'addition, s\'il vous plaît.', target: 'Il conto, per favore.',           topic: 'Restaurant' },
    { native: 'Je ne comprends pas.',            target: 'Non capisco.',                   topic: 'Pratique' },
    { native: 'Pouvez-vous répéter ?',           target: 'Può ripetere?',                  topic: 'Pratique' },
    { native: 'Je parle un peu italien.',        target: 'Parlo un po\' d\'italiano.',     topic: 'Pratique' },
  ],
  'fr-en': [
    { native: 'Bonjour, comment allez-vous ?',  target: 'Hello, how are you?',            topic: 'Greetings' },
    { native: 'Je m\'appelle Marie.',            target: 'My name is Marie.',              topic: 'Greetings' },
    { native: 'Où sont les toilettes ?',         target: 'Where is the bathroom?',         topic: 'Practical' },
    { native: 'Combien ça coûte ?',              target: 'How much does it cost?',         topic: 'Practical' },
    { native: 'Je voudrais un café, s\'il vous plaît.', target: 'I\'d like a coffee, please.', topic: 'Restaurant' },
    { native: 'L\'addition, s\'il vous plaît.', target: 'The bill, please.',               topic: 'Restaurant' },
    { native: 'Je ne comprends pas.',            target: 'I don\'t understand.',           topic: 'Practical' },
    { native: 'Pouvez-vous répéter ?',           target: 'Could you repeat that?',         topic: 'Practical' },
    { native: 'Je parle un peu anglais.',        target: 'I speak a little English.',      topic: 'Practical' },
  ],
  'fr-es': [
    { native: 'Bonjour, comment allez-vous ?',  target: '¡Hola! ¿Cómo está usted?',       topic: 'Saludos' },
    { native: 'Je m\'appelle Marie.',            target: 'Me llamo Marie.',                topic: 'Saludos' },
    { native: 'Où sont les toilettes ?',         target: '¿Dónde están los baños?',        topic: 'Práctico' },
    { native: 'Combien ça coûte ?',              target: '¿Cuánto cuesta?',                topic: 'Práctico' },
    { native: 'Je voudrais un café, s\'il vous plaît.', target: 'Quisiera un café, por favor.', topic: 'Restaurante' },
    { native: 'L\'addition, s\'il vous plaît.', target: 'La cuenta, por favor.',           topic: 'Restaurante' },
    { native: 'Je ne comprends pas.',            target: 'No entiendo.',                   topic: 'Práctico' },
    { native: 'Pouvez-vous répéter ?',           target: '¿Puede repetir?',                topic: 'Práctico' },
    { native: 'Je parle un peu espagnol.',       target: 'Hablo un poco de español.',      topic: 'Práctico' },
  ],
  'fr-de': [
    { native: 'Bonjour, comment allez-vous ?',  target: 'Hallo, wie geht es Ihnen?',       topic: 'Begrüßung' },
    { native: 'Je m\'appelle Marie.',            target: 'Ich heiße Marie.',               topic: 'Begrüßung' },
    { native: 'Où sont les toilettes ?',         target: 'Wo ist die Toilette?',            topic: 'Praktisch' },
    { native: 'Combien ça coûte ?',              target: 'Was kostet das?',                 topic: 'Praktisch' },
    { native: 'Je voudrais un café, s\'il vous plaît.', target: 'Ich hätte gerne einen Kaffee, bitte.', topic: 'Restaurant' },
    { native: 'L\'addition, s\'il vous plaît.', target: 'Die Rechnung, bitte.',             topic: 'Restaurant' },
    { native: 'Je ne comprends pas.',            target: 'Ich verstehe nicht.',             topic: 'Praktisch' },
    { native: 'Pouvez-vous répéter ?',           target: 'Können Sie das wiederholen?',     topic: 'Praktisch' },
    { native: 'Je parle un peu allemand.',       target: 'Ich spreche ein bisschen Deutsch.', topic: 'Praktisch' },
  ],
  'fr-pt': [
    { native: 'Bonjour, comment allez-vous ?',  target: 'Olá, como está?',                topic: 'Saudações' },
    { native: 'Je m\'appelle Marie.',            target: 'Chamo-me Marie.',                topic: 'Saudações' },
    { native: 'Où sont les toilettes ?',         target: 'Onde ficam os banheiros?',        topic: 'Prático' },
    { native: 'Combien ça coûte ?',              target: 'Quanto custa?',                   topic: 'Prático' },
    { native: 'Je voudrais un café, s\'il vous plaît.', target: 'Eu queria um café, por favor.', topic: 'Restaurante' },
    { native: 'L\'addition, s\'il vous plaît.', target: 'A conta, por favor.',              topic: 'Restaurante' },
    { native: 'Je ne comprends pas.',            target: 'Não entendo.',                    topic: 'Prático' },
    { native: 'Pouvez-vous répéter ?',           target: 'Pode repetir?',                   topic: 'Prático' },
    { native: 'Je parle un peu portugais.',      target: 'Falo um pouco de português.',     topic: 'Prático' },
  ],
  'fr-jp': [
    { native: 'Bonjour.',                        target: 'こんにちは。',                    topic: 'あいさつ' },
    { native: 'Je m\'appelle Marie.',            target: 'わたしはマリーです。',             topic: 'あいさつ' },
    { native: 'Enchanté(e).',                    target: 'はじめまして。よろしくおねがいします。', topic: 'あいさつ' },
    { native: 'Où sont les toilettes ?',         target: 'トイレはどこですか？',              topic: 'じつよう' },
    { native: 'Combien ça coûte ?',              target: 'いくらですか？',                   topic: 'じつよう' },
    { native: 'Je voudrais un café, s\'il vous plaît.', target: 'コーヒーをひとつください。', topic: 'レストラン' },
    { native: 'Je ne comprends pas.',            target: 'わかりません。',                   topic: 'じつよう' },
    { native: 'Pouvez-vous répéter ?',           target: 'もういちどいってください。',        topic: 'じつよう' },
    { native: 'Je parle un peu japonais.',       target: 'にほんごがすこしわかります。',     topic: 'じつよう' },
  ],
};

function seedDemoIfEmpty() {
  if (getWords().length === 0) {
    const demos = DEMO_WORDS[currentLangKey] || [];
    saveWords(demos.map(w => createWord(w.native, w.target)));
    updateHomeStats();
    renderWordList('');
  }
  if (getGrammarCards().length === 0) {
    const demos = DEMO_GRAMMAR[currentLangKey] || [];
    if (demos.length > 0) {
      saveGrammarCards(demos.map(d => ({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        lesson: d.lesson, question: d.question, answer: d.answer,
        last_known: null, seen_count: 0, error_count: 0
      })));
      renderGrammarScreen();
    }
  }
  if (getPhrases().length === 0) {
    const demos = DEMO_PHRASES[currentLangKey] || [];
    if (demos.length > 0) {
      savePhrases(demos.map(d => ({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        native: d.native, target: d.target, topic: d.topic || '',
        last_known: null, seen_count: 0
      })));
      renderPhrasesScreen();
    }
  }
}

/* ============================================================
   STATS SCREEN
   ============================================================ */
function renderStats() {
  const container = document.getElementById('stats-content');
  if (!container) return;
  const words = getWords();
  const history = getQuizHistory();

  // Totaux
  const totalSeen   = words.reduce((s, w) => s + (w.seen_count  || 0), 0);
  const totalErrors = words.reduce((s, w) => s + (w.error_count || 0), 0);
  const accuracy    = totalSeen > 0 ? Math.round((totalSeen - totalErrors) / totalSeen * 100) : null;
  const accuracyCls = accuracy === null ? '' : accuracy >= 70 ? 'stat-card-good' : accuracy >= 40 ? 'stat-card-ok' : 'stat-card-bad';

  // Streak & aujourd'hui
  const streak     = computeStreak(history);
  const todaySeen  = countTodaySeen(history);
  const score      = globalScore(words);
  const scoreCls   = score === null ? '' : score >= 70 ? 'stat-card-good' : score >= 40 ? 'stat-card-ok' : 'stat-card-bad';

  // Catégories
  const cats = categorizeWords(words);
  const total = words.length;
  const pct = n => total > 0 ? Math.round(n / total * 100) : 0;

  // Mots à revoir : triés par taux d'erreur
  const withErrors = [...words]
    .filter(w => (w.error_count || 0) > 0)
    .sort((a, b) => (b.error_count / b.seen_count) - (a.error_count / a.seen_count))
    .slice(0, 8);

  // Les plus pratiqués
  const mostPracticed = [...words]
    .filter(w => (w.seen_count || 0) > 0)
    .sort((a, b) => (b.seen_count || 0) - (a.seen_count || 0))
    .slice(0, 8);
  const maxSeen = mostPracticed[0]?.seen_count || 1;

  // Stats par mode
  const modeInfo = [
    { id: 0, label: `🎯 ${t('mode_normal')}`,    cls: 'stat-mode-normal'   },
    { id: 1, label: `🔴 ${t('mode_revision')}`,  cls: 'stat-mode-revision' },
    { id: 2, label: `💀 ${t('mode_survival')}`,  cls: 'stat-mode-survival' },
    { id: 3, label: `⏱️ ${t('mode_chrono')}`,    cls: 'stat-mode-chrono'   },
    { id: 4, label: `🃏 ${t('mode_flashcard')}`, cls: 'stat-mode-flashcard' },
    { id: 5, label: `🎧 ${t('mode_dictee')}`,    cls: 'stat-mode-dictee'   },
    { id: 6, label: `🔀 ${t('mode_anagram')}`,   cls: 'stat-mode-anagram'  },
  ];
  const modeStats = modeInfo.map(m => {
    const sessions = history.filter(s => (s.mode ?? 0) === m.id);
    if (!sessions.length) return null;
    if (m.id === 2) { // Survie : score = nb consécutifs
      const best = Math.max(...sessions.map(s => s.score));
      const avg  = Math.round(sessions.reduce((a, s) => a + s.score, 0) / sessions.length);
      return { ...m, sessions: sessions.length, best: `${best} 🔥`, avg: `${t('stat_avg_prefix')} ${avg}` };
    }
    const best    = sessions.reduce((b, s) => s.score / s.total > b.score / b.total ? s : b);
    const avgPct  = Math.round(sessions.reduce((a, s) => a + s.score / s.total, 0) / sessions.length * 100);
    return { ...m, sessions: sessions.length, best: `${best.score}/${best.total}`, avg: `${t('stat_avg_prefix')} ${avgPct}%` };
  }).filter(Boolean);

  const barRow = (w, value, max, cls, unit) => `
    <div class="stat-bar-row">
      <div class="stat-bar-labels">
        <span class="stat-bar-native">${escHtml(w.native)}</span>
        <span class="stat-bar-target">${escHtml(w.target)}</span>
      </div>
      <div class="stat-bar-track">
        <div class="stat-bar-fill ${cls}" style="width:${Math.round((value / max) * 100)}%"></div>
      </div>
      <div class="stat-bar-count">
        <span class="stat-bar-num">${value}</span>
        <span class="stat-bar-unit">${unit}</span>
      </div>
    </div>`;

  container.innerHTML = `
    <!-- Résumé clé (2×2) -->
    <div class="stats-summary stats-summary-4">
      <div class="stat-card ${streak > 0 ? 'stat-card-streak' : ''}">
        <div class="stat-value">${streak > 0 ? '🔥 ' : ''}${streak}</div>
        <div class="stat-label">${streak !== 1 ? t('stat_streakN') : t('stat_streak1')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${todaySeen}</div>
        <div class="stat-label">${t('stat_today')}</div>
      </div>
      <div class="stat-card ${scoreCls}">
        <div class="stat-value">${score !== null ? score + '%' : '—'}</div>
        <div class="stat-label">${t('stat_mastery')}</div>
      </div>
      <div class="stat-card ${accuracyCls}">
        <div class="stat-value">${accuracy !== null ? accuracy + '%' : '—'}</div>
        <div class="stat-label">${t('stat_accuracy')}</div>
      </div>
    </div>

    <!-- Heatmap d'activité -->
    ${history.length > 0 ? `
    <div class="stats-section">
      <h3 class="stats-section-title">${t('stat_activity')}</h3>
      ${buildHeatmapHTML(history)}
    </div>` : ''}

    <!-- Répartition du vocabulaire -->
    ${total > 0 ? `
    <div class="stats-section">
      <h3 class="stats-section-title">${t('stat_vocab_section')}
        <span class="stats-section-hint"> — ${pWords(total)} ${uiLang === 'en' ? 'total' : 'au total'}</span>
      </h3>
      <div class="stat-seg-bar">
        ${cats.mastered.length ? `<div class="stat-seg seg-mastered" style="width:${pct(cats.mastered.length)}%" title="${t('seg_mastered')}"></div>` : ''}
        ${cats.learning.length ? `<div class="stat-seg seg-learning" style="width:${pct(cats.learning.length)}%" title="${t('seg_learning')}"></div>` : ''}
        ${cats.toReview.length ? `<div class="stat-seg seg-review"   style="width:${pct(cats.toReview.length)}%" title="${t('seg_review')}"></div>` : ''}
        ${cats.never.length    ? `<div class="stat-seg seg-never"    style="width:${pct(cats.never.length)}%"    title="${t('seg_never')}"></div>` : ''}
      </div>
      <div class="stat-seg-legend">
        ${cats.mastered.length ? `<span class="stat-seg-item"><span class="stat-seg-dot seg-mastered"></span>${t('seg_mastered')} : ${cats.mastered.length}</span>` : ''}
        ${cats.learning.length ? `<span class="stat-seg-item"><span class="stat-seg-dot seg-learning"></span>${t('seg_learning')} : ${cats.learning.length}</span>` : ''}
        ${cats.toReview.length ? `<span class="stat-seg-item"><span class="stat-seg-dot seg-review"></span>${t('seg_review')} : ${cats.toReview.length}</span>` : ''}
        ${cats.never.length    ? `<span class="stat-seg-item"><span class="stat-seg-dot seg-never"></span>${t('seg_never')} : ${cats.never.length}</span>` : ''}
      </div>
    </div>` : ''}

    <!-- Stats par mode -->
    ${modeStats.length > 0 ? `
    <div class="stats-section">
      <h3 class="stats-section-title">${t('stat_by_mode')}</h3>
      <div class="stat-mode-list">
        ${modeStats.map(m => `
        <div class="stat-mode-row ${m.cls}">
          <span class="stat-mode-name">${m.label}</span>
          <span class="stat-mode-sessions">${pSessions(m.sessions)}</span>
          <span class="stat-mode-best">${t('stat_best')}&nbsp;: ${m.best}</span>
          <span class="stat-mode-avg">${m.avg}</span>
        </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- Mots à revoir -->
    ${withErrors.length > 0 ? `
    <div class="stats-section">
      <h3 class="stats-section-title">${t('stat_to_review')}
        <span class="stats-section-hint"> ${t('stat_to_review_hint')}</span>
      </h3>
      <div class="stat-bars">
        ${withErrors.map(w => {
          const rate = Math.round((w.error_count / w.seen_count) * 100);
          return barRow(w, rate, 100, 'stat-fill-red', t('pct_failed'));
        }).join('')}
      </div>
    </div>` : ''}

    <!-- Mots maîtrisés -->
    ${cats.mastered.length > 0 ? `
    <div class="stats-section">
      <h3 class="stats-section-title">${t('stat_mastered_section')}</h3>
      <div class="stat-bars">
        ${cats.mastered.slice(0, 8).map(w => {
          const acc = Math.round(((w.seen_count - (w.error_count || 0)) / w.seen_count) * 100);
          return barRow(w, acc, 100, 'stat-fill-green', t('pct_correct'));
        }).join('')}
      </div>
    </div>` : ''}

    <!-- Les plus pratiqués -->
    ${mostPracticed.length > 0 ? `
    <div class="stats-section">
      <h3 class="stats-section-title">${t('stat_practiced')}
        <span class="stats-section-hint"> ${t('stat_practiced_hint')}</span>
      </h3>
      <div class="stat-bars">
        ${mostPracticed.map(w => barRow(w, w.seen_count, maxSeen, 'stat-fill-blue', t('stat_times'))).join('')}
      </div>
    </div>` : `
    <div class="empty-state">
      <div class="empty-icon">📊</div>
      <p>${t('stat_empty')}</p>
      <p class="text-muted">${t('stat_empty_hint')}</p>
    </div>`}

    <!-- Jamais pratiqués -->
    ${cats.never.length > 0 ? `
    <div class="stats-section stats-section-muted">
      <h3 class="stats-section-title">${t('stat_never_section')}
        <span class="stats-section-hint"> — ${pWords(cats.never.length)}</span>
      </h3>
      <div class="stat-never-list">
        ${cats.never.slice(0, 12).map(w => `
          <span class="stat-never-pill">${escHtml(w.native)} → ${escHtml(w.target)}</span>
        `).join('')}
        ${cats.never.length > 12 ? `<span class="stat-never-more">+${cats.never.length - 12} ${uiLang === 'en' ? 'more' : 'autres'}</span>` : ''}
      </div>
    </div>` : ''}
  `;
}

/* ============================================================
   HEATMAP
   ============================================================ */
function buildHeatmapHTML(history) {
  const dateCounts = {};
  history.forEach(h => { if (h.date) dateCounts[h.date] = (dateCounts[h.date] || 0) + 1; });

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  // Align grid start to Monday of the week that is 11 weeks back
  const dow = (today.getDay() + 6) % 7; // Mon=0 … Sun=6
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dow - 11 * 7);

  const weeks = [];
  const cur = new Date(startDate);
  for (let w = 0; w < 12; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const str = cur.toISOString().slice(0, 10);
      week.push({ date: str, count: dateCounts[str] || 0, future: cur > today });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  const months = t('months');
  const monthRow = weeks.map(wk => {
    const d = new Date(wk[0].date);
    return d.getDate() <= 7 ? months[d.getMonth()] : '';
  });

  const lvl = c => c === 0 ? 0 : c === 1 ? 1 : c <= 3 ? 2 : 3;
  const dayLabels = ['L','','M','','V','','D'];

  return `
    <div class="heatmap-wrap">
      <div class="heatmap-month-row">
        ${monthRow.map(m => `<span class="heatmap-month">${m}</span>`).join('')}
      </div>
      <div class="heatmap-body">
        <div class="heatmap-day-labels">
          ${dayLabels.map(d => `<span class="heatmap-day-label">${d}</span>`).join('')}
        </div>
        <div class="heatmap-grid">
          ${weeks.map(wk => `<div class="heatmap-col">${wk.map(day => `<div class="heatmap-cell heatmap-l${day.future ? 'x' : lvl(day.count)}" title="${day.date}${day.count ? ': ' + day.count + ' session' + (day.count > 1 ? 's' : '') : ''}"></div>`).join('')}</div>`).join('')}
        </div>
      </div>
      <div class="heatmap-legend">
        <span class="heatmap-lgd-label">${t('heatmap_less')}</span>
        <div class="heatmap-cell heatmap-l0"></div>
        <div class="heatmap-cell heatmap-l1"></div>
        <div class="heatmap-cell heatmap-l2"></div>
        <div class="heatmap-cell heatmap-l3"></div>
        <span class="heatmap-lgd-label">${t('heatmap_more')}</span>
      </div>
    </div>`;
}

/* ============================================================
   SERVICE WORKER
   ============================================================ */
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

/* ============================================================
   THEME & FONT SIZE
   ============================================================ */
const THEME_KEY    = 'app_theme';
const FONTSIZE_KEY = 'app_fontsize';

function getTheme()    { return localStorage.getItem(THEME_KEY)    || 'dark'; }
function getFontSize() { return localStorage.getItem(FONTSIZE_KEY) || 'normal'; }

function applyTheme() {
  const light = getTheme() === 'light';
  document.body.classList.toggle('light-theme', light);
  const btn = document.getElementById('btn-theme');
  if (btn) btn.textContent = light ? '🌙' : '☀️';
}

function applyFontSize() {
  const large = getFontSize() === 'large';
  document.body.classList.toggle('large-text', large);
  const btn = document.getElementById('btn-font-size');
  if (btn) btn.classList.toggle('active', large);
}

function toggleTheme() {
  localStorage.setItem(THEME_KEY, getTheme() === 'dark' ? 'light' : 'dark');
  applyTheme();
}

function toggleFontSize() {
  localStorage.setItem(FONTSIZE_KEY, getFontSize() === 'normal' ? 'large' : 'normal');
  applyFontSize();
}

/* ============================================================
   GRAMMAR SCREEN
   ============================================================ */
/* ---- Lesson picker modal ---- */
function openLessonPickerModal(weakOnly) {
  const cards = getGrammarCards();
  const availableLessons = [...new Set(cards.map(c => c.lesson))].filter(l => {
    if (!weakOnly) return true;
    return cards.some(c => c.lesson === l && c.last_known === false);
  });
  const selected = new Set(availableLessons); // tout sélectionné par défaut
  const list = document.getElementById('lesson-picker-list');

  function countSelected() {
    let pool = cards.filter(c => selected.has(c.lesson));
    if (weakOnly) pool = pool.filter(c => c.last_known === false);
    return pool.length;
  }

  function render() {
    const n = countSelected();
    const allSel = selected.size === availableLessons.length;
    list.innerHTML = `
      <div class="lesson-picker-actions">
        <button class="settings-pill${allSel ? ' active' : ''}" id="lp-sel-all">${t('picker_all')}</button>
        <button class="settings-pill${selected.size === 0 ? ' active' : ''}" id="lp-sel-none">${t('picker_none')}</button>
      </div>
      ${availableLessons.map(l => {
        const lCards = cards.filter(c => c.lesson === l);
        const count = weakOnly ? lCards.filter(c => c.last_known === false).length : lCards.length;
        const isSel = selected.has(l);
        const cardWord = uiLang === 'en' ? (count > 1 ? 'cards' : 'card') : (count > 1 ? 'fiches' : 'fiche');
        return `<div class="lesson-picker-item${isSel ? ' selected' : ''}" data-lesson="${escHtml(l)}">
          <div class="lesson-picker-check">${isSel ? '✓' : ''}</div>
          <span class="lesson-picker-name">${escHtml(l)}</span>
          <span class="lesson-picker-count">${count} ${cardWord}</span>
        </div>`;
      }).join('')}
      <div class="lesson-picker-sep"></div>
      <button class="btn btn-primary btn-full" id="lp-start" ${n === 0 ? 'disabled' : ''}>
        📖 ${t('grammar_btn_review')} — ${n} ${uiLang === 'en' ? (n > 1 ? 'cards' : 'card') : (n > 1 ? 'fiches' : 'fiche')}
      </button>
    `;
    list.querySelector('#lp-sel-all').addEventListener('click', () => {
      availableLessons.forEach(l => selected.add(l)); render();
    });
    list.querySelector('#lp-sel-none').addEventListener('click', () => {
      selected.clear(); render();
    });
    list.querySelectorAll('.lesson-picker-item').forEach(item => {
      item.addEventListener('click', () => {
        const l = item.dataset.lesson;
        if (selected.has(l)) selected.delete(l); else selected.add(l);
        render();
      });
    });
    const startBtn = list.querySelector('#lp-start');
    if (startBtn && !startBtn.disabled) {
      startBtn.addEventListener('click', () => {
        closeModal('modal-lesson-picker');
        const sel = [...selected];
        startGrammarReview(sel.length === availableLessons.length ? null : sel, weakOnly);
      });
    }
  }

  render();
  openModal('modal-lesson-picker');
}

/* ---- Direction bar for grammar & phrase review ---- */
function renderReviewDirBar(barId, settingKey, labelA, labelB) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  const dir = getSettings()[settingKey] || 'native-target';
  bar.innerHTML = `
    <div class="settings-pills">
      <button class="settings-pill${dir === 'native-target'  ? ' active' : ''}" data-reviewdir="${settingKey}" data-dirval="native-target">${labelA}</button>
      <button class="settings-pill${dir === 'target-native'  ? ' active' : ''}" data-reviewdir="${settingKey}" data-dirval="target-native">${labelB}</button>
      <button class="settings-pill${dir === 'mix'            ? ' active' : ''}" data-reviewdir="${settingKey}" data-dirval="mix">🔀</button>
    </div>`;
  bar.querySelectorAll('[data-reviewdir]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = getSettings();
      s[btn.dataset.reviewdir] = btn.dataset.dirval;
      saveSettings(s);
      renderReviewDirBar(barId, settingKey, labelA, labelB);
    });
  });
}

function renderGrammarScreen() {
  const cards = getGrammarCards();
  const listEl = document.getElementById('grammar-list');
  const emptyEl = document.getElementById('grammar-empty');
  const reviewAllBar = document.getElementById('grammar-review-all-bar');
  if (!listEl) return;

  if (cards.length === 0) {
    listEl.innerHTML = '';
    emptyEl && emptyEl.classList.remove('hidden');
    reviewAllBar && reviewAllBar.classList.add('hidden');
    return;
  }
  emptyEl && emptyEl.classList.add('hidden');

  // Group by lesson (preserve insertion order)
  const lessons = {};
  for (const card of cards) {
    if (!lessons[card.lesson]) lessons[card.lesson] = [];
    lessons[card.lesson].push(card);
  }

  const lessonNames = Object.keys(lessons);
  const showGrammarBar = cards.length >= 2;
  if (reviewAllBar) reviewAllBar.classList.toggle('hidden', !showGrammarBar);
  if (showGrammarBar) renderReviewDirBar('grammar-dir-bar', 'grammarReviewDir', lang().nativeFlag + '→' + lang().targetFlag, lang().targetFlag + '→' + lang().nativeFlag);
  const weakBtn = document.getElementById('btn-grammar-review-weak');
  const weakCards = cards.filter(c => c.last_known === false);
  if (weakBtn) {
    weakBtn.classList.toggle('hidden', weakCards.length === 0);
    if (weakCards.length > 0) weakBtn.textContent = `⚡ ${weakCards.length}`;
  }

  // Global stats — basées sur last_known (résultat de la DERNIÈRE révision de chaque fiche)
  const reviewed   = cards.filter(c => c.last_known !== null).length;
  const knownCount = cards.filter(c => c.last_known === true).length;
  const successPct = reviewed > 0 ? Math.round(knownCount / reviewed * 100) : null;
  const successClass = successPct === null ? '' : successPct >= 80 ? 'stat-card-good' : successPct >= 60 ? 'stat-card-ok' : 'stat-card-bad';

  const statsHtmlGlobal = `
    <div class="grammar-stats">
      <div class="stat-card">
        <div class="stat-value">${lessonNames.length}</div>
        <div class="stat-label">${t('grammar_stat_lessons')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${cards.length}</div>
        <div class="stat-label">${t('grammar_stat_cards')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${reviewed}</div>
        <div class="stat-label">${t('grammar_stat_reviewed')}</div>
      </div>
      <div class="stat-card ${successClass}">
        <div class="stat-value">${successPct !== null ? successPct + '%' : '—'}</div>
        <div class="stat-label">${t('grammar_stat_success')}</div>
      </div>
    </div>`;

  listEl.innerHTML = statsHtmlGlobal + lessonNames.map(lesson => {
    const lCards  = lessons[lesson];
    const lReviewed = lCards.filter(c => c.last_known !== null).length;
    const lKnown    = lCards.filter(c => c.last_known === true).length;
    const ratePct   = lReviewed > 0 ? Math.round(lKnown / lReviewed * 100) : null;
    const statsHtml = ratePct !== null
      ? `<span class="grammar-lesson-stat">${lKnown}/${lReviewed} ${uiLang === 'en' ? 'known' : 'connues'}</span>` : '';

    const cardsHtml = lCards.map(card => {
      const firstLine = card.answer.split('\n')[0];
      const hasMore   = card.answer.includes('\n');
      return `
        <div class="grammar-card-item">
          <div class="grammar-card-content">
            <span class="grammar-card-question">${escHtml(card.question)}</span>
            <span class="grammar-card-sep">→</span>
            <span class="grammar-card-answer">${escHtml(firstLine)}${hasMore ? ' …' : ''}</span>
          </div>
          <div class="grammar-card-btns">
            <button class="grammar-action-btn" data-action="edit"   data-id="${card.id}" title="Modifier">✏️</button>
            <button class="grammar-action-btn" data-action="delete" data-id="${card.id}" title="Supprimer">🗑️</button>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="grammar-lesson-group">
        <div class="grammar-lesson-header">
          <div class="grammar-lesson-title-wrap">
            <span class="grammar-lesson-title">📖 ${escHtml(lesson)}</span>
            ${statsHtml}
          </div>
          <button class="btn btn-primary grammar-review-btn" data-lesson="${escHtml(lesson)}">${t('grammar_btn_review')}</button>
        </div>
        <div class="grammar-cards-list">${cardsHtml}</div>
      </div>`;
  }).join('');
}

function openAddGrammarModal() {
  const lessons = [...new Set(getGrammarCards().map(c => c.lesson))];
  const dl = document.getElementById('grammar-lessons-list');
  if (dl) dl.innerHTML = lessons.map(l => `<option value="${escHtml(l)}">`).join('');
  document.getElementById('modal-grammar-title').textContent = t('modal_add_grammar');
  document.getElementById('edit-grammar-id').value           = '';
  document.getElementById('input-grammar-lesson').value      = '';
  document.getElementById('input-grammar-question').value    = '';
  document.getElementById('input-grammar-answer').value      = '';
  document.getElementById('form-grammar-error').classList.add('hidden');
  openModal('modal-add-grammar');
  setTimeout(() => document.getElementById('input-grammar-lesson').focus(), 200);
}

function openEditGrammarModal(id) {
  const card = getGrammarCards().find(c => c.id === id);
  if (!card) return;
  const lessons = [...new Set(getGrammarCards().map(c => c.lesson))];
  const dl = document.getElementById('grammar-lessons-list');
  if (dl) dl.innerHTML = lessons.map(l => `<option value="${escHtml(l)}">`).join('');
  document.getElementById('modal-grammar-title').textContent = t('modal_edit_grammar');
  document.getElementById('edit-grammar-id').value           = id;
  document.getElementById('input-grammar-lesson').value      = card.lesson;
  document.getElementById('input-grammar-question').value    = card.question;
  document.getElementById('input-grammar-answer').value      = card.answer;
  document.getElementById('form-grammar-error').classList.add('hidden');
  openModal('modal-add-grammar');
}

/* ---- Grammar review (uses quiz screen) ---- */
function startGrammarReview(lesson, weakOnly = false) {
  const all  = getGrammarCards();
  let pool = lesson === null ? all
    : Array.isArray(lesson) ? all.filter(c => lesson.includes(c.lesson))
    : all.filter(c => c.lesson === lesson);
  if (weakOnly) pool = pool.filter(c => c.last_known === false);
  if (pool.length === 0) { alert(t('alert_no_grammar_review')); return; }
  const dir = getSettings().grammarReviewDir || 'native-target';
  grammarReviewState = {
    cards: shuffle([...pool]).map(c => ({
      ...c,
      _showReverse: dir === 'target-native' || (dir === 'mix' && Math.random() < 0.5)
    })),
    lesson: lesson || null,
    weakOnly,
    currentIndex: 0,
    totalCards: pool.length,
    knownCount: 0,
    revealed: false
  };
  quitTarget = 'grammar';
  document.getElementById('quiz-timer-container').classList.add('hidden');
  showScreen('quiz');
  renderGrammarReviewCard();
}

function renderGrammarReviewCard() {
  if (!grammarReviewState) return;
  const { cards, currentIndex, totalCards, revealed } = grammarReviewState;
  const card = cards[currentIndex];
  document.getElementById('quiz-progress-bar').style.width = (currentIndex / totalCards * 100) + '%';
  document.getElementById('quiz-counter').textContent = `📖 ${currentIndex + 1} / ${totalCards}`;

  const content = document.getElementById('quiz-content');
  const rev = !!card._showReverse;
  const promptText  = rev ? card.answer   : card.question;
  const revealText  = rev ? card.question : card.answer;
  const revealHtml  = escHtml(revealText).replace(/\n/g, '<br>');
  const promptClass = rev ? 'grammar-review-answer'   : 'grammar-review-question';
  const revealClass = rev ? 'grammar-review-question' : 'grammar-review-answer';
  const promptHtml  = rev ? escHtml(promptText).replace(/\n/g, '<br>') : escHtml(promptText);

  const revealBtnLabel = rev ? t('reveal_question') : t('reveal_answer');
  if (!revealed) {
    content.innerHTML = `
      <div class="quiz-type-label">${escHtml(card.lesson)}</div>
      <div class="grammar-review-card">
        <div class="${promptClass}">${promptHtml}</div>
        <button class="btn btn-secondary grammar-reveal-btn" id="gr-reveal">${revealBtnLabel}</button>
      </div>`;
    content.querySelector('#gr-reveal').addEventListener('click', () => {
      grammarReviewState.revealed = true;
      renderGrammarReviewCard();
    });
  } else {
    content.innerHTML = `
      <div class="quiz-type-label">${escHtml(card.lesson)}</div>
      <div class="grammar-review-card grammar-review-card-revealed">
        <div class="${promptClass}">${promptHtml}</div>
        <div class="grammar-review-sep"></div>
        <div class="${revealClass}">${revealHtml}</div>
        <div class="grammar-review-actions">
          <button class="btn btn-danger  grammar-review-btn-no"  id="gr-no">${t('btn_to_review')}</button>
          <button class="btn btn-primary grammar-review-btn-yes" id="gr-yes">${t('btn_known')}</button>
        </div>
      </div>`;
    content.querySelector('#gr-no' ).addEventListener('click', () => advanceGrammarReview(false));
    content.querySelector('#gr-yes').addEventListener('click', () => advanceGrammarReview(true));
  }
}

function advanceGrammarReview(knew) {
  if (!grammarReviewState) return;
  const card = grammarReviewState.cards[grammarReviewState.currentIndex];

  const all = getGrammarCards();
  const idx = all.findIndex(c => c.id === card.id);
  if (idx !== -1) {
    all[idx].seen_count  = (all[idx].seen_count  || 0) + 1;
    if (!knew) all[idx].error_count = (all[idx].error_count || 0) + 1;
    all[idx].last_known  = knew;
    saveGrammarCards(all);
  }

  if (knew) grammarReviewState.knownCount++;
  grammarReviewState.currentIndex++;
  grammarReviewState.revealed = false;

  if (grammarReviewState.currentIndex >= grammarReviewState.totalCards) {
    finishGrammarReview();
  } else {
    renderGrammarReviewCard();
  }
}

function finishGrammarReview() {
  const { knownCount, totalCards, lesson, weakOnly } = grammarReviewState;
  grammarReviewState = null;

  document.getElementById('quiz-progress-bar').style.width = '100%';
  document.getElementById('quiz-counter').textContent = '';

  const ratio = knownCount / totalCards;
  let emoji, message;
  if (ratio === 1)        { emoji = '🏆'; message = t('gr_perfect'); }
  else if (ratio >= 0.75) { emoji = '⭐'; message = t('gr_good'); }
  else if (ratio >= 0.5)  { emoji = '📖'; message = t('gr_ok'); }
  else                    { emoji = '💪'; message = t('gr_low'); }

  const content = document.getElementById('quiz-content');
  content.innerHTML = `
    <div class="grammar-finish">
      <div class="grammar-finish-emoji">${emoji}</div>
      <div class="grammar-finish-score">${knownCount} / ${totalCards} ${uiLang === 'en' ? 'known' : 'connues'}</div>
      <p class="grammar-finish-message">${escHtml(message)}</p>
      <div class="grammar-finish-actions">
        <button class="btn btn-primary   btn-full" id="gr-replay">${t('btn_retry')}</button>
        <button class="btn btn-secondary btn-full" id="gr-back">${t('btn_back_grammar')}</button>
      </div>
    </div>`;
  content.querySelector('#gr-replay').addEventListener('click', () => startGrammarReview(lesson, weakOnly));
  content.querySelector('#gr-back' ).addEventListener('click', () => { showScreen('grammar'); renderGrammarScreen(); });
}

/* ============================================================
   PHRASES SCREEN
   ============================================================ */
/* ---- Topic picker modal (phrases) ---- */
function openTopicPickerModal(weakOnly) {
  const phrases = getPhrases();
  const availableTopics = [...new Set(phrases.map(p => p.topic || ''))].sort((a, b) => {
    if (a === '') return 1; if (b === '') return -1; return a.localeCompare(b);
  }).filter(t => {
    if (!weakOnly) return true;
    return phrases.some(p => (p.topic || '') === t && p.last_known === false);
  });
  const selected = new Set(availableTopics);
  const list = document.getElementById('topic-picker-list');

  function countSelected() {
    let pool = phrases.filter(p => selected.has(p.topic || ''));
    if (weakOnly) pool = pool.filter(p => p.last_known === false);
    return pool.length;
  }

  function render() {
    const n = countSelected();
    const allSel = selected.size === availableTopics.length;
    list.innerHTML = `
      <div class="lesson-picker-actions">
        <button class="settings-pill${allSel ? ' active' : ''}" id="tp-sel-all">${t('picker_all')}</button>
        <button class="settings-pill${selected.size === 0 ? ' active' : ''}" id="tp-sel-none">${t('picker_none')}</button>
      </div>
      ${availableTopics.map(topic => {
        const tPhrases = phrases.filter(p => (p.topic || '') === topic);
        const count = weakOnly ? tPhrases.filter(p => p.last_known === false).length : tPhrases.length;
        const isSel = selected.has(topic);
        return `<div class="lesson-picker-item${isSel ? ' selected' : ''}" data-topic="${escHtml(topic)}">
          <div class="lesson-picker-check">${isSel ? '✓' : ''}</div>
          <span class="lesson-picker-name">${escHtml(topic || t('phrases_none_topic'))}</span>
          <span class="lesson-picker-count">${count} phrase${count > 1 ? 's' : ''}</span>
        </div>`;
      }).join('')}
      <div class="lesson-picker-sep"></div>
      <button class="btn btn-primary btn-full" id="tp-start" ${n === 0 ? 'disabled' : ''}>
        📖 ${t('phrases_btn_review')} — ${n} phrase${n > 1 ? 's' : ''}
      </button>
    `;
    list.querySelector('#tp-sel-all').addEventListener('click', () => { availableTopics.forEach(topic => selected.add(topic)); render(); });
    list.querySelector('#tp-sel-none').addEventListener('click', () => { selected.clear(); render(); });
    list.querySelectorAll('.lesson-picker-item').forEach(item => {
      item.addEventListener('click', () => {
        const topic = item.dataset.topic;
        if (selected.has(topic)) selected.delete(topic); else selected.add(topic);
        render();
      });
    });
    const startBtn = list.querySelector('#tp-start');
    if (startBtn && !startBtn.disabled) {
      startBtn.addEventListener('click', () => {
        closeModal('modal-topic-picker');
        const sel = [...selected];
        startPhraseReview(weakOnly, sel.length === availableTopics.length ? null : sel);
      });
    }
  }

  render();
  openModal('modal-topic-picker');
}

function renderPhrasesScreen() {
  const phrases  = getPhrases();
  const listEl   = document.getElementById('phrases-list');
  const emptyEl  = document.getElementById('phrases-empty');
  const reviewBar = document.getElementById('phrases-review-bar');
  if (!listEl) return;

  if (phrases.length === 0) {
    listEl.innerHTML = '';
    emptyEl  && emptyEl.classList.remove('hidden');
    reviewBar && reviewBar.classList.add('hidden');
    return;
  }
  emptyEl && emptyEl.classList.add('hidden');
  const showPhrasesBar = phrases.length >= 2;
  if (reviewBar) reviewBar.classList.toggle('hidden', !showPhrasesBar);
  if (showPhrasesBar) renderReviewDirBar(
    'phrases-dir-bar', 'phraseReviewDir',
    lang().nativeFlag + '→' + lang().targetFlag,
    lang().targetFlag + '→' + lang().nativeFlag
  );

  const weakBtn = document.getElementById('btn-phrases-review-weak');
  const weakPhrases = phrases.filter(p => p.last_known === false);
  if (weakBtn) {
    weakBtn.classList.toggle('hidden', weakPhrases.length === 0);
    if (weakPhrases.length > 0) weakBtn.textContent = `⚡ ${weakPhrases.length}`;
  }

  const reviewed   = phrases.filter(p => p.last_known !== null).length;
  const knownCount = phrases.filter(p => p.last_known === true).length;
  const successPct = reviewed > 0 ? Math.round(knownCount / reviewed * 100) : null;
  const successCls = successPct === null ? '' : successPct >= 80 ? 'stat-card-good' : successPct >= 60 ? 'stat-card-ok' : 'stat-card-bad';

  // Group by topic (preserve insertion order, '' = Sans thème at end)
  const topicMap = {};
  for (const p of phrases) {
    const key = p.topic || '';
    if (!topicMap[key]) topicMap[key] = [];
    topicMap[key].push(p);
  }
  const topicKeys = Object.keys(topicMap).sort((a, b) => {
    if (a === '') return 1;
    if (b === '') return -1;
    return a.localeCompare(b);
  });
  const namedTopicCount = topicKeys.filter(tk => tk !== '').length;

  const statsHtml = `
    <div class="grammar-stats">
      <div class="stat-card"><div class="stat-value">${namedTopicCount || '—'}</div><div class="stat-label">${t('phrases_stat_topics')}</div></div>
      <div class="stat-card"><div class="stat-value">${phrases.length}</div><div class="stat-label">${t('phrases_stat_count')}</div></div>
      <div class="stat-card"><div class="stat-value">${reviewed}</div><div class="stat-label">${t('phrases_stat_reviewed')}</div></div>
      <div class="stat-card ${successCls}"><div class="stat-value">${successPct !== null ? successPct + '%' : '—'}</div><div class="stat-label">${t('phrases_stat_success')}</div></div>
    </div>`;

  listEl.innerHTML = statsHtml + topicKeys.map(topic => {
    const tPhrases = topicMap[topic];
    const tReviewed = tPhrases.filter(p => p.last_known !== null).length;
    const tKnown    = tPhrases.filter(p => p.last_known === true).length;
    const tRate     = tReviewed > 0 ? Math.round(tKnown / tReviewed * 100) : null;
    const tStatHtml = tRate !== null
      ? `<span class="grammar-lesson-stat">${tKnown}/${tReviewed} ${uiLang === 'en' ? 'known' : 'réussies'}</span>` : '';
    const topicLabel = topic || t('phrases_none_topic');
    const topicIcon  = topic ? '💬' : '📂';

    const itemsHtml = tPhrases.map(p => `
      <div class="grammar-card-item">
        <div class="phrase-content">
          <div class="phrase-native">${escHtml(p.native)}</div>
          <div class="phrase-target">${lang().targetFlag} ${escHtml(p.target)}</div>
        </div>
        <div class="grammar-card-btns">
          <button class="grammar-action-btn" data-action="edit"   data-id="${escHtml(p.id)}" title="Modifier">✏️</button>
          <button class="grammar-action-btn" data-action="delete" data-id="${escHtml(p.id)}" title="Supprimer">🗑️</button>
        </div>
      </div>`).join('');

    return `
      <div class="grammar-lesson-group">
        <div class="grammar-lesson-header">
          <div class="grammar-lesson-title-wrap">
            <span class="grammar-lesson-title">${topicIcon} ${escHtml(topicLabel)}</span>
            ${tStatHtml}
          </div>
          <button class="btn btn-primary grammar-review-btn" data-topic="${escHtml(topic)}">${t('phrases_btn_review')}</button>
        </div>
        <div class="grammar-cards-list">${itemsHtml}</div>
      </div>`;
  }).join('');
}

function openAddPhraseModal() {
  document.getElementById('modal-phrase-title').textContent  = t('modal_add_phrase');
  document.getElementById('edit-phrase-id').value            = '';
  document.getElementById('input-phrase-native').value       = '';
  document.getElementById('input-phrase-target').value       = '';
  document.getElementById('input-phrase-topic').value        = '';
  document.getElementById('form-phrase-error').classList.add('hidden');
  updatePhraseFormLabels();
  openModal('modal-add-phrase');
  setTimeout(() => document.getElementById('input-phrase-native').focus(), 150);
}

function openEditPhraseModal(id) {
  const phrase = getPhrases().find(p => p.id === id);
  if (!phrase) return;
  document.getElementById('modal-phrase-title').textContent  = t('modal_edit_phrase');
  document.getElementById('edit-phrase-id').value            = id;
  document.getElementById('input-phrase-native').value       = phrase.native;
  document.getElementById('input-phrase-target').value       = phrase.target;
  document.getElementById('input-phrase-topic').value        = phrase.topic || '';
  document.getElementById('form-phrase-error').classList.add('hidden');
  updatePhraseFormLabels();
  openModal('modal-add-phrase');
}

function updatePhraseFormLabels() {
  const el = document.getElementById('label-phrase-target');
  if (el) el.textContent = `${lang().targetFlag} ${uiLang === 'en' ? 'Translation' : 'Traduction'} (${langTargetName()})`;
}

/* ---- Phrase review (reuses quiz screen) ---- */
function startPhraseReview(weakOnly = false, topic = null) {
  let pool = getPhrases();
  if (topic !== null) {
    if (Array.isArray(topic)) pool = pool.filter(p => topic.includes(p.topic || ''));
    else pool = pool.filter(p => (p.topic || '') === topic);
  }
  if (weakOnly) pool = pool.filter(p => p.last_known === false);
  if (pool.length === 0) { alert(t('alert_no_phrase_review')); return; }
  const dir = getSettings().phraseReviewDir || 'native-target';
  phraseReviewState = {
    phrases: shuffle([...pool]).map(p => ({
      ...p,
      _showReverse: dir === 'target-native' || (dir === 'mix' && Math.random() < 0.5)
    })),
    weakOnly,
    topic: topic || null,
    currentIndex: 0,
    totalCards: pool.length,
    knownCount: 0,
    revealed: false
  };
  quitTarget = 'phrases';
  document.getElementById('quiz-timer-container').classList.add('hidden');
  showScreen('quiz');
  renderPhraseReviewCard();
}

function renderPhraseReviewCard() {
  if (!phraseReviewState) return;
  const { phrases, currentIndex, totalCards, revealed } = phraseReviewState;
  const p = phrases[currentIndex];
  document.getElementById('quiz-progress-bar').style.width = (currentIndex / totalCards * 100) + '%';
  document.getElementById('quiz-counter').textContent = `💬 ${currentIndex + 1} / ${totalCards}`;

  const content = document.getElementById('quiz-content');
  const topicHtml = p.topic ? `<span class="phrase-topic-badge">${escHtml(p.topic)}</span>` : '';
  const rev = !!p._showReverse;
  const promptText = rev ? p.target : p.native;
  const revealText = rev ? p.native : p.target;
  const promptFlag = rev ? lang().targetFlag : lang().nativeFlag;
  const revealFlag = rev ? lang().nativeFlag : lang().targetFlag;

  const phraseRevealLabel = rev ? t('reveal_original') : t('reveal_translation');
  if (!revealed) {
    content.innerHTML = `
      <div class="grammar-review-card">
        ${topicHtml}
        <div class="quiz-type-label">${promptFlag} → ${revealFlag}</div>
        <div class="grammar-review-question phrase-review-text">${escHtml(promptText).replace(/\n/g, '<br>')}</div>
        <button class="btn btn-secondary grammar-reveal-btn" id="pr-reveal">${phraseRevealLabel}</button>
      </div>`;
    content.querySelector('#pr-reveal').addEventListener('click', () => {
      phraseReviewState.revealed = true;
      renderPhraseReviewCard();
    });
  } else {
    content.innerHTML = `
      <div class="grammar-review-card grammar-review-card-revealed">
        ${topicHtml}
        <div class="quiz-type-label">${promptFlag} → ${revealFlag}</div>
        <div class="grammar-review-question phrase-review-text">${escHtml(promptText).replace(/\n/g, '<br>')}</div>
        <div class="grammar-review-sep"></div>
        <div class="grammar-review-answer">${escHtml(revealText).replace(/\n/g, '<br>')}</div>
        <div class="grammar-review-actions">
          <button class="btn btn-danger  grammar-review-btn-no"  id="pr-no">${t('btn_to_review')}</button>
          <button class="btn btn-primary grammar-review-btn-yes" id="pr-yes">${t('btn_known')}</button>
        </div>
      </div>`;
    content.querySelector('#pr-no' ).addEventListener('click', () => advancePhraseReview(false));
    content.querySelector('#pr-yes').addEventListener('click', () => advancePhraseReview(true));
  }
}

function advancePhraseReview(knew) {
  if (!phraseReviewState) return;
  const phrase = phraseReviewState.phrases[phraseReviewState.currentIndex];
  const all = getPhrases();
  const idx = all.findIndex(p => p.id === phrase.id);
  if (idx !== -1) {
    all[idx].last_known  = knew;
    all[idx].seen_count  = (all[idx].seen_count || 0) + 1;
    savePhrases(all);
  }
  if (knew) phraseReviewState.knownCount++;
  phraseReviewState.currentIndex++;
  phraseReviewState.revealed = false;
  if (phraseReviewState.currentIndex >= phraseReviewState.totalCards) {
    finishPhraseReview();
  } else {
    renderPhraseReviewCard();
  }
}

function finishPhraseReview() {
  const { knownCount, totalCards, weakOnly, topic } = phraseReviewState;
  phraseReviewState = null;
  document.getElementById('quiz-progress-bar').style.width = '100%';
  document.getElementById('quiz-counter').textContent = '';

  const ratio = knownCount / totalCards;
  let emoji, message;
  if (ratio === 1)        { emoji = '🏆'; message = t('pr_perfect'); }
  else if (ratio >= 0.75) { emoji = '⭐'; message = t('pr_good'); }
  else if (ratio >= 0.5)  { emoji = '📖'; message = t('pr_ok'); }
  else                    { emoji = '💪'; message = t('pr_low'); }

  const content = document.getElementById('quiz-content');
  content.innerHTML = `
    <div class="grammar-finish">
      <div class="grammar-finish-emoji">${emoji}</div>
      <div class="grammar-finish-score">${knownCount} / ${totalCards} ${uiLang === 'en' ? 'known' : 'connues'}</div>
      <p class="grammar-finish-message">${escHtml(message)}</p>
      <div class="grammar-finish-actions">
        <button class="btn btn-primary   btn-full" id="pr-replay">${t('btn_retry')}</button>
        <button class="btn btn-secondary btn-full" id="pr-back">${t('btn_back_phrases')}</button>
      </div>
    </div>`;
  quitTarget = 'phrases';
  content.querySelector('#pr-replay').addEventListener('click', () => startPhraseReview(weakOnly, topic));
  content.querySelector('#pr-back' ).addEventListener('click', () => { showScreen('phrases'); renderPhrasesScreen(); });
}

/* ---- Phrase export/import ---- */
function exportPhrases() {
  const phrases = getPhrases();
  if (phrases.length === 0) { alert(t('alert_no_phrase_export')); return; }
  downloadJson(JSON.stringify(phrases, null, 2), 'phrases_' + currentLangKey + '.json');
}

async function sharePhrases() {
  const phrases = getPhrases();
  if (phrases.length === 0) { alert(t('alert_no_phrase_share')); return; }
  const json = JSON.stringify(phrases, null, 2);
  const filename = 'phrases_' + currentLangKey + '.txt';
  if (navigator.share) {
    const file = new File([json], filename, { type: 'text/plain' });
    const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });
    try {
      if (canShareFile) {
        await navigator.share({ files: [file], title: 'Phrases — ' + lang().title });
      } else {
        await navigator.share({ title: 'Phrases — ' + lang().title, text: json });
      }
    } catch(e) {
      if (e.name !== 'AbortError') exportPhrases();
    }
  } else {
    exportPhrases();
  }
}

function handlePhraseImportFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    let data;
    try { data = JSON.parse(e.target.result); }
    catch { alert(t('alert_invalid_json')); return; }
    if (!Array.isArray(data)) { alert(t('alert_invalid_format')); return; }
    const valid = data.filter(p => p && typeof p.native === 'string' && typeof p.target === 'string');
    if (valid.length === 0) { alert(t('alert_no_valid_phrases')); return; }
    pendingImportData = valid;
    const n = valid.length;
    _openImportModal(file,
      `${n} phrase${n > 1 ? 's' : ''} trouvée${n > 1 ? 's' : ''}`,
      '',
      'Comment souhaitez-vous importer ces phrases ?',
      'Ajoute les nouvelles phrases sans supprimer les existantes',
      'Supprime toutes les phrases existantes et importe celles-ci',
      'phrases',
      'Importer des phrases');
  };
  reader.readAsText(file);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function initEventListeners() {
  // Nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      showScreen(target);
      if (target === 'bank')    { renderWordList(document.getElementById('search-input').value); renderTagFilterBar(); }
      if (target === 'home')    updateHomeStats();
      if (target === 'grammar') renderGrammarScreen();
      if (target === 'phrases') renderPhrasesScreen();
      if (target === 'stats')   renderStats();
    });
  });

  // Lang chip → ouvre modal langue
  const langChip = document.getElementById('btn-lang-chip');
  if (langChip) langChip.addEventListener('click', () => { renderLanguageSelector(); openModal('modal-lang'); });

  // Aide
  const helpBtn = document.getElementById('btn-help');
  if (helpBtn) helpBtn.addEventListener('click', () => openModal('modal-help'));

  // Légende couleurs banque
  const bankLegendBtn = document.getElementById('btn-bank-legend');
  if (bankLegendBtn) bankLegendBtn.addEventListener('click', () => openModal('modal-bank-legend'));

  // Start quiz
  const startBtn = document.getElementById('btn-start-quiz');
  if (startBtn) startBtn.addEventListener('click', () => { if (!startBtn.disabled) startQuiz(); });

  // Quit quiz / grammar / phrase review
  const quitBtn = document.getElementById('btn-quit-quiz');
  if (quitBtn) {
    quitBtn.addEventListener('click', () => {
      const isActive = quizState || grammarReviewState || phraseReviewState;
      if (isActive && !confirm(t('confirm_quit'))) return;
      speechSynthesis && speechSynthesis.cancel();
      stopChronoTimer();
      quizState = null;
      grammarReviewState = null;
      phraseReviewState  = null;
      const dest = quitTarget;
      quitTarget = 'home';
      if      (dest === 'grammar') { showScreen('grammar'); renderGrammarScreen(); }
      else if (dest === 'phrases') { showScreen('phrases'); renderPhrasesScreen(); }
      else                         { showScreen('home');    updateHomeStats(); }
    });
  }

  // Grammar: add button
  const addGrammarBtn = document.getElementById('btn-add-grammar');
  if (addGrammarBtn) addGrammarBtn.addEventListener('click', openAddGrammarModal);

  // Grammar: review all
  const reviewAllBtn = document.getElementById('btn-grammar-review-all');
  if (reviewAllBtn) reviewAllBtn.addEventListener('click', () => {
    const lessons = [...new Set(getGrammarCards().map(c => c.lesson))];
    if (lessons.length > 1) openLessonPickerModal(false);
    else startGrammarReview(null, false);
  });

  const reviewWeakBtn = document.getElementById('btn-grammar-review-weak');
  if (reviewWeakBtn) reviewWeakBtn.addEventListener('click', () => {
    const lessons = [...new Set(getGrammarCards().map(c => c.lesson))];
    if (lessons.length > 1) openLessonPickerModal(true);
    else startGrammarReview(null, true);
  });

  // Grammar: list delegation (review per lesson, edit, delete)
  const grammarList = document.getElementById('grammar-list');
  if (grammarList) {
    grammarList.addEventListener('click', (e) => {
      const reviewBtn = e.target.closest('.grammar-review-btn');
      if (reviewBtn) { startGrammarReview(reviewBtn.dataset.lesson, false); return; }
      const actionBtn = e.target.closest('[data-action]');
      if (!actionBtn) return;
      const { action, id } = actionBtn.dataset;
      if (action === 'edit') openEditGrammarModal(id);
      else if (action === 'delete') {
        if (confirm(t('confirm_delete_grammar'))) { deleteGrammarCard(id); renderGrammarScreen(); }
      }
    });
  }

  // Phrases: add button
  const addPhraseBtn = document.getElementById('btn-add-phrase');
  if (addPhraseBtn) addPhraseBtn.addEventListener('click', openAddPhraseModal);

  // Phrases: review buttons
  const phrasesReviewAllBtn = document.getElementById('btn-phrases-review-all');
  if (phrasesReviewAllBtn) phrasesReviewAllBtn.addEventListener('click', () => {
    const topics = [...new Set(getPhrases().map(p => p.topic || ''))];
    if (topics.length > 1) openTopicPickerModal(false);
    else startPhraseReview(false);
  });
  const phrasesReviewWeakBtn = document.getElementById('btn-phrases-review-weak');
  if (phrasesReviewWeakBtn) phrasesReviewWeakBtn.addEventListener('click', () => {
    const topics = [...new Set(getPhrases().map(p => p.topic || ''))];
    if (topics.length > 1) openTopicPickerModal(true);
    else startPhraseReview(true);
  });

  // Phrases: list delegation (review by topic, edit, delete)
  const phrasesList = document.getElementById('phrases-list');
  if (phrasesList) {
    phrasesList.addEventListener('click', (e) => {
      const reviewBtn = e.target.closest('.grammar-review-btn');
      if (reviewBtn) { startPhraseReview(false, reviewBtn.dataset.topic); return; }
      const actionBtn = e.target.closest('[data-action]');
      if (!actionBtn) return;
      const { action, id } = actionBtn.dataset;
      if (action === 'edit') openEditPhraseModal(id);
      else if (action === 'delete') {
        if (confirm(t('confirm_delete_phrase'))) { deletePhrase(id); renderPhrasesScreen(); }
      }
    });
  }

  // Phrases: form submit
  const phraseForm = document.getElementById('form-add-phrase');
  if (phraseForm) {
    phraseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const native  = document.getElementById('input-phrase-native').value.trim();
      const target  = document.getElementById('input-phrase-target').value.trim();
      const topic   = document.getElementById('input-phrase-topic').value.trim();
      const errorEl = document.getElementById('form-phrase-error');
      const editId  = document.getElementById('edit-phrase-id').value;
      if (!native || !target) {
        errorEl.textContent = t('err_phrase_fields');
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      if (editId) updatePhrase(editId, native, target, topic);
      else addPhrase(native, target, topic);
      closeModal('modal-add-phrase');
      renderPhrasesScreen();
    });
  }

  // Phrases: share/export/import
  const phrasesShareBtn   = document.getElementById('btn-phrases-share');
  if (phrasesShareBtn) phrasesShareBtn.addEventListener('click', sharePhrases);
  const phrasesExportBtn  = document.getElementById('btn-phrases-export');
  const phrasesImportBtn  = document.getElementById('btn-phrases-import');
  const phrasesFileInput  = document.getElementById('phrases-import-file-input');
  if (phrasesExportBtn)  phrasesExportBtn.addEventListener('click', exportPhrases);
  if (phrasesImportBtn && phrasesFileInput) {
    phrasesImportBtn.addEventListener('click', () => phrasesFileInput.click());
    phrasesFileInput.addEventListener('change', () => {
      if (phrasesFileInput.files.length > 0) {
        handlePhraseImportFile(phrasesFileInput.files[0]);
        phrasesFileInput.value = '';
      }
    });
  }

  // Grammar: form submit
  const grammarForm = document.getElementById('form-add-grammar');
  if (grammarForm) {
    grammarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lesson   = document.getElementById('input-grammar-lesson').value.trim();
      const question = document.getElementById('input-grammar-question').value.trim();
      const answer   = document.getElementById('input-grammar-answer').value.trim();
      const errorEl  = document.getElementById('form-grammar-error');
      const editId   = document.getElementById('edit-grammar-id').value;
      if (!lesson || !question || !answer) {
        errorEl.textContent = t('err_all_fields');
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      if (editId) updateGrammarCard(editId, lesson, question, answer);
      else addGrammarCard(lesson, question, answer);
      closeModal('modal-add-grammar');
      renderGrammarScreen();
    });
  }

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.addEventListener('input', () => renderWordList(searchInput.value));

  // Add word
  const addBtn = document.getElementById('btn-add-word');
  if (addBtn) addBtn.addEventListener('click', openAddWordModal);

  // Word list: edit/delete via delegation
  const wordList = document.getElementById('word-list');
  if (wordList) {
    wordList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'edit') {
        openEditWordModal(id);
      } else if (action === 'delete') {
        if (confirm(t('confirm_delete_word'))) {
          deleteWord(id);
          renderTagFilterBar();
          renderWordList(document.getElementById('search-input').value);
          updateHomeStats();
        }
      }
    });
  }

  // Form submit
  const form = document.getElementById('form-add-word');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const native = document.getElementById('input-native').value.trim();
      const target = document.getElementById('input-target').value.trim();
      const errorEl = document.getElementById('form-error');
      const editId = document.getElementById('edit-word-id').value;
      if (!native || !target) {
        errorEl.textContent = t('err_fields_required');
        errorEl.classList.remove('hidden');
        return;
      }
      const existing = getWords().find(w =>
        w.native.toLowerCase() === native.toLowerCase() &&
        w.target.toLowerCase() === target.toLowerCase() &&
        w.id !== editId
      );
      if (existing) {
        errorEl.textContent = t('err_word_exists');
        errorEl.classList.remove('hidden');
        return;
      }
      errorEl.classList.add('hidden');
      const tags = parseTags(document.getElementById('input-tags').value);
      if (editId) updateWord(editId, native, target, tags);
      else addWord(native, target, tags);
      closeModal('modal-add-word');
      renderTagFilterBar();
      renderWordList(document.getElementById('search-input').value);
      updateHomeStats();
    });
  }

  // Export
  const shareBtn = document.getElementById('btn-share');
  if (shareBtn) shareBtn.addEventListener('click', shareWords);

  const exportBtn = document.getElementById('btn-export');
  if (exportBtn) exportBtn.addEventListener('click', exportWords);

  // Import
  const importBtn = document.getElementById('btn-import');
  const fileInput = document.getElementById('import-file-input');
  if (importBtn && fileInput) {
    importBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        handleImportFile(fileInput.files[0]);
        fileInput.value = '';
      }
    });
  }

  // Grammar share/export/import
  const grammarShareBtn  = document.getElementById('btn-grammar-share');
  if (grammarShareBtn) grammarShareBtn.addEventListener('click', shareGrammarCards);
  const grammarExportBtn = document.getElementById('btn-grammar-export');
  if (grammarExportBtn) grammarExportBtn.addEventListener('click', exportGrammarCards);

  const grammarImportBtn  = document.getElementById('btn-grammar-import');
  const grammarFileInput  = document.getElementById('grammar-import-file-input');
  if (grammarImportBtn && grammarFileInput) {
    grammarImportBtn.addEventListener('click', () => grammarFileInput.click());
    grammarFileInput.addEventListener('change', () => {
      if (grammarFileInput.files.length > 0) {
        handleGrammarImportFile(grammarFileInput.files[0]);
        grammarFileInput.value = '';
      }
    });
  }

  // Import modal actions
  const mergeBtn = document.getElementById('btn-merge');
  if (mergeBtn) mergeBtn.addEventListener('click', mergeImport);
  const replaceBtn = document.getElementById('btn-replace');
  if (replaceBtn) replaceBtn.addEventListener('click', replaceImport);

  // Score modal
  const replayBtn = document.getElementById('btn-replay');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      closeModal('modal-score');
      quizState = null;
      startQuiz();
    });
  }
  const goHomeBtn = document.getElementById('btn-go-home');
  if (goHomeBtn) {
    goHomeBtn.addEventListener('click', () => {
      closeModal('modal-score');
      quizState = null;
      showScreen('home');
      updateHomeStats();
    });
  }

  const retryErrorsBtn = document.getElementById('btn-retry-errors');
  if (retryErrorsBtn) {
    retryErrorsBtn.addEventListener('click', () => {
      const ids = retryErrorsBtn._failedIds || [];
      closeModal('modal-score');
      quizState = null;
      startRetryQuiz(ids);
    });
  }

  // Modal close buttons
  document.querySelectorAll('.modal-close, [data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.close;
      if (modalId) closeModal(modalId);
    });
  });

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        pendingImportData = null;
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
      pendingImportData = null;
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  applyTheme();
  applyFontSize();
  initTTS();
  translatePage();
  updateLangToggle();
  initEventListeners();
  renderLanguageSelector();
  renderModeSelector();
  renderQuizSettings();
  updateAppHeader();
  updateBankHeader();
  updateFormLabels();
  showScreen('home');
  registerSW();
  seedDemoIfEmpty();
  updateHomeStats();
  updateBackupBadge();
  const btnTheme    = document.getElementById('btn-theme');
  const btnFontSize = document.getElementById('btn-font-size');
  const btnUILang   = document.getElementById('btn-ui-lang');
  if (btnTheme)    btnTheme.addEventListener('click', toggleTheme);
  if (btnFontSize) btnFontSize.addEventListener('click', toggleFontSize);
  if (btnUILang)   btnUILang.addEventListener('click', () => setUILang(uiLang === 'fr' ? 'en' : 'fr'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
