<template>
  <section class="page">
    <header>
      <h1>todos</h1>
    </header>
    <section>
      <cTodoList :active="active" :completed="completed"/>
    </section>
  </section>
</template>

<script setup lang="ts">
import cTodoList from '../containers/c-todo.vue'

interface Props {
  active: boolean,
  completed: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: true,
  completed: true
})
</script>
