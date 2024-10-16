import { useEffect, useState } from 'react';
import './SpotTiles.css'

function SpotTile({ spot }) {
    return (
    <div>
        <img src={spot.imageUrl} alt={spot.name} className='spot-image'/>
        <h3>{spot.name}</h3>
        <p>{spot.description}</p>
    </div>
    );
}

function SpotTiles() {
    const [spotList, setSpotList] = useState([]);

    useEffect(() => {
        fetch('/spi/spots')
         .then(response => response.json())
         .then(data => setSpotList(data))
         .catch(error => console.error('Error Fetching Spots', error))
    }, []);

    return (
        <div className='spot-tiles-container'>
            {spotList.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}
export default SpotTiles