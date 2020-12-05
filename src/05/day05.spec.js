import { dailyInputLines } from '../dailyInput.js'
import { column, lowerHalf, row, seatId, upperHalf } from './day05.js'

describe('Day 5: Binary Boarding', () => {

  let entries
  before('get input', async () => {
    entries = (await dailyInputLines(5)).filter(l => l !== '')
  })

  describe('Part 1: What is the highest seat ID on a boarding pass?', () => {

    describe('finds row number', () => {
      it('finds row number 44 from FBFBBFF', () => {
        expect(row('FBFBBFF')).to.equal(44)
      })

      it('finds lowerHalf of a row range', () => {
        expect(lowerHalf([0, 127])).to.eql([0, 63])
        expect(lowerHalf([32, 63])).to.eql([32, 47])
      })

      it('finds upperHalf of a row range', () => {
        expect(upperHalf([0, 63])).to.eql([32, 63])
        expect(upperHalf([32, 47])).to.eql([40, 47])
      })
    })

    it('finds column 5 from RLR', () => {
      expect(column('RLR')).to.equal(5)
    })

    describe('finds seat id', () => {
      it('of examples', () => {
        expect(seatId('FBFBBFFRLR')).to.equal(357)
        expect(seatId('BFFFBBFRRR')).to.equal(567)
        expect(seatId('FFFBBBFRRR')).to.equal(119)
        expect(seatId('BBFFBBFRLL')).to.equal(820)
      })
    })

    it('solves it', () => {
      const highest = Math.max(...(entries.map(seat => seatId(seat))))
      expect(highest).to.equal(938)
    })
  })

  describe('Part2: What is the ID of your seat?', () => {
    it('solves it', () => {
      const seats = entries.map(seat => seatId(seat)).map(seat => parseInt(seat)).sort((a, b) => a - b)
      const lowset = Math.min(...seats)
      const highest = Math.max(...seats)

      for (let i = 1; i < highest - lowset - 1; i++) {
        if (seats[i - 1] !== seats[i] - 1) {
          expect(i + lowset).to.equal(696)
        }
        if(seats[i + 1] !== seats[i] + 1){
          expect(i + lowset + 1).to.equal(696)
        }
      }
    })
  })
})
