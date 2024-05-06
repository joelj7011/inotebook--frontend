// AlertState.js
import React, { useState, useContext } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    const Alert = () => {
        const { alert } = useContext(AlertContext);

        return (
            <div style={{ height: '50px' }}>
                {alert && (
                    <div className={`alert alert-${alert.type} alert-dismissible`} role='alert'>
                        {alert.message}
                    </div>
                )}
            </div>
        );
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
            <Alert />
        </AlertContext.Provider>
    );
};

export default AlertState;
