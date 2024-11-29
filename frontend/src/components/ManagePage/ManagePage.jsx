import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserSpots } from "../../store/spotActions";
import { FaStar } from "react-icons/fa"
import { removeSpot } from "../../store/spotActions";





function SpotTile({ spot }) {
    console.log('Spot info', spot)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(removeSpot(spot.id))
    };

    const handleUpdate = () => {
        navigate(`/update-spot/${spot.id}`, { state: spot } )
    };

    const average = spot.avgRating
    return (
    <div>
        <NavLink to={`/spots/${spot.id}`} className="spot-tile-link">
            <div className="spot-tile">
            <img src={spot.previewImage || 'default-image-url'} alt={spot.name} className="spot-image" />
            <h3>{spot.name}</h3>
            <div className='spot-info'>
                <p>{spot.city}, {spot.state}</p>
                <p className='spot-rating'><FaStar />{spot.avgRating ? average.toFixed(1) : 'N/A'}</p>
            </div>
            <p>${spot.price}night</p>
            </div>
        </NavLink>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleUpdate}>Update</button>
    </div>
    );
  }



const ManagePage = () => {
    const dispatch = useDispatch();
    // const [selectedSpots, setSelectedSpots] = useState([])
   

    useEffect(() => {
        dispatch(fetchUserSpots());
    }, []);

    const spots = useSelector(state => state.spot);

    // useEffect(() => {
    //     if (currentUser && spots.length > 0) {
    //         const userSpots = spots.filter(spot => spot.userId === currentUser.id);
    //         setSelectedSpots(userSpots)
    //     }
    // }, []);


    return (
        <div>
            <h1>Manage Your Spots</h1>
            {spots && spots.length > 0 ? (
                <ul>
                    {spots.map(spot => (
                       <SpotTile key={spot.id} spot={spot} />
                    ))}
                </ul>
            ) : (
                <p>You don&apos;t have any spots yet.</p>
            )}
        </div>
    )
}

export default ManagePage