<script lang="ts" setup>

const props = withDefaults(defineProps<{
	duration: number
}>(), {
	duration: 3000
})

const showFlash = ref(false)

const show = async () => {
	showFlash.value = true
	await new Promise((resolve) => {
		setTimeout(() => {
			showFlash.value = false
			resolve(true)
		}, props.duration)
	})
}

defineExpose({
	show
})

</script>

<template>
	<Transition>

		<div
			class="fixed bottom-0 left-0 right-0 p-[1rem]"
			v-if="showFlash"
		>
			<slot />
		</div>

	</Transition>
</template>

<style lang="css" scoped>

.v-enter-active {
	transition: transform 0.5s cubic-bezier(0,1.49,.71,1);
}

.v-leave-active {
	transition: transform 0.5s cubic-bezier(.9,0,.2,.6);
}

.v-enter-from {
	transform: translateX(-200%);
}

.v-leave-to {
	transform: translateX(200%);
}

</style>
