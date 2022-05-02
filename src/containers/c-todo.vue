<template>
  <bTodoList
    ref="todoList"
    :list="store.filterList"
    :numItems="store.list.length"
    :numItemsLeft="store.numItemsLeft"
    :routerFilter="routerFilter"
    :loading="store.loading"
    @addItem="store.addItem"
    @changeAllItemStatus="store.changeAllItemStatus"
    @changeItemStatus="store.changeItemStatus"
    @changeItemText="store.changeItemText"
    @deleteItem="store.deleteItem"
    @clearCompleted="store.clearCompleted"
  />
  <p v-if="store.errorMsg">{{ store.errorMsg }}</p>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { RouterItem } from '../interfaces'
import bTodoList from '../base/b-todoList.vue'
import { useTodoStore } from '../store/todo'

interface Props {
  active: boolean,
  completed: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: true,
  completed: true
})

const store = useTodoStore()

store.filterActive = props.active
watch(() => props.active, () => store.filterActive = props.active)

store.filterComplete = props.completed
watch(() => props.completed, () => store.filterComplete = props.completed)

store.getTodoList()

const routerFilter: RouterItem[] = [
  {
    id: 1,
    name: 'todo',
    label: 'All'
  },
  {
    id: 2,
    name: 'todo-active',
    label: 'Active'
  },
  {
    id: 3,
    name: 'todo-completed',
    label: 'Completed'
  }
]
</script>

<style>
</style>
