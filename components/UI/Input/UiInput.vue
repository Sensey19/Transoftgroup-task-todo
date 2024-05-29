<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    required: true
  }
});
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="form-input">
    <label :for="id" class="form-input__label">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :name="id"
      class="form-input__field"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
  </div>
</template>

<style scoped lang="scss">
@import 'UiInput';
</style>
