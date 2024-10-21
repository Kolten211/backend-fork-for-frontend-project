import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import ReserveFormModal from '../ReserveFormModal/ReserveFormModal';
import './SpotDetails.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

function SpotDetails() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
//   const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch(`/api/spots/${spotId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched spot data:', data); // Log the entire data
        if (data.smallImagesUrls) {
          console.log('Small image URLs:', data.smallImagesUrls); // Log small image URLs
        }
        setSpot(data);
      })
      .catch(e => console.error('Error fetching spot details:', e));
  }, [spotId]);

//   useEffect(() => {
//     if (spotId) {
//         fetch('/api/spots/${spotId}/reviews')
//         .then(response => response.json())
//         .then(data => {
//             setReviews(data)
//         })
//         .catch(e => console.error('Error fetching reviews:', e))
//     }
//   }, [spotId]);


  if (!spot) return <div>Loading...</div>;

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
      {/* <div className="reviews-summary">
        <h2> <FaStar /> {spot.avgStarRating} ({reviews.length})</h2>
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={index}>
              <p>{review.text}</p>
              <p><FaStar /> {review.stars}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default SpotDetails