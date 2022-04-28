<template>
  <li :class="classTodoItem">
    <div class="view">
      <input v-model="model" type="checkbox" class="toggle">
      <label>{{ item.text }}</label>
      <button class="destroy" @click="deleteItem"></button>
    </div>
    <input type="text" class="edit">
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Todo } from '../interfaces'

interface Props {
  item: Todo,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['changeItemStatus', 'deleteItem'])

const model = computed<boolean>({
  get ()
  {
    return props.item.completed
  },
  set (status)
  {
    return emit('changeItemStatus', { id: props.item.id, status })
  }
})

const classTodoItem = computed(() =>
{
  return {
    completed: props.item.completed,
    editing: false
  }
})

function deleteItem()
{
  emit('deleteItem', { id: props.item.id })
}

</script>

<style>

</style>