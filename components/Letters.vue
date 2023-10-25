<script lang="ts" setup>

import { LettersStore, ScoreStore } from '~/stores'
import { EStatus } from '~/types'
import { toSvg } from 'html-to-image'

const letters = LettersStore().letters

const dataUrl = ref('')

const chooseLetter = async (letter: string) => {
	if (ScoreStore().getGameStatus === EStatus.IN_PROGRESS) {
		LettersStore().chooseLetter(letter)
		return
	} else {
		const button = document.getElementById('runGame')
		dataUrl.value = await toSvg(button)
		flash.value?.show()
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
			// 'bg-gray-700': isLetterNotOk.value(letter),
			'border-white/30 text-white/30': isLetterOk.value(letter) || isLetterNotOk.value(letter),
		}
	}
})

const flash = ref(null)

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
					class="absolute top-[-8px] right-[-8px]"
				/>
			</button>
		</div>

		<LayoutFlash
			ref="flash"
			:duration="5000"
		>
			<div
				class="text-left bg-black/75 p-[16px] rounded-[8px] max-w-[500px]"
			>
				<p class="font-900">Aucun jeu en cours</p>
				<p>Tu dois lancer une partie en cliquant sur le bouton <img
					:src="dataUrl"
					alt='Bouton "Commencer"'
					class="w-[100px] inline"
				></p>
			</div>
		</LayoutFlash>

	</LayoutContainer>
</template>
