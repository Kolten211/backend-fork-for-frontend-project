import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import ReserveFormModal from '../ReserveFormModal/ReserveFormModal';
import './SpotDetails.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spotActions';
import { fetchReviews } from '../../store/review';

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  
  
  

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviews(spotId));
  }, []);

  const spotdetails = useSelector(state => state.spot);
  const spot = spotdetails[0];

  const reviews = useSelector(state => state.review);
  


  if (!spot) return <div>Loading...</div>; // see if everything is redering correctly

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
      <div className="spot-images">
        {spot.SpotImages && spot.SpotImages.length > 0 && (
          <>
            <img src={spot.SpotImages[0].url} alt={`${spot.name} large`} className="large-image" />
            <div className="small-images">
              {spot.SpotImages.slice(1).map((image, index) => (
                <img key={index} src={image.url} alt={`${spot.name} ${index + 1}`} className="small-image" />
              ))}
            </div>
          </>
        )}
      </div>
      <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
      <p>{spot.description}</p>
      <div className="callout-box">
        <p>${spot.price} night <FaStar /> {spot.avgStarRating.toFixed(1)} Reviews:{spot.numReviews}</p>
        <OpenModalButton
          className='reserve-button'
          buttonText='Reserve'
          modalComponent={<ReserveFormModal />}
        />
      </div>
      <div className="reviews-summary">
        <h2> <FaStar /> {spot.avgStarRating} ·{spot.numReviews}</h2>
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.review}</p>
              <p><FaStar /> {review.stars}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SpotDetails