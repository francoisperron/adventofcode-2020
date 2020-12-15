import { playFast, sayNumber } from './day15.js'

describe('Day 15: Rambunctious Recitation', () => {

  const input = '16,11,15,0,1,7'.split(',').map(Number)

  describe('Part 1: What will be the 2020th number spoken?', () => {
    const maxTurn = 2020

    it('says 0 when the number is new', () => {
      expect(sayNumber(3, undefined)).to.equal(0)
    })

    it('says last turn number (4) - number last turn (1) when the number is known', () => {
      expect(sayNumber(4, 1)).to.equal(3)
    })

    it('solves examples', () => {
      expect(playFast([0, 3, 6], maxTurn)).to.equal(436)
      expect(playFast([1, 3, 2], maxTurn)).to.equal(1)
      expect(playFast([2, 1, 3], maxTurn)).to.equal(10)
      expect(playFast([1, 2, 3], maxTurn)).to.equal(27)
      expect(playFast([2, 3, 1], maxTurn)).to.equal(78)
      expect(playFast([3, 2, 1], maxTurn)).to.equal(438)
      expect(playFast([3, 1, 2], maxTurn)).to.equal(1836)
    })

    it('solves it', () => {
      expect(playFast(input, maxTurn)).to.equal(662)
    })
  })

  // 1s sec each
  describe('Part 2: What will be the 30000000th number spoken?', () => {
    const maxTurn = 30000000
    it('solves example fast', () => {
      expect(playFast([0, 3, 6], maxTurn)).to.equal(175594)
    })

    it('solves it', () => {
      expect(playFast(input, maxTurn)).to.equal(37312)
    })
  })
})
