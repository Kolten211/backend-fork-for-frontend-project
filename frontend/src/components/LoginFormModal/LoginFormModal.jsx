// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
// import { NavLink } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = () => {
    return dispatch(sessionActions.login({credential: 'disgracedone@jjk.io', password: 'MalevolentShrine'}))
    .then(closeModal)
    .catch(async (res) => {
      const data= await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    })
  }

  return (
    <>
      <h1 className='login-title'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <button onClick={demoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;