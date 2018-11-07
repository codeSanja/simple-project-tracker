import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <div>Time to register! <Link to="/">Go Home</Link></div>
        );
    }
}


export default Register;