import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async() => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    login = () => {
        this.props.auth.login('/dashboard');
    }

    register = () => {
        this.props.history.replace('/register');
    }

    logout = () => {
        this.props.auth.logout('/');
    }

    render() {
        if (this.state.authenticated === null) return null;

        const button = this.state.authenticated ?
            <div>
                <Link to='/dashboard'>Dashboard</Link><br/>
                <button onClick={this.logout}>Logout</button>
            </div> :
                <button onClick={this.login}>Login / Register</button>



        return (
            <div>
                <Link to='/'>Home</Link><br/>
                {button}
            </div>
        );
    }
});
