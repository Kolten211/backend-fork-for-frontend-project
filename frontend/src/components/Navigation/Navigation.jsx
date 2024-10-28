// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='Navigation'>
      <li className="font-size-xl">
        <div>
          <NavLink to="/" className='title-img-container'><img src='https://res.cloudinary.com/dozliephp/image/upload/v1729123642/Jujutsu_favicon_igilzz.png' className='home-img'/> JujutsuBnB</NavLink>
        </div>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;