
import { createWebHistory, createRouter } from 'vue-router'
import pTodoVue from '../pages/todoList.vue'
import pNotFoundVue from '../pages/notFound.vue'

const routes = [
  {
    path: '/',
    name: 'todo',
    component: pTodoVue,
    props: { active: true, completed: true }
  },
  {
    path: '/active',
    name: 'todo-active',
    component: pTodoVue,
    props: { active: true, completed: false }
  },
  {
    path: '/completed',
    name: 'todo-completed',
    component: pTodoVue,
    props: { active: false, completed: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: pNotFoundVue
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router