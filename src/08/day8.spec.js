import { dailyInputLines } from '../dailyInput.js'
import { accumulatorInTheEnd, beforeInfiniteLoop, modifyInstructionAt, parse, parseAll, run } from './day8.js'

describe('Day 8: Handheld Halting', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInputLines(8)
  })

  const example = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6']

  describe('Part 1: Immediately before any instruction is executed a second time, what value is in the accumulator?', () => {
    describe('runs instructions', () => {
      it('runs nop by adding 1 to index', () => {
        expect(run(parse('nop +0'), 4, 10)).to.eql({ acc: 4, index: 11 })
      })

      it('runs acc by adding 1 to index and value to acc', () => {
        expect(run(parse('acc +5'), 4, 10)).to.eql({ acc: 9, index: 11 })
        expect(run(parse('acc -5'), 4, 10)).to.eql({ acc: -1, index: 11 })
      })

      it('runs jmp by adding arg to index', () => {
        expect(run(parse('jmp -4'), 4, 10)).to.eql({ acc: 4, index: 6 })
      })
    })

    it('solves example', () => {
      expect(beforeInfiniteLoop(parseAll(example)).acc).to.equal(5)
    })

    it('solves it', () => {
      expect(beforeInfiniteLoop(parseAll(entries)).acc).to.equal(1317)
    })
  })

  describe('Part 2: What is the value of the accumulator after the program terminates?', () => {
    it('modifies nop instructions', () => {
      expect(modifyInstructionAt(parseAll(['nop +0']), 0)).to.eql([{ operation: 'jmp', argument: '+0' }])
    })

    it('modifies jmp instructions', () => {
      expect(modifyInstructionAt(parseAll(['jmp +2']), 0)).to.eql([{ operation: 'nop', argument: '+2' }])
    })

    it('does not modify acc instructions', () => {
      expect(modifyInstructionAt(parseAll(['acc -4']), 0)).to.eql([{ operation: 'acc', argument: '-4' }])
    })

    it('solves example', () => {
      expect(accumulatorInTheEnd(parseAll(example))).to.equal(8)
    })

    it('solves it', () => {
      expect(accumulatorInTheEnd(parseAll(entries))).to.equal(1033)
    })
  })
})
