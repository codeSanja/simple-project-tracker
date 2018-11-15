import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import LogoutButton from '../auth/LogoutButton'
import LoginButton from '../auth/LoginButton'

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

    logout = () => {
        this.props.auth.logout('/');
    }

    render() {
        if (this.state.authenticated === null) return null;

        const button = this.state.authenticated ?
            <div>
                <Link to='/dashboard'>Dashboard</Link><br/>
                {/*TODO context API add here*/}
                <LogoutButton logout={this.logout}/>
            </div> :
                <LoginButton login={this.login} />



        return (
            <div>
                <Link to='/'>Home</Link><br/>
                {button}
            </div>
        );
    }
});
