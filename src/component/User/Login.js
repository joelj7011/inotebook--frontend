import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../Context/User/UserContext';
import AuthContext from '../../Context/Auth/AuthContext';


const Login = () => {

  const { logIn } = useContext(userContext);
  let [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { auth, persist, setPersist } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logIn(credentials.email, credentials.password);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const tooglePersist = () => {
    setPersist(prev => prev = !prev)
  }

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist])



  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh', overflow: 'hidden' }}>
    <form onSubmit={handleClick} className="shadow p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
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
        <div className="mb-4 d-flex align-items-center">
            <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={persist}
                onChange={tooglePersist}
            />
            <label className="form-check-label ms-2 me-auto" htmlFor="rememberMe">
                Remember Me
            </label>
            <Link to="/loginWithOtp" className="ms-3">Or login with OTP</Link>
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-primary" style={{ width: '150px' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {auth.accessToken && (
                <Link className="btn btn-secondary ms-2" to="/forgotpass" role='button'>Forgot Password</Link>
            )}
        </div>
    </form>
</div>

  );
};

export default Login;
