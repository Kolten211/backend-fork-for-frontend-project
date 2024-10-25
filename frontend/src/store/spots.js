import { csrfFetch } from "./csrf";

const initialState = []

const LOAD_SPOTS = 'LOAD_SPOTS';
const ADD_SPOT = 'ADD_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT'; 

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
});

const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
});

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots))
    }
};

export const createSpots = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
        },
        body: JSON.stringify(spotData)
    });
    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addSpot(newSpot));
        return newSpot;
    }
};

export const updateSpotDetails = (spotData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'applicaiton/json',
        },
        body:JSON.stringify(spotData),
    });
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
};

export const removeSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deleteSpot(spotId))
        }
};


const spotReducer = ( state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return [...action.spots];
        case ADD_SPOT:
            return [...action.spot];
        case UPDATE_SPOT: 
            return state.map(spot =>
                spot.id === action.spot.id ? action.spot : spot
            );
        case DELETE_SPOT:
            return state.filter(spot => spot.id !== action.spotId);
        default:
            return state;
    }
}

export default spotReducer