import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { DragDropContext, Draggable } from "react-beautiful-dnd"
import store from './store'
import App from './App';
import InProgressCard from './components/content/InProgressCard';
import Card from './components/content/Card';
import Category from "./components/content/Category";
import LogoutButton from "./components/auth/LogoutButton";

let cardsDb = require("./mockData/initialCardData");

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}


it('mount renders <Category /> withouta crashing', () => {
    const cards = cardsDb['9axy6ff@gmail.com']
    const columnId = 'column-1'
    const cardsInArray = cards.columns[columnId].taskIds.map( taskId =>  cards.tasks[taskId] )
    const wrapper = mount(
        <DragDropContext onDragEnd={() => {}}>
            <Category store={store} cards={cardsInArray} categoryId={columnId} categoryName={'To do'} saving={false} />
        </DragDropContext>
    )

    const appComponent = findByTestAttr(wrapper, 'category-title')
    expect(appComponent.text()).toBe('To do');

    const theCards = wrapper.find('.card');
    expect(theCards.length).toBe(2);
    console.log(wrapper.debug())
});

it('mount renders <LogoutButton /> withouta crashing', () => {
    const wrapper = mount(<LogoutButton logout={() => {}}/>)

    expect(wrapper.getDOMNode().disabled).toBe(false)
    wrapper.simulate('click')
    expect(wrapper.getDOMNode().disabled).toBe(true)

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
