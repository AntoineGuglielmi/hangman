<script lang="ts" setup>

import { UseForm } from '~/composables'

const {
	validationRules: {
		required
	},
	formIsValid,
	setError,
	getErrors
} = UseForm()

const onlyLettersAndDashes = (params: { message?: string } = {}) => {
	const {
		message = 'Que des lettres et des tirets !'
	} = params
	return (name: string, value: any) => {
		return /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(value) || setError('word', message)
	}
}

const props = defineProps<{
	modal: any
}>()

const form = {
	word: {
		value: '',
		label: '',
		type: 'text',
		layout: 'col-span-1',
		validationRules: [
			required(),
			onlyLettersAndDashes()
		]
	}
}

const respond = async () => {
	if (formIsValid(form)) {
		props.modal.respond(form.word.value)
	}
}

const input = ref(null)

onMounted(() => {
	input.value?.focus()
})

</script>

<template>
	<div
		class="bg-black/25 p-[2rem] rounded-[8px]"
	>
		<p>Propose un mot. <br>N'oublie pas : que des lettres et des tirets ! <br>Le jeu sera réinitialisé.</p>
		<form
			class="my-[16px]"
			@submit.prevent="respond"
		>
			<input
				ref="input"
				type="text"
				name="word"
				v-model="form.word.value"
				autofocus="autofocus"
				class="border border-white py-[8px] px-[16px] rounded-full bg-transparent transition"
				:class="{ '!border-red-400': getErrors('word') }"
			>
			<p
				v-if="getErrors('word')"
				class="text-red-400"
			>{{ getErrors('word')[0] }}</p>
		</form>
		<button
			@click.prevent="respond"
			class="bg-black/25 px-[16px] py-[8px] rounded-full"
		>Valider ton mot
		</button>
	</div>
</template>
