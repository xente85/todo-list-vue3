<template>
  <div>
    <div>
      <p>Todo:</p>
      <p>Active: {{ active }}</p>
      <p>Completed: {{ completed }}</p>

      <TransitionGroup name="list" tag="ul">
        <li v-for="item in filterList" :key="item.id">
          {{ item.text }}
        </li>
      </TransitionGroup>
    </div>

    <router-link :to="{ name: 'todo' }">
      home
    </router-link>
    <router-link :to="{ name: 'todo-active' }">
      active
    </router-link>
    <router-link :to="{ name: 'todo-completed' }">
      completed
    </router-link>
    <router-link to="/404">
      no found
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

interface Props {
  active: boolean,
  completed: boolean
}

interface Item {
  id: number,
  text: string,
  completed: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  active: true,
  completed: true
})

const list = ref<Item[]>([
  {
    id: 1,
    text: '1 - Active',
    completed: false
  },
  {
    id: 2,
    text: '2 - Completado',
    completed: true
  },
  {
    id: 3,
    text: '3 - Completado',
    completed: true
  },
  {
    id: 4,
    text: '4 - Active',
    completed: false
  }
])

const filterList = computed(() => list.value.filter(x => (props.completed && props.active) || x.completed === props.completed))

</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
