import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd"
import '../../styles/Card.scss';

class Card extends Component {

    render() {
        const { id, title, description, index } = this.props;

        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="title">{title}</div>
                        <div className="description">{description}</div>
                    </div>
                )}
            </Draggable>
        );
    }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    index: PropTypes.number.isRequired
};

export default Card;