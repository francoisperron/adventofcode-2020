const deviceRating = adapters => Math.max(...adapters) + 3

const sort = entries => [0, ...entries.sort((a, b) => a - b), deviceRating(entries)]

const joltDifferences = entries => {
  const adapters = sort(entries)
  const differences = { 0: 0, 1: 0, 2: 0, 3: 0 }

  for (let i = 1; i < adapters.length; i++) {
    differences[adapters[i] - adapters[i - 1]]++
  }

  return differences[1] * differences[3]
}

const findAllArrangements = entries => {
  const adapters = sort(entries)
  const arrangements = Array(adapters.length).fill(0)

  arrangements[0] = 1
  for (let i = 1; i < arrangements.length; i++) {
    arrangements[i] =
      previous(adapters, i, i - 1, arrangements) +
      previous(adapters, i, i - 2, arrangements) +
      previous(adapters, i, i - 3, arrangements)
  }

  return arrangements[arrangements.length - 1]
}

const previous = (adapters, i, j, arrangements) => adapters[i] - adapters[j] <= 3 ? arrangements[j] : 0

export { findAllArrangements, deviceRating, joltDifferences }
