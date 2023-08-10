import React, { useState } from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp';
import logo from '../assets/TaskHiveLogo.svg';

function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp((prevState) => !prevState);
  };

  return (
    <div className='auth-page'>
      <div className='logo-container'>
      {/* <h1>Welcome to Our App</h1> */}
      <img className='logo-lg' src={logo} alt='TaskHive Logo'/>
      </div>
      <div className='form-container'>
      {showSignUp ? <SignUp /> : <Login />}
      <p className="sign-login-btn"onClick={toggleSignUp} style={{ cursor: 'pointer' }}>
        {showSignUp ? 'Back to Login' : 'New here? Sign up'}
      </p>
      </div>
    </div>
  );
}

export default AuthPage;