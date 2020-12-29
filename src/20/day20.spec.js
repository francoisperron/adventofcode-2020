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
    describe('calculates all transformations', () => {
      let tile
      before(() => {
        tile = parseTile('Tile 2311:\n' +
          '1230\n' +
          '4560\n' +
          '7890\n' +
          '0000')
      })

      it('includes original data', () => {
        expect(tile.transformations).to.include.deep.members([[
          ['1', '2', '3', '0'],
          ['4', '5', '6', '0'],
          ['7', '8', '9', '0'],
          ['0', '0', '0', '0']
        ]])
      })

      it('includes rotate 90° right', () => {
        expect(tile.transformations).to.include.deep.members([[
          [ '0', '7', '4', '1' ],
          [ '0', '8', '5', '2' ],
          [ '0', '9', '6', '3' ],
          [ '0', '0', '0', '0' ]
        ]])
      })

      it('includes rotate 180°', () => {
        expect(tile.transformations).to.include.deep.members([[
          [ '0', '0', '0', '0' ],
          [ '0', '9', '8', '7' ],
          [ '0', '6', '5', '4' ],
          [ '0', '3', '2', '1' ]
        ]])
      })

      it('includes rotate 270°', () => {
        expect(tile.transformations).to.include.deep.members([[
          [ '0', '0', '0', '0' ],
          [ '3', '6', '9', '0' ],
          [ '2', '5', '8', '0' ],
          [ '1', '4', '7', '0' ]
        ]])
      })

      it('include horizontal flip', () => {
        expect(tile.transformations).to.include.deep.members([[
          ['0', '0', '0', '0'],
          ['7', '8', '9', '0'],
          ['4', '5', '6', '0'],
          ['1', '2', '3', '0']
        ]])
      })

      it('include horizontal flip rotate 90°', () => {
        expect(tile.transformations).to.include.deep.members([[
          [ '1', '4', '7', '0' ],
          [ '2', '5', '8', '0' ],
          [ '3', '6', '9', '0' ],
          [ '0', '0', '0', '0' ]
        ]])
      })

      it('include horizontal flip rotate 180°', () => {
        expect(tile.transformations).to.include.deep.members([[
          [ '0', '3', '2', '1' ],
          [ '0', '6', '5', '4' ],
          [ '0', '9', '8', '7' ],
          [ '0', '0', '0', '0' ]
        ]])
      })

      it('include horizontal flip rotate 270°', () => {
        expect(tile.transformations).to.include.deep.members([[
          [ '0', '0', '0', '0' ],
          [ '0', '9', '6', '3' ],
          [ '0', '8', '5', '2' ],
          [ '0', '7', '4', '1' ]
        ]])
      })
    })

    it('solves example', () => {
      const example = fs.readFileSync('src/20/example.txt').toString().slice(0, -1).split('\n\n')
      const tiles = example.map(i => parseTile(i))

      expect(part2(tiles)).to.equal(273)
    })
  })
})
