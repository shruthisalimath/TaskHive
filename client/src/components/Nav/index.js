import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useNavigate } from "react-router-dom";

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
      <Link to="/home">Profile</Link>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
    </div>
  );
}

export default NavBar;
