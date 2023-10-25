import {
  LettersStore,
  ScoreStore,
  WordsStore
} from '~/stores'

import { EStatus } from '~/types'

interface IGameStore {
  reset: (resetWord?: boolean) => void
  runGame: () => void
}

export const GameStore = defineStore('game', (): IGameStore => {

  const runGame = () => {
    WordsStore().setCurrentWord()
    ScoreStore().setGameStatus(EStatus.IN_PROGRESS)
  }

  const reset = (resetWord = true) => {
    LettersStore().resetLetters()
    ScoreStore().resetScore()
    resetWord && WordsStore().setCurrentWord()
  }

  return {
    reset,
    runGame
  }

})
