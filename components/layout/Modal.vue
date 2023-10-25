<script lang="ts" setup>

const answer = ref()

const showModal = ref(false)

const response = ref(null)

const show = async () => {
	showModal.value = true
	response.value = await new Promise((resolve) => {
		answer.value = resolve
	})
	showModal.value = false
	return response.value
}

defineExpose({
	show,
})

const answers = [
	{
		label: 'Oui',
		value: true,
	},
	{
		label: 'Non',
		value: false,
	}
]

</script>

<template>
  <div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur"
		v-if="showModal"
	>
		<div>
			<p>Es-tu sûr de vouloir changer la difficulté ? Cela va réinitialiser le jeu.</p>
			<div
				class="flex gap-[8px]"
			>
				<button @click.prevent="answer(true)">Oui</button>
				<button @click.prevent="answer(false)">Non</button>
			</div>
		</div>
	</div>
</template>
