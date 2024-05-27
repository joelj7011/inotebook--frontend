import Navbar from './component/Navbar';
import Home from "./component/Home";
import Login from './component/User/Login';
import SignUp from './component/User/SignUp';
import VerifyUser from './component/User/VerifyUser';
import ForgotPassword from './component/User/ForgotPassword';
import GetUserData from './component/User/GetUserData';
import ShowNotes from './component/Notes/ShowNotes';
import { Routes, Route, Outlet } from 'react-router-dom';
import RecuiredAuth from './component/RecuiredAuth';
import LoginWithOtp from './component/User/LoginWithOtp';
import PersistentLogin from './PersistentLogin/PersistentLogin';


function App() {


  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route element={<Outlet />}>
            {/**public route */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyUser />} />
            <Route path="/loginWithOtp" element={<LoginWithOtp />} />
            {/**----protected route */}
            <Route element={<PersistentLogin />}>
              <Route element={<RecuiredAuth />}>
                <Route path="/forgotpass" element={<ForgotPassword />} />
                <Route path="/getData" element={<GetUserData />} />
                <Route path="/shownotes" element={<ShowNotes />} />
                <Route path="/home" element={<Home />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>

    </>
  );
}

export default App;
