const LOAD_REVIEWS = 'LOAD_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
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

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});


export const fetchReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews');
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }
};

export const createReview = (review) => async (dispatch) => {
    const response = await fetch('/api/reviews', {
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
    const response = await fetch(`/api/reviews/${review.id}`, {
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
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method:'DELETE',
    });
    if(response.ok) {
        dispatch(deleteReview(reviewId));
    }
};

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const reviews = {};
            action.reviews.forEach((review) => {
                reviews[review.id] = review
            });
        return reviews;
        case ADD_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review,
            }
        case UPDATE_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review,
            };
        case DELETE_REVIEW:
            const newState = {...state};
            delete newState[action.reviewId];
            return newState;
            default:
                return state
    }
}

export default reviewsReducer