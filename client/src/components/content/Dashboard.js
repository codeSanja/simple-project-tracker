import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { isEmpty, isUndefined } from "underscore"
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
        this.setState({
            currentUserName,
            currentUserEmail
        })

        const cards = this.getCardsFromLocalStorage(currentUserEmail)
        !isEmpty(cards) ? this.setState({ cards }) : this.putCardsFromDbToLocalStorage(currentUserEmail)
    }

    updateCards = (initialCategory, newCategory, cardId) => {
        let { currentUserEmail, cards } = this.state

        console.log('updateCards :: ', `${initialCategory} ---> ${newCategory}`, cardId)

        this.moveCard(initialCategory, newCategory, cardId, cards)
        this.saveCardsInLocalStorage(currentUserEmail, cards)
        this.saveCardsInDb(currentUserEmail, cards)
        // this.setState({cards}); //this causes breaking
    }

    moveCard = (initialCategory, newCategory, cardId, cards) => {
        var index = cards[initialCategory].indexOf(parseInt(cardId));
        if (index > -1) {
            cards[initialCategory].splice(index, 1);
        }

        const hasCard = cards[newCategory].some(id => id === cardId);
        if(!hasCard){
            cards[newCategory].push(parseInt(cardId));
        }
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
                this.setState({ cards: cardsFromDb });
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

    putCardsFromDbToLocalStorage = (email) => {
        return this.getCardsFromDb(email).then((cards) => this.saveCardsInLocalStorage(email, cards))
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
