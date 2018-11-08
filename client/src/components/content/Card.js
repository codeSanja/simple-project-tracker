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
        const { id, categoryName } = this.props;

        return (
            <div
                className="card"
                id={id}
                draggable
                onDragStart={(event) => this.onDragStart(event, categoryName)}>
                <div className="title">Title of the card</div>
                <div className="task">Tekst of the task</div>
                <div className="id">ID :: {id}</div>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
};

export default Card;