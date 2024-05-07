import React, { useState, useContext } from 'react';
import AlertContext from "../../Context/Alert/AlertContext";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
const Login = ({ history }) => {
  const { showAlert } = useContext(AlertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json()
      console.log(json.message);
      if (json.success) {
        const currentTime = Date.now();
        const expirationTime = currentTime + 3 * 60 * 1000;
        Cookies.set('refreshToken', json.data.refreshToken, { expires: expirationTime });
        Cookies.set("accessToken", json.data.accessToken, { expires: expirationTime });
        Cookies.set("expiery", expirationTime);
        showAlert(json.message, "success");
        history.push('/');
      } else {
        showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("An error occurred. Please try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleClick}>
      <div className="row mb-3 mt-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2"></div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {localStorage.getItem('token') ? (<Link className="btn btn-primary mx-2" to="/forgotpass" role='button'>ForgotPassword</Link>) : ``}

    </form>
  );
};

export default withRouter(Login);
