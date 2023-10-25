<script lang="ts" setup>

import { LettersStore, ScoreStore } from '~/stores'
import { EStatus } from '~/types'

const letters = LettersStore().letters

const chooseLetter = (letter: string) => {
	if (ScoreStore().getGameStatus === EStatus.IN_PROGRESS) {
		LettersStore().chooseLetter(letter)
	}
}

const isLetterOk = computed(() => {
	return (letter: string) => {
		return LettersStore().lettersOk.includes(letter)
	}
})

const isLetterNotOk = computed(() => {
	return (letter: string) => {
		return LettersStore().lettersNotOk.includes(letter)
	}
})

const computedLetterClasses = computed(() => {
	return (letter: string) => {
		return {
			// 'bg-puerto-rico': isLetterOk.value(letter),
			'bg-gray-700': isLetterNotOk.value(letter),
		}
	}
})

</script>

<template>
	<LayoutContainer>

		<div
			class="flex flex-wrap justify-center gap-[1rem]"
		>
			<button
				v-for="letter in letters"
				:key="letter"
				class="inline-flex items-center justify-center w-10 h-10 border border-white rounded-[8px] relative"
				:class="computedLetterClasses(letter)"
				@click.prevent="chooseLetter(letter)"
			>
				{{ letter }}
				<BadgesCheck
					v-if="isLetterOk(letter)"
					class="absolute top-[-5px] right-[-5px]"
				/>
			</button>
		</div>

	</LayoutContainer>
</template>
