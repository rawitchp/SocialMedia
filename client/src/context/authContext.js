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

  const refetch = async () => {
    try {
      const { access_token } = await JSON.parse(localStorage.getItem('user'));

      let res = await axios.get(`${BASE_URL}/users/find/${currentUser.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setCurrentUser({ ...currentUser, ...res.data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, setCurrentUser, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
