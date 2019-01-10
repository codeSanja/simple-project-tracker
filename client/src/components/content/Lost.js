import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
class Lost extends Component {
    render() {
        return (
        <Fragment>
            <div>Lost page.. <Link to="/">Go Home</Link></div>
        </Fragment>
        );
    }
}


export default Lost;