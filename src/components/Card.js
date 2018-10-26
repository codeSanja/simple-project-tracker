import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.scss';

class Card extends Component {
    onDragStart(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    onDragEnd(ev) {
        ev.preventDefault();
    }

    render() {
        const { id } = this.props;

        return (
            <div className="card" id={id}  draggable onDragStart={(event) => this.onDragStart(event)}  onDragEnd={this.onDragEnd}>
                <div className="title">Title of the card</div>
                <div className="task">Tekst of the task</div>
                <div className="task">ID :: {id}</div>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Card;