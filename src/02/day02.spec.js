import { dailyInputLines } from '../dailyInput.js'
import { positionPolicy, timesPolicy, validPasswordsUsingPositionPolicy, validPasswordsUsingTimesPolicy } from './day02.js'

describe('Day 2: Password Philosophy', () => {

  let entries
  before('get input', async () => {
    entries = (await dailyInputLines(2)).filter(e => e !== '')
  })

  describe('Part 1: How many passwords are valid according to the times policy?', () => {
    it('a password is valid when it respect a simple policy', () => {
      expect(timesPolicy({ n1: 1, n2: 1, letter: 'a', password: 'a' })).to.be.true
      expect(timesPolicy({ n1: 1, n2: 1, letter: 'a', password: 'f' })).to.be.false
    })

    it('a password is valid when it respect the highest number of times the letter is in the password', () => {
      expect(timesPolicy({ n1: 2, n2: 3, letter: 'a', password: 'a' })).to.be.false
      expect(timesPolicy({ n1: 1, n2: 3, letter: 'a', password: 'a1a1a' })).to.be.true
    })

    it('parses one entry', () => {
      expect(validPasswordsUsingTimesPolicy(['1-3 a: abcde'])).to.equal(1)
      expect(validPasswordsUsingTimesPolicy(['1-3 b: cdefg'])).to.equal(0)
      expect(validPasswordsUsingTimesPolicy(['2-9 c: ccccccccc'])).to.equal(1)
    })

    it('solves example', () => {
      expect(validPasswordsUsingTimesPolicy(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'])).to.equal(2)
    })

    it('solves it', () => {
      expect(validPasswordsUsingTimesPolicy(entries)).to.equal(548)
    })
  })

  describe('Part 2: How many passwords are valid according to the positions policy?', () => {
    it('a password is valid when the letter is at one of the given int', () => {
      expect(positionPolicy({ n1: 1, n2: 3, letter: 'a', password: 'abcde' })).to.be.true
      expect(positionPolicy({ n1: 1, n2: 3, letter: 'a', password: 'cbade' })).to.be.true
      expect(positionPolicy({ n1: 1, n2: 3, letter: 'a', password: 'babbb' })).to.be.false
    })

    it('a password is valid when the letter is at ONLY one of the given int', () => {
      expect(positionPolicy({ n1: 1, n2: 3, letter: 'a', password: 'ababb' })).to.be.false
      expect(positionPolicy({ n1: 1, n2: 3, letter: 'a', password: 'abbbb' })).to.be.true
    })

    it('parses one entry', () => {
      expect(validPasswordsUsingPositionPolicy(['1-3 a: abcde'])).to.equal(1)
      expect(validPasswordsUsingPositionPolicy(['1-3 b: cdefg'])).to.equal(0)
    })

    it('solves example', () => {
      expect(validPasswordsUsingPositionPolicy(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'])).to.equal(1)
    })

    it('solves it', () => {
      expect(validPasswordsUsingPositionPolicy(entries)).to.equal(502)
    })
  })
})
