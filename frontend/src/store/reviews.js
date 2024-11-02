import { csrfFetch } from "./csrf";

const initialState = []
// Actions -----------------------------------------------------------------
const SET_REVIEWS = 'SET_REVIEWS';
const ADD_REVIEW= 'ADD_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW'; 
//ACTION CREATERS ----------------------------------------------------------
export const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    reviews
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const deletereview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});
// THUNKS -----------------------------------------------------------------
export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        console.log('Fetched Reviews:', data);  
        dispatch(setReviews(data))
    }
};


export const createReviews = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
        }, 
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const newreview = await response.json();
        dispatch(addReview(newreview));
        return newreview;
    }
};

export const updatereviewDetails = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(review),
    });
    if (response.ok) {
        const updatedreview = await response.json();
        dispatch(updateReview(updatedreview));
        return updatedreview;
    }
};

export const removereview = (spotId, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deletereview(reviewId))
        }
};

// REDUCER --------------------------------------------------------
const reviewReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return action.reviews || initialState;
        case ADD_REVIEW:
            return [...state, action.review];
        case UPDATE_REVIEW: 
            return state.map(review =>
                review.id === action.review.id ? action.review : review
            );
        case DELETE_REVIEW:
            return state.filter(review => review.id !== action.reviewId);
        default:
            return state;
    }
}

export default reviewReducer