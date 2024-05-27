import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../Context/User/UserContext';
import { style } from '../../exports';
const GetUserData = () => {
    const { FetchUserDetails, user, DeleteUser } = useContext(userContext);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            FetchUserDetails();
            isInitialMount.current = false;
        }
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className="card p-4 shadow-sm" style={{ width: "50%" }}>
                {user ? (
                    <div>
                        <h2 className="mt-3">User Data</h2>
                        <p style={style}> Username: {user.name}</p>
                        <p style={style}>Email: {user.email}</p>
                        <p style={style}>Verified: {user.verified ? "true" : "false"}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p style={style} onClick={DeleteUser}>
                                    <i className="fa-solid fa-trash" ></i>   <a style={{ fontSize: "18px" }} > delete user</a>
                                </p>
                            </div>
                            <div style={style}>
                                <Link className="btn btn-primary mx-2" to="/forgotpass" role='button'>Change Password</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div >
    );
}

export default GetUserData;
