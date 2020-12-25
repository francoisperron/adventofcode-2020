const part1 = input => {
  const result = input.split(('\n'))
    .map(t => parseTile(t))
    .map(t => `${t.x}:${t.y}`)
    .reduce((tiles, t) => ({ ...tiles, [t]: tiles[t] === undefined ? 1 : tiles[t] + 1 }), {})

  return Object.values(result).filter(v => v % 2 !== 0).length
}

const parseTile = tile => tile
  .match(/(e|w|ne|nw|se|sw)/g)
  .reduce((result, move) => tiles[move](result), { x: 0, y: 0 })

const tiles = {
  'e': ({ x, y }) => ({ x: x + 1, y: y }),
  'w': ({ x, y }) => ({ x: x - 1, y: y }),
  'ne': ({ x, y }) => ({ x: x + 0.5, y: y + 1 }),
  'nw': ({ x, y }) => ({ x: x - 0.5, y: y + 1 }),
  'se': ({ x, y }) => ({ x: x + 0.5, y: y - 1 }),
  'sw': ({ x, y }) => ({ x: x - 0.5, y: y - 1 })
}

export { part1, parseTile }
