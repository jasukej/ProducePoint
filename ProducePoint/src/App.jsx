import { useState } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import Login from './pages/Login';
import ProtectedRoute from './components/protectedRoute.jsx'

import LandingBusiness from './pages/business/landing.jsx';
// import Stock from '/pages/business/stock.jsx';

// import LandingIndividual from '/pages/individual/landing.jsx';
// import Requests from '/pages/individual/requests.jsx';
// import Settings from '/pages/business/settings.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />

        <Route
                path="/landing"
                element={
                  <ProtectedRoute>
                    <LandingBusiness />
                  </ProtectedRoute>
                }
              />
    </Routes>
    
  )
}

export default App
