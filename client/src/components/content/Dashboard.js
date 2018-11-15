import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { isEmpty, isEqual } from "lodash"
import { withAuth } from "@okta/okta-react";
import Category from './Category'
import { connect } from 'react-redux'
import { fetchCards } from '../../actions'
import { DragDropContext } from "react-beautiful-dnd"
import { initialState } from "../../reducers"
import { changeCardsOrder, moveCard } from "../../utils/cardsUtils"

import '../../styles/Dashboard.scss';

class Dashboard extends Component {
    state = {
        currentUserName: '',
        currentUserEmail: '',
        ...initialState
    }

    static getDerivedStateFromProps(nextProps, prevState) {
    debugger
        if(prevState.cameFromInterface){
            return {
                cards: prevState.cards
            };
        } else if (nextProps.cameFromDatabase){
            return {
                cards: nextProps.cards,
                cameFromInterface: false
            };
        }

        return null;
    }

    componentDidMount() {
        const { getCards } = this.props

        const oktaTokenStorage = JSON.parse(localStorage['okta-token-storage'])
        const { name: currentUserName, email: currentUserEmail } = oktaTokenStorage.idToken.claims

        this.setState({
            currentUserName,
            currentUserEmail
        })

        getCards(currentUserEmail)
    }

    printCategories = (cards) => {
        return cards.columnOrder.map((columnId, index) => {
            return <Category
                key={index}
                categoryId={columnId}
                categoryName={cards.columns[columnId].title}
                cards={cards.columns[columnId].taskIds.map( taskId =>  cards.tasks[taskId] )}
            />
        })
    }

    saveCardsInDb = (email, cards) => {
    debugger
        return axios.post(`/cards`, {
            cards,
            email
        })
        .catch(error => {
            console.error(error)
        })
    }

    onDragEnd = result => {
        const { getCards } = this.props

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


        const start = cards.columns[source.droppableId];
        const finish = cards.columns[destination.droppableId];
        let newCardsState = {};

        if(start === finish){
            newCardsState = changeCardsOrder(cards, start, source, destination, draggableId);
        } else {
            newCardsState = moveCard(cards, start, finish, source, destination, draggableId);
        }

        this.saveCardsInDb(currentUserEmail, newCardsState)
        this.setState({cards: newCardsState, cameFromInterface: true})
    }

    render() {
        const { cards, currentUserName, currentUserEmail } = this.state
        const { loading } = this.props

        if(loading)
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
}


const mapStateToProps = ({ cards, cameFromDatabase, loading }) => ({
    cards,
    cameFromDatabase,
    loading
})

const mapDispatchToProps = {
    getCards: fetchCards
}

Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(Dashboard))

export default Dashboard;