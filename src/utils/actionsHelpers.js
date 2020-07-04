export const actionHasError = (action) => {
  let result = false
  if (action.meta) {
    result = action.meta.error
  }
  return result
}

export const actionHasDone = (action) => {
  let result = false
  if (action.meta) {
    result = action.meta.done
  }
  return result
}
