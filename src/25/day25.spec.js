import { dailyInput } from '../dailyInput.js'

const encryptionKey = (card, door) => {
  let key = 1
  let targetDoor = 1
  while (targetDoor !== door) {
    targetDoor = (targetDoor * 7) % 20201227
    key = (key * card) % 20201227
  }
  return key
}

describe('Day 25: Combo Breaker', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(25)
  })

  describe('Part 1: What encryption key is the handshake trying to establish?', () => {
    it('solves example', () => {
      const card = 5764801
      const door = 17807724
      expect(encryptionKey(card, door)).to.equal(14897079)
    })

    it('solves it', () => {
      const [card, door] = input.split('\n').map(Number)
      expect(encryptionKey(card, door)).to.equal(16881444)
    })
  })
})
