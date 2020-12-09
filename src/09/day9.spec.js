import { dailyInputLines } from '../dailyInput.js'
import { encryptionWeaknessIn, firstNumberWithoutSum, sumIn } from './day9.js'

describe('Day 9: Encoding Error', () => {

  const example = ['35', '20', '15', '25', '47', '40', '62', '55', '65', '95', '102', '117', '150', '182', '127', '219', '299', '277', '309', '576']
  let entries
  before('get input', async () => {
    entries = await dailyInputLines(9)
  })

  describe('Part 1: What is the first number that is not the sum of two of the 25 numbers before it?', () => {
    it('checks if a number is the sum of two numbers', () => {
      expect(sumIn(25, [10, 15]), '10 + 15 = 25').to.be.true
      expect(sumIn(25, [10, 14]), '10 + 14 != 25').to.be.false
      expect(sumIn(24, [12, 10]), 'does not use 12 twice').to.be.false
    })

    it('solves example', () => {
      expect(firstNumberWithoutSum(example, 5)).to.equal(127)
    })

    it('solves it', () => {
      expect(firstNumberWithoutSum(entries, 25)).to.equal(15690279)
    })
  })

  describe('Part 2: What is the encryption weakness in your XMAS-encrypted list of numbers?', () => {
    it('solves example', () => {
      expect(encryptionWeaknessIn(example, 5)).to.equal(62)
    })

    it('solves it', () => {
      expect(encryptionWeaknessIn(entries, 25)).to.equal(2174232)
    })
  })
})
