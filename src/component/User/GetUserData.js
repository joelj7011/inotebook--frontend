import React, { useContext, useEffect, useState } from 'react'
import alertContext from '../../Context/Alert/AlertContext';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';

const GetUserData = ({ history }) => {
    const [userData, setUserData] = useState(null);
    const { showAlert } = useContext(alertContext);
    useEffect(() => {

        if (Cookies.get("refreshToken") && Cookies.get("accessToken")) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                        method: 'POST',
                        credentials: 'include'
                    });
                    const json = await response.json();
                    console.log(json);
                    if (json) {
                        showAlert("data fetched successfully", "success");
                    } else {
                        showAlert("error occured", "danger");
                    }
                    setUserData(json)
                } catch (error) {
                    console.error("Error:", error);
                    showAlert("An error occurred. Please try again later.", "danger");
                }

            }
            fetchUserData();
        } else {
            history.push("/login");
        }

    }, [])

    return (
        <div>
            {
                userData ? (<div>
                    <h2>User Data</h2>
                    <p>Username: {userData.user.name}</p>
                    <p>Email: {userData.user.email}</p>
                    <p>Verified: {userData.user.verified ? "true" : "false"}</p>
                    <Link className="btn btn-primary mx-2" to="/forgotpass" role='button'>ChangePassword</Link>
                </div>) : (<p>Loading user data...</p>)
            }
        </div>
    )
}

export default withRouter(GetUserData);
