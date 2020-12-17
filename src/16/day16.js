const sumErrors = notes => {
  const { tickets, fields } = parseNotes(notes)

  return invalidFieldValues(tickets, fields).reduce((a, b) => a + b)
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

const invalidFieldValues = (tickets, fields) => tickets
  .flat()
  .filter(t => fields.flatMap(field => field.range).every(r => t < r[0] || t > r[1]))

// Part 2

const departureFieldsProduct = notes => {
  const { fields, tickets, ticket } = parseNotes(notes)

  // enlever les tickets invalides
  const invalidValues = invalidFieldValues(tickets, fields)
  const validTickets = tickets.filter(ticket => !ticket.some(value => invalidValues.includes(value)))
  // validTickets [ [ 3, 9, 18 ], [ 15, 1, 5 ], [ 5, 14, 9 ] ]

//       'departure class: 0-1 or 4-19\n' +
//       'departure row: 0-5 or 8-19\n' +
//       'seat: 0-13 or 16-19\n' +

  console.log('validTickets', validTickets)
  console.log('ticket', ticket)

  return ticket[0] * ticket[1]
}

export { parseNotes, sumErrors, departureFieldsProduct }
