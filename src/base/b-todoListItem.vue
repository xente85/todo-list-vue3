<template>
  <li :class="classTodoItem">
    <div class="view">
      <input v-model="active" type="checkbox" class="toggle">
      <label @dblclick="modeEdit">{{ item.text }}</label>
      <button class="destroy" @click="deleteItem"></button>
    </div>
    <input v-model="textEdit" v-focus="editing" type="text" class="edit" @blur="stopEdit" @keydown.enter="stopEdit" @keydown.esc="cancelEdit">
  </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo } from '../interfaces'
import { vFocus } from '../directives'

interface Props {
  item: Todo,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'changeItemStatus', { id, status }:{ id: number, status: boolean }): void
  (e: 'changeItemText', { id, text }:{ id: number, text: string }): void
	(e: 'deleteItem', { id }:{ id: number }): void
}>()

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
.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: 506px;
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	/*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}
</style>