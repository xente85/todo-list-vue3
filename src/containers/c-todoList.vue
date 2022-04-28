<template>
  <bTodoList
    ref="todoList"
    :list="filterList"
    :numItemsLeft="numItemsLeft"
    :routerFilter="routerFilter"
    @addItem="addItem"
    @changeAllItemStatus="changeAllItemStatus"
    @changeItemStatus="changeItemStatus"
    @changeItemText="changeItemText"
    @deleteItem="deleteItem"
    @clearCompleted="clearCompleted"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo, RouterItem } from '../interfaces'
import bTodoList from '../base/b-todoList.vue'

interface Props {
  active: boolean,
  completed: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: true,
  completed: true
})

const list = ref<Todo[]>([])
const loading = ref<boolean>(true)
const errorMsg = ref<string>('')
const todoList = ref<typeof bTodoList>()

const numItemsLeft = computed(() => list.value.filter(x => !x.completed).length)
const filterList = computed(() => list.value.filter(x => (props.completed && props.active) || x.completed === props.completed))

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

focus()
getTodoList()

function focus()
{
  if (todoList.value) todoList.value.focus()
}

async function getTodoList()
{
  loading.value = true

  fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo`)
    .then((res) =>
    {
      return res.json()
    })
    .catch((error) =>
    {
      errorMsg.value = error
    })
    .then((response) =>
    {
      loading.value = false
      list.value = response
    })
    .finally(() => loading.value = false)
}

function addItem({ text }:{ text: string })
{
  console.log('addItem', { text })
}

function changeItemStatus({ id, status }:{ id: number, status: boolean })
{
  console.log('changeItemStatus', { id, status })
  /*
  loading.value = true

  fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo`)
    .then((res) =>
    {
      return res.json()
    })
    .catch((error) =>
    {
      errorMsg.value = error
    })
    .then((response) =>
    {
      loading.value = false
      list.value = response
    })
    .finally(() => loading.value = false)
  */
}

function changeItemText({ id, text }:{ id: number, text: string })
{
  console.log('changeItemText', { id, text })
}

function changeAllItemStatus({ status }:{ status: boolean })
{
  console.log('changeAllItemStatus', { status })

  /*
  loading.value = true

  fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo`)
    .then((res) =>
    {
      return res.json()
    })
    .catch((error) =>
    {
      errorMsg.value = error
    })
    .then((response) =>
    {
      loading.value = false
      list.value = response
    })
    .finally(() => loading.value = false)
  */
}

function deleteItem({ id }:{ id: number })
{
  console.log('deleteItem', { id })
}

function clearCompleted()
{
  console.log('clearCompleted')
  /*
  loading.value = true

  fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo`)
    .then((res) =>
    {
      return res.json()
    })
    .catch((error) =>
    {
      errorMsg.value = error
    })
    .then((response) =>
    {
      loading.value = false
      list.value = response
    })
    .finally(() => loading.value = false)
  */
}

</script>

<style>
</style>
