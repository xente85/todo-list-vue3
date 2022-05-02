/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import bTodoListItem from '../../src/base/b-todoListItem.vue'
import { Todo } from '../../src/interfaces'

describe('bTodoListItem', () =>
{
  const mockItem: Todo = {
    id: 1,
    text: 'Item 1',
    completed: true
  }

  it('Should render', async () =>
  {
    const { getByText, container } = await render(bTodoListItem, { props: { item: mockItem } })
    expect(getByText(mockItem.text)).toBeTruthy()

    const toggleStatus = container.querySelector('.toggle')
    expect(toggleStatus.checked).toEqual(mockItem.completed)

    const destroy = container.querySelector('.destroy')
    expect(destroy).toBeTruthy()
  })

  it('Item destroy', async () =>
  {
    const { container, emitted } = await render(bTodoListItem, { props: { item: mockItem } })

    const destroy = container.querySelector('.destroy')
    await fireEvent.click(destroy)
    const emit = emitted()
    expect(emit).toHaveProperty('deleteItem')
    expect(emit.deleteItem).toHaveLength(1)
    expect(emit.deleteItem[0][0]).toHaveProperty('id')
    expect(emit.deleteItem[0][0].id).equals(mockItem.id)
  })

  it('Item change status', async () =>
  {
    const { container, emitted } = await render(bTodoListItem, { props: { item: mockItem } })

    const toggleStatus = container.querySelector('.toggle')
    await fireEvent.change(toggleStatus, { target: { checked: !mockItem.completed } })
    const emitStatus = emitted()
    expect(emitStatus).toHaveProperty('changeItemStatus')
    expect(emitStatus.changeItemStatus).toHaveLength(1)
    expect(emitStatus.changeItemStatus[0][0]).toHaveProperty('id')
    expect(emitStatus.changeItemStatus[0][0].id).equals(mockItem.id)
    expect(emitStatus.changeItemStatus[0][0]).toHaveProperty('status')
    expect(emitStatus.changeItemStatus[0][0].status).equals(!mockItem.completed)
  })
})
