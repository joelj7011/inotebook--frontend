import React, { useContext, useState } from 'react';
import AlertContext from '../../Context/Alert/AlertContext';
import { withRouter } from 'react-router-dom';

const VerifyUser = ({ history }) => {
  const { showAlert } = useContext(AlertContext);
  const host = "http://localhost:5000";
  const id = localStorage.getItem('userID');
  const [credentials, setCredentials] = useState({ otp: "" });

  const verify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/verifyuser/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OTP: credentials.otp })
      });
      const json = await response.json();
      console.log("Response from server:", json);
      if (json.success) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        showAlert("User verified successfully", "success");
        history.push('/login');
      } else {
        showAlert("Invalid OTP", "danger");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      showAlert("Something went wrong", "danger");
    }
  };
  const handleChange = (e) => {
    setCredentials({ [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={verify}>
      <div className="row mb-3 mt-3">
        <label htmlFor="OTP" className="col-sm-2 col-form-label">OTP</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name='otp'
            id="OTP"
            value={credentials.otp}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">Verify</button>
        </div>
      </div>
    </form>
  );
}

export default withRouter(VerifyUser);
