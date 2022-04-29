/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import bTodoListItem from '../../src/base/b-todoListItem.vue'
import { Todo } from '../../src/interfaces'

const mockItem: Todo = {
  id: 1,
  text: 'Item 1',
  completed: false
}

describe('bTodoListItem', () =>
{
  it('Should render', () =>
  {
    const wrapper = mount(bTodoListItem, { props: { item: mockItem } })
    expect(wrapper.text()).contains(mockItem.text)
  })

  it('Emit item', async () =>
  {
    const wrapper = mount(bTodoListItem, { props: { item: mockItem } })
    wrapper.vm.$emit('changeItemStatus', { id: mockItem.id, status: true })
    wrapper.vm.$emit('changeItemText', { id: mockItem.id, text: 'new text' })
    wrapper.vm.$emit('deleteItem', { id: mockItem.id })

    // await wrapper.vm.$nextTick()

    expect(wrapper.emitted().changeItemStatus).toBeTruthy()
    expect(wrapper.emitted().changeItemText).toBeTruthy()
    expect(wrapper.emitted().deleteItem).toBeTruthy()
  })
})