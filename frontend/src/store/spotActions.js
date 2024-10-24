import { csrfFetch } from "./csrf";

const CREATE_SPOT = 'CREATE_SPOT'
const LOAD_SPOTS = 'LOAD_SPOTS'
// const ADD_SPOT = 'ADD_SPOT'

const loadSpots = (spots) => ({
    type: 'LOAD_SPOTS',
    spots
});

const createSpotAction = (spot) => ({
    type: 'CREATE_SPOT',
    spot,
});

// const addSpot = (spot) => ({
//     type: 'ADD_SPOT',
//     spot
// });

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots))
    }
}
export const createSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
    });

    if (response .ok){
        const newSpot = await response.json();
        dispatch(createSpotAction(newSpot));
        return newSpot
    } else {
        const errorData = await response.json();
        throw errorData
    }
};

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return {
                ...state,
                ...action.spots
            };
        case CREATE_SPOT :
            return { 
                ...state,
                [action.spot.id]: action.spot,
            };
        // case ADD_SPOT:
        //     return {
        //         ...state,
        //         spots: [...state.spots, action.payload]
        //     }
        default: 
        return state
    }
}

export default spotReducer