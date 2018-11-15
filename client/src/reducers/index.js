import { REQUEST_CARDS, RECEIVE_CARDS, SAVING_CARDS, SAVED_CARDS } from '../actions';

export const initialState = {
    loading: true,
    cards: {},
    cameFromDatabase: false,
    saving: undefined,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CARDS:
            return { ...state, loading: true };
        case RECEIVE_CARDS:
            return { ...state, cards: action.payload, cameFromDatabase:true, loading: false };
        case SAVING_CARDS:
            return { ...state, saving: true };
        case SAVED_CARDS:
            return { ...state, saving: false };
        default:
            return state;
    }
};

export default reducer;
