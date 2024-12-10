import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReviews } from "../../store/review";
import './ManageReviews.css'




function ManageReviews() {
    const dispatch = useDispatch();
    
    // const sessionUser = useSelector(state => state.session.user);
    

    useEffect(() => {
        dispatch(fetchUserReviews());
    }, []);

    const reviews = useSelector(state => state.review)
    
    console.log('Manage Reviews', reviews)
    
    // const dateName = reviews[0] ? <p>{reviews.createdAt.slice(0,10)}</p> : <>Loading...</>   
    
    // console.log(dateName)

    return (
        <>
            <h1>Manage Reviews</h1>
            <div className="reviews">
            {reviews ? reviews.map(review => (
                <div key={review.id}>
                    {review.Spot ? <h3>{review.Spot.name}</h3> : <>Loading...</>}
                    <ul>
                        <p>{review.User.firstName}</p>
                        <p>{review.createdAt.slice(0,10)}</p>
                        <p>{review.review}</p>
                    </ul>
                </div>
            )) : <>Loading...</>} 
            </div>
        </>
    )
}

export default ManageReviews