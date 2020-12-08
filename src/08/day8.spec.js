import { dailyInputLines } from '../dailyInput.js'
import { accumulatorInTheEnd, beforeInfiniteLoop, modifyInstructions, run } from './day8.js'

describe('Day 8: Handheld Halting', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInputLines(8)
  })

  const example = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6']

  describe('Part 1: Immediately before any instruction is executed a second time, what value is in the accumulator?', () => {
    describe('runs instructions', () => {
      it('runs nop by adding 1 to index', () => {
        expect(run('nop +0', 4, 10)).to.eql([4, 11])
      })

      it('runs acc by adding 1 to index and value to acc', () => {
        expect(run('acc +5', 4, 10)).to.eql([9, 11])
        expect(run('acc -5', 4, 10)).to.eql([-1, 11])
      })

      it('runs jmp by adding arg to index', () => {
        expect(run('jmp -4', 4, 10)).to.eql([4, 6])
      })

    })

    it('solves example', () => {
      expect(beforeInfiniteLoop(example).acc).to.equal(5)
    })

    it('solves it', () => {
      expect(beforeInfiniteLoop(entries).acc).to.equal(1317)
    })
  })

  describe('Part 2: What is the value of the accumulator after the program terminates?', () => {
    it('modifies nop instructions', () => {
      expect(modifyInstructions(example, 0)).to.eql(['jmp +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'])
    })

    it('modifies jmp instructions', () => {
      expect(modifyInstructions(example, 2)).to.eql(['nop +0', 'acc +1', 'nop +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'])
    })

    it('does not modify acc instructions', () => {
      expect(modifyInstructions(example, 1)).to.eql(['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'])
    })

    it('solves example', () => {
      expect(accumulatorInTheEnd(example)).to.equal(8)
    })

    it('solves it', () => {
      expect(accumulatorInTheEnd(entries)).to.equal(1033)
    })
  })
})
