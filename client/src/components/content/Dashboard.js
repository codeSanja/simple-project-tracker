import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Category from './Category'

import '../../styles/Dashboard.scss';
import cards from '../../db/cards'

export default withAuth(class Dashboard extends Component {
    state = {
        currentUserName: '',
        currentUserEmail: ''
    };

    componentDidMount() {
        const oktaTokenStorage = JSON.parse(localStorage['okta-token-storage']);
        this.setState({
            currentUserName: oktaTokenStorage.idToken.claims.name,
            currentUserEmail: oktaTokenStorage.idToken.claims.email
        });
    }

    render() {
        return (
            <div className="dashboard">
                <div className="header">
                    header

                    <div>
                        <Link to='/'>Home</Link><br/>
                        <div>Welcome, {this.state.currentUserName}!</div>
                        <div>{this.state.currentUserEmail}</div>
                        <button onClick={() => this.props.auth.logout('/')}>Logout</button>
                    </div>

                </div>
                <div className="categories">
                    <Category categoryName="unopened" cards={cards.unopened} />
                    <Category categoryName="in-progress" cards={cards.inProgress} />
                    <Category categoryName="in-qa" cards={cards.inQa} />
                    <Category categoryName="in-debugging" cards={cards.inDebugging} />
                    <Category categoryName="finished" cards={cards.finished} />
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
});

// export default Dashboard;