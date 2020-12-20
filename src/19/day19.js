const parse = input => {
  const [rules, messages] = input.split('\n\n')
  return { rules: parseRules(rules), messages: messages.split('\n') }
}

const parseRules = input => input.split('\n')
  .map(r => /^(?<number>\d+): (?<value>.*)$/.exec(r))
  .reduce((rules, result) => ({ ...rules, [result.groups.number]: result.groups.value.replaceAll('"', '') }), {})

const messagesMathingRule = (ruleNumber, rules, messages) => {
  rules[ruleNumber] = buildRule(ruleNumber, rules)

  return messages.filter(m => new RegExp(`^${rules[ruleNumber]}$`).test(m))
}

const buildRule = (ruleNumber, rules) => {
  const rule = rules[ruleNumber]
  if (!/\d/.test(rule)) {
    return rule
  }

  rules[ruleNumber] = `(${rule.split('|').flatMap(or => or.split(' ').map(r => buildRule(r, rules)).join('')).join('|')})`
  return rules[ruleNumber]
}

const part2 = (rules, messages) => {
  rules['8'] = '42 | 42 8'
  rules['11'] = '42 31 | 42 11 31'

  messagesMathingRule(31, rules, messages)
  messagesMathingRule(42, rules, messages)

  // find messages matching rule 42 and rule 31
  // keep messages when rule 42 matches > rule 31 matches
  const rules31And42 = new RegExp(`^(?<msg42>(${rules[42]})+)(?<msg31>(${rules[31]})+)$`)
  return messages
    .map(m => rules31And42.exec(m))
    .filter(result => result !== null)
    .filter(result => result.groups.msg42.match(new RegExp(rules[42], 'g')).length > result.groups.msg31.match(new RegExp(rules[31], 'g')).length)
}

export { parse, messagesMathingRule, part2 }
