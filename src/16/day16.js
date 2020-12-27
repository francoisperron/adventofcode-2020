const sumErrors = notes => {
  const { tickets, fields } = parseNotes(notes)

  return findInvalidValues(tickets, fields).reduce((a, b) => a + b)
}

const parseNotes = notes => {
  const [fieldsNote, myTicketNote, nearbyTicketNotes] = notes.split('\n\n')

  return {
    fields: parseFieldsNote(fieldsNote),
    ticket: parseTicketNote(myTicketNote.split('\n')[1]),
    tickets: nearbyTicketNotes.split('\n').slice(1).map(n => parseTicketNote(n))
  }
}

const parseFieldsNote = note => note
  .split('\n')
  .map(n => n.match(/([a-z ]+): (\d*)-(\d*) or (\d*)-(\d*)/))
  .flatMap(m => ({ name: m[1], range: [[parseInt(m[2]), parseInt(m[3])], [parseInt(m[4]), parseInt(m[5])]] }))

const parseTicketNote = note => note.split(',').map(Number)

const findInvalidValues = (tickets, fields) => tickets
  .flat()
  .filter(value => fields.every(field => isInvalid(field, value)))

const isInvalid = (field, value) => field.range.every(r => value < r[0] || value > r[1])

// Part 2

const departureFieldsProduct = notes => {
  const { fields, tickets, ticket } = parseNotes(notes)

  const invalidValues = findInvalidValues(tickets, fields)
  const validTickets = tickets.filter(ticket => !ticket.some(value => invalidValues.includes(value)))

  const orderedFields = findFieldsOrder(validTickets, fields)
  return orderedFields.filter(field => field.name.startsWith('departure')).reduce((product, field) => product * ticket[field.position], 1)
}

const findFieldsOrder = (tickets, fields) => {
  let fieldsPosition = []

  for (let i = 0; i < fields.length; i++) {
    for (const field of fields) {
      let valid = true
      for (const ticket of tickets) {
        if (isInvalid(field, ticket[i])) {
          valid = false
          break
        }
      }
      if (valid) {
        fieldsPosition.push({ name: field.name, position: i })
      }
    }
  }

  while (fieldsPosition.length > fields.length) {
    for (let i = 0; i < fields.length; i++) {
      const fieldAtPosition = fieldsPosition.filter(f => f.position === i)

      if (fieldAtPosition.length === 1) {
        const foundField = fieldAtPosition[0]
        fieldsPosition = fieldsPosition.filter(f => f.name === foundField.name ? f.position === foundField.position : true)
      }
    }
  }

  return fieldsPosition
}

export { parseNotes, sumErrors, departureFieldsProduct }
