const winnerScore = (deck1, deck2) => {
  while (deck1.length > 0 && deck2.length > 0) {
    [deck1, deck2] = playRound(deck1, deck2)
  }

  return deck1.length > 0 ? calculateScore(deck1) : calculateScore(deck2)
}

const parseDecks = input => {
  const [p1, p2] = input.split('\n\n')
  return [p1.split('\n').slice(1).map(Number), p2.split('\n').slice(1).map(Number)]
}

const playRound = (deck1, deck2) => {
  const player1Card = deck1[0]
  const player2Card = deck2[0]
  return player1Card > player2Card
    ? [[...deck1.slice(1), player1Card, player2Card], [...deck2.slice(1)]]
    : [[...deck1.slice(1)], [...deck2.slice(1), player2Card, player1Card]]
}

const calculateScore = deck => deck.reduce((sum, card, i) => sum + (card * (deck.length - i)), 0)

export { parseDecks, playRound, winnerScore }
