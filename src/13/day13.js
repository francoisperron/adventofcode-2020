// Part 1

const findEarliestBus = (timestamp, busIds) => {
  const ids = parseBusIds(busIds)

  const busses = ids
    .map(id => ({ id: id, timestamp: closestMultiple(timestamp, id) }))
    .sort((a, b) => a.timestamp - b.timestamp)

  return busses[0]
}

const parseBusIds = busIds => busIds
  .split(',')
  .filter(id => id !== 'x')
  .map(id => parseInt(id))

const closestMultiple = (target, number) => {
  let multiple = number
  while (multiple < target) {
    multiple = multiple + number
  }
  return multiple
}

// Part 2

const findEarliestBusMatchingDeparturesOrder = budIds => {
  const departures = parseDeparturesMinutes(budIds)

  let multiplier = departures[0].id
  let earliestTimestamp = 0

  for (let i = 1; i < departures.length; i++) {
    const bus = departures[i]
    earliestTimestamp = findMatchingMultiple(earliestTimestamp, multiplier, bus.departure, bus.id)
    multiplier *= bus.id
  }

  return earliestTimestamp
}

const parseDeparturesMinutes = busIds => busIds
  .split(',')
  .map((id, i) => id === 'x' ? 0 : { id: parseInt(id), departure: i })
  .filter(i => i !== 0)

const findMatchingMultiple = (start, multiplier, offset, otherMultiplier) => {
  let multiple = start
  while ((multiple + offset) % otherMultiplier !== 0) {
    multiple += multiplier
  }
  return multiple
}

export { findEarliestBus, closestMultiple, findEarliestBusMatchingDeparturesOrder, parseDeparturesMinutes, findMatchingMultiple }
