import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'

export default class AppHeader extends Component {
    render() {
        return (
            <div>
                <AppBar showMenuIconButton={false}
                        title={this.props.title}/>
            </div>
        )
    }
}

AppHeader.defaultProps = {
    title: 'Hello world!'
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
}