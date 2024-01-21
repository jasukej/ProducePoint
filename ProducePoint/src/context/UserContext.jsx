// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const updateUser = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
