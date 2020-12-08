const run = (instruction, acc, index) => {
  const [operation, argument] = instruction.split(' ')

  if (operation === 'nop')
    return [acc, index + 1]

  if (operation === 'acc')
    return [acc + parseInt(argument), index + 1]

  if (operation === 'jmp')
    return [acc, index + parseInt(argument)]
}

const beforeInfiniteLoop = instructions => {
  const visited = []
  let index = 0
  let acc = 0
  while (!visited.includes(index) && index < instructions.length) {
    visited.push(index)
    const [newAcc, newIndex] = run(instructions[index], acc, index)
    acc = newAcc
    index = newIndex
  }
  return { acc, index }
}

const accumulatorInTheEnd = instructions => {
  const programEnd = instructions.length
  let index = 0
  let acc = 0

  let modifiedInstructionIndex = 0
  let modifiedInstructions

  while (programEnd !== index) {
    modifiedInstructions = modifyInstructions(instructions, modifiedInstructionIndex++)
    const loop = beforeInfiniteLoop(modifiedInstructions)
    index = loop.index
    acc = loop.acc
  }
  return acc
}

const modifyInstructions = (instructions, index) => {
  return instructions.map((instruction, i) => {
    if (i !== index) return instruction

    const [operation, argument] = instruction.split(' ')
    if (operation === 'nop')
      return `jmp ${argument}`
    if (operation === 'jmp')
      return `nop ${argument}`

    return instruction
  })
}

export {run, modifyInstructions, beforeInfiniteLoop, accumulatorInTheEnd}
