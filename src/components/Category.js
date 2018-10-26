import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";

import '../styles/Category.css'

class Category extends Component {
    render() {
        const { categoryName } = this.props;

        return (
            <div className="card-category">
                <h4 className="title">{categoryName}</h4>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        );
    }
}

Category.propTypes = {
    categoryName: PropTypes.string.isRequired
};

export default Category;