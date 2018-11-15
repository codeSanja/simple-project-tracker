import React, { Component } from 'react';

// TODO could be stateless component?
class LoginButton extends Component {
    render() {
        return (
            <button onClick={this.props.login}>Login / Register</button>
        );
    }
}


export default LoginButton;