import { defineStore } from 'pinia'
import { Todo } from '../interfaces'

export const useTodoStore = defineStore('todo', {
  state: () =>
  {
    const list: Todo[] = []
    const loading = false
    const errorMsg = ''
    const filterActive = false
    const filterComplete = false

    return { list, loading, errorMsg, filterActive, filterComplete }
  },
  actions: {
    preCall()
    {
      this.loading = true
      this.errorMsg = ''
    },
    getTodoList()
    {
      this.preCall()

      fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo`)
        .then((res) => res.json())
        .catch((error) => this.errorMsg = error)
        .then((response) => this.list = response)
        .finally(() => this.loading = false)
    },
    addItem({ text }:{ text: string })
    {
      this.preCall()

      fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo`, {
        method: 'POST',
        body: JSON.stringify({ text, completed: false }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .catch((error) => this.errorMsg = error)
        .then(response => this.list.push(response))
        .finally(() => this.loading = false)
    },
    async changeItemStatus({ id, status }:{ id: number, status: boolean })
    {
      const item = this.list.find(x => x.id === id)
      if (!item) return

      await this.updateItem({ ...item, completed: status })
    },
    changeItemText({ id, text }:{ id: number, text: string })
    {
      const item = this.list.find(x => x.id === id)
      if (!item) return

      this.updateItem({ ...item, text })
    },
    async updateItem(item: Todo)
    {
      this.preCall()

      fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .catch((error) => this.errorMsg = error)
        .then((response) =>
        {
          const itemIndex = this.list.findIndex(x => x.id === item.id)
          if (itemIndex === -1) return

          this.list.splice(itemIndex, 1, response)
        })
        .finally(() => this.loading = false)
    },
    changeAllItemStatus({ status }:{ status: boolean })
    {
      this.list.forEach(async item =>
      {
        await this.changeItemStatus({ id: item.id, status })
      })
    },
    clearCompleted()
    {
      const itemsCompleted = this.list.filter(x => x.completed)

      itemsCompleted.forEach(item =>
      {
        this.deleteItem({ id: item.id })
      })
    },
    deleteItem({ id }:{ id: number })
    {
      this.preCall()

      fetch(`${<string>import.meta.env.VITE_BASE_URL_SERVER}/todo/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .catch((error) => this.errorMsg = error)
        .then(() => this.list = this.list.filter(x => x.id !== id))
        .finally(() => this.loading = false)
    }
  },
  getters: {
    filterList: (state) => state.list.filter(x => (state.filterComplete && state.filterActive) || x.completed === state.filterComplete),
    numItemsLeft: (state) => state.list.filter(x => !x.completed).length
  }
})