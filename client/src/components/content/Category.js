import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from "react-beautiful-dnd"
import { isUndefined } from 'underscore';
import Card from "./Card";

import '../../styles/Category.scss'

class Category extends Component {

    printCards = (cards) => {
        return cards.map((card) => {
            return <Card
                description={card.description}
                title={card.title}
                id={card.id}
                key={card.id}
                setInitialCategoryName={this.setInitialCategoryName}
                unsetDragData={this.unsetDragData}
            />
        })
    }

    render() {
        const { categoryId, categoryName, cards } = this.props;

        if(isUndefined(cards)){
            return (<div>Loading...</div>)
        }

        return (
            <div className="card-category">
                <h4 className="title">{categoryName}</h4>
                <div className="cards">
                    <Droppable droppableId={categoryId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {this.printCards(cards)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        );
    }
}

Category.propTypes = {
    categoryId: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    cards: PropTypes.array
};

export default Category;