import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || false
  );

  const login = async (payload) => {
    try {
      let res = await axios.post(`${BASE_URL}/auth/login`, payload, {
        'ngrok-skip-browser-warning': true,
      });

      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
