<template>
  <li :class="classTodoItem">
    <div class="view">
      <input v-model="active" type="checkbox" class="toggle">
      <label @dblclick="modeEdit">{{ item.text }}</label>
      <button class="destroy" @click="deleteItem"></button>
    </div>
    <input v-if="editing" v-model="textEdit" v-focus-edit="editing" type="text" class="edit" @blur="stopEdit" @keydown.enter="stopEdit" @keydown.esc="cancelEdit">
  </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo } from '../interfaces'
import { vFocusEdit } from '../directives'

interface Props {
  item: Todo,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['changeItemStatus', 'changeItemText', 'deleteItem'])

const editing = ref<boolean>(false)
const textEdit = ref<string>(props.item.text)

const active = computed<boolean>({
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
    editing: editing.value
  }
})

function modeEdit()
{
  editing.value = true
}

function stopEdit()
{
  if (editing.value && textEdit.value != props.item.text) emit('changeItemText', { id: props.item.id, text: textEdit.value })
  editing.value = false
}

function cancelEdit()
{
  textEdit.value = props.item.text
  editing.value = false
}

function deleteItem()
{
  emit('deleteItem', { id: props.item.id })
}

</script>

<style>

</style>