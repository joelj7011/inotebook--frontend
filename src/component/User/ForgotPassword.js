import React, { useContext, useState } from 'react'
import userContext from '../../Context/User/UserContext';


const ForgotPassword = () => {
    const [password, Setpasword] = useState({ oldPass: "", newPass: "" });
    const { ForgotPassword } = useContext(userContext);

    const handleClick = async (e) => {
        e.preventDefault();
        ForgotPassword(password.oldPass, password.newPass);
    };

    const handleChange = (e) => {
        Setpasword({ ...password, [e.target.name]: e.target.value })
    }
    return (

        <form onSubmit={handleClick}>
            <div className="row mb-3 mt-3">
                <label htmlFor="OTP" className="col-sm-2 col-form-label">Enter Old Password</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        name='oldPass'
                        id="oldpassword"
                        value={password.oldPass}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="row mb-3 mt-3">
                <label htmlFor="OTP" className="col-sm-2 col-form-label">Enter New Password</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        name='newPass'
                        id="newPassword"
                        value={password.newPass}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">changepassword</button>

        </form>
    )
}

export default ForgotPassword;
