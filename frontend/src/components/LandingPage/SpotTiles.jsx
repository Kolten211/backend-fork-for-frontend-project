import { useEffect } from "react";
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import SpotTile from "./SpotTile";
import './SpotTiles.css'

const SpotTiles = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(fetchSpots());

    }, [dispatch]);

    return (
        <div className="spot-tiles-container">
            {spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default SpotTiles