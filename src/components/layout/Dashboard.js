import React, { Component } from 'react';
import Category from './Category'

import '../../styles/Dashboard.scss';
import cards from '../../db/cards'

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <div className="header">header</div>
                <div className="categories">
                    <Category categoryName="unopened" cards={cards.unopened} />
                    <Category categoryName="in-progress" cards={cards.inProgress} />
                    <Category categoryName="in-qa" cards={cards.inQa} />
                    <Category categoryName="in-debugging" cards={cards.inDebugging} />
                    <Category categoryName="finished" cards={cards.finished} />
                </div>
                <div className="footer">footer</div>
            </div>
        );
    }
}

export default Dashboard;