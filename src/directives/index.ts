export const vFocusEdit = {
  mounted: (el, binding) =>
  {
    if (binding.value)
    {
      el.focus()
    }
  }
}