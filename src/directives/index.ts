export const vFocusInput = {
  mounted: (el, binding) =>
  {
    if (binding.value)
    {
      el.focus()
    }
  }
}