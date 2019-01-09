import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';
// import OktaSignInWidget from './components/auth/OktaSignInWidget';
import InProgressCard from './components/content/InProgressCard';
import Counter from './components/content/Counter';

Enzyme.configure({ adapter: new EnzymeAdapter() });

HTMLCanvasElement.prototype.getContext = () => {
    return {
        backingStorePixelRatio: 0
    }
};

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
}

it('shallow renders <Counter /> without crashing', () => {
    const wrapper = shallow(<Counter />)
    expect(wrapper).toBeTruthy();
});


it('renders <InProgressCard /> without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InProgressCard />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.setState('counter');
    expect(initialCounterState).toBe(0)
})