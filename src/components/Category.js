import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";

import '../styles/Category.scss'

class Category extends Component {

    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    printCards(cards){
        return cards.map(function(name, index){
            return <Card id={index} key={index} />
        })
    }
    render() {
        const { categoryName, cards } = this.props;

        return (
            <div className="card-category">
                <h4 className="title">{categoryName}</h4>
                <div className="cards" id={categoryName}  onDrop={this.drop} onDragOver={this.allowDrop}>
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