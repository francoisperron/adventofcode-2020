import { dailyInput } from '../dailyInput.js'
import { countUniqueAnswers, countEveryoneAnswers } from './day6.js'

describe('Day 6: Custom Customs', () => {

  let entries
  before('get input', async () => {
    entries = (await dailyInput(6)).split('\n\n')
  })

  describe('Part 1: Count the number of questions to which anyone answered', () => {
    it('calculates number of unique answers (letters) for one person', () => {
      expect(countUniqueAnswers('abc')).to.equal(3)
    })

    it('calculates number of answers for a group of three persons', () => {
      expect(countUniqueAnswers('a\nb\nc')).to.equal(3)
    })

    it('doest not count the same anwser (letter) twice', () => {
      expect(countUniqueAnswers('ab\nac')).to.equal(3)
    })

    it('solves it', () => {
      expect(entries.reduce((sum, anwwers) => sum + countUniqueAnswers(anwwers), 0)).to.equal(6630)
    })
  })

  describe('Part 2: Count the number of questions to which everyone answered', () => {
    it('calculates number of answers for one person', () => {
      expect(countEveryoneAnswers('abc')).to.equal(3)
    })

    it('calculates number of same answers for a group of two persons', () => {
      expect(countEveryoneAnswers('ab\nac')).to.equal(1)
    })

    it('solves it for the example', () => {
      const example = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb'.split('\n\n')
      expect(example.reduce((sum, answers) => sum + countEveryoneAnswers(answers), 0)).to.equal(6)
    })

    it('solves it', () => {
      expect(entries.reduce((sum, answers) => sum + countEveryoneAnswers(answers), 0)).to.equal(3437)
    })
  })
})
