import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { isEmpty, isUndefined, contains } from "underscore"
import _ from "lodash"
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
        const oktaTokenStorage = JSON.parse(localStorage['okta-token-storage'])
        const { name: currentUserName, email: currentUserEmail } = oktaTokenStorage.idToken.claims

        this.getCardsFromDb(currentUserEmail)
            .then((cards) => {
                this.setState({
                    currentUserName,
                    currentUserEmail,
                    cards
                })

            });
    }

    updateCards = (initialCategory, newCategory, cardId) => {
        const { currentUserEmail, cards } = this.state

        let flattenCards =  _.flatten(Object.values(cards))
        const cardIndex = _.findIndex(flattenCards, (card) =>  card.id === parseInt(cardId) )
        flattenCards[cardIndex].category = newCategory;

        // this.saveCardsInLocalStorage(currentUserEmail, flattenCards)
        this.saveCardsInDb(currentUserEmail, flattenCards)
    }

    printCategories = (cards) => {
        // TODO optimize this
        if(!cards.columnOrder){
            return
        }
        // debugger

        return cards.columnOrder.map((columnId, index) => { // za svaku kategoruju

            const taskIds = cards.columns[columnId].taskIds;
            let cardsForColumn = []
            Object.keys(cards.tasks).map((taskId) => {
                if(taskIds.includes(taskId)){
                    cardsForColumn.push(cards.tasks[taskId])
                }
            })

            return <Category
                key={index}
                categoryName={cards.columns[columnId].title}
                cards={cardsForColumn}
                updateCards={this.updateCards}
            />
        })
    }

    getCardsFromDb = (email) => {
        return axios.get(`/cards`, { params: { email: email }})
            .then(res => {
                const cardsFromDb = res.data;
                return cardsFromDb;
            }).catch(err => {
                console.error(err);
            })
    }

    saveCardsInDb = (email, cards) => {
        return axios.post(`/cards`, {
            cards,
            email
        })
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        const { currentUserName, currentUserEmail, cards } = this.state

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
