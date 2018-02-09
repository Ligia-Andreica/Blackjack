import Immutable from 'immutable'

import * as types from '../../constants/actionTypes'
import { paths } from '../../constants/constants'
import * as blackjackUtils from '../utils/blackjackUtils'

function getInitialState() {
    let initialState = Immutable.Map({})
    // init status
    initialState = initialState.setIn(paths.gameStatus, blackjackUtils.gameStatus.PLAY)
    // init deck
    initialState = initialState.setIn(paths.deck, blackjackUtils.initDeck())
    //init player's and dealer's hands
    initialState = initialState.setIn(paths.playerHand, Immutable.List())
    initialState = initialState.setIn(paths.dealerHand, Immutable.List())
    initialState = initialState.setIn(paths.dealerTotal, 0)
    initialState = initialState.setIn(paths.playerTotal, 0)
    // deal the initial cards: 2 for player, 1 for dealer
    initialState = handleHandUpdate(initialState, paths.player, 2)
    initialState = handleHandUpdate(initialState, paths.dealer, 1)

    // unnecessary for now; if mechanism enabled, a spinner would be displayed while loading the application
    initialState = initialState.setIn(paths.fetchStatus, false)
    return initialState
}

export default function blackjackReducer(state = getInitialState(), action = undefined) {
    let newState = state

    switch (action.type) {
        // init game status
        case types.DEAL:
            // dealing resets the app to initial state; same as reloading the page
            newState = getInitialState()
            return newState
        case types.HIT:
            // player wants more cards -> deal one
            newState = handleHandUpdate(newState, paths.player, 1)
            // check the cards' total: if 21 player won, if over 21 player lost
            newState = newState.setIn(paths.gameStatus, blackjackUtils.getGameStatus(newState.getIn(paths.playerTotal)))
            return newState
        case types.STICK:
            // player chose stick, we deal cards to the dealer until the total is over 17
            while (newState.getIn(paths.dealerTotal) < 17) {
                newState = handleHandUpdate(newState, paths.dealer, 1)
            }
            // check who won, dealer or player
            newState = newState.setIn(paths.gameStatus, blackjackUtils.getGameStatus(newState.getIn(paths.playerTotal), newState.getIn(paths.dealerTotal)))
            return newState
    }
    return newState
}

/*
    state: state of the reducer
    who: who is doing the action: player (paths.player)/ dealer (paths.dealer)
    cardNo: number of cards to be dealt

    Extracts and assigns a number of card to a player, calculates the total score and updates the deck
*/
function handleHandUpdate(state, who, cardNo) {
    let newState = state
    let deal = blackjackUtils.dealHand(newState.getIn(paths.deck), cardNo)
    // update deck
    newState = newState.setIn(paths.deck, deal[0])
    // update hand
    newState = newState.updateIn([...who, ...paths.hand], arr => arr.push(...deal[1]))

    // compute hand total
    newState = newState.setIn([...who, ...paths.total], blackjackUtils.getHandTotal(newState.getIn([...who, ...paths.hand]).toJS()))
    return newState
}