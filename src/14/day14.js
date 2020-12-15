const runPart1 = instructions => Object.values(runInstructions(instructions).mem).reduce((a, b) => a + b)

const runInstructions = (instructions) => instructions.reduce((result, i) => runInstruction(result.mask, result.mem, i), { mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', mem: {} })

const runInstruction = (mask, mem, instruction) => {
  const [command, value] = instruction.split(' = ')

  if (command === 'mask') return { mask: value, mem: mem }

  const parts = command.match(/\[(\d*)/)
  const memoryAddress = parts[1]

  return { mask, mem: { ...mem, [memoryAddress]: maskedValue(value, mask) } }
}

const maskedValue = (value, mask) => {
  const bits = parseInt(value).toString(2).padStart(36, 0)
  const split = mask.split('')
  const maskedValue = bits.split('').map((b, i) => split[i] === '1' ? 1 : mask[i] === '0' ? 0 : b).join('')
  return parseInt(maskedValue, 2)
}

// Part 2

const runPart2 = (instructions) => {
  const result = runInstructions2(instructions)
  return Object.values(result.mem).reduce((a, b) => a + b)
}
const runInstructions2 = (instructions) => instructions
  .reduce((result, i) => runInstruction2(result.mask, result.mem, i), { mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', mem: {} })

const runInstruction2 = (mask, mem, instruction) => {
  const [command, value] = instruction.split(' = ')

  if (command === 'mask') return { mask: value, mem: mem }

  const parts = command.match(/\[(\d*)/)
  const memoryAddress = parts[1]

  const memChanged = maskedValue2(memoryAddress, mask)
  const newMem = memChanged.reduce((obj, m) => ({ ...obj, [m]: parseInt(value) }), {})

  return { mask, mem: { ...mem, ...newMem } }
}

const maskedValue2 = (value, mask) => {
  const bits = parseInt(value).toString(2).padStart(36, 0)

  const split = mask.split('')
  const maskedValue = bits.split('').map((b, i) => split[i] === '1' ? 1 : split[i] === '0' ? b : 'X')

  const results = []
  for (let i = 0; i < maskedValue.length; i++) {
    const v = maskedValue[i]
    if (v === 'X') {
      if (results.length === 0) {
        results.push([0])
        results.push([1])
      } else {
        results.forEach((r => {
          results.push([...r, 0])
          r.push(1)
        }))
      }
    } else {
      if (results.length === 0) {
        results.push([v])
      } else {
        results.forEach((r => r.push(v)))
      }
    }
  }

  return results.map(r => parseInt(r.join(''), 2))
}

export { runPart1, runInstruction, runPart2, runInstruction2 }
