// Part 1

const rules = {
  '.': () => '.',
  'L': (nb) => nb === 0 ? '#' : 'L',
  '#': (nb) => nb >= 4 ? 'L' : '#'
}

const seatOnNextRound = (seat, nbOccupiedSeatsAround) => rules[seat](nbOccupiedSeatsAround)

const seatAt = (seats, row, col) => -1 < row && row < seats.length && -1 < col && col < seats[0].length ? seats[row][col] : null

const nbOccupiedSeatsAround = (row, col, seats) => {
  const neighbours = [
    seatAt(seats, row - 1, col - 1), seatAt(seats, row - 1, col), seatAt(seats, row - 1, col + 1),
    seatAt(seats, row, col - 1),                                  seatAt(seats, row, col + 1),
    seatAt(seats, row + 1, col - 1), seatAt(seats, row + 1, col), seatAt(seats, row + 1, col + 1)
  ]
  return neighbours.filter(n => n === '#').length
}

const round = seats => {
  const next = []
  for (let i = 0; i < seats.length; i++) {
    next.push([])
    for (let j = 0; j < seats[i].length; j++) {
      next[i].push(seatOnNextRound(seats[i][j], nbOccupiedSeatsAround(i, j, seats)))
    }
  }
  return next
}

const nbOccupiedSeatsWhenTheyStabilize = seats => {
  let current = seats.map(r => r.split(''))
  let previous = []
  while (!gridEqual(previous, current)) {
    previous = current
    current = round(current)
  }

  return current.flatMap(row => row).filter(seat => seat === '#').length
}

// Part 2

const nbOccupiedSeatsDiagonal = (row, col, seats) => {
  const neighbours = []
  const coordinates = [
    [-1, -1], [-1, 0], [-1, 1],
    [0,  -1],          [0,  1],
    [1,  -1], [1,  0], [1,  1]
  ]
  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i]
    let neighbour = '.'
    let spread = 1
    while(neighbour === '.') {
      neighbour = seatAt(seats, row + coordinate[0] * spread, col + coordinate[1] * spread)
      neighbours.push(neighbour)
      spread++
    }
  }
  return neighbours.filter(n => n === '#').length
}

const rules2 = {
  '.': () => '.',
  'L': (nb) => nb === 0 ? '#' : 'L',
  '#': (nb) => nb >= 5 ? 'L' : '#'
}
const seatOnNextRound2 = (seat, nbOccupiedSeatsAround) => rules2[seat](nbOccupiedSeatsAround)

const round2 = seats => {
  const next = []
  for (let i = 0; i < seats.length; i++) {
    next.push([])
    for (let j = 0; j < seats[i].length; j++) {
      next[i].push(seatOnNextRound2(seats[i][j], nbOccupiedSeatsDiagonal(i, j, seats)))
    }
  }
  return next
}

const nbOccupiedSeatsWhenTheyStabilize2 = seats => {
  let current = seats.map(r => r.split(''))
  let previous = []
  while (!gridEqual(previous, current)) {
    previous = current
    current = round2(current)
  }

  return current.flatMap(row => row).filter(seat => seat === '#').length
}

const gridEqual = (grid1, grid2) => grid1.flatMap(r => r.map(s => s)).join('') === grid2.flatMap(r => r.map(s => s)).join('')

export { nbOccupiedSeatsWhenTheyStabilize, nbOccupiedSeatsWhenTheyStabilize2, round, round2, nbOccupiedSeatsAround, nbOccupiedSeatsDiagonal, gridEqual }
