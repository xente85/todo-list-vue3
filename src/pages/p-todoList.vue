<template>
  <section class="page">
    <header>
      <h1>todos</h1>
    </header>
    <section>
      <cTodoVue :list="filterList" @action="todoAction" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo } from '../interfaces/Todo'
import cTodoVue from '../containers/c-todoList.vue'

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

const filterList = computed(() => list.value.filter(x => (props.completed && props.active) || x.completed === props.completed))

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

getTodoList()

function todoAction()
{
  console.log('Todoaction')
}
</script>
