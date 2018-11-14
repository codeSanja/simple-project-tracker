import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Card.scss';

class Card extends Component {

    render() {
        const { id, title, description } = this.props;

        return (
            <div className="card" id={id}>
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string
};

export default Card;