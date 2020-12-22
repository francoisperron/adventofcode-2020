import { dailyInputLines } from '../dailyInput.js'
import { findAllergens, findUniqueAllergen, parseFood, part1, part2 } from './day21.js'

describe('Day 21: Allergen Assessment', () => {
  const example = [
    'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
    'trh fvjkl sbzzf mxmxvkd (contains dairy)',
    'sqjhc fvjkl (contains soy)',
    'sqjhc mxmxvkd sbzzf (contains fish)'
  ]
  let input
  before('get input', async () => {
    input = await dailyInputLines(21)
  })

  describe('Part 1: Determine which ingredients cannot possibly contain any of the allergens in your list. How many times do any of those ingredients appear?', () => {
    it('parses food', () => {
      const food = parseFood('mxmxvkd kfcds sqjhc nhms (contains dairy, fish)')
      expect(food.ingredients).to.have.members(['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'])
      expect(food.allergens).to.have.members(['dairy', 'fish'])
    })

    it('finds allergens in ingredients', () => {
      const foods = example.map(f => parseFood(f))
      expect(findAllergens(foods)).to.eql({
        'dairy': ['mxmxvkd'],
        'fish': ['mxmxvkd', 'sqjhc'],
        'soy': ['sqjhc', 'fvjkl']
      })
    })

    it('solves example', () => {
      const foods = example.map(f => parseFood(f))
      expect(part1(foods)).to.equal(5)
    })

    it('solves it', () => {
      const foods = input.map(f => parseFood(f))
      expect(part1(foods)).to.equal(1930)
    })
  })

  describe('Part 2: What is your canonical dangerous ingredient list?', () => {
    it('finds unique allergen in ingredients', () => {
      const foods = example.map(f => parseFood(f))
      expect(findUniqueAllergen(findAllergens(foods))).to.eql({
        'dairy': ['mxmxvkd'],
        'fish': ['sqjhc'],
        'soy': ['fvjkl']
      })
    })

    it('solves example', () => {
      const foods = example.map(f => parseFood(f))
      expect(part2(foods)).to.equal('mxmxvkd,sqjhc,fvjkl')
    })

    it('solves it', () => {
      const foods = input.map(f => parseFood(f))
      expect(part2(foods)).to.equal('spcqmzfg,rpf,dzqlq,pflk,bltrbvz,xbdh,spql,bltzkxx')
    })
  })
})
