import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import ReserveFormModal from '../ReserveFormModal/ReserveFormModal';
import './SpotDetails.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spotActions';
import { clearSpotDetails } from '../../store/spotActions';
import { clearReviews } from '../../store/review';
import { fetchReviews } from '../../store/review';
import CreateReview from '../RatingandReviews/ReviewModal';

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(clearSpotDetails())
    dispatch(clearReviews())
    const fetchData = async () => {
      await dispatch(fetchSpotDetails(spotId));
      await dispatch(fetchReviews(spotId));
    }
    fetchData()
  }, []);

  const spotdetails = useSelector(state => state.spot);
  const spot = spotdetails[0];

  const reviews = useSelector(state => state.review);

  console.log('REVIEWS!!!', reviews);

  const sortedReviews = reviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log('Sorted reviews', sortedReviews)

  // const monthName = sortedReviews.map(review => ({
  //   ...review,
  //   namedDate: new Date(review.createdAt.slice(0,10)).toLocaleString('en-US', {month: 'Long', year: 'numeric'})
  // }))

  const averageRating = (reviews.reduce((sum, review) => sum + review.stars, 0 ) / reviews.length).toFixed(1);

//reviews.length > 0 ? ( :
  //'NEW'
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
        {reviews.length === 1 ? <p>${spot.price} night <FaStar /> {averageRating} {spot.numReviews} : Review</p> : reviews.length === 0 ? <p>${spot.price} night <FaStar /> NEW  </p> : <p>${spot.price} night <FaStar /> {averageRating} {spot.numReviews} : Reviews</p> }
        <OpenModalButton
          className='reserve-button'
          buttonText='Reserve'
          modalComponent={<ReserveFormModal />}
        />
      </div>
      <div className="reviews-summary">
        <h2>Reviews/Ratings</h2>
        {!reviews || reviews.User !== sessionUser ? <OpenModalButton
          className='createReview'
          buttonText='Post Your Review'
          modalComponent={<CreateReview spot={spot}/>}
        /> : <></>}
        { reviews.length ? <h2> <FaStar /> {averageRating} · {spot.numReviews}</h2> :  <h2><FaStar />NEW</h2>}
        <ul className="reviews-list">
          {sortedReviews.map((review) => (
            <li key={review.id}>
              <p>{review.User.firstName}</p>
              <p>{review.createdAt.slice(0,10)}</p>
              <p>{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SpotDetails