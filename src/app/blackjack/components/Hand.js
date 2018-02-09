import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import {imageSource} from '../../theme/images'

const style = {
    paper: {
        height: 200,
        width: 'calc(100% - 40px)',
        margin: '20px 0px 0px 20px',
        display: 'inline-block',
    },
    title: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        border: 'solid',
        height: 150,
        marginLeft: 10,
        marginTop: 10
    }
}

class Hand extends React.Component {
    getImages = () => {
        return this.props.hand && _.map(this.props.hand.toJS(), card => {
            let id = card.rank + card.suit
            return <img key={id} style={style.image} src={imageSource[id]}/>
        })
    }

    render() {
        let info = `${this.props.name}: ${this.props.total}`
        return <Paper style={style.paper} zDepth={2}>
                <div style={style.title}>{info}</div>
                {this.getImages()}
            </Paper>
        }
}

Hand.propTypes = {
     name: PropTypes.string,
     hand: PropTypes.array,
     total: PropTypes.number
}

export default Hand