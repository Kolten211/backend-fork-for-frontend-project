import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotTiles from './components/SpotTiles/SpotTiles';
// import PrivateRoute from './components/LandingPage/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import SpotDetails from './components/SpotDetails/SpotDetails';
import CreateNewSpot from './components/CreateNewSpot/CreateNewSpot';
import ManagePage from './components/ManagePage/ManagePage';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';
import ManageReviews from './components/ManageReviews/ManageReviews';
import DeleteReview from './components/DeleteReview/DeleteReviewModal';




function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots',
        element: <SpotTiles />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/create-spot',
        element: <CreateNewSpot />
      },
      {
        path: '/manage-spots',
        element: <ManagePage />
      },
      {
        path: '/manage-reviews',
        element: <ManageReviews />
      },
      {
        element: <DeleteReview />
      },
      {
        path: `/update-spot/:spotId`,
        element: <UpdateSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;