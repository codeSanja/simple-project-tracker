import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Category from './Category'

import '../../styles/Dashboard.scss';

export default withAuth(class Dashboard extends Component {
    state = {
        currentUserName: '',
        currentUserEmail: '',
        cards: [],
        dragData: {
            startedDrag: true,
            fromCategory: '',
        }
    }

    componentWillMount() {
        const oktaTokenStorage = JSON.parse(localStorage['okta-token-storage']);
        const { name: currentUserName, email: currentUserEmail } = oktaTokenStorage.idToken.claims
        const params = {
            params: {
                email: currentUserEmail
            }
        }

        axios.get(`/cards`, params  )
            .then(res => {
                this.setState({
                    currentUserName,
                    currentUserEmail,
                    cards: res.data
                })
            })

    }

    updateDragData = (dragData) => {
        this.setState = { dragData }
    }

    render() {
        const { currentUserName, currentUserEmail, cards, dragData } = this.state

        return (
            <div className="dashboard">
                <div className="header">
                    header

                    <div>
                        <Link to='/'>Home</Link><br/>
                        <div>Welcome, {currentUserName}!</div>
                        <div>{currentUserEmail}</div>
                        <button onClick={() => this.props.auth.logout('/')}>Logout</button>
                    </div>

                </div>
                <div className="categories">
                    <Category categoryName="unopened" cards={cards.unopened} updateDragData={this.updateDragData} dragData={dragData} />
                    <Category categoryName="in-progress" cards={cards.inProgress} updateDragData={this.updateDragData} dragData={dragData} />
                    {/*<Category categoryName="in-qa" cards={cards.inQa} updateStartDrag={this.updateStartDrag} />*/}
                    {/*<Category categoryName="in-debugging" cards={cards.inDebugging} updateStartDrag={this.updateStartDrag} />*/}
                    {/*<Category categoryName="finished" cards={cards.finished} updateStartDrag={this.updateStartDrag} />*/}
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
});

// export default Dashboard;