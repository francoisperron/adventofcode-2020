const parse = input => input.split('').map(Number)

const play = (input, moves) => {
  const cups = Array(moves).fill(1).reduce(cups => move(cups), parse(input))
  return cupsAfterCup1(cups)
}

const playPart2 = (input, moves) => {
  const nbCups = 1_000_000
  const { cups } = Array(moves + 1).fill().reduce(({ cup, cups }) => moveFast(cup, cups, nbCups), { cup: 0, cups: createCups(parse(input), nbCups) })

  return cups[1] * cups[cups[1]]
}

const moveFast = (cup, cups, nbCups) => {
  cup = cups[cup]
  let destination = cup !== 1 ? cup - 1 : nbCups

  const cup1 = cups[cup]
  const cup2 = cups[cups[cup]]
  const cup3 = cups[cups[cups[cup]]]

  while ([cup1, cup2, cup3].includes(destination))
    destination = destination > 1 ? destination - 1 : nbCups

  const current = cups[cup]
  cups[cup] = cups[cup3]
  cups[cup3] = cups[destination]
  cups[destination] = current

  return { cup, cups }
}

const createCups = (cups, nbCups) => {
  const nextCups = Array(nbCups + 1).fill().map((_, i) => i + 1)

  nextCups[0] = cups[0]
  nextCups[nextCups.length - 1] = cups[0]

  for (let i = 0; i < cups.length - 1; i++) {
    const cup = cups[i]
    nextCups[cup] = cups[i + 1]
  }

  nextCups[cups[cups.length - 1]] = cups.length + 1

  return nextCups
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

export { play, playPart2, createCups, parse, move, cupsAfterCup1 }
