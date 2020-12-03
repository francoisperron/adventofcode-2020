import { dailyInputLines } from '../dailyInput.js'
import { treesEncounteredWhileSliding } from './day03.js'

describe('Day 3: Toboggan Trajectory', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInputLines(3)
  })

  describe('Part 1: How many trees would you encounter?', () => {
    it('solves two rows map without trees', () => {
      const map = [
        '....',
        '....'
      ]
      expect(treesEncounteredWhileSliding(map)).to.equal(0)
    })

    it('solves two rows map with a tree', () => {
      const map = [
        '....',
        '...#'
      ]
      expect(treesEncounteredWhileSliding(map)).to.equal(1)
    })

    it('solves two rows map looping', () => {
      const map = [
        '...',
        '#..'
      ]
      expect(treesEncounteredWhileSliding(map)).to.equal(1)
    })

    it('solves three rows map with 2 trees', () => {
      const map = [
        '.......',
        '...#...',
        '......#'
      ]
      expect(treesEncounteredWhileSliding(map)).to.equal(2)
    })

    it('solves example', () => {
      const map = [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
        '..#.##.....',
        '.#.#.#....#',
        '.#........#',
        '#.##...#...',
        '#...##....#',
        '.#..#...#.#'
      ]
      expect(treesEncounteredWhileSliding(map)).to.equal(7)
    })

    it('solves it', () => {
      expect(treesEncounteredWhileSliding(entries)).to.equal(187)
    })
  })

  describe('Part 2: What do you get if you multiply together the number of trees encountered on each of the listed slopes?', () => {

    let slopes
    beforeEach(() =>{
      slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    })

    it('solves example', () => {
      const map = [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
        '..#.##.....',
        '.#.#.#....#',
        '.#........#',
        '#.##...#...',
        '#...##....#',
        '.#..#...#.#'
      ]

      const trees = slopes.reduce((product, [right, down]) => product * treesEncounteredWhileSliding(map, right, down), 1)

      expect(trees).to.equal(336)
    })

    it('solves it', () => {
      const trees = slopes.reduce((product, [right, down]) => product * treesEncounteredWhileSliding(entries, right, down), 1)

      expect(trees).to.equal(4723283400)
    })
  })
})
