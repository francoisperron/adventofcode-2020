import { dailyInputLines } from '../dailyInput.js'
import { evaluateAddFirst, evaluatePart1, evaluatePart2, findParentheses, parse } from './day18.js'

describe('Day 18: Operation Order', () => {

  let input
  before('get input', async () => {
    input = await dailyInputLines(18)
  })

  describe('Part 1: What is the sum of the resulting values when evaluating from left to right?', () => {
    it('parses expression', () => {
      expect(parse('1 + (2 * 3) + (4 * (5 + 6))')).to.equal('1+(2*3)+(4*(5+6))')
    })

    describe('evaluates', () => {
      it('evalutes +', () => {
        expect(evaluatePart1('1 + 2')).to.equal(3)
      })

      it('evalutes *', () => {
        expect(evaluatePart1('2 * 3')).to.equal(6)
      })

      it('evalutes operation from left-to-right', () => {
        expect(evaluatePart1('1 + 2 * 3')).to.equal(9)
        expect(evaluatePart1('1 + 2 * 3 + 4 * 5 + 6')).to.equal(71)
      })

      it('evaluates ()', () => {
        expect(evaluatePart1('1 + (2 * 3) + (4 * (5 + 6))')).to.equal(51)
      })
    })

    describe('parentheses', () => {
      it('finds no matching parentheses', () => {
        expect(findParentheses('1+2')).to.be.undefined
      })

      it('finds simple parentheses', () => {
        expect(findParentheses('(2*3)')).to.eql({start: 1, stop: 4})
      })

      it('finds first parentheses', () => {
        expect(findParentheses('4+(4*(5+6))+1')).to.eql({ start: 3, stop: 10})
      })

      it('evaluates ()', () => {
        expect(evaluatePart1('1 + (2 * 3) + (4 * (5 + 6))')).to.equal(51)
      })
    })

    it('solve it', () => {
      expect(input.reduce((sum, expression) => sum + evaluatePart1(expression), 0)).to.equal(2743012121210)
    })
  })

  describe('Part 2: What is the sum of the resulting values with + before *?', () => {
    it('evaluates add first', () => {
      expect(evaluateAddFirst('1+2*3+4*5+6')).to.equal(231)
    })

    it('solves it', () => {
      expect(input.reduce((sum, expression) => sum + evaluatePart2(expression), 0)).to.equal(65658760783597)
    })
  })
})
