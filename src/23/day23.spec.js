import { play, cupsAfterCup1, move, parse } from './day23.js'

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
})
