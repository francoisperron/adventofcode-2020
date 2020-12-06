import { dailyInput } from '../dailyInput.js'

const countAnswers = groupAnswers => groupAnswers.replace(/\n/g, '').split('').filter(unique).length
const unique = (v, i, a) => a.indexOf(v) === i

const countEveryoneAnswers = groupAnswers => {
  const nbPersons = groupAnswers.split('\n').length

  const letters = groupAnswers.replace(/\n/g, '').split('')
  const lettersCount = letters.reduce((counts, letter) => ({ ...counts, [letter]: (counts[letter] || 0) + 1 }), {})

  return Object.keys(lettersCount).filter(l => lettersCount[l] === nbPersons).length
}

describe('Day 6: Custom Customs', () => {

  let entries
  before('get input', async () => {
    entries = (await dailyInput(6)).split('\n\n')
  })

  describe('Part 1: Count the number of questions to which anyone answered', () => {
    it('calculates number of letters for one person', () => {
      expect(countAnswers('abc')).to.equal(3)
    })

    it('calculates number of letters for a group of three persons', () => {
      expect(countAnswers('a\nb\nc')).to.equal(3)
    })

    it('doest not count the same anwser (letter) twice', () => {
      expect(countAnswers('ab\nac')).to.equal(3)
    })

    it('solves it', () => {
      expect(entries.reduce((sum, anwwers) => sum + countAnswers(anwwers), 0)).to.equal(6630)
    })
  })

  describe('Part 2: Count the number of questions to which everyone answered', () => {
    it('calculates number of letters for one person', () => {
      expect(countEveryoneAnswers('abc')).to.equal(3)
    })

    it('calculates number of same letters for a group of two persons', () => {
      expect(countEveryoneAnswers('ab\nac')).to.equal(1)
    })

    it('solves it for the example', () => {
      const example = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb'.split(('\n\n'))

      expect(example.reduce((sum, answers) => sum + countEveryoneAnswers(answers), 0)).to.equal(6)
    })

    it('solves it', () => {
      expect(entries.reduce((sum, answers) => sum + countEveryoneAnswers(answers), 0)).to.equal(3437)
    })
  })
})
