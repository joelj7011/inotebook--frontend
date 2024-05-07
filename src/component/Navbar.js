import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import alertContext from '../Context/Alert/AlertContext';
import Cookies from 'js-cookie';

const Navbar = ({ history }) => {
  const location = useLocation();
  const { showAlert } = useContext(alertContext);


  const handleLogOut = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      const json = await response.json();
      if (json.success) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        history.push('/login');
        showAlert("logged out successfully", 'success');
      } else {
        showAlert("something went erong", 'danger');
      }
    } catch (error) {
      showAlert('An error occurred. Please try again later.', 'danger');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">inotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>

          </ul>
          {Cookies.get('accessToken') && Cookies.get('refreshToken') ? (
            <>
              <button type="button" className="btn btn-primary mx-2" onClick={handleLogOut}>Logout</button>
              <Link className="btn btn-primary mx-2" to="/getData" role='button'>Account</Link>
              <Link className="btn btn-primary mx-2" to="/shownotes" role='button'>Saved Notes</Link>

            </>


          ) : (
            <form className='d-flex'>
              <Link className="btn btn-primary mx-2" to="/login" role='button'>Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role='button'>SignUp</Link>
            </form>
          )}
        </div>
      </div>
    </nav >

  )
}

export default withRouter(Navbar);
