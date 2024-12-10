import { csrfFetch } from "./csrf";

const initialState = [];

const LOAD_REVIEWS = 'LOAD_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
const CLEAR_REVIEW = 'CLEAR_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

export const clearReviews = () => ({
    type: CLEAR_REVIEW
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    console.log()
    if (response.ok) {
        const reviews = await response.json();
        console.log('This is the reviews', reviews)
        dispatch(loadReviews(reviews));
    }
};

export const fetchUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('api/reviews/current');
    if (response.ok) {
        const data = await response.json();
        console.log('Response', data)
        dispatch(loadReviews(data))
    }
}
export const createReview = (review) => async (dispatch) => {
    console.log('Is there a spot?',review)
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
    }
};

export const editReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(review),
    });
    if(review.ok) {
        const updatedReview = await response.json();
        dispatch(updateReview(updatedReview));
    }
};

export const removeReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:'DELETE',
    });
    if(response.ok) {
        dispatch(deleteReview(reviewId));
    }
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            
            return [...action.reviews.Reviews];
        }
        
        case ADD_REVIEW: 
            return [...state, action.review]
            
        
        case UPDATE_REVIEW:{
            return {
                ...state,
                [action.review.id]: action.review,
            };
        }
        case CLEAR_REVIEW:
            return initialState
            
        case DELETE_REVIEW: {
            const newState = {...state};
            delete newState[action.reviewId];
            return newState;
        }
            default:
                return state
    }
}

export default reviewsReducer