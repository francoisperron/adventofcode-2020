import { dailyInput } from '../dailyInput.js'
import { nbAdjacent, parseTile, part1 } from './day24.js'

describe('Day 24: Lobby Layout', () => {

  const example =
    'sesenwnenenewseeswwswswwnenewsewsw\n' +
    'neeenesenwnwwswnenewnwwsewnenwseswesw\n' +
    'seswneswswsenwwnwse\n' +
    'nwnwneseeswswnenewneswwnewseswneseene\n' +
    'swweswneswnenwsewnwneneseenw\n' +
    'eesenwseswswnenwswnwnwsewwnwsene\n' +
    'sewnenenenesenwsewnenwwwse\n' +
    'wenwwweseeeweswwwnwwe\n' +
    'wsweesenenewnwwnwsenewsenwwsesesenwne\n' +
    'neeswseenwwswnwswswnw\n' +
    'nenwswwsewswnenenewsenwsenwnesesenew\n' +
    'enewnwewneswsewnwswenweswnenwsenwsw\n' +
    'sweneswneswneneenwnewenewwneswswnese\n' +
    'swwesenesewenwneswnwwneseswwne\n' +
    'enesenwswwswneneswsenwnewswseenwsese\n' +
    'wnwnesenesenenwwnenwsewesewsesesew\n' +
    'nenewswnwewswnenesenwnesewesw\n' +
    'eneswnwswnwsenenwnwnwwseeswneewsenese\n' +
    'neswnwewnwnwseenwseesewsenwsweewe\n' +
    'wseweeenwnesenwwwswnew'

  let input
  before('get input', async () => {
    input = await dailyInput(24)
  })

  describe('Part 1: how many tiles are left with the black side up?', () => {
    describe('parses tiles using https://www.redblobgames.com/grids/hexagons/', () => {
      it('parses 6 sides ', () => {
        //   -0.5,1 :  0.5,1
        // -1,0  : 0,0    : 1,0
        //  -0.5,-1 :  0.5,-1
        expect(parseTile('e'), 'e').to.eql({ x: 1, y: 0 })
        expect(parseTile('w'), 'w').to.eql({ x: -1, y: 0 })
        expect(parseTile('ne'), 'ne').to.eql({ x: 0.5, y: 1 })
        expect(parseTile('nw'), 'nw').to.eql({ x: -0.5, y: 1 })
        expect(parseTile('se'), 'se').to.eql({ x: 0.5, y: -1 })
        expect(parseTile('sw'), 'sw').to.eql({ x: -0.5, y: -1 })
      })

      it('chains them', () => {
        expect(parseTile('esew'), 'esew').to.eql({ x: 0.5, y: -1 })
        expect(parseTile('nwwswee'), 'nwwswee').to.eql({ x: 0, y: 0 })
      })
    })

    it('solves example', () => {
      expect(part1(example)).to.equal(10)
    })

    it('solves input', () => {
      expect(part1(input)).to.equal(332)
    })
  })

  describe('Part 2: How many tiles will be black after 100 days?', () => {
    it('finds adjacent tiles', () => {
      const tile = { x: 0, y: 0 }
      const tiles = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: -0.5, y: 1 },
        { x: 0.5, y: 1 },
        { x: -0.5, y: -1 },
        { x: 0.5, y: -1 }
      ]
      expect(nbAdjacent(tile, tiles)).to.equal(6)
    })

    // green but too slow
    // it('solves example', () => {
    //   expect(part2(example, 1)).to.equal(15)
    //   expect(part2(example, 2)).to.equal(12)
    //   expect(part2(example, 3)).to.equal(25)
    //   expect(part2(example, 100)).to.equal(2208)
    // })
    //
    // it('solves it', () => {
    //   expect(part2(input, 100)).to.equal(3900)
    // })
  })
})
