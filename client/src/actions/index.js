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
// debugger
    return function (dispatch) {
        dispatch(requestCards());

        //________________
        // return fetch(`https://newsapi.org/v1/articles?source=${channel}&apiKey=${MY_API_KEY}`)
        //     .then(
        //         response => response.json(),
        //         error => console.log('An error occurred.', error),
        //     )
        //     .then((json) => {
        //             dispatch(receivedCards(json));
        //         },
        //     );
        //________________

        return axios.get(`/cards`, { params: { email: email }})
            .then(res => {
            // debugger
                const cardsFromDb = res.data;
                dispatch(receivedCards(cardsFromDb));
            }).catch(err => {
                console.error(err);
            })

    };
}
