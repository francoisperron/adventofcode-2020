import { reportRepair } from './day01.js'
import { readLines } from '../readFile.js'

describe('Day 1: Report Repair', () => {
  describe('Part 1: Finds the two entries that sum to 2020 and then multiply those two numbers together', () => {
    it('finds it for simple case', () => {
      expect(reportRepair([2000, 20])).to.equal(2000*20)
    })
    it('finds it with one bad entry', () => {
      expect(reportRepair([10, 2000, 20])).to.equal(2000*20)
    })

    it('solves', () => {
      const entries = readLines('./src/01/input.txt').map(l => parseInt(l))
      expect(reportRepair(entries)).to.equal(381699)
    })
  })
})
