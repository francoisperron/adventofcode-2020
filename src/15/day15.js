const playFast = (numbers, maxTurn) => {
  const turns = Array(maxTurn)
  numbers.forEach((n, i) => turns[n] = i + 1)  // ex; numbers [0,3,6] ==> turns[0] = 1, turns[3] = 2, turns[6] = 3

  let number = numbers[numbers.length - 1]

  for (let turn = numbers.length; turn < maxTurn; turn++) {
    const numberLastTurn = turns[number]
    turns[number] = turn
    number = sayNumber(turn, numberLastTurn)
  }

  return number
}

const sayNumber = (turn, numberLastTurn) => numberLastTurn === undefined ? 0 : turn - numberLastTurn


export { playFast, sayNumber }
