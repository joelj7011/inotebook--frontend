import React, { useContext, useState } from 'react';
import userContext from '../../Context/User/UserContext';

const VerifyUser = () => {
  const [credentials, setCredentials] = useState({ otp: "" });

  const { VerifyUser, sendOtpAgain } = useContext(userContext);


  const verify = async (e) => {
    e.preventDefault();
    VerifyUser(credentials.otp);
  };

  const otpAgain = async (e) => {
    e.preventDefault();
    sendOtpAgain();
  }
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh', overflow: 'hidden' }}>
      <form onSubmit={verify} className="shadow p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="row mb-3 mt-3">
          <label htmlFor="OTP" className="col-sm-2 col-form-label">OTP</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control shadow-sm"
              name='otp'
              id="OTP"
              value={credentials.otp}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="text-center mb-3">
          <button type="button" className="btn btn-primary me-2" onClick={otpAgain}>Resend</button>
          <button type="submit" className="btn btn-primary" onClick={VerifyUser}>Verify</button>
        </div>
      </form>
    </div>
  );
}

export default VerifyUser;
