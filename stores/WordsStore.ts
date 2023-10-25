import { DifficultyStore, LettersStore } from '~/stores'
import { StringHelper } from '~/helpers'

interface IWordsStore {
  getCurrentWord: ComputedRef<string>
  setCurrentWord: () => void
  wordIsComplete: ComputedRef<boolean>
  submitSuggestedWord: (suggestedWord: string) => void
}

export const WordsStore = defineStore('words', (): IWordsStore => {

  const words: Record<string, Array<string>> = {
    Facile: [
      'Chien',
      'Chat',
      'Soleil',
      'Maison',
      'Table',
      'Plage',
      'Fleur',
      'Pomme',
      'Livre',
      'Montagne',
      'Ciel',
      'Mer',
      'Bateau',
      'Étoile',
      'Rouge',
      'Vert',
      'Jaune',
      'École',
      'Oiseau',
      'Musique',
      'Maman',
      'Papier',
      'Forêt',
      'Jardin',
      'Lapin',
      'Gâteau',
      'Chemin',
      'Neige',
      'Vélo',
      'Joueur',
    ],
    Moyen: [
      'Ordinateur',
      'Télévision',
      'Banane',
      'Bibliothèque',
      'Tournesol',
      'Restaurant',
      'Téléphone',
      'Caméra',
      'Licorne',
      'Horloge',
      'Piscine',
      'Dentiste',
      'Piano',
      'Éléphant',
      'Dauphin',
      'Bonheur',
      'Arc-en-ciel',
      'Papillon',
      'Fusée',
      'Astronaute',
      'Papier-monnaie',
      'Médecin',
      'Magicien',
      'Super-héros',
      'Volcano',
      'Sirène',
      'Atlantide',
      'Rétrograde',
      'Château-fort',
      'Labyrinthe',
    ],
    Difficile: [
      'Paradoxal',
      'Énigmatique',
      'Psychologie',
      'Quantum',
      'Phénoménal',
      'Mégalomane',
      'Intrigant',
      'Inconcevable',
      'Sérendipité',
      'Électrodynamique',
      'Ébullition',
      'Mnémonique',
      'Aphrodisiaque',
      'Météorologie',
      'Tautologie',
      'Palimpseste',
      'Oxymore',
      'Magnanime',
      'Anamorphose',
      'Pléthorique',
      'Nihilisme',
      'Cryptographie',
      'Accélération',
      'Cataclysmique',
      'Périssologie',
      'Sycophante',
      'Parapluie',
      'Rhinocéros',
      'Quiproquo',
      'Xylographie',
    ]
  }

  const currentWord: Ref<string> = ref('')

  const getCurrentWord = computed(() => {
    return currentWord.value
  })

  const setCurrentWord = () => {
    currentWord.value = pickAWord()
  }

  const pickAWord = (forceWord?: string) => {
    let word
    if (!forceWord) {
      const currentDifficulty = DifficultyStore().getCurrentDifficulty
      const randomIndex = Math.floor(Math.random() * words[currentDifficulty.name].length)
      word = words[currentDifficulty.name][randomIndex]
    } else {
      word = forceWord
    }
    return StringHelper().removeAccents(word).toUpperCase()
  }

  const wordIsComplete = computed(() => {
    return StringHelper().diffChars(currentWord.value, LettersStore().lettersOk.join()).length === 0
  })

  const submitSuggestedWord = (suggestedWord: string) => {
    currentWord.value = pickAWord(suggestedWord)
  }

  return {
    //GETTERS
    getCurrentWord,
    wordIsComplete,

    //SETTERS
    setCurrentWord,
    submitSuggestedWord
  }

})
