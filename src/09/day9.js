const sumIn = (number, numbers) => {
  const sums = []
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j)
        sums.push(numbers[i] + numbers[j])
    }
  }
  return sums.includes(number)
}

const firstNumberWithoutSum = (numbersInString, preambleLength) => {
  const numbers = numbersInString.map(n => parseInt(n))

  for (let i = preambleLength; i < numbers.length; i++) {
    if (!sumIn(numbers[i], numbers.slice(i - preambleLength, i)))
      return numbers[i]
  }

  return 0
}

const encryptionWeaknessIn = (numbersInString, preambleLength) => {
  const invalidNumber = firstNumberWithoutSum(numbersInString, preambleLength)
  const numbers = numbersInString.map(n => parseInt(n))

  let set = []
  let setStart = 0
  for (let i = setStart; i < numbers.length; i++) {
    set.push(numbers[i])
    const sum = set.reduce((a, b) => a + b, 0)
    if (sum === invalidNumber) {
      return Math.min(...set) + Math.max(...set)
    }
    if (sum > invalidNumber) {
      setStart++
      i = setStart
      set = []
    }
  }

  return 0
}

export { sumIn, firstNumberWithoutSum, encryptionWeaknessIn }
