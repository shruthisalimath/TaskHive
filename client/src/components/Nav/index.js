import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useNavigate } from "react-router-dom";
import logo from '../../assets/TaskHiveLogo.svg';
import Auth from "../../utils/auth"

function NavBar() {
  function logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    navigate("/");
  }
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <img className='logo' src={logo} alt='TaskHive Logo'/>
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/" onClick={() => Auth.logout()}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
