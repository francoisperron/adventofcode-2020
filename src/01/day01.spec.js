import { dailyInputLines } from '../dailyInput.js'
import { reportRepair, reportRepairPart2 } from './day01.js'

describe('Day 1: Report Repair', () => {

  let entries
  before('get input', async () => {
    entries = (await dailyInputLines(1)).map(l => parseInt(l))
  })

  describe('Part 1: Finds the two entries that sum to 2020 and then multiply those two numbers together', () => {
    it('finds it for simple case', () => {
      expect(reportRepair([2000, 20])).to.equal(2000 * 20)
    })

    it('finds it with one bad entry', () => {
      expect(reportRepair([10, 2000, 20])).to.equal(2000 * 20)
    })

    it('solves', async () => {
      expect(reportRepair(entries)).to.equal(381699)
    })
  })

  describe('Part 2: Finds the three entries that sum to 2020 and then multiply those two numbers together', () => {
    it('finds it for simple case', () => {
      expect(reportRepairPart2([2000, 10, 10])).to.equal(2000 * 10 * 10)
    })

    it('solves example', () => {
      expect(reportRepairPart2([1721, 979, 366, 299, 675, 1456])).to.equal(241861950)
    })

    it('solves', () => {
      expect(reportRepairPart2(entries)).to.equal(111605670)
    })
  })
})
