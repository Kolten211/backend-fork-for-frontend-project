import { useEffect, useState} from "react";
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import SpotTile from "./SpotTile";
import './SpotTiles.css'

const SpotTiles = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchSpots());
            setLoading(false)
        };
        fetchData();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>

    return (
        <div className="spot-tiles-container">
            {spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default SpotTiles