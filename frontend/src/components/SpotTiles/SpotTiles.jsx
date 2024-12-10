import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { fetchSpots } from '../../store/spotActions';
import './SpotTiles.css'
import { useDispatch, useSelector } from 'react-redux';

function SpotTile({ spot }) {
     const avgRating = spot.avgStarRating
    return (
      <NavLink to={`/spots/${spot.id}`} state={{spot}} className="spot-tile-link">
        <div className="spot-tile">
          <img src={spot.previewImage || 'default-image-url'} alt={spot.name} className="spot-image" />
          <h3>{spot.name}</h3>
          <div className='spot-info'>
            <p>{spot.city}, {spot.state}</p>
            <p className='spot-rating'><FaStar />{avgRating}.0</p>
          </div>
          <p>${spot.price}night</p>
        </div>
      </NavLink>
    );
  }

function SpotTiles() {
    const dispatch = useDispatch()
   
    
    useEffect(() => {
      dispatch(fetchSpots())

    }, []);
    
    const spots = useSelector(state => state.spot)

    return (
        <div className='spot-tiles-container'>
            {spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}
export default SpotTiles