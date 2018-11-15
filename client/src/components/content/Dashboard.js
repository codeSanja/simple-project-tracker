import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { isUndefined } from "lodash"
import Category from './Category'
import { connect } from 'react-redux'
import { fetchCards, saveCards } from '../../actions'
import { DragDropContext } from "react-beautiful-dnd"
import { initialState } from "../../reducers"
import { moveCard } from "../../utils/cardsUtils"
import savingGif from '../../img/saving.gif';

import '../../styles/Dashboard.scss';

class Dashboard extends Component {
    state = {
        currentUserName: '',
        currentUserEmail: '',
        ...initialState
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.cameFromInterface){
            return {
                cards: prevState.cards,
                saving: nextProps.saving
            }
        } else if (nextProps.cameFromDatabase){
            return {
                cards: nextProps.cards,
                cameFromInterface: false
            }
        }

        return null
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

    onDragEnd = result => {
        const { destination, source } = result;
        const { currentUserEmail, cards } = this.state
        const { saveCardsInDb } = this.props

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const newCardsState = moveCard(cards , result)
        saveCardsInDb(currentUserEmail, newCardsState)
        this.setState({cards: newCardsState, cameFromInterface: true})
    }

    printSaveStatus = () => {
        return <div className="savingStatus">
            <img src={savingGif} width="100" height="50" />
        </div>
    }

    render() {
        const { cards, currentUserName, currentUserEmail, saving } = this.state
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
                    {saving ? this.printSaveStatus(saving) : null}

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


const mapStateToProps = ({ cards, cameFromDatabase, loading, saving }) => ({
    cards,
    cameFromDatabase,
    loading,
    saving

})

const mapDispatchToProps = {
    getCards: fetchCards,
    saveCardsInDb: saveCards
}

Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(Dashboard))

export default Dashboard;