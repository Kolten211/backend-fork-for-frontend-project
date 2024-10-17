import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SpotDetails() {
    const { spotId } = useParams();
    const [spot, setSpot] = useState(null);

    useEffect(() => {
        fetch(`/api/spots/${spotId}`)
         .then(response => response.json())
         .then(data => setSpot(data))
         .catch(e => console.error('Error fetching spot details:', e))
    }, [spotId]);

    if (!spot) return <div>Loading...</div>

    return (
        <div>
            <h1>{spot.name}</h1>
            <img src={spot.imageUrl} alt={spot.name} />
            <p>{spot.description}</p>
        </div>
    )
}

export default SpotDetails