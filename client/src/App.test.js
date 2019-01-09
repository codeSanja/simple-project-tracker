import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';
import InProgressCard from './components/content/InProgressCard';
import Counter from './components/content/Counter';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// HTMLCanvasElement.prototype.getContext = () => {
//
// };

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
}

it('shallow renders <App /> withoutaa crashing', () => {
    const wrapper = shallow(<App />)
    const appComponent = findByTestAttr(wrapper, 'smp-router');
    expect(appComponent).toBeTruthy();
});


it('shallow renders <Counter /> withoutaa crashing', () => {
    const wrapper = shallow(<Counter />)
    expect(wrapper).toBeTruthy();
});


it('renders <InProgressCard /> without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InProgressCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

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
    const wrapper = setup();
    // const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    // expect(counterDisplay.length).toBe(1);
});
//
// test('counter starts at 0', () => {
//     // const wrapper = setup();
//     // const initialCounterState = wrapper.state('counter');
//     // expect(initialCounterState).toBe(0)
// })