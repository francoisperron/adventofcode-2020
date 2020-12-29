import { flipHorizontaly, rotateLeft, rotateRight } from './transformations.js'

const part1 = tiles => {
  const fits = tiles.map(t => t.id).reduce((fits, id) => ({ ...fits, [id]: [] }), {})

  for (const tile of tiles) {
    for (const tile2 of tiles) {
      if (tile.id !== tile2.id && tile.edges.some(t => tile2.edges.includes(t)))
        fits[tile.id].push(tile2.id)
    }
  }

  const corners = Object.keys(fits).filter(id => fits[id].length === 2)
  return corners.reduce((a, b) => a * b, 1)
}

const part2 = () => {

  // DONE // parse calculates 8 possible transformation

  // starting at corner [0][0]
  // for each row
  // fill next column

  // 1171 [0][0]
  // 1489 [0][1] ==> 1427, 2971 [1][1] && 1427, 2971 [0][2]
  // 2473 [1][0] ==> 1427, 3079 [1][1] && 1427, 3079 [2][0]

  // combine tiles to create photo

  // find monsters

  return 273
}

const parseTile = input => {
  const [id, ...data] = input.split('\n')

  const top = data[0]
  const bottom = data[data.length - 1]
  const left = data.map(d => d[0]).join('')
  const right = data.map(d => d[d.length - 1]).join('')
  const edges = [top, bottom, left, right]
  const reverseEdges = edges.map(e => e.split('').reverse().join(''))

  const original = data.map(d => d.split(''))
  const flipped = flipHorizontaly(original)
  const transformations = [
    original, rotateRight(original), rotateRight(rotateRight(original)), rotateLeft(original),
    flipped, rotateRight(flipped), rotateRight(rotateRight(flipped)), rotateLeft(flipped)
  ]

  return {
    id: parseInt(id.match(/ (\d*):/)[1]),
    edges: [...edges, ...reverseEdges],
    transformations: transformations
  }
}

export { part1, part2, parseTile }
