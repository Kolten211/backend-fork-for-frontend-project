import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const SpotTile = ({ spot }) => {
    return (
        <NavLink to={`/api/spots/${spot.id}`} className="spot-tile-link">
            <div className="spot-tile">
                <img src={spot.previewImage || 'default-image-url'} alt={spot.name} />
                <h3>{spot.name}</h3>
                <div className="spot-info">
                    <p>{spot.city}, {spot.state}</p>
                    <p className="spot-rating"><FaStar />{spot.avgRating.toFixed(1)}</p>
                </div>
                <p>${spot.price} per night</p>
            </div>
        </NavLink>
    )
}

export default SpotTile