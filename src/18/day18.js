const parse = input => input.replaceAll(' ', '')

const evaluateParentheses = (expression, evaluate) => {
  if (!expression.includes('(')) return expression

  const { start, stop } = findParentheses(expression)

  return evaluateParentheses(expression.slice(0, start - 1) + evaluate(expression.slice(start, stop)) + expression.slice(stop + 1), evaluate)
}

const findParentheses = expression => {
  let parenthesesCount = 0
  let openParentheseIndex

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '(') {
      if (parenthesesCount === 0) {
        openParentheseIndex = i
      }
      parenthesesCount++
    } else if (expression[i] === ')') {
      parenthesesCount--
      if (parenthesesCount === 0) {
        return { start: openParentheseIndex + 1, stop: i }
      }
    }
  }
}

// Part 1

const evaluatePart1 = input => {
  let expression = parse(input)
  expression = evaluateParentheses(expression, evaluatePart1)

  return evaluateFromLeftToRight(expression)
}

const evaluateFromLeftToRight = expression => {
  const number = parseInt(expression.match(/^\d+/)[0])
  return expression.match(/([+*])\d+/g).reduce((result, operation) => eval(result + operation), number)
}

// Part 2

const evaluatePart2 = input => {
  let expression = parse(input)
  expression = evaluateParentheses(expression, evaluatePart2)

  return evaluateAddFirst(expression)
}

const evaluateAddFirst = expression => expression.split('*').reduce((result, operation) => result * eval(operation), 1)

export { evaluatePart1, evaluatePart2, findParentheses, parse, evaluateAddFirst }
