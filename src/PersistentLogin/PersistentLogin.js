import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefresh from '../Hooks/useRefresh';
import AuthContext from '../Context/Auth/AuthContext';

const PersistentLogin = () => {
    const refresh = useRefresh();
    const [loading, setLoading] = useState(true);
    const { auth, persist } = useContext(AuthContext);

    useEffect(() => {
        const verifyToken = async () => {
            if (!auth?.accessToken && persist ) {
                try {
                    await refresh();
                } catch (error) {
                    console.error("Token refresh failed", error);
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, [auth, refresh]);
    return (
        <>
            {!persist ? <Outlet /> :
                loading ? <p>Loading...</p> : <Outlet />}
        </>
    );
};

export default PersistentLogin;
