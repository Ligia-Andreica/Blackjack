import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AppHeader from '../components/AppHeader'
import BlackjackContainer from '../../blackjack/containers/BlackjackContainer'
import * as blackjackActions from '../../blackjack/actions/blackjackActions'
import * as shellActions from '../actions/shellActions'
import { paths } from '../../constants/constants'

import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class App extends Component {
    render() {
        const actions = [
                        <FlatButton
                            key='ok'
                            label='OK'
                            primary={true}
                            onClick={this.props.actions.clearErrorMessage}
                        />
                    ]

        let appContent = this.props.isFetching ?
            <CircularProgress size={80} thickness={5}/> :
            <div id='appContainer' style={{height: '100%'}}>
                <AppHeader title='Blackjack'/>
                <BlackjackContainer/>
            </div>
        return (
            <div>
                {appContent}
                <Dialog title="OOPS! Something went wrong..."
                                actions={actions}
                                modal={true}
                                open={!!this.props.errorMessage}>
                                {this.props.errorMessage}
                            </Dialog>
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.blackjackReducer.getIn(paths.fetchStatus),
        errorMessage: state.shellReducer.getIn(paths.errorMessage)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {actions: bindActionCreators(_.merge({}, shellActions, blackjackActions), dispatch)}
}

export default App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

App.propTypes = {
    actions: PropTypes.array,
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string
}