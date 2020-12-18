import { activeCubesAfterSixCycles, nextState, runCycle } from './day17.js'
import { dailyInputLines } from '../dailyInput.js'

describe('Day 17: Conway Cubes', () => {

  let input
  before('get input', async () => {
    input = [(await dailyInputLines(17)).map(r => r.split(''))]
  })

  describe('Part 1: How many cubes are left in the active state after the sixth cycle?', () => {
    describe('follos conway rules', () => {
      it('an active cube remains active when 2 or 3 neighbours are active', () => {
        expect(nextState('#', 2)).to.equal('#')
        expect(nextState('#', 3)).to.equal('#')
      })

      it('an active cube becomes inactive otherwise', () => {
        expect(nextState('#', 1)).to.equal('.')
        expect(nextState('#', 4)).to.equal('.')
      })

      it('an inactive cube becomes when 3 neighbours are active', () => {
        expect(nextState('.', 3)).to.equal('#')
      })

      it('an inactive cube remains inactive otherwise', () => {
        expect(nextState('.', 4)).to.equal('.')
      })
    })

    it('run sim in 2D', () => {
      const cycle0 = [
        ['.', '#', '.'],
        ['.', '.', '#'],
        ['#', '#', '#']
      ]

      const cycle1 = [
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '#', '.', '#', '.'],
        ['.', '.', '#', '#', '.'],
        ['.', '.', '#', '.', '.']
      ]
      expect(runCycle([cycle0])[1]).to.eql(cycle1)
    })

    it('run sim in 3D', () => {
      const cycle0 = [
        ['.', '#', '.'],
        ['.', '.', '#'],
        ['#', '#', '#']
      ]

      const cycle1 = [
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '#', '.', '.', '.'],
        ['.', '.', '.', '#', '.'],
        ['.', '.', '#', '.', '.']
      ]
      expect(runCycle([cycle0])[0]).to.eql(cycle1)
    })

    it('solves example', () => {
      let state = [[
        ['.', '#', '.'],
        ['.', '.', '#'],
        ['#', '#', '#']
      ]]

      expect(activeCubesAfterSixCycles(state)).to.equal(112)
    })

    it('solves it', () => {
      expect(activeCubesAfterSixCycles(input)).to.equal(291)
    })
  })
})
