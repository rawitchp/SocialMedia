import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || false
  );

  const login = () => {
    //TODO
    setCurrentUser({
      id: 1,
      name: 'Mix Doe',
      profilePic:
        'https://d39l2hkdp2esp1.cloudfront.net/img/photo/169175/169175_00_2x.jpg',
    });
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
