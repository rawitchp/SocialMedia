import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || false
  );

  const login = async (payload) => {
    try {
      let res = await axios.post(
        'http://localhost:8800/api/auth/login',
        payload,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
