<script lang="ts" setup>

import { DifficultyStore, GameStore, WordsStore, ScoreStore } from '~/stores'
import { EStatus } from '~/types'

const currentDifficulty = computed(() => {
	return DifficultyStore().getCurrentDifficulty
})

const setCurrentDifficulty = async (difficulty: { name: string }) => {
	if (currentDifficulty.value.name === difficulty.name) return

	if (ScoreStore().getGameStatus === EStatus.IN_PROGRESS) {
		const changeDifficulty = await modalChangeDifficulty.value?.show()
		if (!changeDifficulty) return
	}

	DifficultyStore().setCurrentDifficulty(difficulty)

	if (ScoreStore().getGameStatus !== EStatus.PENDING) {
		GameStore().reset()
	}
}

const computedActiveClasses = (difficulty: { name: string }) => {
	return {
		'bg-white text-black': currentDifficulty.value.name === difficulty.name,
		'hover:bg-white hover:text-black': currentDifficulty.value.name !== difficulty.name,
	}
}

const modalChangeDifficulty = ref(null)
const modalSuggestWord = ref(null)

const suggestWord = async () => {
	const suggestedWord = await modalSuggestWord.value?.show()
	if (!suggestedWord) return
	WordsStore().submitSuggestedWord(suggestedWord)
	GameStore().reset(false)
}

</script>

<template>
  <LayoutContainer>

		<div
			class="flex flex-col items-center gap-[8px]"
		>

<!--			<h2>Choisis une difficulté :</h2>-->

			<div
				class="flex flex-col gap-[8px] bp768:flex-row"
			>

				<div
					class="flex gap-[8px]"
				>
					<button
						v-for="difficulty in DifficultyStore().difficulties"
						:key="difficulty"
						class="block py-[8px] px-[16px] rounded-full cursor-pointer transition-all"
						:class="computedActiveClasses(difficulty)"
						@click="setCurrentDifficulty(difficulty)"
					>
						{{ difficulty.name }}
					</button>
				</div>

				<button
					class="bg-white text-black px-[16px] py-[8px] rounded-full relative"
					@click.prevent="suggestWord"
				>
					Propose ton mot !
					<IconsLabel
						class="absolute h-[20px] w-[20px] top-[-6px] right-[-6px] text-blue-500"
					/>
				</button>
			</div>

		</div>



		<LayoutModal
			ref="modalChangeDifficulty"
		>
			<ModalsYesNo
				:modal="modalChangeDifficulty"
			>
				<p>Es-tu sûr de vouloir changer la difficulté ? <br>Cela va réinitialiser le jeu.</p>
			</ModalsYesNo>
		</LayoutModal>



		<LayoutModal
			ref="modalSuggestWord"
		>
			<ModalsSuggestWord
				:modal="modalSuggestWord"
			/>
		</LayoutModal>



	</LayoutContainer>
</template>
