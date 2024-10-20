// import { useEffect, useMemo} from 'react';
import SpotTiles from '../SpotTiles/SpotTiles';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpots } from '../../store/spotActions';

const LandingPage = () => {
  // const dispatch = useDispatch();
  // const rawspots = useSelector(state => state.spots)

  // const spots =useMemo(() => {
  //   return rawspots
  // }, [rawspots])
  // useEffect(() => {
  //   dispatch(fetchSpots())
  // }, [dispatch]);

    return (
        <div className="landing-container">
          {/* {Object.values(spots).map(spot => (
            <SpotTiles key={spot.id} spot={spot}/>
          ))} */}
          <SpotTiles />
        </div>
    );
}


export default LandingPage;