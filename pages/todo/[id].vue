<script setup lang="ts">
import type { IUser } from '~/@types/generalTypes';
import type { ITodo } from '~/components/TodoUser/types/TodoUserTypes';

definePageMeta({
  validate({ params }) {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    return /^\d+$/.test(id);
  }
});

const route = useRoute();
const userId = ref<string>('');
const setUserId = (): void => {
  if (typeof route.params.id === 'string') {
    userId.value = route.params.id;
  } else if (Array.isArray(route.params.id) && route.params.id.length > 0) {
    userId.value = route.params.id[0];
  } else {
    console.error('Invalid id', route.params.id);
  }
};
setUserId();
// Personal user info
const user = ref<IUser | null>(null);
const getUser = async (): Promise<void> => {
  const { data } = await useApi(`/users/${userId.value}`, {
    pick: ['id', 'name']
  });
  if (!data.value.error) user.value = data.value;
};
// Detailed information about the user
const todos = ref<ITodo[]>([]);
const getTodos = async (): Promise<void> => {
  const { data } = await useApi(`/todos?userId=${userId.value}`);
  if (!data.value.error) todos.value = data.value;
};
// Common
if (userId.value) {
  getUser();
  getTodos();
}
</script>

<template>
  <h3 v-if="user" class="title">{{ user.name }}</h3>
  <todo-user v-if="todos.length" :todos="todos" />
  <nuxt-link class="bth-link" to="/">Back to users</nuxt-link>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 30px;
}
</style>
