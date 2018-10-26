import React, { Component } from 'react';
import '../styles/Card.css';

class Card extends Component {
    render() {
        return (
            <div className="card">
            <div className="title">Title of the card</div>
            <div className="task">Tekst of the task</div>
            </div>
        );
    }
}

export default Card;