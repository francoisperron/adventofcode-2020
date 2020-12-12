import { dailyInputLines } from '../dailyInput.js'
import { compute, computeWaypoint, follow, followWaypoint } from './day12.js'

describe('Day 12: Rain Risk', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInputLines(12)
  })

  describe('Part 1: What is the Manhattan distance between that location and the ship\'s starting position?', () => {

    describe('compute intructions', () => {
      describe('F instructions', () => {
        it('computes pointing east', () => {
          const ship = { x: 0, y: 0, direction: 'E' }
          expect(compute(ship, 'F10')).to.eql({ x: 10, y: 0, direction: 'E' })
        })
        it('computes pointing west', () => {
          const ship = { x: 0, y: 0, direction: 'W' }
          expect(compute(ship, 'F10')).to.eql({ x: -10, y: 0, direction: 'W' })
        })
        it('computes pointing north', () => {
          const ship = { x: 0, y: 0, direction: 'N' }
          expect(compute(ship, 'F10')).to.eql({ x: 0, y: 10, direction: 'N' })
        })
        it('computes pointing south', () => {
          const ship = { x: 0, y: 0, direction: 'S' }
          expect(compute(ship, 'F10')).to.eql({ x: 0, y: -10, direction: 'S' })
        })
      })

      describe('NSEW instructions', () => {
        it('computes N', () => {
          const ship = { x: 10, y: 0, direction: 'E' }
          expect(compute(ship, 'N3')).to.eql({ x: 10, y: 3, direction: 'E' })
        })
        it('computes S', () => {
          const ship = { x: 10, y: 0, direction: 'E' }
          expect(compute(ship, 'S3')).to.eql({ x: 10, y: -3, direction: 'E' })
        })
        it('computes E', () => {
          const ship = { x: 10, y: 0, direction: 'E' }
          expect(compute(ship, 'E3')).to.eql({ x: 13, y: 0, direction: 'E' })
        })
        it('computes W', () => {
          const ship = { x: 10, y: 0, direction: 'E' }
          expect(compute(ship, 'W3')).to.eql({ x: 7, y: 0, direction: 'E' })
        })
      })

      describe('LR instructions', () => {
        it('computes poiting east', () => {
          const ship = { x: 17, y: 3, direction: 'E' }

          const tests = [{ i: 'R90', expected: 'S' }, { i: 'R180', expected: 'W' }, { i: 'R270', expected: 'N' }, { i: 'L90', expected: 'N' }, { i: 'L180', expected: 'W' }]
          tests.forEach(test => expect(compute(ship, test.i)).to.eql({ x: 17, y: 3, direction: test.expected }))
        })

        it('computes poiting west', () => {
          const ship = { x: 17, y: 3, direction: 'W' }

          const tests = [{ i: 'R90', expected: 'N' }, { i: 'R180', expected: 'E' }, { i: 'L270', expected: 'N' }, { i: 'L90', expected: 'S' }, { i: 'L180', expected: 'E' }]
          tests.forEach(test => expect(compute(ship, test.i)).to.eql({ x: 17, y: 3, direction: test.expected }))
        })

        it('computes poiting north', () => {
          const ship = { x: 17, y: 3, direction: 'N' }

          const tests = [{ i: 'R90', expected: 'E' }, { i: 'R180', expected: 'S' }, { i: 'L90', expected: 'W' }, { i: 'L180', expected: 'S' }]
          tests.forEach(test => expect(compute(ship, test.i)).to.eql({ x: 17, y: 3, direction: test.expected }))
        })

        it('computes poiting south', () => {
          const ship = { x: 17, y: 3, direction: 'S' }

          const tests = [{ i: 'R90', expected: 'W' }, { i: 'R180', expected: 'N' }, { i: 'L90', expected: 'E' }, { i: 'L180', expected: 'N' }]
          tests.forEach(test => expect(compute(ship, test.i)).to.eql({ x: 17, y: 3, direction: test.expected }))
        })
      })
    })

    it('solves example', () => {
      const instructions = ['F10', 'N3', 'F7', 'R90', 'F11']
      const ship = follow(instructions)
      expect(ship).to.eql({ x: 17, y: -8, direction: 'S' })
      expect(Math.abs(ship.x) + Math.abs(ship.y)).to.equal(25)
    })

    it('solves it', () => {
      const ship = follow(entries)
      expect(ship).to.eql({ x: -565, y: -358, direction: 'S' })
      expect(Math.abs(ship.x) + Math.abs(ship.y)).to.equal(923)
    })
  })

  describe('Part 2: What is the Manhattan distance between that location and the ship\'s starting position using waypoints?', () => {
    describe('computes instructions', () => {
      describe('computes F', () => {
        it('computes F10', () => {
          const ship = { x: 0, y: 0 }
          const waypoint = {x: 10, y: 1}
          expect(computeWaypoint(ship, waypoint, 'F10').ship).to.eql({ x: 100, y: 10 })
        })

        it('computes F7', () => {
          const ship = { x: 100, y: 10 }
          const waypoint = {x: 10, y: 4}
          expect(computeWaypoint(ship, waypoint, 'F7').ship).to.eql({ x: 170, y: 38 })
        })
      })

      describe('computes NESW', () => {
        it('computes N3', () => {
          const ship = { x: 100, y: 10 }
          const waypoint = {x: 10, y: 1}
          expect(computeWaypoint(ship, waypoint, 'N3').waypoint).to.eql({ x: 10, y: 4 })
        })
      })

      describe('computes RL', () => {
        it('computes R', () => {
          const ship = {   x: 170, y: 38 }
          const waypoint = {x: 10, y: 4}
          const tests = [{ i: 'R90', expected:  { x: 4, y: -10 }}, { i: 'R180', expected:  { x: -10, y: -4 }}, { i: 'R270', expected:  { x: -4, y: 10 }}]
          tests.forEach(test => expect(computeWaypoint(ship, waypoint, test.i).waypoint).to.eql(test.expected))
        })
        it('computes L', () => {
          const ship = {   x: 170, y: 38 }
          const waypoint = {x: 10, y: 4}
          const tests = [{ i: 'L90', expected:  { x: -4, y: 10 }}, { i: 'L180', expected:  { x: -10, y: -4 }}, { i: 'L270', expected:  { x: 4, y: -10 }}]
          tests.forEach(test => expect(computeWaypoint(ship, waypoint, test.i).waypoint).to.eql(test.expected))
        })
      })
    })
    it('solves example', () => {
      const instructions = ['F10', 'N3', 'F7', 'R90', 'F11']
      const ship = followWaypoint(instructions).ship

      expect(ship).to.eql({ x: 214, y: -72 })
      expect(Math.abs(ship.x) + Math.abs(ship.y)).to.equal(286)
    })

    it('solves it', () => {
      const ship = followWaypoint(entries).ship

      expect(ship).to.eql({ x: -22839, y: 1930 })
      expect(Math.abs(ship.x) + Math.abs(ship.y)).to.equal(24769)
    })
  })
})
