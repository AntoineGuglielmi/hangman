interface IDifficultyStore {
  difficulties: Array<{ name: string }>
  getCurrentDifficulty: ComputedRef<{ name: string }>
  setCurrentDifficulty: (difficulty: { name: string }) => void
}

export const DifficultyStore = defineStore('difficulty', (): IDifficultyStore => {

  const difficulties = [
    {
      name: 'Facile'
    },
    {
      name: 'Moyen'
    },
    {
      name: 'Difficile'
    }
  ]

  const currentDifficulty: Ref<{ name: string }> = ref({ name: 'Facile' })

  const getCurrentDifficulty = computed(() => {
    return currentDifficulty.value
  })

  const setCurrentDifficulty = (difficulty: { name: string }) => {
    currentDifficulty.value = difficulty
  }

  return {
    //MISC
    difficulties,

    //GETTERS
    getCurrentDifficulty,

    //SETTERS
    setCurrentDifficulty,
  }

})
