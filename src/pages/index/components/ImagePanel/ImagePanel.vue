<script setup>
import Cursor from "../Cursor.vue";
const props = defineProps({
  fromImageURL: { type: String, required: true },
});
</script>

<template>
  <img class="w-hull h-full" :src="fromImageURL" draggable="false" />
  <Cursor />
</template>

<style lang="scss" scoped></style>
