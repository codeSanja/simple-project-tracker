import axios from "axios";

export const REQUEST_CARDS = 'REQUEST_CARDS';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';

export const requestCards = () => ({
    type: REQUEST_CARDS,
});

export const receivedCards = data => ({
    type: RECEIVE_CARDS,
    payload: data,
});

export function fetchCards(email) {
    return function (dispatch) {
        dispatch(requestCards());

        return axios.get(`/cards`, { params: { email: email }})
            .then(res => {
                const cardsFromDb = res.data;
                dispatch(receivedCards(cardsFromDb));
            }).catch(err => {
                console.error(err);
            })

    };
}
