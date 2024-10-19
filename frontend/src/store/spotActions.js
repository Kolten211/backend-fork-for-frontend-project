import CreateNewSpot from "../components/CreateNewSpot/CreateNewSpot";
import { csrfFetch } from "./csrf";

const CREATE_SPOT = 'CREATE_SPOT'

const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot,
});


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
        case CREATE_SPOT :
            return { 
                ...state,
                [actoin.spot.id]: action.spot,
            }
        default: 
        return state
    }
}

export default spotReducer