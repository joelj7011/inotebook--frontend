import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from "./component/Home";
import About from "./component/About";
import NoteState from './Context/Note/NoteState';
import Login from './component/User/Login';
import AlertState from '../src/Context/Alert/AlertState';
import SignUp from './component/User/SignUp';
import VerifyUser from './component/User/VerifyUser';
import ForgotPassword from './component/User/ForgotPassword';
import GetUserData from './component/User/GetUserData';
import Cookies from 'js-cookie';
import ShowNotes from './component/Notes/ShowNotes';

function App() {
  useEffect(() => {
    const refresh = async () => {
      const expirationTime = parseInt(Cookies.get('expiery'));
      const currentTime = Date.now();

      if (currentTime >= expirationTime && Cookies.get("refreshToken") && Cookies.get("accessToken")) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/refreshacessaoken", {
            method: 'GET',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          });

          const json = await response.json();
          console.log(json);

          if (json.success) {
            const currentTime = Date.now();
            const newExpirationTime = currentTime + 3 * 60 * 1000;
            Cookies.set('expiery', newExpirationTime);
            Cookies.set('refreshToken', json.data.refreshToken, { expires: newExpirationTime });
            Cookies.set('accessToken', json.data.accessToken, { expires: newExpirationTime });
          } else {
            console.log("Error occurred during token refresh");
          }

        } catch (error) {
          console.log("Problem occurred while refreshing token", error);
        }
      } else {
        console.log("token still valid");
      }
    };

    if (!Cookies.get("refreshToken") && Cookies.get("accessToken")) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("expiery");
    } else {
      refresh();
    }

    const refreshInterval = setInterval(refresh, 15000);
    return () => clearInterval(refreshInterval);
  }, []);




  return (
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/verify" component={VerifyUser} />
              <Route path="/forgotpass" component={ForgotPassword} />
              <Route path="/getData" component={GetUserData} />
              <Route path="/shownotes" component={ShowNotes} />

            </Switch>
          </div>
        </Router>
      </NoteState>
    </AlertState>
  );
}

export default App;
