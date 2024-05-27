import React, { useContext, useState } from 'react';
import AlertContext from '../../Context/Alert/AlertContext';
import UserContext from '../../Context/User/UserContext';
import AuthContext from '../../Context/Auth/AuthContext';

const LoginWithOtp = () => {
    const [credentials, setCredentials] = useState({ email: "", otp: "" });
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const { auth } = useContext(AuthContext);
    const { loginWithOtp, generateOtpForPassword } = useContext(UserContext);
    const { showAlert } = useContext(AlertContext);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await generateOtpForPassword(credentials.email);
            if (auth.response?.status === 200) {
                setOtpSent(true);
            }


        } catch (error) {
            showAlert(`Something went wrong: ${error}`, "danger");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await loginWithOtp(credentials.email, credentials.otp);
        } catch (error) {
            showAlert(`Something went wrong: ${error}`, "danger");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };



    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh', overflow: 'hidden' }}>
            <form onSubmit={otpSent ? handleSubmit : handleClick} className="shadow p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="row mb-3 mt-5">
                    <label htmlFor="Email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control shadow-sm"
                            id="Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {!otpSent && (
                    <div className="text-center mb-3">
                        <button type="button" className="btn btn-primary" disabled={loading} onClick={handleClick}>
                            {loading ? 'Sending OTP...' : 'Generate OTP'}
                        </button>
                    </div>
                )}
                {otpSent && (
                    <div className="row mb-3">
                        <label htmlFor="OTP" className="col-sm-2 col-form-label">OTP</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                id="OTP"
                                name="otp"
                                value={credentials.otp}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                )}
                <div className="text-center mb-3">
                    <button type="submit" className="btn btn-primary" disabled={!otpSent || loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginWithOtp;
