import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";

import '../styles/Category.scss'

class Category extends Component {

    onDragOver(ev) {
        ev.preventDefault();
    }

    onDrop(ev) {
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    printCards(cards){
        return cards.map(function(name, index){
            return <Card id={name} key={index} />
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
                    onDragOver={(event) => this.onDragOver(event)}
                    onDragEnd={this.onDragEnd}>
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