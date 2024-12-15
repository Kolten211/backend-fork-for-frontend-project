import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import DeleteReview from '../DeleteReview/DeleteReviewModal';

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(clearSpotDetails())
    dispatch(clearReviews())
    
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviews(spotId));
   
  }, [dispatch]);

  const spotdetails = useSelector(state => state.spot);
  const spot = spotdetails[0];

  const reviews = useSelector(state => state.review);

  console.log("sessionUser",sessionUser)

  // const sortedReviews =  reviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

 

  const userReview = reviews?.find(review => review.userId === sessionUser?.id && review.spotId == spot?.id)
  
  

  const averageRating = (reviews?.reduce((sum, review) => sum + review.stars, 0 ) / reviews.length).toFixed(1);

  
  // 
  if (!spot ) return <div>Loading...</div>; // see if everything is redering correctly

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
      {spot.Owner ? <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p> : <p>loading...</p>}
      <p className='divider'>{spot.description}</p>
      <div className="callout-box">
        {reviews.length === 1 ? <p>${spot.price} night <FaStar /> {averageRating} {spot.numReviews} : Review</p> : reviews.length === 0 ? <p>${spot.price} night <FaStar /> NEW  </p> : <p>${spot.price} night <FaStar /> {averageRating} {spot.numReviews} : Reviews</p> }
        <OpenModalButton
          className='reserve-button'
          buttonText='Reserve'
          modalComponent={<ReserveFormModal />}
        />
      </div>
      <div className="reviews-summary">
        { reviews.length ? 
        
        <div className='reviews-border'><h2> <FaStar /> {averageRating} · {spot.numReviews}</h2> {!userReview && sessionUser  ? <OpenModalButton
          className='createReview'
          buttonText='Post Your Review'
          modalComponent={<CreateReview spot={spot} navigate={navigate}/>}
        /> : !sessionUser || (sessionUser.id == spot.ownerId)? <></> : <></>}</div> : 
        
        <div className='reviews-border'> <h2><FaStar />NEW</h2> {!userReview && sessionUser  ? <OpenModalButton
          className='createReview'
          buttonText='Post Your Review'
          modalComponent={<CreateReview spot={spot} navigate={navigate}/>}
        /> : <h4>Be the first to post a review!</h4>}</div> }
        
        <ul className="reviews-list">
          { reviews ? reviews.map((review) => (
            <li key={review.id}>
              <p>{review?.User?.firstName}</p>
              <p>{review.createdAt.slice(0,10).toLocaleString("en-US", {month: "long", year: "numeric"})}</p>
              <p>{review.review}</p>
              <div>
              {review?.User?.id == sessionUser?.id ? <OpenModalButton 
              className=''
              buttonText='Delete'
              modalComponent={<DeleteReview review={review} navigate={navigate}/>}/>
               : <></>}
              </div>
            </li>
          )) : <>Loading</>}
        </ul>
      </div>
    </div>
  );
}

export default SpotDetails