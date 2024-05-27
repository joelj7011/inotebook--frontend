import { useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../Context/Auth/AuthContext';
import AlertContext from '../Context/Alert/AlertContext';

const useRefresh = () => {
    const { setAuth } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);

    const refresh = async (e) => {
        try {

            const response = await axios.get("/api/auth/refreshacessaoken", {
                withCredentials: 'true'
            });
            if (response.status === 200 && response.data && response.data.data) {
                const { accessToken, refreshToken } = response.data.data;
                setAuth(prev => ({
                    ...prev,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }));

                return accessToken;
            } else {
                showAlert("Error occurred during token refresh", "danger");
            }
        } catch (error) {
            if (!error.response) {
                showAlert("no response from the server", "danger");
            } else if (error.response.status === 401) {
                showAlert("you need to be loggedin to use this feature", "danger");
            } else if (error.response.status === 500) {
                showAlert("you need to be loggedin", "danger");
            }
        }
    };
    return refresh;
}


export default useRefresh;
