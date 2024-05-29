<script setup lang="ts">
import type { ITodo } from './types/TodoUserTypes';

defineProps({
  todos: {
    type: Array<ITodo>,
    required: true
  }
});
</script>

<template>
  <ul class="todos">
    <li v-for="(todo, index) of todos" :key="todo.id" class="todos__item">
      <p>{{ index + 1 }}. {{ todo.title }}</p>
      <p>{{ todo.completed }}</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import 'TodoUser';
</style>
