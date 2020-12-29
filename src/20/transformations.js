const rotateRight = matrix => compose(reverse, transpose)(matrix)
const rotateLeft = matrix => compose(transpose, reverse)(matrix)

const flipHorizontaly = matrix => reverse(matrix)
const flipVerticaly = matrix => compose(flipHorizontaly, rotateRight, rotateRight)(matrix)

const transpose = matrix => matrix[0].map((column, index) => matrix.map(row => row[index]))
const reverse = array => [...array].reverse()
const compose = (...transformations) => matrix => transformations.reduce((result, t) => t(result), matrix)

export { rotateRight, rotateLeft, flipHorizontaly, flipVerticaly }
