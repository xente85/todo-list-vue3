/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import bTodoList from '../../src/base/b-todoList.vue'
import { RouterItem } from '../../src/interfaces'

describe('bTodoList', () =>
{
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

  const mockList = [
    {
      id: 1,
      text: 'Item 1',
      completed: true
    },
    {
      id: 2,
      text: 'Item 2',
      completed: false
    }
  ]

  const props = {
    list: mockList,
    numItems: mockList.length,
    numItemsLeft: mockList.filter(x => !x.completed).length,
    routerFilter: routerFilter,
    loading: true
  }

  it('Should render main and footer', async () =>
  {
    const { container } = await render(bTodoList, { props })

    const inputText = container.querySelector('.new-todo')
    expect(inputText).toBeTruthy()

    const loader = container.querySelector('.loader')
    expect(loader).toBeTruthy()

    const main = container.querySelector('.main')
    expect(main).toBeTruthy()

    const state = props.numItemsLeft === 0
    const toggleAllStatus = container.querySelector('#toggleAll')
    expect(toggleAllStatus).toBeTruthy()
    expect(toggleAllStatus.checked).toEqual(state)

    const listItems = container.querySelector('transition-group-stub')
    expect(listItems).toBeTruthy()

    const items = listItems.querySelectorAll('li')
    expect(items).toHaveLength(props.list.length)

    const footer = container.querySelector('.footer')
    expect(footer).toBeTruthy()

    const count = footer.querySelector('.todo-count')
    expect(count).toBeTruthy()
    const countText = (props.numItemsLeft === 1) ? 'item left' : 'items left'
    expect(count.textContent).toBe(`${props.numItemsLeft} ${countText}`)

    const clearButton = footer.querySelector('.clear-completed')
    if(props.numItems !== props.numItemsLeft) expect(clearButton).toBeTruthy()
    else expect(clearButton).toBeFalsy()

    const filters = footer.querySelectorAll('li')
    expect(filters).toHaveLength(routerFilter.length)
  })

  it('Should render without main and footer', async () =>
  {
    const { container } = await render(bTodoList, { props: { ...props, numItems: 0 } })

    const main = container.querySelector('.main')
    expect(main.style.display).toBe('none')

    const footer = container.querySelector('.footer')
    expect(footer.style.display).toBe('none')
  })

  it('Add item', async () =>
  {
    const { container, emitted } = await render(bTodoList, { props })

    const newText = 'new text'
    const inputText = container.querySelector('.new-todo')
    await fireEvent.update(inputText, newText)

    // Key press
    await fireEvent.keyDown(inputText, { key: 'Enter', keyCode: 13 })
    const emitTextEnter = emitted()
    expect(emitTextEnter).toHaveProperty('addItem')
    expect(emitTextEnter.addItem).toHaveLength(1)
    expect(emitTextEnter.addItem[0][0]).toHaveProperty('text')
    expect(emitTextEnter.addItem[0][0].text).equals(newText)

    // Escape
    await fireEvent.keyDown(inputText, { key: 'Esc', keyCode: 27 })
    expect(inputText.value).equals('')
  })

  it('Change all item status', async () =>
  {
    const { container, emitted } = await render(bTodoList, { props })

    const state = props.numItemsLeft === 0
    const toggleStatus = container.querySelector('#toggleAll')
    await fireEvent.change(toggleStatus, { target: { checked: !state } })
    const emitStatus = emitted()
    expect(emitStatus).toHaveProperty('changeAllItemStatus')
    expect(emitStatus.changeAllItemStatus).toHaveLength(1)
    expect(emitStatus.changeAllItemStatus[0][0]).toHaveProperty('status')
    expect(emitStatus.changeAllItemStatus[0][0].status).equals(!state)
  })

  it('Clear complete', async () =>
  {
    const { container, emitted } = await render(bTodoList, { props: { ...props, numItems: 2, numItemsLeft: 1 } })

    const destroy = container.querySelector('.clear-completed')
    await fireEvent.click(destroy)
    const emit = emitted()
    expect(emit).toHaveProperty('clearCompleted')
    expect(emit.clearCompleted).toHaveLength(1)
  })
})
