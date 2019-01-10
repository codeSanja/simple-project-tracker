import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class LogoutButton extends Component {

    state =  { clicked: false }

    handleClick = () => {
        this.setState({ clicked: true })
        this.props.logout()
    }

    render() {
        const { clicked } = this.state

        return (
            <Button
                className="logout-button"
                data-test="spt-logout-button"
                disabled={clicked}
                onClick={this.handleClick}
                variant="outlined"
                size="small"
            >
             Logout
            </Button>
        );
    }
}


export default LogoutButton;