import { Ref } from 'vue'

export const vFocusInput = {
  mounted: (el: HTMLElement, binding: Ref) =>
  {
    if (binding.value)
    {
      el.focus()
    }
  }
}