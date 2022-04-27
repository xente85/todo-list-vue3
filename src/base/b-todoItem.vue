<template>
  <li>
    <div class="view">
      <input type="checkbox" class="toggle">
      <label>{{ item.text }}</label>
      <button class="destroy"></button>
    </div>
    <input type="text" class="edit">
  </li>
</template>

<script setup lang="ts">
import { Todo } from '../interfaces/Todo'

interface Props {
  item: Todo,
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style>

</style>