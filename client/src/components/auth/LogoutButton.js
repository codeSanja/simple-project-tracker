import React, { Component } from 'react';

class LogoutButton extends Component {

    state =  { clicked: false }

    handleClick = () => {
        this.setState({ clicked: true })
        this.props.logout()
    }

    render() {
        const { clicked } = this.state

        return (
            <button onClick={this.handleClick} disabled={clicked}>Logout</button>
        );
    }
}


export default LogoutButton;