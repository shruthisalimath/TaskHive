import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const result = await loginUser({
          variables: { ...formData },
        });
        const {token, user} = result.data.login;
        console.log('Login successful. Token:', token);
        localStorage.setItem('token', `Bearer ${token}`);
        navigate('/home');
        // TODO: Save the token to localStorage or a state to manage authentication.
      } catch (error) {
        console.error('error logging in user:', error);
      }
    } else {
      Object.values(errors).forEach((error) => alert(error));
      return;
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="email">Email: </label> */}
          <input
            type="text"
            id="email"
            name="email"
            className="login-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password: </label> */}
          <input
            type="password"
            id="password"
            name="password"
            className="login-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="loginBtn" type="submit" disabled={loading}>
        {loading ? 'Logging In...' : 'Login'}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;