import { useEffect, useMemo} from 'react';
import { NavLink } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import './SpotTiles.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spotActions';

function SpotTile({ spot }) {
    return (
      <NavLink to={`/spots/${spot.id}`} className="spot-tile-link">
        <div className="spot-tile">
          <img src={spot.previewImage || 'default-image-url'} alt={spot.name} className="spot-image" />
          <h3>{spot.name}</h3>
          <div className='spot-info'>
            <p>{spot.city}, {spot.state}</p>
            <p className='spot-rating'><FaStar />{spot.avgStarRating.toFixed(1)}</p>
          </div>
          <p>${spot.price}night</p>
        </div>
      </NavLink>
    );
  }

function SpotTiles() {
    // const [spotList, setSpotList] = useState([]);
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)
    useEffect(() => {
      dispatch(fetchSpots())
    }, [dispatch]);
    // useEffect(() => {
    //     fetch('/api/spots')
    //      .then(response => response.json())
    //      .then(data =>  {
    //         console.log('Fetched spots:', data.Spots);
    //         setSpotList(data.Spots);
    //       })
    //      .catch(error => console.error('Error Fetching Spots', error))
    // }, []);
    const memoizedSpots = useMemo(() => spots, [spots])

    return (
        <div className='spot-tiles-container'>
            {memoizedSpots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}
export default SpotTiles