import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // const form = document.getElementById('signUp');
  // const emailInput = document.getElementById('email');
  // const nameInput = document.getElementById('name');
  // const passwordInput = document.getElementById('password');
  // const passwordMatch = document.getElementById('confirmPassword');
  // const userInput = document.getElementById('username');
  // const submitButton = document.getElementById('submitButton');


  // form.addEventListener('input', () => {
  //   const isNameValid = nameInput.value.trim() !== '' || nameInput.length >= 3;
  //   const isEmailValid = emailInput.value.trim() !== '' && emailInput.validity.valid;
  //   const isPasswordValid = passwordInput.value.trim() !== '';
  //   const isMatchValid = passwordMatch.value.trim() !== '';
  //   const isUsernameValid = userInput.value.trim() !== '';
  //   submitButton.disabled = !(isNameValid && isEmailValid && isPasswordValid && isMatchValid && isUsernameValid)

  // })
  // const isFormValid = () => {
  //   return(
  //     email.trim() !== '' &&
  //     username.trim() !== '' &&
  //     firstName.trim() !== '' &&

  //   )
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 className='SignupForm'>Sign Up</h1>
      <form id='signUp' onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" id='submitButton'>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;