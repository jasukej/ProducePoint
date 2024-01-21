import { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/protectedRoute.jsx";

import LandingBusiness from "./pages/business/landing.jsx";
import Profile from "./pages/business/profile.jsx";
import Requests from "./pages/business/requests.jsx";
import Settings from "./pages/business/settings.jsx";
import Stock from "./pages/business/stock.jsx";

// import LandingIndividual from '/pages/individual/landing.jsx';
// import Requests from '/pages/individual/requests.jsx';
// import Settings from '/pages/business/settings.jsx';

function App() {
  /* user data as props */
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RegistrationPage
            userData={userData}
            setUserData={(prevUserData) => {
              setUserData(userData);
            }}
          />
        }
      />
      <Route path="/login" element={<Login />} />

      <Route
        path="/landing"
        element={
          <ProtectedRoute>
            <LandingBusiness />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<Profile userData={userData} />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/requests" element={<Requests />} />
    </Routes>
  );
}

export default App;
