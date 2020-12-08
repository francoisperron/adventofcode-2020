import { dailyInputLines } from '../dailyInput.js'
import { bagsContaining, bagsIn, parseRules, parseRules2 } from './day7.js'

describe('Day 7: Handy Haversacks', () => {

  let entries
  before('get input', async () => {
    entries = await dailyInputLines(7)
  })

  const example = [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.'
  ]

  describe('Part 1: How many bag colors can eventually contain at least one shiny gold bag?', () => {
    it('is 0 when there is no bags containing a shiny gold bag ', () => {
      const rules = ['shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.']
      expect(bagsContaining('shiny gold', rules)).to.equal(0)
    })

    it('is 2 when there only 2 simple rules', () => {
      const rules = [
        'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags',
        'bright white bags contain 1 shiny gold bag.'
      ]
      expect(bagsContaining('shiny gold', rules)).to.equal(2)
    })

    it('can be included in another bag', () => {
      const rules = [
        'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
        'bright white bags contain 1 shiny gold bag.'
      ]
      expect(bagsContaining('shiny gold', rules)).to.equal(2)
    })

    it('parses rules into usable object', () => {
      expect(parseRules(example)).to.eql({
        'light red': ['bright white', 'muted yellow'],
        'dark orange': ['bright white', 'muted yellow'],
        'bright white': ['shiny gold'],
        'muted yellow': ['shiny gold', 'faded blue'],
        'shiny gold': ['dark olive', 'vibrant plum'],
        'dark olive': ['faded blue', 'dotted black'],
        'vibrant plum': ['faded blue', 'dotted black'],
        'dotted black': [],
        'faded blue': []
      })
    })

    it('solves example', () => {
      expect(bagsContaining('shiny gold', example)).to.equal(4)
    })

    it('solves it', () => {
      expect(bagsContaining('shiny gold', entries)).to.equal(103)
    })
  })

  describe('Part 2: How many individual bags are required inside your single shiny gold bag?', () => {
    it('flattens rule', () => {
      const rule = ['dark orange bags contain 2 bright white bags, 1 muted yellow bags.']
      expect(parseRules2(rule)).to.eql({'dark orange' : ['bright white', 'bright white', 'muted yellow']})
    })
    it('solves for example', () => {
      const rules = parseRules2(example)
      expect(bagsIn('shiny gold', rules).length).to.equal(32)
    })

    it('solves it', () => {
      const rules = parseRules2(entries)
      expect(bagsIn('shiny gold', rules).length).to.equal(1469)
    })
  })
})
