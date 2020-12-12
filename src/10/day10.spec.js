import { dailyInputLines } from '../dailyInput.js'
import { deviceRating, findAllArrangements, joltDifferences } from './day10.js'

describe('Day 10: Adapter Array', () => {

  const simple = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]
  const example = [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3]
  let entries
  before('get input', async () => {
    entries = (await dailyInputLines(10)).map((e => parseInt(e)))
  })

  describe('Part 1: What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?', () => {
    it('finds device built in adapter ==> max + 3', () => {
      expect(deviceRating(example)).to.equal(52)
    })

    it('solves example', () => {
      expect(joltDifferences(example)).to.equal(220)
    })

    it('solves it', () => {
      expect(joltDifferences(entries)).to.equal(2760)
    })
  })

  describe('Part 2: What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?', () => {
    it('solves simple example -- tribonacci', () => {
      expect(findAllArrangements(simple)).to.equal(8)
    })

    it('solves example -- tribonacci with cache', () => {
      expect(findAllArrangements(example)).to.equal(19208)
    })

    it('solves it', () => {
      expect(findAllArrangements(entries)).to.equal(13816758796288)
    })
  })
})
