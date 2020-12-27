import { dailyInput } from '../dailyInput.js'
import { departureFieldsProduct, parseNotes, sumErrors } from './day16.js'

describe('Day 16:  Ticket Translation', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(16)
  })

  describe('Part 1: Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?', () => {
    const example =
      'class: 1-3 or 5-7\n' +
      'row: 6-11 or 33-44\n' +
      'seat: 13-40 or 45-50\n' +
      '\n' +
      'your ticket:\n' +
      '7,1,14\n' +
      '\n' +
      'nearby tickets:\n' +
      '7,3,47\n' +
      '40,4,50\n' +
      '55,2,20\n' +
      '38,6,12'

    describe('parses notes', () => {
      it('parses ranges', () => {
        const input = parseNotes(example)
        expect(input.fields).to.eql([
          { 'name': 'class', 'range': [[1, 3], [5, 7]] },
          { 'name': 'row', 'range': [[6, 11], [33, 44]] },
          { 'name': 'seat', 'range': [[13, 40], [45, 50]] }
        ])
      })

      it('parses your ticket', () => {
        const input = parseNotes(example)
        expect(input.ticket).to.eql([7, 1, 14])
      })

      it('parses nearby tickets', () => {
        const input = parseNotes(example)
        expect(input.tickets).to.eql([[7, 3, 47], [40, 4, 50], [55, 2, 20], [38, 6, 12]])
      })
    })

    it('finds when a ticket number is not in a range', () => {
      const simple =
        'class: 1-3 or 5-7\n' +
        '\n' +
        'your ticket:\n' +
        '7,1,14\n' +
        '\n' +
        'nearby tickets:\n' +
        '7,3,47'
      expect(sumErrors(simple)).to.equal(47)
    })

    it('solves exemple', () => {
      expect(sumErrors(example)).to.equal(71)
    })

    it('solves it', () => {
      expect(sumErrors(input)).to.equal(30869)
    })
  })

  describe('Part 2: What do you get if you multiply those six values together?', () => {
    const example =
      'departure class: 0-1 or 4-19\n' +
      'departure row: 0-5 or 8-19\n' +
      'seat: 0-13 or 16-19\n' +
      '\n' +
      'your ticket:\n' +
      '11,12,13\n' +
      '\n' +
      'nearby tickets:\n' +
      '3,9,18\n' +
      '15,1,5\n' +
      '15,1,99\n' +
      '15,99,5\n' +
      '99,1,5\n' +
      '5,14,9'

    it('solves example', () => {
      expect(departureFieldsProduct(example)).to.equal(11 * 12)
    })

    it('solves it', () => {
      expect(departureFieldsProduct(input)).to.equal(4381476149273)
    })
  })
})
