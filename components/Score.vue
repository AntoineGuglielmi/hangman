<script lang="ts" setup>

import { ScoreStore, GameStore } from '~/stores'
import { EStatus } from '~/types'

const currentScore = computed(() => {
	return ScoreStore().getCurrentErrors
})

const gameIsLost = computed(() => {
	return ScoreStore().getGameStatus === EStatus.LOST
})

const gameIsWon = computed(() => {
	return ScoreStore().getGameStatus === EStatus.WON
})

const showButton = computed(() => {
	return gameIsLost.value || gameIsWon.value
})

const computedButtonText = computed(() => {
	return gameIsLost.value ? 'Retente ta chance !' : 'Recommencer'
})

</script>

<template>
	<LayoutContainer>

		<section>

			<p
				v-if="gameIsWon"
			>😎 Bien joué !</p>

			<p
				v-else
				class="text-[1.25rem]"
			>{{ currentScore.text }}</p>

			<button
				v-if="showButton"
				@click.prevent="GameStore().reset()"
				class="flex-inline py-[8px] px-[16px] rounded-full bg-white text-black mt-[3rem]"
			>
				{{ computedButtonText }}
			</button>

		</section>

	</LayoutContainer>
</template>
