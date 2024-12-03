import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import StarRating from "./StarRating";
import { useState } from "react";
import './ReviewModal.css'

function CreateReview() {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('')
    const [selectedRating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal;

    const validSubmit = () => {
        const newErrors = {};
        if (reviewText < 10 ) {
            newErrors.reviewText = 'Need at least 10 charcters'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false
        }
        setErrors(newErrors)
        return true
    };
   

    const handleRating = (rating) => {
        setRating(rating)
        selectedRating
    };

    const handleReview = async (event) => {
        event.preventDefault();
        if (validSubmit()) {
            const reviewData = {
                reviewText,
                selectedRating
            }
            await dispatch(createReview(reviewData));

            closeModal();
        }
       
    };

    return(
        <div className="newReview">
            
            <form onSubmit={handleReview()}>
                <h4>How was your stay?</h4>
                <textarea 
                name="review" 
                id="review" 
                placeholder="Leave your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.    value)}
                className="reviewArea"
                >    
                </textarea>
                {errors.reviewText && <p className="errors"> {errors.reviewText}</p>}
                <StarRating onRate={handleRating()}/>
                <button type="submit" disabled={!validSubmit()}>Submit Your Review</button>
            </form> 
        </div>
    )
}

export default CreateReview