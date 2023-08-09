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
      {/* <h1>Welcome to Our App</h1> */}
      <img className='logo-lg' src={logo} alt='TaskHive Logo'/>
      <p onClick={toggleSignUp} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        {showSignUp ? 'Back to Login' : 'Sign Up'}
      </p>
      {showSignUp ? <SignUp /> : <Login />}
    </div>
  );
}

export default AuthPage;