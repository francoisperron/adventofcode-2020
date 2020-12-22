const winnerScore = (deck1, deck2) => {
  while (deck1.length > 0 && deck2.length > 0) {
    playRound(deck1, deck2)
  }

  return deck1.length > 0 ? calculateScore(deck1) : calculateScore(deck2)
}

const winnerScoreRecursive = (deck1, deck2) => {
  [deck1, deck2] = playGame(deck1, deck2)

  return deck1.length > 0 ? calculateScore(deck1) : calculateScore(deck2)
}

const parseDecks = input => {
  const [p1, p2] = input.split('\n\n')
  return [p1.split('\n').slice(1).map(Number), p2.split('\n').slice(1).map(Number)]
}

const playGame = (deck1, deck2) => {
  const decks = new Set()
  while (deck1.length > 0 && deck2.length > 0) {
    const hash = `${deck1.join(',')}:${deck2.join(',')}`
    if (decks.has(hash)) {
      return [deck1, []]
    }
    decks.add(hash)

    playRound(deck1, deck2, true)
  }

  return [deck1, deck2]
}

const playRound = (deck1, deck2, recursive) => {
  const player1Card = deck1.shift()
  const player2Card = deck2.shift()

  if (recursive && player1Card <= deck1.length && player2Card <= deck2.length) {
    const [resultDeck1] = playGame(deck1.slice(0, player1Card), deck2.slice(0, player2Card))
    resultDeck1.length > 0
      ? deck1.push(player1Card, player2Card)
      : deck2.push(player2Card, player1Card)
  } else {
    player1Card > player2Card
      ? deck1.push(player1Card, player2Card)
      : deck2.push(player2Card, player1Card)
  }
}

const calculateScore = deck => deck.reduce((sum, card, i) => sum + (card * (deck.length - i)), 0)

export { parseDecks, playRound, winnerScore, winnerScoreRecursive }
