import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.scss';

class Card extends Component {
    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    render() {
        const { id } = this.props;

        return (
            <div className="card" id={id}  draggable="true" onDragStart={this.drag}>
                <div className="title">Title of the card</div>
                <div className="task">Tekst of the task</div>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Card;