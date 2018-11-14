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
        const { id, title, description, categoryName } = this.props;

        return (
            <div
                className="card"
                id={id}
                draggable
                onDragStart={(event) => this.onDragStart(event, categoryName)}>
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    categoryName: PropTypes.string,
};

export default Card;