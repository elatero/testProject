const getNumberedSortingParams = (field, inverse = false) => ({
  sortBy: field[0] === '-' ? field.substr(1) : field,
  sortDirection: (field[0] === '-' ? -1 : 1) * (inverse ? -1 : 1),
})

const sortByKey = (field) => {
  const { sortBy, sortDirection } = getNumberedSortingParams(field)
  return (a, b) => {
    const result = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
    return result * sortDirection
  }
}

export const sortByMultipleKeys = (...props) => (obj1, obj2) => {
  let i = 0
  let result = 0
  while (result === 0 && i < props.length) {
    result = sortByKey(props[i])(obj1, obj2)
    i++
  }
  return result
}
