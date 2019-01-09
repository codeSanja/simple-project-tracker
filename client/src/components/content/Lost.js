import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Counter from './Counter'
class Lost extends Component {
    render() {
        return (
        <Fragment>
            <div>Lost page.. <Link to="/">Go Home</Link></div>
            <Counter />
        </Fragment>
        );
    }
}


export default Lost;