import React, { useCallback, useState } from "react";

export const authContext = React.createContext({
  isLoggedIn: false,
  token: "",
  userId: "",
  isAdmin: false,
  login(token) {},
  logout() {},
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((token, expirationDate, user) => {
    localStorage.setItem('jokes-key', token);

    setUser(user);
    if(!expirationDate){
      const expDate = new Date().getTime() + (60000 * 60 * 24 * 3)
      localStorage.setItem('expiration-jokesKey-date', expDate)
    }

    if(user.isAdmin){
      setIsAdmin(true);
    }

    setIsLoggedIn(true);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    setIsAdmin(null)

    localStorage.setItem('jokes-key', '');
    localStorage.setItem('expiration-jokesKey-date', '')
  }, []);

  const contextObj = {
    token: token,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    user:user,
    login: login,
    logout,
  };
  return <authContext.Provider value={contextObj}>{props.children}</authContext.Provider>;
};

export default AuthContextProvider;