const follow = instructions => instructions.reduce((ship, i) => compute(ship, i), { x: 0, y: 0, direction: 'E' })

const compute = (ship, instruction) => instructions[instruction[0]](ship, parseInt(instruction.slice(1)))

const instructions = {
  'N': (ship, value) => move(ship, 0, value),
  'S': (ship, value) => move(ship, 0, -value),
  'E': (ship, value) => move(ship, value, 0),
  'W': (ship, value) => move(ship, -value, 0),
  'L': (ship, value) => turn(ship, -value),
  'R': (ship, value) => turn(ship, value),
  'F': (ship, value) => moveForward(ship, ship.direction, value)
}

const move = (ship, x, y) => ({
  direction: ship.direction,
  x: ship.x + x,
  y: ship.y + y
})

const turn = (ship, value) => ({
  x: ship.x,
  y: ship.y,
  direction: 'NESW'[('NESW'.indexOf(ship.direction) + value / 90 + 4) % 4]
})

const moveForward = (ship, direction, value) => move(ship, directionsX[direction] * value, directionsY[direction] * value)
const directionsX = { 'E': 1, 'W': -1, 'S': 0, 'N': 0 }
const directionsY = { 'E': 0, 'W': 0, 'S': -1, 'N': 1 }

// Part 2
const followWaypoint = instructions => instructions.reduce((result, i) => computeWaypoint(result.ship, result.waypoint, i), { ship: { x: 0, y: 0 }, waypoint: { x: 10, y: 1 } })

const computeWaypoint = (ship, waypoint, instruction) => instructionsWaypoint[instruction[0]](ship, waypoint, parseInt(instruction.slice(1)))

const instructionsWaypoint = {
  'N': (ship, waypoint, value) => ({ ship, waypoint: moveWaypoint(waypoint, 'N', value) }),
  'S': (ship, waypoint, value) => ({ ship, waypoint: moveWaypoint(waypoint, 'S', value) }),
  'E': (ship, waypoint, value) => ({ ship, waypoint: moveWaypoint(waypoint, 'E', value) }),
  'W': (ship, waypoint, value) => ({ ship, waypoint: moveWaypoint(waypoint, 'W', value) }),
  'L': (ship, waypoint, value) => ({ ship, waypoint: turnWaypoint(waypoint, -value) }),
  'R': (ship, waypoint, value) => ({ ship, waypoint: turnWaypoint(waypoint, value) }),
  'F': (ship, waypoint, value) => ({ ship: moveShip(ship, waypoint, value), waypoint })
}

const moveShip = (ship, waypoint, value) => ({ x: ship.x + waypoint.x * value, y: ship.y + waypoint.y * value })

const moveWaypoint = (waypoint, direction, value) => {
  const forward = moveForward(waypoint, direction, value)
  return { x: forward.x, y: forward.y }
}

const turnWaypoint = (waypoint, value) => {
  const values = {
    '90': (w) => ({ x: w.y, y: -w.x }),
    '-270': (w) => ({ x: w.y, y: -w.x }),
    '180': (w) => ({ x: -w.x, y: -w.y }),
    '-180': (w) => ({ x: -w.x, y: -w.y }),
    '270': (w) => ({ x: -w.y, y: w.x }),
    '-90': (w) => ({ x: -w.y, y: w.x })
  }
  return values[value](waypoint)
}

export { follow, compute, followWaypoint, computeWaypoint }
