import { dailyInputLines } from '../dailyInput.js'
import { closestMultiple, findEarliestBus, findEarliestBusMatchingDeparturesOrder, findMatchingMultiple, parseDeparturesMinutes } from './day13.js'

describe('Day 13: Shuttle Search', () => {

  let earliestTimestamp
  let busIds
  before('get input', async () => {
    const entries = await dailyInputLines(13)
    earliestTimestamp = parseInt(entries[0])
    busIds = entries[1]
  })

  describe('Part 1: What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you\'ll need to wait for that bus?', () => {
    it('calculates the multiples of a number until it reaches another number', () => {
      expect(closestMultiple(939, 59)).to.equal(944)
    })

    it('solves example', () => {
      const exampleEarliestTimestamp = 939
      const exampleBusIds = '7,13,x,x,59,x,31,19'

      const bus = findEarliestBus(exampleEarliestTimestamp, exampleBusIds)

      expect(bus).to.eql({ id: 59, timestamp: 944 })
      expect((bus.timestamp - exampleEarliestTimestamp) * bus.id).to.equal(295)
    })

    it('solves it', () => {
      const bus = findEarliestBus(earliestTimestamp, busIds)

      expect(bus).to.eql({ id: 23, timestamp: 1002570 })
      expect((bus.timestamp - earliestTimestamp) * bus.id).to.equal(207)
    })
  })

  describe('Part 2: What is the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list?', () => {
    it('what is int max in js?', () => {
      expect(Number.MAX_SAFE_INTEGER).to.be.greaterThan(100000000000000)
      expect(Number.MAX_SAFE_INTEGER).to.equal(9007199254740991)
    })

    it('finds departures minutes from busIds', () => {
      expect(parseDeparturesMinutes('7,13,x,x,59,x,31,19')).to.eql([
        { id: 7, departure: 0 },
        { id: 13, departure: 1 },
        { id: 59, departure: 4 },
        { id: 31, departure: 6 },
        { id: 19, departure: 7 }
      ])
    })

    it('finds matching multiple of multiplier when multiple of other multiplier + offset are equal', () => {
      // 0 + 17 * 6 = 102 ==> (102 + 2) % 13 == 0
      expect(findMatchingMultiple(0, 17, 2, 13)).to.equal(17 * 6)

      // 102 + 221 * 15 = 3417 ==> (3417 + 3) % 19 == 0
      expect(findMatchingMultiple(102, 221, 3, 19)).to.equal(102 + 221 * 15)
    })

    it('solves simple example', () => {
      const busIds = '17,x,13,19'
      expect(findEarliestBusMatchingDeparturesOrder(busIds)).to.equal(3417)
    })

    it('solve example', () => {
      const busIds = '7,13,x,x,59,x,31,19'
      expect(findEarliestBusMatchingDeparturesOrder(busIds)).to.equal(1068781)
    })

    it('solves it', () => {
      expect(findEarliestBusMatchingDeparturesOrder(busIds)).to.equal(530015546283687)
    })
  })
})
