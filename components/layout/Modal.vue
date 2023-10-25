<script lang="ts" setup>

const respond = ref()

const showModal = ref(false)

const response = ref(null)

const show = async () => {
	showModal.value = true
	response.value = await new Promise((resolve) => {
		respond.value = resolve
	})
	showModal.value = false
	return response.value
}

defineExpose({
	show,
	respond
})

</script>

<template>
  <div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur p-[1rem]"
		v-if="showModal"
		@click.self="respond(false)"
	>
		<slot />
	</div>
</template>
