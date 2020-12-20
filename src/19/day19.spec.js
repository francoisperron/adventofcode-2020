import { messagesMathingRule, parse, part2 } from './day19.js'
import { dailyInput } from '../dailyInput.js'

describe('Day 19: Monster Messages', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(19)
  })

  describe('Part 1: How many messages completely match rule 0?', () => {
    const example =
      '0: 4 1 5\n' +
      '1: 2 3 | 3 2\n' +
      '2: 4 4 | 5 5\n' +
      '3: 4 5 | 5 4\n' +
      '4: "a"\n' +
      '5: "b"\n' +
      '\n' +
      'ababbb\n' +
      'bababa\n' +
      'abbbab\n' +
      'aaabbb\n' +
      'aaaabbb'

    it('parses rules', () => {
      const { rules } = parse(example)
      expect(rules).to.eql({ '0': '4 1 5', '1': '2 3 | 3 2', '2': '4 4 | 5 5', '3': '4 5 | 5 4', '4': 'a', '5': 'b' })
    })

    it('parses messages', () => {
      const { messages } = parse(example)
      expect(messages).to.eql(['ababbb', 'bababa', 'abbbab', 'aaabbb', 'aaaabbb'])
    })

    it('finds messages matching simple rule', () => {
      const rules = { '0': 'aaa' }
      const messages = ['aaa', 'bbb', 'aaa']
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('finds messages when rule refers to another rule', () => {
      const rules = { '0': '1', '1': 'aaa' }
      const messages = ['aaa', 'bbb', 'aaa']
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('finds messages when rule combines to 2 other rules', () => {
      const rules = { '0': '1 2', '1': 'aa', '2': 'a' }
      const messages = ['aaa', 'bbb', 'aaa']
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('finds message when rules refers to another rule that refers to another one', () => {
      const rules = { '0': '1', '1': '2', '2': 'aaa' }
      const messages = ['aaa', 'bbb', 'aaa']
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('finds message when rule has OR rules', () => {
      const rules = { '0': '1 2 | 2 1', '1': 'a', '2': 'b' }
      const messages = ['ab', 'ba', 'aa', 'bb']
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('finds message when rule joins an OR rule', () => {
      const rules = {
        '0': '1 2',                 // 0 ==> (a|b)a
        '1': '2 | 3', // 1 ==> a|b
        '2': 'a',
        '3': 'b'
      }
      const messages = ['ab', 'ba', 'aa', 'bb']
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('solve exemple', () => {
      const { rules, messages } = parse(example)
      expect(messagesMathingRule(0, rules, messages).length).to.equal(2)
    })

    it('solves it', () => {
      const { rules, messages } = parse(input)
      expect(messagesMathingRule(0, rules, messages).length).to.equal(180)
    })
  })

  describe('Part 2: After updating rules 8 and 11, how many messages completely match rule 0?', () => {
    const example =
      '42: 9 14 | 10 1\n' +
      '9: 14 27 | 1 26\n' +
      '10: 23 14 | 28 1\n' +
      '1: "a"\n' +
      '11: 42 31 | 42 11 31\n' +
      '5: 1 14 | 15 1\n' +
      '19: 14 1 | 14 14\n' +
      '12: 24 14 | 19 1\n' +
      '16: 15 1 | 14 14\n' +
      '31: 14 17 | 1 13\n' +
      '6: 14 14 | 1 14\n' +
      '2: 1 24 | 14 4\n' +
      '0: 8 11\n' +
      '13: 14 3 | 1 12\n' +
      '15: 1 | 14\n' +
      '17: 14 2 | 1 7\n' +
      '23: 25 1 | 22 14\n' +
      '28: 16 1\n' +
      '4: 1 1\n' +
      '20: 14 14 | 1 15\n' +
      '3: 5 14 | 16 1\n' +
      '27: 1 6 | 14 18\n' +
      '14: "b"\n' +
      '21: 14 1 | 1 14\n' +
      '25: 1 1 | 1 14\n' +
      '22: 14 14\n' +
      '8: 42 | 42 8\n' +
      '26: 14 22 | 1 20\n' +
      '18: 15 15\n' +
      '7: 14 5 | 1 21\n' +
      '24: 14 1\n' +
      '\n' +
      'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa\n' +
      'bbabbbbaabaabba\n' +
      'babbbbaabbbbbabbbbbbaabaaabaaa\n' +
      'aaabbbbbbaaaabaababaabababbabaaabbababababaaa\n' +
      'bbbbbbbaaaabbbbaaabbabaaa\n' +
      'bbbababbbbaaaaaaaabbababaaababaabab\n' +
      'ababaaaaaabaaab\n' +
      'ababaaaaabbbaba\n' +
      'baabbaaaabbaaaababbaababb\n' +
      'abbbbabbbbaaaababbbbbbaaaababb\n' +
      'aaaaabbaabaaaaababaa\n' +
      'aaaabbaaaabbaaa\n' +
      'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa\n' +
      'babaaabbbaaabaababbaabababaaab\n' +
      'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba'

    it('solves example', () => {
      const { rules, messages } = parse(example)
      expect(part2(rules, messages).length).to.equal(12)
    })

    it('solve it', () => {
      const { rules, messages } = parse(input)
      expect(part2(rules, messages).length).to.equal(323)
    })
  })
})
