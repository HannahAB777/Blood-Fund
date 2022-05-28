import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/Auth';
import { ADD_ADMIN } from '../utils/mutations';
import css from './Signup.css';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '',
  lastName: '',
  medicalLicenseNumber: '' });
  const [addAdmin] = useMutation(ADD_ADMIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addAdmin({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        medicalLicenseNumber: formState.medicalLicenseNumber,

      },
    });
    const token = mutationResponse.data.addAdmin.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container signUpDiv">
      <Link className="signUpLink" to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
          className='formBox'
            placeholder="First Name"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
          className='formBox'
            placeholder="Last Name"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
          className='formBox'
            placeholder="Email@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          </div>
          <div className="flex-row space-between my-2">
          <label htmlFor="email">License Number:</label>
          <input
          className='formBox'
            placeholder="License Number"
            name="medicalLicenseNumber"
            type="medicalLicenseNumber"
            id="medicalLicenseNumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
          className='formBox'
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button className="signUpBtn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
