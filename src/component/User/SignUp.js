import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AlertContext from "../../Context/Alert/AlertContext";

const SignUp = ({ history }) => {
  const { showAlert } = useContext(AlertContext);

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      if (json.success) {
        showAlert('User creation failed. Please try again later.', "danger");
        history.push('/home');
      } else {
        localStorage.setItem("userID", json.user._id);
        showAlert('User creation initiated. Please check your email for verification instructions.', "success");
        history.push('/verify');
      }
    } catch (error) {
      console.log(error);
      showAlert('User creation failed. Please try again later.', "danger");
    }
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleClick}>
      <div className="row mb-3 mt-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input
            type="name"
            className="form-control"
            id="name"
            name='name'
            value={credentials.name}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="row mb-3 mt-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="email"
            name='email'
            value={credentials.email}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="password"
            name='password'
            value={credentials.password}
            onChange={handleChange}
            required={true} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2"></div>
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  )
}

export default withRouter(SignUp); 
