import React, { useContext, useState } from 'react';
import userContext from '../../Context/User/UserContext';

const SignUp = (props) => {
  const { SignUp } = useContext(userContext);

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    SignUp(credentials.name, credentials.email, credentials.password);

  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh', overflow: 'hidden' }}>
      <form onSubmit={handleClick} className="shadow p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="row mb-3 mt-3">
          <label htmlFor="inputName" >Name</label>
          <div className="mb-3">
            <input
              type="text"
              className="form-control shadow-sm"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3  mt-3">
          <label htmlFor="inputEmail" >Email</label>
          <div className="mb-3">
            <input
              type="email"
              className="form-control shadow-sm"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword" >Password</label>
          <div className="mb-3">
            <input
              type="password"
              className="form-control shadow-sm"
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
        <div className="text-center">
          <button type="submit" className="btn btn-primary" style={{ width: '150px' }}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp; 
