import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'

import * as blackjackActions from '../actions/blackjackActions'
import { paths } from '../../constants/constants'

import Hand from '../components/Hand'

const PLAY_STATUS = 'PLAY'
const style = {
  button:{
    margin: 12
  },
  title: {
    margin: 12,
    fontWeight: 'bolder',
    fontSize: 'larger'
  }
}

class BlackjackContainer extends Component {
    render() {
        return <div>
            {/* Status of the game */}
            <div style={style.title}>Game status: {this.props.gameStatus.value}</div>
            <Divider />
            {/* Deal, hit, stick buttons */}
            <div>
                <RaisedButton label='Deal' onClick={() => this.props.actions.deal()}
                    secondary={true} style={style.button}/>
                <RaisedButton label='Hit' onClick={() => this.props.actions.hit()}
                    primary={true} style={style.button}
                    disabled={this.props.gameStatus.key !== PLAY_STATUS}/>
                <RaisedButton label='Stick' onClick={() => this.props.actions.stick()}
                    primary={true} style={style.button}
                    disabled={this.props.gameStatus.key !== PLAY_STATUS}/>
            </div>
            <Divider/>
            {/* Player's hand */}
            <Hand name='Player' hand={this.props.playerHand} total={this.props.playerTotal}/>
            {/* Dealer's hand */}
            <Hand name='Dealer'hand={this.props.dealerHand}  total={this.props.dealerTotal}/>
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        gameStatus: state.blackjackReducer.getIn(paths.gameStatus),
        playerHand: state.blackjackReducer.getIn(paths.playerHand),
        dealerHand: state.blackjackReducer.getIn(paths.dealerHand),
        dealerTotal: state.blackjackReducer.getIn(paths.dealerTotal),
        playerTotal: state.blackjackReducer.getIn(paths.playerTotal)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {actions: bindActionCreators(_.merge({}, blackjackActions), dispatch)}
}

export default BlackjackContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlackjackContainer)

BlackjackContainer.propTypes = {
    gameStatus: PropTypes.string,
    playerHand: PropTypes.array,
    dealerHand: PropTypes.array,
    dealerTotal: PropTypes.number,
    playerTotal: PropTypes.number,
    actions: PropTypes.array
}