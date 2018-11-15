import { REQUEST_CARDS, RECEIVE_CARDS } from '../actions';

export const initialState = {
    loading: true,
    cards: {},
    cameFromDatabase: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CARDS:
            return { ...state, loading: true };
        case RECEIVE_CARDS:
            return { ...state, cards: action.payload, cameFromDatabase:true, loading: false };
        default:
            return state;
    }
};

export default reducer;
