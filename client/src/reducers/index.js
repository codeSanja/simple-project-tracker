import { REQUEST_CARDS, RECEIVE_CARDS } from '../actions';

//TODO change initital state
const initialState = {
    loading: true,
    cards: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CARDS:
            return { ...state, loading: true };
        case RECEIVE_CARDS:
            return { ...state, cards: action.payload, loading: false };
        default:
            return state;
    }
};

export default reducer;
