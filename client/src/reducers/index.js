import { REQUEST_CARDS, RECEIVE_CARDS } from '../actions';

const initialState = {
    loading: true,
    cards: {},
    cameFromDb: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CARDS:
            return { ...state, loading: true };
        case RECEIVE_CARDS:
            return { ...state, cards: action.payload, cameFromDb:true, loading: false };
        default:
            return state;
    }
};

export default reducer;
