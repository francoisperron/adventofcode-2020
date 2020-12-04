const validPasswordsUsingTimesPolicy = (entries) => validPasswordsUsingPolicy(entries, timesPolicy)
const validPasswordsUsingPositionPolicy = (entries) => validPasswordsUsingPolicy(entries, positionPolicy)

const validPasswordsUsingPolicy = (entries, policy) => entries
  .map(e => parseEntry(e))
  .map(e => policy(e))
  .filter(valid => valid).length

const parseEntry = entry => {
  const parts = entry.match(/(\d*)-(\d*) (.): (\w*)/)
  return { n1: parseInt(parts[1]), n2: parseInt(parts[2]), letter: parts[3], password: parts[4] }
}

const timesPolicy = ({ n1, n2, letter, password }) => {
  const count = password.split('').filter(p => p === letter).length
  return n1 <= count && count <= n2
}

const positionPolicy = ({ n1, n2, letter, password }) => password
  .split('')
  .filter((c, i) => c === letter && (i + 1 === n1 || i + 1 === n2))
  .length === 1

export { timesPolicy, validPasswordsUsingTimesPolicy, positionPolicy, validPasswordsUsingPositionPolicy }
