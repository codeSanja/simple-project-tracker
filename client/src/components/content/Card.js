import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Card.scss';

class Card extends Component {
    onDragStart(ev, categoryName) {
        if(ev.target.className !== 'card'){
            return;
        }

        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData("cardId", ev.target.id);
        ev.dataTransfer.setData("initialCategory", categoryName);
    }

    render() {
        const { card, categoryName } = this.props;

        return (
            <div
                className="card"
                id={card.id}
                draggable
                onDragStart={(event) => this.onDragStart(event, categoryName)}>
                <div className="title">{card.title}</div>
                <div className="task">{card.description}</div>
                <div className="id">ID :: {card.id}</div>
            </div>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    categoryName: PropTypes.string.isRequired,
};

export default Card;