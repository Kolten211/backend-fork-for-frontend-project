import { useDispatch} from "react-redux"
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import StarRating from "./StarRating";
import { useState } from "react";
import './ReviewModal.css'
// import { useNavigate } from "react-router-dom";

function CreateReview({spot, navigate }) {
    const dispatch = useDispatch();

    const [review, setReviewText] = useState('')
    const [stars, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    console.log('what is going on', spot);
    const spotId = spot.id

    // const sessionUser = useSelector(state => state.session.user)
    // console.log('are you what i think you are?', sessionUser)

    const validSubmit = () => {
        const newErrors = {};
        if (review < 10 ) {
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
        stars
    };

    const handleReview = async (event) => {
        event.preventDefault();

        if (validSubmit()) {
            const reviewData = {
                spotId: spotId,
                review,
                stars
            }
            
            const newReview = await dispatch(createReview(reviewData));
           
            closeModal()

            navigate(`/spots/${newReview.spotId}`)

            
        }
       
    };

    return(
        <div className="newReview">
            
            <form onSubmit={handleReview}>
                <h4>How was your stay?</h4>
                <textarea 
                name="review" 
                id="review" 
                placeholder="Leave your review here..."
                value={review}
                onChange={(e) => setReviewText(e.target.value)}
                className="reviewArea"
                >    
                </textarea>
                {errors.reviewText && <p className="errors"> {errors.reviewText}</p>}
                <StarRating onRate={handleRating}/>
                <button type="submit" disabled={!validSubmit}>Submit Your Review</button>
            </form> 
        </div>
    )
}

export default CreateReview