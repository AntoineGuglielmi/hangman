import { EStatus } from '~/types'

interface IScoreStore {
  steps: Array<{ id: number, text: string }>
  getCurrentErrors: ComputedRef<{ id: number, text: string }>
  setCurrentErrors: () => void
  setGameStatus: (status: EStatus) => void
  getGameStatus: ComputedRef<EStatus>
  resetScore: () => void
}

export const ScoreStore = defineStore('score', (): IScoreStore => {

  const steps = [
    {
      id: 0,
      text: ''
    },
    {
      id: 1,
      text: '😊 Raté'
    },
    {
      id: 2,
      text: '😅 Hey non !'
    },
    {
      id: 3,
      text: '😏 Haha'
    },
    {
      id: 4,
      text: '🥴 Hum...'
    },
    {
      id: 5,
      text: '😧 Heu...'
    },
    {
      id: 6,
      text: '😨 Dernière chance'
    },
    {
      id: 7,
      text: '😵 Duuur...'
    }
  ]

  const errors = ref(0)
  const gameStatus: Ref<EStatus> = ref(EStatus.PENDING)

  const getCurrentErrors = computed(() => {
    return steps[errors.value]
  })

  const setCurrentErrors = () => {
    errors.value++
    if (errors.value === steps.length - 1) {
      gameStatus.value = EStatus.LOST
    }
  }

  const setGameStatus = (status: EStatus) => {
    gameStatus.value = status
  }

  const getGameStatus = computed(() => {
    return gameStatus.value
  })

  const resetScore = () => {
    errors.value = 0
    gameStatus.value = EStatus.IN_PROGRESS
  }

  return {
    steps,
    getCurrentErrors,
    setCurrentErrors,
    setGameStatus,
    getGameStatus,
    resetScore,
  }

})
