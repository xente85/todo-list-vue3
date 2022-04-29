<template>
  <input v-model="newItem" v-focus-edit="true" class="new-todo" type="text" @keydown.enter="addItem" @keydown.esc="newItem = ''"/>
  <bLoaderBar v-show="loading" class="loader"/>
	<div v-show="numItems > 0" class="main">
    <input v-model="toggleAll" class="toggle-all edit" type="checkbox" id="toggleAll">
    <label for="toggleAll"></label>
    <TransitionGroup class="todo-list" name="list" tag="ul">
      <bTodoListItem
				v-for="item in list"
				:key="item.id"
				:item="item"
				@changeItemStatus="changeItemStatus"
				@changeItemText="changeItemText"
				@deleteItem="deleteItem"
			/>
    </TransitionGroup>
  </div>
  <div v-show="numItems > 0" class="footer">
    <div class="todo-count">
			<strong>{{ numItemsLeft }}</strong> {{ numItemsLeftText }}</div>
    <div class="filters">
      <ul>
				<li v-for="route in routerFilter" :key="route.id">
					<router-link :to="{ name: route.name }" active-class="selected">
            {{ route.label }}
          </router-link>
				</li>
      </ul>
    </div>
    <button v-if="numItems !== numItemsLeft" class="clear-completed" @click="clearCompleted">Clear completed</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo, RouterItem } from '../interfaces'
import { vFocusEdit } from '../directives'
import bTodoListItem from './b-todoListItem.vue'
import bLoaderBar from './b-loaderBar.vue'

interface Props {
  list: Todo[],
  numItems: number,
	numItemsLeft: number,
	routerFilter: RouterItem[],
	loading: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const newItem = ref<string>('')

const emit = defineEmits(['changeAllItemStatus', 'addItem', 'changeItemStatus', 'changeItemText', 'deleteItem', 'clearCompleted'])

const toggleAll = computed<boolean>({
  get ()
  {
    return props.numItemsLeft === 0
  },
  set (status)
  {
    emit('changeAllItemStatus', { status })
  }
})

const numItemsLeftText = computed(() => (props.numItemsLeft === 1) ? 'item left' : 'items left')

function addItem()
{
	if (!newItem.value) return
	emit('addItem', { text: newItem.value })
	newItem.value = ''
}

function changeItemText({ id, text }:{ id: number, text: string })
{
	emit('changeItemText', { id, text })
}

function changeItemStatus({ id, status }:{ id: number, status: boolean })
{
	emit('changeItemStatus', { id, status })
}

function deleteItem({ id }:{ id: number })
{
	emit('deleteItem', { id })
}

function clearCompleted()
{
	emit('clearCompleted')
}
</script>

<style>
.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	border: 0;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	text-align: center;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
}

.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: -52px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all + label:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.footer {
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
              0 8px 0 -3px #f6f6f6,
              0 9px 1px -3px rgba(0, 0, 0, 0.2),
              0 16px 0 -6px #f6f6f6,
              0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
}

.filters li a:hover {
	border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
	border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

.info {
	margin: 65px auto 0;
	color: #bfbfbf;
	font-size: 10px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio:0) {
	.toggle-all,
	.todo-list li .toggle {
		background: none;
	}

	.todo-list li .toggle {
		height: 40px;
	}
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}

	.filters {
		bottom: 10px;
	}
}

.loader {
	position: absolute;
	top: 64px;
}

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
