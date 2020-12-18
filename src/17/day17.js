const activeCubesAfterSixCycles = state => {
  for (let i = 0; i < 6; i++) {
    state = runCycle(state)
  }

  return state.flat().flat().flat().filter(cube => cube === '#').length
}

const runCycle = state => {
  let next = []
  for (let i = -1; i < state.length + 1; i++) {
    next.push([])
    for (let j = -1; j < state[0].length + 1; j++) {
      next[i + 1].push([])
      for (let k = -1; k < state[0][0].length + 1; k++) {
        const item = nextState(cubeAt(state, i, j, k), countNeightboutsAt(state, i, j, k))
        next[i + 1][j + 1].push(item)
      }
    }
  }

  return next
}

const nextState = (cube, activeNeighbours) => {
  if (cube === '#') {
    return activeNeighbours === 2 || activeNeighbours === 3 ? '#' : '.'
  } else {
    return activeNeighbours === 3 ? '#' : '.'
  }
}

const countNeightboutsAt = (state, z, row, col) => {
  const neighbours = [
    cubeAt(state, z + 1, row - 1, col - 1), cubeAt(state, z + 1, row - 1, col), cubeAt(state, z + 1, row - 1, col + 1),
    cubeAt(state, z + 1, row, col - 1), cubeAt(state, z + 1, row, col), cubeAt(state, z + 1, row, col + 1),
    cubeAt(state, z + 1, row + 1, col - 1), cubeAt(state, z + 1, row + 1, col), cubeAt(state, z + 1, row + 1, col + 1),
    cubeAt(state, z, row - 1, col - 1), cubeAt(state, z, row - 1, col), cubeAt(state, z, row - 1, col + 1),
    cubeAt(state, z, row, col - 1), cubeAt(state, z, row, col + 1),
    cubeAt(state, z, row + 1, col - 1), cubeAt(state, z, row + 1, col), cubeAt(state, z, row + 1, col + 1),
    cubeAt(state, z - 1, row - 1, col - 1), cubeAt(state, z - 1, row - 1, col), cubeAt(state, z - 1, row - 1, col + 1),
    cubeAt(state, z - 1, row, col - 1), cubeAt(state, z - 1, row, col), cubeAt(state, z - 1, row, col + 1),
    cubeAt(state, z - 1, row + 1, col - 1), cubeAt(state, z - 1, row + 1, col), cubeAt(state, z - 1, row + 1, col + 1)
  ]
  return neighbours.filter(n => n === '#').length
}

const cubeAt = (state, z, row, col) => {
  if (-1 < z && z < state.length &&
    -1 < row && row < state[0].length &&
    -1 < col && col < state[0][0].length) {
    return state[z][row][col]
  } else {
    return '.'
  }
}

export { activeCubesAfterSixCycles, runCycle, nextState }
