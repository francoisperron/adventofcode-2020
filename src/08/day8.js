const beforeInfiniteLoop = instructions => runInfiniteLoop(0, 0, [], instructions)

const runInfiniteLoop = (acc, index, visited, instructions) => {
  if (visited.includes(index) || index === instructions.length) return { acc, index }

  visited.push(index)
  const result = run(instructions[index], acc, index)

  return runInfiniteLoop(result.acc, result.index, visited, instructions)
}

const accumulatorInTheEnd = instructions => runModifiedInstructions(0, 0, 0, instructions)

const runModifiedInstructions = (acc, index, modifiedInstructionIndex, instructions) => {
  if (index === instructions.length) return acc

  const modifiedInstructions = modifyInstructionAt(instructions, modifiedInstructionIndex)
  const result = beforeInfiniteLoop(modifiedInstructions)

  return runModifiedInstructions(result.acc, result.index, ++modifiedInstructionIndex, instructions)
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
