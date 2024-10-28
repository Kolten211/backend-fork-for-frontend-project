import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchSpotDetails } from "../../store/spots";
import './SpotDetails.css'

const SpotDetailPage = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.find(spot => spot.id === Number(spotId)));

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId))
    }, [dispatch, spotId]);

    if (!spot) return <p>Loading...</p>

    return (
        <div className="spot-details">
            <h1>{spot.name}</h1>
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-imgs">
                <img src={spot.SpotImages[0]} alt={spot.name} className='large-img' />
                <div>
                    {spot.SpotImages.slice(1).map((image, index) => (
                        <img key={index} src={image} alt={`${spot.name} ${index + 1}`} className="small-img"/>
                    ))}
                </div>
            </div>
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            <p>{spot.description}</p>
            <div className="callout-box">

            </div>
        </div>
    )
};

export default SpotDetailPage