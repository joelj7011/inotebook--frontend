import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import AuthContext from '../Context/Auth/AuthContext';
import userContext from '../Context/User/UserContext';

const Navbar = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const { LogOut } = useContext(userContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/home">inotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {auth.accessToken && auth.refreshToken ? (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
            </li>
          </ul>
        ) : null}
        <div className="ms-auto d-flex align-items-center">
          {auth.accessToken ? (
            <>
              <button type="button" className="btn btn-primary mx-2" onClick={LogOut}>Logout</button>
              <Link className="btn btn-primary mx-2" to="/getData" role='button'>Account</Link>
              <Link className="btn btn-primary mx-2" to="/shownotes" role='button'>Saved Notes</Link>
            </>
          ) : (
            <>
              <Link className="btn btn-primary mx-2" to="/login" role='button'>Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role='button'>SignUp</Link>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
