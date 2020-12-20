import fs from 'fs'
import { dailyInput } from '../dailyInput.js'
import { parseTile, part1, part2 } from './day20.js'

describe('Day 20: Jurassic Jigsaw', () => {

  let input
  before('get input', async () => {
    input = (await dailyInput(20)).slice(0, -1).split('\n\n')
  })

  describe('Part 1: What do you get if you multiply together the IDs of the four corner tiles?', () => {
    describe('parses tile', () => {
      const input =
        'Tile 2311:\n' +
        '..##.#..#.\n' +
        '##..#.....\n' +
        '#...##..#.\n' +
        '####.#...#\n' +
        '##.##.###.\n' +
        '##...#.###\n' +
        '.#.#.#..##\n' +
        '..#....#..\n' +
        '###...#.#.\n' +
        '..###..###'

      it('parses id', () => {
        const tile = parseTile(input)
        expect(tile.id).to.equal(2311)
      })

      it('parses edges', () => {
        const tile = parseTile(input)
        expect(tile.edges).to.include.members(['..##.#..#.', '..###..###', '.#####..#.', '...#.##..#'])
      })

      it('keeps edges reversed', () => {
        const tile = parseTile(input)
        expect(tile.edges).to.include.members(['.#..#.##..', '###..###..', '.#..#####.', '#..##.#...'])
      })
    })

    it('solves example', () => {
      const example = fs.readFileSync('src/20/example.txt').toString().slice(0, -1).split('\n\n')
      const tiles = example.map(i => parseTile(i))

      expect(part1(tiles)).to.equal(20899048083289)
    })

    it('solves it', () => {
      const tiles = input.map(i => parseTile(i))
      expect(part1(tiles)).to.equal(2699020245973)
    })
  })

  describe('Part 2: How many # are not part of a sea monster?', () => {
    it('solves example', () => {
      const example = fs.readFileSync('src/20/example.txt').toString().slice(0, -1).split('\n\n')
      const tiles = example.map(i => parseTile(i))

      expect(part2(tiles)).to.equal(273)
    })
  })
})
