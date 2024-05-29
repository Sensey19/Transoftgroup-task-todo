<script setup lang="ts">
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});
defineEmits(['prev-page', 'next-page', 'switch-page']);
</script>

<template>
  <div class="pagination">
    <ui-button title="Prev" :disabled="currentPage === 1" @click="$emit('prev-page')" />
    <section class="pagination__numbers">
      <button
        v-for="page of totalPages"
        :key="page"
        :class="['bth-number', { active: page === currentPage }]"
        @click="$emit('switch-page', page)"
      >
        {{ page }}
      </button>
    </section>
    <ui-button title="Next" :disabled="currentPage === totalPages" @click="$emit('next-page')" />
  </div>
</template>

<style scoped lang="scss">
@import 'UiPagination';
</style>
