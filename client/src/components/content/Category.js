import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from "react-beautiful-dnd"
import { isUndefined, isEqual } from 'underscore';
import AddTaskIcon from "./AddTaskIcon";
import Card from "./Card";

import '../../styles/Category.scss'
import savingGif from "../../img/saving.gif";


class Category extends Component {

    shouldComponentUpdate(nextProps){
        return !isEqual(this.props.cards, nextProps.cards)
    }

    printCards = (cards) => {
        return cards.map((card, index) => {
            return <Card
                description={card.description}
                title={card.title}
                id={card.id}
                key={card.id}
                index={index}
                setInitialCategoryName={this.setInitialCategoryName}
                unsetDragData={this.unsetDragData}
            />
        })
    }


    // TODO duplicate code
    printLoadingIndicator = (savingStatus) => {
        return <div className="savingStatus">
            { savingStatus ? <img alt="loader" src={savingGif} width="60" height="50" /> : null }
        </div>
    }

    render() {
        const { categoryId, categoryName, cards } = this.props;

        if(isUndefined(cards))
            return this.printLoadingIndicator()


        return (
            <div className="card-category">
                <div className="card-category-header">
                    <h4 data-test="category-title" className="category-title">
                        {categoryName}
                    </h4>
                    <AddTaskIcon />
                </div>
                <Droppable droppableId={categoryId}>
                    {(provided) => (
                        <div
                            className="cards"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.printCards(cards)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

Category.propTypes = {
    categoryId: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    cards: PropTypes.array,
    saving: PropTypes.bool
};

export default Category;