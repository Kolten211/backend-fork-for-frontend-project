import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,  } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { fetchSpotDetails } from "../../store/spots";
import { fetchReviews } from "../../store/reviews";
import './SpotDetails.css'

const SpotDetailPage = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const spot = useSelector(state => state.spots.find(spot => spot.id === Number(spotId)));
    const reviewsState = useSelector(state => state.review)
    const reviews = reviewsState.Reviews || [];
    
    console.log('Spot:', spot);
    console.log('Preview?:', reviewsState)

    useEffect(() => {
        const fetchData = async () => {
            try{
                await dispatch(fetchSpotDetails(spotId));
                await dispatch(fetchReviews(spotId))
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {               
                setLoading(false)
            }
        }
        fetchData();
    }, [dispatch, spotId]);

   

    if (loading) return <p>Loading...</p>
    if (!spot) return <p>Spot not found!!</p>

    const averageRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1) : 'New';
    
    return (
        <div className="spot-details">
            <h1>{spot.name}</h1>
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-imgs">
                {spot.SpotImages && spot.SpotImages.length > 0 && (
                    <>
                        <img src={spot.SpotImages[0]} alt={spot.name} className='large-img' />
                        <div>
                            {spot.SpotImages.slice(1).map((image, index) => (
                                <img key={index} src={image} alt={`${spot.name} ${index + 1}`} className="small-img"/>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            <p>{spot.description}</p>
            <div className="callout-box">
                <p>${spot.price} night <FaStar /> {spot.avgStarRating.toFixed(1)} · Reviews:{spot.numReviews}</p>
                <OpenModalButton
                className='reserve-button'
                buttonText='Reserve'
                // modalComponent={<ReserveFormModal />}
                />
            </div>
            <h2>{reviews.length} Reviews</h2>
            {reviews.length > 0 ? (
                <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <p>{review.review}</p>
                        <p>Rating: {averageRating}</p>
                    </li>
                ))}
            </ul>
            ): (
                <p>NEW</p>
            )}
            
        </div>
    )
};

export default SpotDetailPage