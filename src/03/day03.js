const treesEncounteredWhileSliding = (map, right = 3, down = 1) => {
  let position = 0
  let trees = 0
  for (let i = 0; i < map.length; i = i + down) {
    const row = map[i].split('')
    if (row[position] === '#') trees++
    position = (position + right) % row.length
  }
  return trees
}

export { treesEncounteredWhileSliding }
