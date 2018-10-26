import React, { Component } from 'react';
import Card from './Card'

import '../styles/Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div class="dashboard">
                <div className="header">header</div>
                <div className="categories">
                    <div className="card-category unopened">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>

                    <div className="card-category in-progress">
                        <Card />
                        <Card />
                    </div>

                    <div className="card-category in-qa">
                        <Card />
                        <Card />
                        <Card />
                    </div>

                    <div className="card-category in-debugging">
                        <Card />
                    </div>

                    <div className="card-category finished">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
}

export default Dashboard;