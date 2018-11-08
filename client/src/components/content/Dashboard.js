import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Category from './Category'

import '../../styles/Dashboard.scss';

export default withAuth(class Dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            currentUserName: '',
            currentUserEmail: '',
            cards: []
        }
    }

    componentDidMount() {
        const oktaTokenStorage = JSON.parse(localStorage['okta-token-storage']);
        const { name: currentUserName, email: currentUserEmail } = oktaTokenStorage.idToken.claims
        const params = {
            params: {
                email: currentUserEmail
            }
        }

        axios.get(`/cards`, params)
            .then(res => {
                this.setState({
                    currentUserName,
                    currentUserEmail,
                    cards: res.data
                })
            })
    }

    updateCards = (initialCategory, newCategory, cardId) => {
        let { currentUserEmail, cards } = this.state


        console.log('updateCards :: ', `${initialCategory} ---> ${newCategory}`, cardId)

        var index = cards[initialCategory].indexOf(parseInt(cardId));
        if (index > -1) {
            cards[initialCategory].splice(index, 1);
        }

        const hasCard = cards[newCategory].some(id => id === cardId);
        if(!hasCard){
            cards[newCategory].push(parseInt(cardId));
        }


        console.log(`cards["${initialCategory}"] :: `, cards[initialCategory])
        console.log(`cards["${newCategory}"] :: `, cards[newCategory])


        axios.post(`/cards`, {
            cards,
            email: currentUserEmail
        })
        .then(res => {
            console.log("res from post request ::", res)
        })
        .catch(error => {
            console.error(error)
        })

    }

    printCategories = (cards) => {
        return Object.keys(cards).map((name, index) => {
            return <Category
                key={index}
                categoryName={name}
                cards={cards[name]}
                updateCards={this.updateCards}
            />
        })
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
                    {this.printCategories(cards)}
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
});

// export default Dashboard;