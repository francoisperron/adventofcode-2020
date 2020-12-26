import { createCups, cupsAfterCup1, move, parse, play, playPart2 } from './day23.js'

const playOneMove = (input, index) => move(parse(input), index).join('')

describe('Day 23: Crab Cups', () => {
  const example = '389125467'
  const input = '739862541'

  describe('Part 1', () => {
    it('moves cups without looping', () => {
      // (3) 8  9  1  2  5  4  6  7
      //  3 (2) 8  9  1  5  4  6  7 ==> (2) 8  9  1  5  4  6  7 3
      expect(playOneMove('389125467')).to.equal('289154673')
    })

    it('moves cups looping', () => {
      //  3 (2) 8  9  1  5  4  6  7
      //  3  2 (5) 4  6  7  8  9  1 ==> (5) 4  6  7  8  9  1 3 2
      expect(playOneMove('289154673', 1)).to.equal('546789132')
    })

    it('finds cups after cup 1', () => {
      expect(cupsAfterCup1(parse('289154673'))).to.equal('54673' + '289')
    })

    it('solves example', () => {
      expect(play(example, 10)).to.equal('92658374')
      expect(play(example, 100)).to.equal('67384529')
    })

    it('solves it', () => {
      expect(play(input, 100)).to.equal('94238657')
    })
  })

  describe('Part 2: Determine which two cups will end up immediately clockwise of cup 1. What do you get if you multiply their labels together?', () => {
    const moves = 10000000

    describe('create cups structure', () => {
      it('creates nbCups + 1 cups', () => {
        const cups = createCups(parse('389125467'), 100)
        expect(cups.length).to.equal(101)
        expect(cups[cups.length - 2]).to.equal(100)
      })

      it('first and last cup loops', () => {
        const cups = createCups(parse('389125467'), 10)
        expect(cups[0]).to.equal(3)
        expect(cups[cups.length - 1]).to.equal(3)
      })

      it('places next cup at cup index', () => {
        const cups = createCups(parse('389125467'), 10)
        expect(cups[3]).to.equal(8)
        expect(cups[8]).to.equal(9)
        expect(cups[1]).to.equal(2)
        expect(cups[7]).to.equal(10)
        expect(cups).to.have.members([3, 2, 5, 8, 6, 4, 7, 10, 9, 1, 3])
      })
    })

    it('solves example', () => {
      expect(playPart2(example, moves)).to.equal(149245887792)
    })

    it('solves it', () => {
      expect(playPart2(input, moves)).to.equal(3072905352)
    })
  })
})
