import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (accessToken, email) => {
    Cookies.set("accessToken", accessToken, { expires: 1 });
    setUser({ email }); // store additional user info here
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <pre>{JSON.stringify(user)}</pre>
      {children}
    </AuthContext.Provider>
  );
};
