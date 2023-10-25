<script lang="ts" setup>

import { DifficultyStore, WordsStore, LettersStore } from '~/stores'

const currentDifficulty = ref(DifficultyStore().getCurrentDifficulty)

const setCurrentDifficulty = (difficulty: { name: string }) => {
	if (currentDifficulty.value.name === difficulty.name) return
	DifficultyStore().setCurrentDifficulty(difficulty)
	// WordsStore().setCurrentWord()
	LettersStore().resetLetters()
}

const computedActiveClasses = (difficulty: { name: string }) => {
	return {
		'bg-white text-black': currentDifficulty.value.name === difficulty.name,
		'hover:bg-white hover:text-black': currentDifficulty.value.name !== difficulty.name,
	}
}

</script>

<template>
  <LayoutContainer>

		<div
			class="flex flex-col items-center gap-[8px]"
		>

			<h2>Choisis une difficulté :</h2>

			<form
				class="flex gap-[8px]"
			>
				<template
					v-for="difficulty in DifficultyStore().difficulties"
					:key="difficulty"
				>
					<label
						class="block py-[8px] px-[16px] rounded-full cursor-pointer transition-all"
						:for="`difficulty_${difficulty.name}`"
						:class="computedActiveClasses(difficulty)"
					>{{ difficulty.name }}</label>
					<input
						:id="`difficulty_${difficulty.name}`"
						type="radio"
						:value="difficulty"
						v-model="currentDifficulty"
						@click="setCurrentDifficulty(difficulty)"
						class="hidden"
					>
				</template>
			</form>

		</div>

	</LayoutContainer>
</template>
