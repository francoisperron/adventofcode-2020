import { nbOccupiedSeatsAround, nbOccupiedSeatsDiagonal, nbOccupiedSeatsWhenTheyStabilize, nbOccupiedSeatsWhenTheyStabilize2, round } from './day11.js'
import { dailyInputLines } from '../dailyInput.js'

describe('Day 11: Seating System', () => {
  const example = [
    'L.LL.LL.LL',
    'LLLLLLL.LL',
    'L.L.L..L..',
    'LLLL.LL.LL',
    'L.LL.LL.LL',
    'L.LLLLL.LL',
    '..L.L.....',
    'LLLLLLLLLL',
    'L.LLLLLL.L',
    'L.LLLLL.LL'
  ]
  let entries
  before('get input', async () => {
    entries = await dailyInputLines(11)
  })

  describe('Part 1: How many seats end up occupied with near seats rules?', () => {
    describe('looks like game of life', () => {
      it('empty seats without adjacent occupied seats become occupied', () => {
        const seats = [
          ['.', '.', '.'],
          ['.', 'L', '.'],
          ['.', '.', '.']
        ]

        expect(round(seats)[1][1]).to.equal('#')
      })

      it('empty seats wit adjacent occupied seats stay empty', () => {
        const seats = [
          ['.', '.', '.'],
          ['.', 'L', '.'],
          ['.', '#', '.']
        ]

        expect(round(seats)[1][1]).to.equal('L')
      })

      it('counts occupied seats around a seat', () => {
        const seats = [
          ['#', '#', '#'],
          ['#', 'L', '#'],
          ['#', '#', '#']
        ]

        expect(nbOccupiedSeatsAround(1, 1, seats)).to.equal(8)
      })
    })

    it('solves example', () => {
      expect(nbOccupiedSeatsWhenTheyStabilize(example)).to.equal(37)
    })

    it('solves it', () => {
      expect(nbOccupiedSeatsWhenTheyStabilize(entries)).to.equal(2321)
    })
  })

  describe('Part 2: Part 1: How many seats end up occupied with far occupied seats rules?', () => {
    it('counts the number of occupied seats diagonaly', () => {
      let seats = [
        ['#', '.', '#', '#'],
        ['#', '#', '#', '#']
      ]

      expect(nbOccupiedSeatsDiagonal(0, 2, seats)).to.equal(5)
    })

    it('counts 2', () => {
      let seats = [
        ['#', '.', '#'],
        ['#', '#', '#'],
        ['#', '#', '#']
      ]

      expect(nbOccupiedSeatsDiagonal(1, 0, seats)).to.equal(4)
    })

    it('solves example', () => {
      expect(nbOccupiedSeatsWhenTheyStabilize2(example)).to.equal(26)
    })

    it('solves it', () => {
      expect(nbOccupiedSeatsWhenTheyStabilize2(entries)).to.equal(2102)
    })
  })
})
