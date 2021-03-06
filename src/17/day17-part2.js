const activeCubesAfterSixCycles4D = (state) => {
  for (let i = 0; i < 6; i++) {
    state = runCycle(state)
  }

  return state.flat().flat().flat().filter(cube => cube === '#').length
}

const runCycle = (state) => {
  let next = []
  for (let i = -1; i < state.length + 1; i++) {
    next.push([])
    for (let j = -1; j < state[0].length + 1; j++) {
      next[i + 1].push([])
      for (let k = -1; k < state[0][0].length + 1; k++) {
        next[i + 1][j + 1].push([])
        for (let l = -1; l < state[0][0][0].length + 1; l++) {
          const item = nextState(cubeAt(state, i, j, k, l), countNeightboutsAt(state, i, j, k, l))
          next[i + 1][j + 1][k + 1].push(item)
        }
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

const countNeightboutsAt = (state, z, row, col, l) => {
  const neighbours = [
    // W = -1
    [-1, -1, 1, -1], [0, -1, 1, -1], [1, -1, 1, -1],
    [-1, 0, 1, -1], [0, 0, 1, -1], [1, 0, 1, -1],
    [-1, 1, 1, -1], [0, 1, 1, -1], [1, 1, 1, -1],

    [-1, -1, 0, -1], [0, -1, 0, -1], [1, -1, 0, -1],
    [-1, 0, 0, -1], [0, 0, 0, -1], [1, 0, 0, -1],
    [-1, 1, 0, -1], [0, 1, 0, -1], [1, 1, 0, -1],

    [-1, -1, -1, -1], [0, -1, -1, -1], [1, -1, -1, -1],
    [-1, 0, -1, -1], [0, 0, -1, -1], [1, 0, -1, -1],
    [-1, 1, -1, -1], [0, 1, -1, -1], [1, 1, -1, -1],

    // W = 0
    [-1, -1, 1, 0], [0, -1, 1, 0], [1, -1, 1, 0],
    [-1, 0, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0],
    [-1, 1, 1, 0], [0, 1, 1, 0], [1, 1, 1, 0],

    [-1, -1, 0, 0], [0, -1, 0, 0], [1, -1, 0, 0],
    [-1, 0, 0, 0], [1, 0, 0, 0],
    [-1, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0],

    [-1, -1, -1, 0], [0, -1, -1, 0], [1, -1, -1, 0],
    [-1, 0, -1, 0], [0, 0, -1, 0], [1, 0, -1, 0],
    [-1, 1, -1, 0], [0, 1, -1, 0], [1, 1, -1, 0],

    // W = 1
    [-1, -1, 1, 1], [0, -1, 1, 1], [1, -1, 1, 1],
    [-1, 0, 1, 1], [0, 0, 1, 1], [1, 0, 1, 1],
    [-1, 1, 1, 1], [0, 1, 1, 1], [1, 1, 1, 1],

    [-1, -1, 0, 1], [0, -1, 0, 1], [1, -1, 0, 1],
    [-1, 0, 0, 1], [0, 0, 0, 1], [1, 0, 0, 1],
    [-1, 1, 0, 1], [0, 1, 0, 1], [1, 1, 0, 1],

    [-1, -1, -1, 1], [0, -1, -1, 1], [1, -1, -1, 1],
    [-1, 0, -1, 1], [0, 0, -1, 1], [1, 0, -1, 1],
    [-1, 1, -1, 1], [0, 1, -1, 1], [1, 1, -1, 1]
  ]

  return neighbours.map(n => cubeAt(state, z + n[0], row + n[1], col + n[2], l + n[3])).filter(n => n === '#').length
}

const cubeAt = (state, z, row, col, l) => {
  if (-1 < z && z < state.length &&
    -1 < row && row < state[0].length &&
    -1 < col && col < state[0][0].length &&
    -1 < l && l < state[0][0][0].length) {
    return state[z][row][col][l]
  } else {
    return '.'
  }
}

export { activeCubesAfterSixCycles4D }
