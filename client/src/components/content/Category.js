import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUndefined } from 'underscore';
import Card from "./Card";

import '../../styles/Category.scss'

class Category extends Component {
    // // this should not live like this
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

        let { dragData } = this.props;
        console.log('dragData.startedDrag', dragData.startedDrag)
        if(dragData.startedDrag){
            this.setState({
                fromCategory: ev.currentTarget.id
            })

            dragData.startedDrag = false;
            dragData.fromCategory = ev.currentTarget.id;
            this.props.updateDragData(dragData)
        }

    }

    onDrop(ev) {
        var data = ev.dataTransfer.getData("text");
        const target = this.getCardsElement(ev);
        (!isNaN(data)) ? target.appendChild(document.getElementById(data)) : ev.preventDefault();

        //update drag flag
        let { dragData } = this.props;
        dragData.startedDrag = true;
        this.props.updateDragData(dragData)

        //update db
        const { categoryName, cards } = this.props;
        this.messWithCards(categoryName, cards)

    }

    messWithCards = (categoryName, cards) => {
        console.log('cards: ',cards)
        console.log(`${this.props.dragData.fromCategory} ---> ${categoryName}`)
    }

    printCards(cards){
        if(isUndefined(cards) || cards.length === 0){
            return
        }

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
                    onDragOver={(event) => this.onDragOver(event)}>
                        {this.printCards(cards)}
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