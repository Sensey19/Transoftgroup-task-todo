<script setup lang="ts">
import type { IUser, ITheadTable } from '~/@types/generalTypes';
// Users
const theadUsers = ref<ITheadTable[]>([
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  { title: 'Phone', field: 'phone' }
]);
const users = ref<IUser[]>([]);
const getUsers = async (): Promise<void> => {
  const { data } = await useApi('/users', {
    transform: (users: any) => {
      return users.map(({ id, name, email, phone }: IUser): IUser => {
        return { id, name, email, phone };
      });
    }
  });
  if (!data.value.error) users.value = data.value;
};
const saveCurrentPage = (page: number): void => localStorage.setItem('currentPage', String(page));
onMounted(() => {
  nextTick(async () => {
    await getUsers();
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) currentPage.value = Number(savedPage);
  });
});
// Pagination settings
const pageSize = ref<number>(5);
const currentPage = ref<number>(1);
const totalPages = computed((): number => Math.ceil(filteredUsers.value.length / pageSize.value));
const currentPageUsers = computed((): IUser[] => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = Math.min(startIndex + pageSize.value, filteredUsers.value.length);
  return filteredUsers.value.slice(startIndex, endIndex);
});
const changePage = (page: number): void => {
  currentPage.value = page;
  saveCurrentPage(page);
};
const prevPage = (): void => {
  if (currentPage.value > 1) changePage(currentPage.value - 1);
};
const nextPage = (): void => {
  if (currentPage.value < totalPages.value) changePage(currentPage.value + 1);
};
// Search user
const searchQuery = ref<string>('');
watch(searchQuery, () => {
  changePage(1);
});
const filteredUsers = computed((): IUser[] | [] => {
  const query = searchQuery.value.trim().toLowerCase();
  return query ? users.value.filter(user => user.name.toLowerCase().includes(query)) : users.value;
});
</script>

<template>
  <!-- Search input -->
  <ui-input
    id="search"
    v-model="searchQuery"
    placeholder="Search user"
    label="Search user by typing"
    autocomplete="name"
  />
  <template v-if="users.length">
    <!--Table of users-->
    <ui-table :thead="theadUsers">
      <template #body>
        <tr v-for="user of currentPageUsers" :key="user.id" class="table__tbody_tr">
          <td v-for="column of theadUsers" :key="column.field" class="td-title">
            <nuxt-link v-if="column.field === 'name'" :to="`/todo/${user.id}`">
              {{ user.name }}
            </nuxt-link>
            <p v-else>{{ user[column.field] }}</p>
          </td>
        </tr>
      </template>
    </ui-table>
    <!--Pagination-->
    <ui-pagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @switch-page="changePage"
    />
  </template>
</template>

<style scoped lang="scss">
.form-input {
  margin-bottom: 20px;
}

.pagination {
  @extend %flex-fully-center;
  margin-top: 25px;
}
</style>
