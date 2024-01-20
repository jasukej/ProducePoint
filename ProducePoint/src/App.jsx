import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={RegistrationPage} />
      </Switch>
    </Router>
  )
}

export default App
