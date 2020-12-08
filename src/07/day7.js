const parseRules = rules => rules.map(r => parseRule(r)).reduce((rules, rule) => ({ ...rules, [rule.bag]: rule.containing }), {})

const parseRule = rule => {
  const [bag, containingString] = rule.split(/ bags contain /)
  const containingMatches = containingString.split(/, /).map(c => c.match(/(\d+) (\w+ \w+) bag/))
  const containing = containingMatches[0] === null ? [] : containingMatches.flatMap(parts => parts[2])
  return { bag, containing }
}

const bagsContaining = (bag, rules) => {
  const bags = parseRules(rules)
  const allBags = Object.keys(bags).map(b => findBagsIncludedIn(bags[b], bags))
  return allBags.filter(b => b.includes(bag)).length
}

const findBagsIncludedIn = (rule, rules) => rule.flatMap(r => r === 'shiny gold' ? r : rules[r] ? findBagsIncludedIn(rules[r], rules) : r)

const bagsIn = (rule, rules) => rules[rule].flatMap(r => rules[r] ? [...bagsIn(r, rules), r] : r)

const parseRules2 = rules => rules.map(r => parseRule2(r)).reduce((rules, rule) => ({ ...rules, [rule.bag]: rule.containing}), {})

const parseRule2 = rule => {
  const [bag, containingString] = rule.split(/ bags contain /)
  const containingMatches = containingString.split(/, /).map(c => c.match(/(\d+) (\w+ \w+) bag/))
  const containing = containingMatches[0] === null ? [] : containingMatches.flatMap(m => Array.from({ length: m[1] }, () => (m[2])))
  return { bag, containing }
}

export { parseRules, parseRule2, parseRules2, findBagsIncludedIn, bagsIn, bagsContaining }
