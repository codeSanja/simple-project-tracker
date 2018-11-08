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

        // TODO put in constants `spt-cards-${currentUserEmail}`
        const cards = isUndefined(localStorage[`spt-cards-${currentUserEmail}`]) ? {} : JSON.parse(localStorage[`spt-cards-${currentUserEmail}`]);

        isEmpty(cards) ?
            this.getCardsFromDb(currentUserEmail).then((cards) => this.saveCardsInLocalStorage(currentUserEmail, cards))
            : this.setState({ cards })
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


        //update in local storage
        this.saveCardsInLocalStorage(currentUserEmail, cards)

        // update in db
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

    saveCardsInLocalStorage = (email, cards) => {
        localStorage[`spt-cards-${email}`] = JSON.stringify(cards)
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
