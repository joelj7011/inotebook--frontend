import React, { useContext, useState } from 'react'
import alertContext from '../../Context/Alert/AlertContext';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
const ForgotPassword = ({ history }) => {
    const { showAlert } = useContext(alertContext);
    const [password, Setpasword] = useState({ oldPass: "", newPass: "" });

    const handleChange = (e) => {
     
        Setpasword({ ...password, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/changePassword`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ oldpassword: password.oldPass, newPassword: password.newPass })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                showAlert("password changed login in again.", "success");
                Cookies.remove("refreshToken");
                Cookies.remove("accessToken");
                history.push("/login");
            } else {
                showAlert("error occured", "danger");
            }
        } catch (error) {
            console.error("Error:", error);
            showAlert("An error occurred. Please try again later.", "danger");
        }

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

export default withRouter(ForgotPassword);
