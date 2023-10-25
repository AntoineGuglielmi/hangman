import {
  LettersStore,
  ScoreStore,
  WordsStore
} from '~/stores'

import { EStatus } from '~/types'

interface IGameStore {
  reset: () => void
  runGame: () => void
}

export const GameStore = defineStore('game', (): IGameStore => {

  const runGame = () => {
    WordsStore().setCurrentWord()
    ScoreStore().setGameStatus(EStatus.IN_PROGRESS)
  }

  const reset = () => {
    LettersStore().resetLetters()
    ScoreStore().resetScore()
    WordsStore().setCurrentWord()
  }

  return {
    reset,
    runGame
  }

})
