const countUniqueAnswers = groupAnswers => uniqueAnswers(groupAnswers).length
const countEveryoneAnswers = groupAnswers => uniqueAnswers(groupAnswers).filter(answer => everyoneHasAnswer(groupAnswers, answer)).length

const uniqueAnswers = groupAnswers => groupAnswers.replace(/\n/g, '').split('').filter(unique)
const unique = (value, index, array) => array.indexOf(value) === index

const everyoneHasAnswer = (groupAnswers, answer) => groupAnswers.split('\n').every(personAnswers => personAnswers.includes(answer))

export { countUniqueAnswers, countEveryoneAnswers }
