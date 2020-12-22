import { dailyInput } from '../dailyInput.js'
import { parseDecks, playRound, winnerScore } from './day22.js'

describe('Day 22: Crab Combat', () => {
  const example =
    'Player 1:\n' +
    '9\n' +
    '2\n' +
    '6\n' +
    '3\n' +
    '1\n' +
    '\n' +
    'Player 2:\n' +
    '5\n' +
    '8\n' +
    '4\n' +
    '7\n' +
    '10'
  let input
  before('get input', async () => {
    input = await dailyInput(22)
  })

  describe('Part 1: What is the winning player\'s score?', () => {

    it('parses decks', () => {
      const decks = parseDecks(example)
      expect(decks).to.have.deep.members([[9, 2, 6, 3, 1], [5, 8, 4, 7, 10]])
    })

    it('plays a turn', () => {
      const [deck1, deck2] = parseDecks(example)
      const [newDeck1, newDeck2] = playRound(deck1, deck2)

      expect(newDeck1).to.eql([2, 6, 3, 1, 9, 5])
      expect(newDeck2).to.eql([8, 4, 7, 10])
    })

    it('solves example', () => {
      const [deck1, deck2] = parseDecks(example)
      expect(winnerScore(deck1, deck2)).to.equal(306)
    })

    it('solves it', () => {
      const [deck1, deck2] = parseDecks(input)
      expect(winnerScore(deck1, deck2)).to.equal(32815)
    })
  })
})
