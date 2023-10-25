import { WordsStore } from '~/stores'
import { EStatus } from '~/types'

interface ILettersStore {
  letters: Array<string>
  lettersOk: Ref<Array<string>>
  lettersNotOk: Ref<Array<string>>
  chooseLetter: (letter: string) => void
  resetLetters: () => void
}

export const LettersStore = defineStore('letters', (): ILettersStore => {

  const lettersOk: Ref<Array<string>> = ref([])
  const lettersNotOk: Ref<Array<string>> = ref([])

  const letters = 'azertyuiopqsdfghjklmwxcvbn'.toUpperCase().split('').sort((a: string, b: string) => {
    return a.localeCompare(b)
  })

  const chooseLetter = (letter: string) => {
    const currentWord = WordsStore().getCurrentWord
    if (currentWord.includes(letter) && !lettersOk.value.includes(letter)) {
      lettersOk.value.push(letter)
      if (WordsStore().wordIsComplete) {
        ScoreStore().setGameStatus(EStatus.WON)
      }
    } else if (!currentWord.includes(letter) && !lettersNotOk.value.includes(letter)) {
      lettersNotOk.value.push(letter)
      ScoreStore().setCurrentErrors()
    }
  }

  const resetLetters = () => {
    lettersOk.value = []
    lettersNotOk.value = []
  }

  return {
    letters,
    lettersOk,
    lettersNotOk,
    chooseLetter,
    resetLetters
  }

})
