// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <div className='logo-container'>
        <li className="font-size-xl">
          <img src="https://res.cloudinary.com/dozliephp/image/upload/v1729123642/Jujutsu_favicon_igilzz.png" alt="JujutsuBnB" className='logo' />
          <NavLink to="/" className='Home'>
          JujutsuBnB
          </NavLink>
      </li>
      </div>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;