import React, { useState } from "react";

export const authContext = React.createContext({
  isLoggedIn: false,
  token: "",
  isAdmin: false,
  login(token) {},
  logout() {},
});

const AuthContextProvider = (props) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token, expirationDate, admin) => {
    localStorage.setItem('JWT-key', token);

    if(!expirationDate){
      const expDate = new Date().getTime() + (60000 * 60)
      localStorage.setItem('expiration-date', expDate)
    }

    if(admin){
      setIsAdmin(true);
    }
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  const contextObj = {
    token: token,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    login: login,
    logout,
  };
  return <authContext.Provider value={contextObj}>{props.children}</authContext.Provider>;
};

export default AuthContextProvider;