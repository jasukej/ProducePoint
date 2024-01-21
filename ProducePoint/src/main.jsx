import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </UserAuthContextProvider>
  </React.StrictMode>,
)
