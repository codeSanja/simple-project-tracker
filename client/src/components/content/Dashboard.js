import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { isEmpty, isUndefined, groupBy } from "underscore"
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
        const cards = this.getCards(currentUserEmail)

        const categorised = groupBy(cards, 'category')

        this.setState({
            currentUserName,
            currentUserEmail,
            // cards
            cards: categorised
        })
    }

    getCards = (email) => {
        const cards = this.getCardsFromLocalStorage(email)

        if (isEmpty(cards)){
            return this.getCardsFromDb(email).then((cards) => this.saveCardsInLocalStorage(email, cards))
        }

        return cards;
    }

    updateCards = (initialCategory, newCategory, cardId) => {
        const { currentUserEmail, cards } = this.state

        let flattenCards =  _.flatten(Object.values(cards))
        const cardIndex = _.findIndex(flattenCards, (card) =>  card.id == cardId )
        flattenCards[cardIndex].category = newCategory;

        this.saveCardsInLocalStorage(currentUserEmail, flattenCards)
        this.saveCardsInDb(currentUserEmail, flattenCards)
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

    getCardsFromLocalStorage = (email) => {
        // TODO put in constants `spt-cards-${currentUserEmail}`
        return isUndefined(localStorage[`spt-cards-${email}`]) ? {} : JSON.parse(localStorage[`spt-cards-${email}`])
    }

    saveCardsInLocalStorage = (email, cards) => {
        localStorage[`spt-cards-${email}`] = JSON.stringify(cards)
    }

    getCardsFromDb = (email) => {
        return axios.get(`/cards`, { params: { email: email }})
            .then(res => {
                const cardsFromDb = res.data;

                // TODO duplicate code
                const categorised = groupBy(cardsFromDb, 'category')
                this.setState({ cards: categorised });
                return cardsFromDb;
                // localStorage[`spt-cards-${email}`] = JSON.stringify(cardsFromDb)
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

    // putCardsFromDbToLocalStorage = (email) => {
    //     return this.getCardsFromDb(email).then((cards) => this.saveCardsInLocalStorage(email, cards))
    // }

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
