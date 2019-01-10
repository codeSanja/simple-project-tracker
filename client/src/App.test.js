import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Enzyme, { mount, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { DragDropContext } from "react-beautiful-dnd"
import store from './store'
import App from './App';
import Dashboard from './components/content/Dashboard';
import InProgressCard from './components/content/InProgressCard';
import Counter from './components/content/Counter';
import Card from './components/content/Card';
import { withAuth } from "@okta/okta-react";
import Category from "./components/content/Category";

let cardsDb = require("./mockData/initialCardData");

Enzyme.configure({ adapter: new EnzymeAdapter() });

// HTMLCanvasElement.prototype.getContext = () => {
//
// };

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}


// Category.propTypes = {
//     categoryId: PropTypes.string.isRequired,
//     categoryName: PropTypes.string.isRequired,
//     cards: PropTypes.array,
//     saving: PropTypes.bool
// };

it('mount renders <Category /> withouta crashing', () => {
    const cards = cardsDb['9axy6ff@gmail.com']
    const columnId = 'column-1'
    const cardsInArray = cards.columns[columnId].taskIds.map( taskId =>  cards.tasks[taskId] )
    const wrapper = mount(
        <DragDropContext onDragEnd={() => {}}>
            <Provider store={store}>
                <Category cards={cardsInArray} categoryId={columnId} categoryName={'To do'} saving={false} />
            </Provider>
        </DragDropContext>
    )
    // const appComponent = findByTestAttr(wrapper, 'spt-dashboard');
    // const appComponent = wrapper.find('div.cards');
    const appComponent = wrapper.find('.category-title');
    expect(appComponent.text()).toBe('To do');

    // const logoutButton = findByTestAttr(wrapper, 'spt-logout-button');
    // expect(logoutButton.length).toBe(1);

    // logoutButton.simulate('click')
    // wrapper.update();
    // expect(logoutButton).toBeDisabled()

    // const cardOnDashboard = findByTestAttr(wrapper, 'spt-card');
    // expect(cardOnDashboard).toBeTruthy();

});

it('shallow renders <App /> withouta crashing', () => {
    const wrapper = shallow(<App />)
    const appComponent = findByTestAttr(wrapper, 'smp-router');
    expect(appComponent).toBeTruthy();
});


it('shallow renders <Counter /> withouta crashing', () => {
    const wrapper = shallow(<Counter />)
    expect(wrapper).toBeTruthy();
});

it('shallow renders <Card /> withouta crashing', () => {
    const props = {
        id: '3',
        title: "testTitle",
        description: "testDesx",
        index:3
    }

    const wrapper = mount(
        <DragDropContext onDragEnd={() => {}}>
            <Card {...props} />
        </DragDropContext>
    );

    expect(wrapper).toBeTruthy();
    const theCard = findByTestAttr(wrapper, 'card-title');
    expect(theCard.text()).toBe('testTitle');
});


it('renders <InProgressCard /> without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InProgressCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'smp-router');
    expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
    const wrapper = shallow(<Counter />)
    const appComponent = findByTestAttr(wrapper, 'increment-button');
    expect(wrapper).toBeTruthy();
});

test('renders counter display', () => {
    const wrapper = shallow(<Counter />)
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
    const wrapper = shallow(<Counter />);
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', ()=> {
    const wrapper = shallow(<Counter />);
    const initialCounterState = wrapper.setState({counter: 7});
    expect(initialCounterState.state('counter')).toBe(7)

    const button = findByTestAttr(wrapper, 'increment-button')
    button.simulate('click')
    wrapper.update();

    const incrementedCounter = wrapper.state('counter')
    expect(incrementedCounter).toBe(8)
})