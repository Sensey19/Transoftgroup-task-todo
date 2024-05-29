<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <button type="button" class="btn" :aria-label="title">
    {{ title }}
  </button>
</template>

<style scoped lang="scss">
@import 'UiButton';
</style>
