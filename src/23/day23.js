const parse = input => input.split('').map(Number)

const play = (input, moves) => {
  const cups = Array(moves).fill(1).reduce(cups => move(cups), parse(input))
  return cupsAfterCup1(cups)
}

const move = cups => {
  const pickUp = cups.slice(1, 4)
  const remaining = [cups[0]].concat(cups.slice(4))
  const destination = destinationPosition(cups, remaining)

  return remaining
    .slice(1, destination + 1)
    .concat(pickUp)
    .concat(remaining.slice(destination + 1))
    .concat(remaining[0])
}

const destinationPosition = (cups, remaining) => {
  let destination = cups[0] - 1
  let destinationPosition = remaining.indexOf(destination)

  while (destinationPosition === -1) {
    if (destination === 0) destination = 9

    destinationPosition = remaining.indexOf(destination)
    destination--
  }

  return destinationPosition
}

const cupsAfterCup1 = cups => cups.concat(cups).slice(cups.indexOf(1) + 1, cups.indexOf(1) + cups.length).join('')

export { play, parse, move, cupsAfterCup1 }
