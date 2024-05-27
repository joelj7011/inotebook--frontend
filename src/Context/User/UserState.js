import React, { useContext, useState } from 'react';
import UserContext from './UserContext';
import AuthContext from '../Auth/AuthContext';
import AlertContext from '../Alert/AlertContext';
import { useNavigate } from 'react-router-dom';
import useJwtInterceptors from '../../Hooks/useJwtInterceptors';

const UserState = (props) => {
    const { auth, setAuth, setPersist } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const axiosPrivateInstance = useJwtInterceptors();

    const SignUp = async (name, email, password) => {
        try {
            const response = await axiosPrivateInstance.post('/api/auth/createuser',
                {
                    name: name,
                    email: email,
                    password: password
                });
            if (!response) {
                showAlert('User creation failed. Please try again later.', 'danger');
                navigate('/home');
            } else {
                const id = response?.data?.user?._id;
                console.log(id);
                setAuth({ id });
                showAlert(response?.data?.message, 'success');
                navigate('/verify');
            }
        } catch (error) {
            if (!error?.response) {
                showAlert("no response from the server ", "danger");
            } else if (error?.response?.status === 500) {
                showAlert("user was not created try again", "danger");
            } else if (error?.response?.status === 402) {
                showAlert('please login with correct credentials', "danger");
            } else if (error?.response?.status === 400) {
                showAlert('user with the same email exists', "danger");
            }
        }
    };

    const logIn = async (email, password) => {
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/login`, {
                email: email,
                password: password,
            });
            console.log(response)
            const { accessToken, refreshToken, user } = response?.data?.data;
            setAuth({ user, accessToken, refreshToken });
            showAlert(response?.data?.message, "success");
            navigate('/home');
        } catch (error) {
            if (!error?.response) {
                showAlert("no response from the server ", "danger");
            } else if (error?.response?.status === 400) {
                showAlert("no user found", "danger");
            } else if (error?.response?.status === 401) {
                showAlert('please login with correct credentials', "danger");
            }
        }
    }

    const FetchUserDetails = async () => {
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/getuser`, {
            });
            console.log(response)
            if (response) {
                showAlert("data fetched successfully", "success");
            } else {
                showAlert("error occured", "success");

            }
            setUser(response?.data?.data?.user);
        } catch (error) {
            showAlert('An error occurred. Please try again later.', 'danger');
        }
    }

    const ForgotPassword = async (oldPass, newPass) => {
        try {

            const response = await axiosPrivateInstance.post(`/api/auth/changePassword`, {
                oldpassword: oldPass,
                newPassword: newPass
            });
            if (response) {
                showAlert("Password changed, please login again.", "success");
                navigate("/login");
            } else if (response.status === 403) {
                showAlert("You need to be logged in", "danger");
                navigate('/login');
            }
        }
        catch (error) {
            showAlert('An error occurred. Please try again later.', 'danger');
        }

    }

    const VerifyUser = async (otp) => {
        let id = auth.id
        console.log(id);
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/verifyuser/${id}`, {
                OTP: otp
            });
            if (response) {
                showAlert("User verified successfully", "success");
                navigate('/login');
            } else {
                showAlert("Invalid OTP", "danger");
            }

        } catch (error) {
            if (!error.response) {
                showAlert("no response from the server", "danger");
            }
        }
    }

    const DeleteUser = async () => {
        try {
            const response = await axiosPrivateInstance.delete(`/api/auth/deleteuser`);
            if (response) {
                delete auth.accessToken
                delete auth.refreshToken
                delete auth.id;
                delete auth.user;
                showAlert(response.message, "success");
                navigate('/login');
            } else {
                showAlert(response.message, "danger")
            }
        } catch (error) {
            showAlert('An error occurred. Please try again later.', 'danger');
        }
    }

    const LogOut = async () => {
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/logout`);
            console.log(response);
            if (response) {
                setAuth({});
                setPersist(false);
                navigate('/login')
                showAlert("logged out successfully", 'success');
            } else {
                showAlert("something went wrong", 'danger');
            }
        } catch (error) {
            showAlert('An error occurred. Please try again later.', 'danger');
        }
    }

    const sendOtpAgain = async () => {
        let id = auth.id;
        console.log(id);
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/sendOtpAgain/${id}`);

            if (response) {
                showAlert(response?.data?.message, "success");
            }

        } catch (error) {
            if (!error?.response) {
                showAlert("no response from he server ", "danger");
            } else if (error?.response?.status === 404) {
                showAlert("problem generating OTP", "danger");
            }
        }
    }

    const generateOtpForPassword = async (email) => {
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/generateotp`, {
                email: email,
            });
            if (response.status === 200) {
                setAuth({ response });
            }
            console.log(response);
        } catch (error) {
            if (!error.response) {
                showAlert("no response form the server", "danger");
            } else if (error?.response?.status === 404) {
                showAlert("problem generating otp", "danger");
            } else if (error?.response?.status === 401) {
                showAlert("please verify first", "danger");
            } else if (error?.response?.status === 500) {
                showAlert("user not found", "danger")
            }
        }
    }

    const loginWithOtp = async (email, otp) => {
        try {
            const response = await axiosPrivateInstance.post(`/api/auth/loginwithotp`, {
                email: email,
                OTP: otp
            });
            const { accessToken, refreshToken, user } = response?.data?.data;
            setAuth({ user, accessToken, refreshToken });
            showAlert(response?.data?.message, "success");
            navigate('/home');
        } catch (error) {
            if (!error?.response) {
                showAlert("no response from the server ", "danger");
            } else if (error?.response?.status === 500) {
                showAlert("enter email and otp", "danger");
            } else if (error?.response?.status === 401) {
                showAlert('user not found', "danger");
            } else if (error?.response?.status === 400) {
                showAlert('invalid otp', "danger");
            } else if (error?.response?.status === 402) {
                showAlert('please verify the user', "danger");
            }
        }
    }



    return (
        <UserContext.Provider value={{ user, SignUp, logIn, FetchUserDetails, ForgotPassword, VerifyUser, DeleteUser, LogOut, sendOtpAgain, generateOtpForPassword, loginWithOtp }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
