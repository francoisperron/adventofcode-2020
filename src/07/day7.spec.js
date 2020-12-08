import { dailyInputLines } from '../dailyInput.js'

const parseRules = rules => rules.map(r => parseRule(r)).reduce((rules, rule) => ({ ...rules, [rule.bag]: rule.containing }), {})

const parseRule = rule => {
  const [bag, containingString] = rule.split(/ bags contain /)
  const containingMatches = containingString.split(/, /).map(c => c.match(/(\d+) (\w+ \w+) bag/))
  const containing = containingMatches[0] === null ? [] : containingMatches.flatMap(parts => parts[2])
  const count = containingMatches[0] === null ? 0 : containingMatches.flatMap(parts => parts[1])
  return { bag, containing, count }
}

const parseRule2 = rule => {

}

const bagsContaining = (bag, rules) => {
  const bags = parseRules(rules)
  const allBags = Object.keys(bags).map(b => findBagsIncludedIn(bags[b], bags))

  return allBags.filter(b => b.includes(bag)).length
}

const findBagsIncludedIn = (rule, rules) => rule.flatMap(r => r === 'shiny gold' ? r : rules[r] ? findBagsIncludedIn(rules[r], rules) : r).filter(unique)
const unique = (value, index, array) => array.indexOf(value) === index

const bagsIn = (bag, rules) => {
  const bags = parseRules2(rules)
  console.log('bags', bags)
  console.log('bags[bag]', bags[bag])
  // bags[bag].
}

const parseRules2 = rules => rules.map(r => parseRule(r)).reduce((rules, rule) => ({ ...rules, [rule.bag]: { bag: rule.containing, count: rule.count} }), {})


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

    it('replaces all bag rules until shiny gold is found', () => {
      const bags = parseRules(example)

      const allBags = Object.keys(bags).map(b => findBagsIncludedIn(bags[b], bags))
      console.log('allBags', allBags)
      expect(allBags).to.eql([
        ['shiny gold'],
        ['shiny gold'],
        ['shiny gold'],
        ['shiny gold'],
        [],
        [],
        [],
        [],
        []
      ])
    })

    it('solves example', () => {
      expect(bagsContaining('shiny gold', example)).to.equal(4)
    })

    it('solves it', () => {
      expect(bagsContaining('shiny gold', entries)).to.equal(103)
    })
  })

  describe('Part 2: How many individual bags are required inside your single shiny gold bag?', () => {
    it('flatten rule', () => {
      const rule = 'dark orange bags contain 2 bright white bags, 1 muted yellow bags.'
      expect(parseRule2(rule)).to.eql({'dark orange' : ['bright white', 'bright white', 'yellow']})
    })
    it('solves for example', () => {
      expect(bagsIn('shiny gold', example)).to.equal(32)
    })
  })
})
