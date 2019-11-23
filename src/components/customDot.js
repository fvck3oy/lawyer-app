import React, { Component } from 'react'

export default class CustomDot extends Component {
    render() {
        return (
            <div>
                <img src={this.props.pic} className="img-fluid" alt={this.props.pic}/>
            </div>
        )
    }
}
