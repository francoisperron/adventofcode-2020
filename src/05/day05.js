const lowerHalf = range => [range[0], range[0] + Math.floor((range[1] - range[0]) / 2)]
const upperHalf = range => [range[0] + Math.ceil((range[1] - range[0]) / 2), range[1]]

const row = seat => seat.split('').reduce((rows, c) => c === 'F' ? lowerHalf(rows) : upperHalf(rows), [0, 127])[0]
const column = seat => seat.split('').reduce((colums, c) => c === 'L' ? lowerHalf(colums) : upperHalf(colums), [0, 7])[0]

const seatId = seat => row(seat.slice(0, 7)) * 8 + column(seat.slice(7, 10))

export { lowerHalf, upperHalf, row, column, seatId }
