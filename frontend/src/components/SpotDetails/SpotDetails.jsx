import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../store/spots';
import SpotItems from './SpotItems'; // Adjust to reflect spot items if needed
import EditSpotForm from './EditSpotForm';
import ItemForm from './ItemForm'; // If needed for spots

const SpotDetail = () => {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();

  const [showEditSpotForm, setShowEditSpotForm] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    setShowEditSpotForm(false);
    setEditItemId(null);
  }, [dispatch, spotId]);

  if (!spot) {
    return null;
  }

  const renderImages = () => (
    <div className="spot-images">
      <img src={spot.previewImage || 'default-image-url'} alt={`${spot.name} main`} className="spot-image-large" />
      <div className="spot-images-small">
        {spot.images.slice(0, 4).map((image, index) => (
          <img key={index} src={image || 'default-image-url'} alt={`${spot.name} ${index + 1}`} className="spot-image-small" />
        ))}
      </div>
    </div>
  );

  let content = null;
  if (showAddForm) {
    content = (
      <ItemForm
        spotId={spot.id}
        itemId={-1}
        hideForm={() => setShowAddForm(false)}
      />
    );
  } else if (editItemId) {
    content = (
      <ItemForm
        itemId={editItemId}
        hideForm={() => setEditItemId(null)}
      />
    );
  } else if (showEditSpotForm) {
    content = (
      <EditSpotForm
        spot={spot}
        hideForm={() => setShowEditSpotForm(false)}
      />
    );
  } else {
    content = (
      <div className="spot-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b>Name</b> {spot.name}
            </li>
            <li>
              <b>Location</b> {spot.city}, {spot.state}, {spot.country}
            </li>
            <li>
              <b>Price</b> ${spot.price}/night
            </li>
            <li>
              <b>Rating</b> {spot.avgStarRating}
            </li>
          </ul>
        </div>
        <div>
          <h2>
            Items
            <button onClick={() => setShowAddForm(true)}> + </button>
          </h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Happiness</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <SpotItems spot={spot} setEditItemId={setEditItemId} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="spot-detail">
      <div className={`spot-detail-image-background`}>
        {renderImages()}
        <div>
          <h1 className="bigger">{spot.name}</h1>
          <p>Hosted by {spot.host.firstName} {spot.host.lastName}</p>
          <p>{spot.description}</p>
          {!showEditSpotForm && (
            <button onClick={() => setShowEditSpotForm(true)}>Edit</button>
          )}
        </div>
      </div>
      {content}
      <div className="callout-information-box">
        {/* Your callout information here */}
      </div>
    </div>
    );
};

export default SpotDetail;  