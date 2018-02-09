import _ from 'lodash'

    /*
    Game status,

    key used in reducer for determining the winner
    value used in the UI
    */
export const gameStatus = {
  PLAY: {
    key: 'PLAY',
    value: 'Playing...'
  },
  WIN: {
    key: 'WIN',
    value: 'Congratulations! You won!'
  },
  LOST: {
    key: 'LOST',
    value: 'You lost! Try again!'
  }
}
    /*
        Initializes the deck: creates the cards and shuffles them
        returns array of cards (rank, suit and score)
    */
export function initDeck() {
    const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    const SUITS = ['S', 'C', 'H', 'D']
    let deck = []

    _.forEach(RANKS, function(rank) {
        _.forEach(SUITS, function(suit){
            let entry = {
                rank,
                suit,
                score: getCardScore(rank)
            }
            deck.push(entry)
        })
    })

    deck = _.shuffle(deck)
    return deck
}

    /*
    Deals a number of cards

    deck: the array of remaining cards
    size: the number of cards to be dealt

    returns an array with the new deck and the hand dealt
    */
export function dealHand(deck, size) {
    let hand = _.take(deck, size)
    deck = _.drop(deck, size)
    return [deck, hand]
}

    /*
    Computes the value of a card

    for 2-10 card values -> card value
    J-K -> return 10
    A -> return 11
    return number
    */
function getCardScore(rank) {
    if(typeof rank === 'string') {
        if('A' === rank) return 11
        return 10
    }
    return rank
}

    /*
    Computes the score of a hand; if it exceeds 21, try to change all A value from 11 to 1
    return number
    */
export function getHandTotal(hand) {
    let total = _.sumBy(hand, card => card.score)
    if (total > 21) {
        let noOfA = _.filter(hand, card => card.rank === 'A').length
        total -= 10 * noOfA
    }
    return total
}
    /*
    Responsible for determining the status of a game for
    1. when the player hits, no dealer score
    2. when the player sticks, take dealer score into account
    */
export function getGameStatus(playerScore, dealerScore) {
    if (playerScore === 21) return gameStatus.WIN
    if (playerScore > 21) return gameStatus.LOST
    if (dealerScore) {
        if(dealerScore > 21) return gameStatus.WIN
        if(playerScore >= dealerScore) return gameStatus.WIN
        if(playerScore < dealerScore) return gameStatus.LOST
    }
    return gameStatus.PLAY
}
