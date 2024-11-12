import { csrfFetch } from "./csrf";

const initialState = []

const LOAD_SPOTS = 'LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'LOAD_SPOT_DETAILS'
const ADD_SPOT = 'ADD_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT'


const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const loadSpotDetails = (spot) => ({
    type: LOAD_SPOT_DETAILS,
    spot
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
}

export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        console.log('This is the data', data)
        dispatch(loadSpotDetails(data));
    }
};

export const createSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
    });

    if (response.ok){
        const newSpot = await response.json();
        dispatch(addSpot(newSpot));
        console.log('Action', newSpot)
        return newSpot
    } else {
        const errorData = await response.json();
        throw errorData
    }
};

export const updateSpotDetails = (spotData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
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


// REDUCER --------------------------------------------------------

const spotReducer = ( state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            
            return [...action.spots];
        case ADD_SPOT:
            console.log('this action', action.spots)
            return [...state, action.spot];
            
        case UPDATE_SPOT: 
            return state.map(spot =>
                spot.id === action.spot.id ? action.spot : spot
            );
        case DELETE_SPOT:
            return state.filter(spot => spot.id !== action.spotId);
        case LOAD_SPOT_DETAILS:
            return [...state.filter(spot => spot.id !== action.spot.id), action.spot]
        default:
            return state;
    }
}

export default spotReducer