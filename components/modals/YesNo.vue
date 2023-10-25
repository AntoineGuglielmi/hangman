<script lang="ts" setup>

const props = defineProps<{
	modal: any
}>()

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
		class="bg-black/25 p-[2rem] rounded-[8px]"
	>
		<slot />
		<div
			class="flex gap-[8px] justify-center mt-[16px]"
		>
			<button
				v-for="answer in answers"
				:key="answer"
				@click.prevent="modal.respond(answer.value)"
				class="bg-black/25 px-[16px] py-[8px] rounded-full"
			>{{ answer.label }}</button>
		</div>
	</div>
</template>
