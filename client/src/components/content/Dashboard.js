import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { isUndefined, isEqual } from "underscore"
import { withAuth } from "@okta/okta-react";
import Category from './Category'
import { connect } from 'react-redux'
import { fetchCards } from '../../actions'
import { DragDropContext } from "react-beautiful-dnd"

import '../../styles/Dashboard.scss';

class Dashboard extends Component {
    state = {
        currentUserName: '',
        currentUserEmail: '',
        cards: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!isEqual(prevState.cards, nextProps.cards)){
            return {
                cards: nextProps.cards
            };
        }

        return null;
    }

    componentDidMount() {
        const oktaTokenStorage = JSON.parse(localStorage['okta-token-storage'])
        const { name: currentUserName, email: currentUserEmail } = oktaTokenStorage.idToken.claims
        this.props.getCards(currentUserEmail)

        this.setState({
            currentUserName,
            currentUserEmail
        })
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


        const start = cards.columns[source.droppableId];
        const finish = cards.columns[destination.droppableId];
        let newCardsState = {};

        if(start === finish){
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

             newCardsState = {
                ...cards,
                columns: {
                    ...cards.columns,
                    [newColumn.id]: newColumn,
                },
            }
        } else {
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds
            };

            newCardsState = {
                ...cards,
                columns: {
                    ...cards.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            }
        }

        this.saveCardsInDb(currentUserEmail, newCardsState)
        this.setState({cards: newCardsState})
    }

    render() {
        const { currentUserName, currentUserEmail, cards } = this.state
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


const mapStateToProps = (state) => ({
    cards: state.cards,
    loading: state.loading
})

const mapDispatchToProps = {
    getCards: fetchCards
}

Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(Dashboard))

export default Dashboard;