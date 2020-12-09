const beforeInfiniteLoop = instructions => {
  const visited = []
  let index = 0
  let acc = 0

  while (!visited.includes(index) && index < instructions.length) {
    visited.push(index)
    const result = run(instructions[index], acc, index)
    acc = result.acc
    index = result.index
  }
  return { acc, index }
}

const accumulatorInTheEnd = instructions => {
  const programEnd = instructions.length
  let index = 0
  let acc = 0

  let modifiedInstructionIndex = 0

  while (programEnd !== index) {
    const modifiedInstructions = modifyInstructionAt(instructions, modifiedInstructionIndex++)
    const loop = beforeInfiniteLoop(modifiedInstructions)
    index = loop.index
    acc = loop.acc
  }
  return acc
}

const run = (instruction, acc, index) => operations[instruction.operation](acc, index, instruction.argument)
const operations = {
  'nop': (acc, index, _) => ({ acc: acc, index: index + 1 }),
  'acc': (acc, index, argument) => ({ acc: acc + parseInt(argument), index: index + 1 }),
  'jmp': (acc, index, argument) => ({ acc: acc, index: index + parseInt(argument) })
}

const parseAll = instructions => instructions.map(i => parse(i))
const parse = instruction => {
  const [operation, argument] = instruction.split(' ')
  return { operation, argument }
}

const modifyInstructionAt = (instructions, index) => [...instructions.slice(0, index), modifyInstruction(instructions[index]), ...instructions.slice(index + 1)]
const modifyInstruction = instruction => modifications[instruction.operation](instruction.argument)
const modifications = {
  'nop': (argument) => ({ operation: 'jmp', argument: argument }),
  'jmp': (argument) => ({ operation: 'nop', argument: argument }),
  'acc': (argument) => ({ operation: 'acc', argument: argument })
}

export { parse, parseAll, run, modifyInstructionAt, beforeInfiniteLoop, accumulatorInTheEnd }
