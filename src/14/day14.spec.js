import { dailyInputLines } from '../dailyInput.js'
import { runInstruction, runInstruction2, runPart1, runPart2 } from './day14.js'

describe('Day 14: Docking Data', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInputLines(14)
  })

  describe('Part 1: What is the sum of all values left in memory after it completes?', () => {
    const example = [
      'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      'mem[8] = 11',
      'mem[7] = 101',
      'mem[8] = 0'
    ]

    describe('executes instructions', () => {
      it('execs mask', () => {
        const anyMem = { 1: 8, 2: 3 }

        const result = runInstruction('', anyMem, 'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')

        expect(result.mask).to.equal('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')
        expect(result.mem).to.eql(anyMem)
      })

      it('execs mem', () => {
        const result = runInstruction('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', {}, 'mem[8] = 11')

        expect(result.mem).to.eql({ 8: 73 })
        expect(result.mask).to.equal('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')
      })
    })

    it('solves example', () => {
      expect(runPart1(example)).to.equal(165)
    })

    it('solves it', () => {
      expect(runPart1(entries)).to.equal(3059488894985)
    })
  })

  describe('Part 2: What is the sum of all values left in memory after it completes?', () => {
    const example = [
      'mask = 000000000000000000000000000000X1001X',
      'mem[42] = 100',
      'mask = 00000000000000000000000000000000X0XX',
      'mem[26] = 1'
    ]

    describe('execs mem', () => {
      it('sets mem to value', () => {
        const result = runInstruction2('000000000000000000000000000000X1001X', {}, 'mem[42] = 100')
        expect(result.mem).to.eql({ '26': 100, '27': 100, '58': 100, '59': 100 })
      })

      it('keeps mem', () => {
        const result = runInstruction2('00000000000000000000000000000000X0XX', { '26': 100, '27': 100, '58': 100, '59': 100 }, 'mem[26] = 1')
        expect(result.mem).to.eql({ '16': 1, '17': 1, '18': 1, '19': 1, '24': 1, '25': 1, '26': 1, '27': 1, '58': 100, '59': 100 })
      })

      it('works when mask starts with an X', () => {
        const result = runInstruction2('X00000000000000000000000000000000000', {}, 'mem[26] = 1')
        expect(result.mem).to.eql({ "26": 1, "34359738394": 1 })
      })
    })

    it('solve example', () => {
      expect(runPart2(example)).to.equal(208)
    })

    // it('solves it', () => {
    //   expect(runPart2(entries)).to.equal(2900994392308)
    // })
  })
})
