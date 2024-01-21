import React from "react"
import { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const userAuthContext = createContext();

export function useUserAuth() {
  return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
      }
      function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
      }
      function logOut() {
        return signOut(auth);
      }
      function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
      }
  
    return (
      <userAuthContext.Provider
        value={{ user, logIn, signUp, logOut, googleSignIn }}
      >
        {children}
      </userAuthContext.Provider>
    );
  }

