import axios from "axios";

//TODO keyMirror
export const REQUEST_CARDS = 'REQUEST_CARDS';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const SAVING_CARDS = 'SAVING_CARDS';
export const SAVED_CARDS = 'SAVED_CARDS';

export const requestCards = () => ({
    type: REQUEST_CARDS,
});

export const receivedCards = data => ({
    type: RECEIVE_CARDS,
    payload: data,
});


export const savingCards = () => ({
    type: SAVING_CARDS,
});

export const savedCards = () => ({
    type: SAVED_CARDS,
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


export function saveCards(email, cards) {
    return function (dispatch) {
        dispatch(savingCards());

        return axios.post(`/cards`, { cards, email })
            .then(() => {
                setTimeout(() => { // setTimeout is just for demonstration
                    dispatch(savedCards())
                }, 500);

            })
            .catch(error => {
                console.error(error)
            })

    };
}
