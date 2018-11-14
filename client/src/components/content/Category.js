import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUndefined } from 'underscore';
import Card from "./Card";

import '../../styles/Category.scss'

class Category extends Component {
    // this should not live like this
    getCardsElement(ev) {
        switch (ev.target.className) {
            case 'card':
                return  ev.target.parentElement;
            case 'title':
            case 'task':
            case 'id':
                return  ev.target.parentElement.parentElement;
            default:
                return ev.target;
        }
    }

    onDragOver(ev) {
        ev.preventDefault();
    }

    onDrop(ev) {
        const { categoryName } = this.props;

        const cardId = ev.dataTransfer.getData("cardId");
        const initialCategory = ev.dataTransfer.getData("initialCategory");
        const target = this.getCardsElement(ev);
        (!isNaN(cardId)) ? target.appendChild(document.getElementById(cardId)) : ev.preventDefault();

        this.props.updateCards(initialCategory, categoryName, cardId)
    }

    printCards = (cards, categoryName) => {
        if(isUndefined(cards) || cards.length === 0){
            return
        }

        return Object.keys(cards).map((cardId) => {
            return <Card
                card={cards[cardId]}
                key={cardId}
                categoryName={categoryName}
                setInitialCategoryName={this.setInitialCategoryName}
                unsetDragData={this.unsetDragData}
            />
        })
    }

    render() {
        const { categoryName, cards } = this.props;

        return (
            <div className="card-category">
                <h4 className="title">{categoryName}</h4>
                <div className="cards"
                    id={categoryName}
                    onDrop={(event) => this.onDrop(event)}
                    onDragOver={(event) => this.onDragOver(event)} >
                        {this.printCards(cards, categoryName)}
                </div>
            </div>
        );
    }
}

Category.propTypes = {
    categoryName: PropTypes.string.isRequired,
    cards: PropTypes.array
};

export default Category;