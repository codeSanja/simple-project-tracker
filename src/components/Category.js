import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";

import '../styles/Category.scss'

class Category extends Component {

    printCards(cards){
        return cards.map(function(name, index){
            return <Card key={index} />
        })
    }
    render() {
        const { categoryName, cards } = this.props;

        return (
            <div className="card-category">
                <h4 className="title">{categoryName}</h4>
                <div className="cards">
                    {this.printCards(cards)}
                </div>
            </div>
        );
    }
}

Category.propTypes = {
    categoryName: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
};

export default Category;