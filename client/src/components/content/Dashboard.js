import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { isEmpty, isEqual } from "lodash"
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
        cards: {},
        cameFromDrag: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.cameFromDrag){
            return {
                cards: prevState.cards
            };
        } else if (nextProps.cameFromDb){
            return {
                cards: nextProps.cards,
                cameFromDrag: false
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
        this.setState({cards: newCardsState, cameFromDrag: true})
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


const mapStateToProps = ({ cards, cameFromDb, loading }) => ({
    cards,
    cameFromDb,
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