import React, { Component } from 'react';
import Category from './Category'
import Card from './Card'

import '../styles/Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div class="dashboard">
                <div className="header">header</div>
                <div className="categories">
                    <Category categoryName="unopened"/>
                    <Category categoryName="in-progress"/>
                    <Category categoryName="in-qa"/>
                    <Category categoryName="in-debugging"/>
                    <Category categoryName="finished"/>
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
}

export default Dashboard;