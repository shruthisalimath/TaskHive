import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/TaskHiveLogo.svg';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [addUser, { loading, error, data }] = useMutation(ADD_USER);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const { data } = await addUser({
          variables: { ...formData },
          });
          const { token } = data.addUser;
          console.log('User created:', data.addUser);
          localStorage.setItem('token', `Bearer ${token}`);
          navigate('/home');
        } catch (error) {
          console.error('error adding user:', error);
        }
    } else {
      // Throw an alert with each error message
      Object.values(errors).forEach((error) => alert(error));
      return;
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='login-form'>
      <h2>Sign Up</h2>
      {data?.addUser ? (
        <p>Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
        <div>
          
          <input
            placeholder="First Name"
            type="text"
            id="firstName"
            name="firstName"
            className="login-input"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            className="login-input"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          
          <input
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="login-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button className="loginBtn" type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
          {error && <p>Error: {error.message}</p>}
        </form>
      )}
    </div>
  );
}

export default SignUp;