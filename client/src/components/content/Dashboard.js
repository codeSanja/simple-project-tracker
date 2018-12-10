import React, { Component } from 'react';
import { withAuth } from "@okta/okta-react";
import Category from './Category'
import { connect } from 'react-redux'
import { fetchCards, saveCards } from '../../actions'
import { DragDropContext } from "react-beautiful-dnd"
import { initialState } from "../../reducers"
import { moveCard } from "../../utils/cardsUtils"
import LogoutButton from "../auth/LogoutButton"

import '../../styles/Dashboard.scss';
import savingGif from "../../img/saving.gif";

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

    printCategories = (cards, saving) => {
        return cards.columnOrder.map((columnId, index) => {
            return <Category
                key={index}
                categoryId={columnId}
                categoryName={cards.columns[columnId].title}
                cards={cards.columns[columnId].taskIds.map( taskId =>  cards.tasks[taskId] )}
                saving={saving}
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

    printLoadingIndicator = (saving) => {
        return <div className="savingStatus">
            {saving ? <img alt="loader" src={savingGif} width="100" height="100" /> : null}
        </div>
    }

    render() {
        const { cards, currentUserName, currentUserEmail, saving } = this.state
        const { loading } = this.props

        if(loading)
            return this.printLoadingIndicator()

        return (
            <div className="dashboard">
                <div className="header">
                    <div className="logo"></div>
                    {this.printLoadingIndicator(saving)}
                    <div className="userInfo">
                        <div className="fullName">{currentUserName}</div>
                        <div className="primaryEmail">{currentUserEmail}</div>
                        <LogoutButton logout={() => this.props.auth.logout('/')}/>
                    </div>

                </div>
                <div className="categories">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.printCategories(cards, saving)}
                    </DragDropContext>
                </div>
                <div className="footer"></div>
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