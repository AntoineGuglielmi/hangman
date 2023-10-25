<script lang="ts" setup>

import { WordsStore, ScoreStore, GameStore } from '~/stores'
import { EStatus } from '~/types'

const currentWord = computed(() => {
	return WordsStore().getCurrentWord
})

const letters = computed(() => {
	return currentWord.value.split('')
})

const letterIsFound = computed(() => {
	return (letter: string) => {
		return LettersStore().lettersOk.includes(letter)
	}
})

const gameIsLost = computed(() => {
	return ScoreStore().getGameStatus === EStatus.LOST
})

const runGame = () => {
	GameStore().runGame()
}

</script>

<template>

	<LayoutContainer>

		<div
			class="flex justify-center"
		>

			<button
				v-if="!currentWord"
				class="bg-white text-black rounded-full py-[8px] px-[16px]"
				@click.prevent="runGame()"
				id="runGame"
			>
				Commencer
			</button>

			<template
				v-else
			>
				<div
					v-for="(letter, index) in letters"
					:key="`${letter}_${index}`"
					class="h-10 w-10 flex justify-center items-center text-[32px]"
				>

					<template
						v-if="letter === '-'"
					>
						<p>{{ letter }}</p>
					</template>

					<template
						v-else-if="!letterIsFound(letter)"
					>
						<div
							v-if="!gameIsLost"
							class="h-[2px] w-[80%] bg-gray-700 self-end"
						/>
						<div
							v-else
							class="text-white bg-black/50 w-full h-full flex justify-center items-center rounded-[8px]"
						>
							<p>{{ letter }}</p>
						</div>
					</template>

					<template
						v-else
					>
						<p>{{ letter }}</p>
					</template>

				</div>
			</template>
		</div>

	</LayoutContainer>

</template>
