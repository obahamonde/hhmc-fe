<script setup lang="ts">
const props = defineProps({
	token: {
		type: String,
		required: true
	}
})
</script>
<template>
<div>{{ token }}</div>
</template>