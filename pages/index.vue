<script lang="ts" setup>

import { ScoreStore } from '~/stores'
import { EStatus } from '~/types'

useHead({
	title: 'Jeu du pendu',
	link: [
		{
			rel: 'icon',
			type: 'image/svg',
			href: '/favicon.svg'
		}
	]
})

const victory = computed(() => {
	return ScoreStore().getGameStatus === EStatus.WON
})
</script>

<template>

	<video
		src="/videos/confettis.webm"
		v-if="victory"
		autoplay
		loop
		class="fixed top-0 left-0 w-full -z-10"
	></video>

	<section
		class="flex flex-col gap-[3rem] relative z-10"
	>
		<Difficulty/>

		<Word/>

		<Letters/>

		<Score />
	</section>

</template>
