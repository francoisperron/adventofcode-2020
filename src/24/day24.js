import { unique } from '../arrays.js'

const part1 = input => blackTilesIn(input).length

const part2 = (input, day) => {
  let blackTiles = blackTilesIn(input)

  for (let i = 0; i < day; i++) {
    blackTiles = flip(blackTiles)
  }

  return blackTiles.length
}

const flip = blackTiles => {
  const nextState = []
  for (let tile of blackTiles) {
    if (keepBlackTile(tile, blackTiles)) {
      nextState.push(tile)
    }
    const adjacents = [
      tileAt['e'](tile),
      tileAt['w'](tile),
      tileAt['ne'](tile),
      tileAt['nw'](tile),
      tileAt['se'](tile),
      tileAt['sw'](tile)
    ]
    for (const adjacent of adjacents) {
      if(flipWhiteTile(adjacent, blackTiles)){
        nextState.push(adjacent)
      }
    }
  }
  return nextState.map(t => stringOf(t)).filter(unique).map(t => ({ x: parseFloat(t.split(':')[0]), y: parseFloat(t.split(':')[1]) }))
}

const keepBlackTile = (tile, tiles) => {
  const adjacents = nbAdjacent(tile, tiles)
  return adjacents === 1 || adjacents === 2
}

const flipWhiteTile = (tile, tiles) => {
  const adjacents = nbAdjacent(tile, tiles)
  return adjacents === 2
}

const nbAdjacent = (tile, tiles) => {
  const set = new Set(tiles.map(t => stringOf(t)))

  return [
    set.has(stringOf(tileAt['e'](tile))),
    set.has(stringOf(tileAt['w'](tile))),
    set.has(stringOf(tileAt['ne'](tile))),
    set.has(stringOf(tileAt['nw'](tile))),
    set.has(stringOf(tileAt['se'](tile))),
    set.has(stringOf(tileAt['sw'](tile)))
  ].filter(Boolean).length
}

const blackTilesIn = input => {
  const tiles = input.split(('\n'))
    .map(t => parseTile(t))
    .map(t => stringOf(t))
    .reduce((tiles, t) => ({ ...tiles, [t]: tiles[t] === undefined ? 1 : tiles[t] + 1 }), {})

  return Object.keys(tiles).filter(tile => tiles[tile] % 2 !== 0).map(t => ({ x: parseFloat(t.split(':')[0]), y: parseFloat(t.split(':')[1]) }))
}

const parseTile = tile => tile
  .match(/(e|w|ne|nw|se|sw)/g)
  .reduce((result, move) => tileAt[move](result), { x: 0, y: 0 })

const tileAt = {
  'e': ({ x, y }) => ({ x: x + 1, y: y }),
  'w': ({ x, y }) => ({ x: x - 1, y: y }),
  'ne': ({ x, y }) => ({ x: x + 0.5, y: y + 1 }),
  'nw': ({ x, y }) => ({ x: x - 0.5, y: y + 1 }),
  'se': ({ x, y }) => ({ x: x + 0.5, y: y - 1 }),
  'sw': ({ x, y }) => ({ x: x - 0.5, y: y - 1 })
}

const stringOf = tile => `${tile.x}:${tile.y}`

export { part1, part2, parseTile, nbAdjacent }
