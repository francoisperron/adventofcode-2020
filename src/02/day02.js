const validPasswordsUsingTimesPolicy = (entries) => entries
  .map(e => parseEntry(e))
  .map(e => timesPolicy(e))
  .filter(valid => valid === true).length

const parseEntry = entry => {
  const [policy, password] = entry.split(': ')
  const [numbers, letter] = policy.split(' ')
  const [n1, n2] = numbers.split('-').map(c => parseInt(c))
  return { n1, n2, letter, password }
}

const timesPolicy = ({ n1, n2, letter, password }) => {
  const count = password.split('').filter(p => p === letter).length
  return n1 <= count && count <= n2
}

const validPasswordsUsingPositionPolicy = entries => entries
  .map(e => parseEntry(e))
  .map(e => positionPolicy(e))
  .filter(valid => valid === true).length

const positionPolicy = ({ n1, n2, letter, password }) => {
  const positions = []
  for (let i = 0; i < password.length; i++) {
    if (password[i] === letter) positions.push(i + 1)
  }
  return positions.filter(p => p === n1 || p === n2).length === 1
}

export { timesPolicy, validPasswordsUsingTimesPolicy, positionPolicy, validPasswordsUsingPositionPolicy }
