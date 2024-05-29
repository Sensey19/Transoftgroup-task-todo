<script setup lang="ts">
import type { ITheadTable } from '~/@types/generalTypes';

defineProps({
  thead: {
    type: Array<ITheadTable>,
    required: true
  }
});
</script>

<template>
  <div class="table">
    <table class="container">
      <thead class="table__thead">
        <tr class="table__thead_tr">
          <th v-for="(th, index) of thead" :key="index" class="th-title">
            {{ th.title }}
          </th>
        </tr>
      </thead>
      <tbody class="table__tbody">
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@import 'UiTable';
</style>
