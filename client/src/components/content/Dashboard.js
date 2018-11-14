import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import _ from "lodash"
import { isUndefined } from "underscore"
import { DragDropContext } from "react-beautiful-dnd"
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

        this.saveCardsInDb(currentUserEmail, flattenCards)
    }

    printCategories = (cards) => {
        return cards.columnOrder.map((columnId, index) => {
            return <Category
                key={index}
                categoryId={columnId}
                categoryName={cards.columns[columnId].title}
                cards={cards.columns[columnId].taskIds.map( taskId =>  cards.tasks[taskId] )}
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

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        const { currentUserEmail, cards } = this.state

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }


        const column = cards.columns[source.droppableId]
        const newTaskIds = Array.from(column.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        }

        const newCardsState = {
            ...cards,
            columns: {
                ...cards.columns,
                [newColumn.id]: newColumn,
            },
        }

        this.saveCardsInDb(currentUserEmail, newCardsState)
        this.setState({cards: newCardsState})
    }

    render() {
        const { currentUserName, currentUserEmail, cards } = this.state

        if(isUndefined(cards.columnOrder))
            return (<div>Loading...</div>)

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
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.printCategories(cards)}
                    </DragDropContext>
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
});
