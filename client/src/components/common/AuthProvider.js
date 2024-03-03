import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const decodedJwt = parseJwt(Cookies.get("accessToken"));

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken && decodedJwt) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_USER_API_URL}/users`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                email: decodedJwt.email,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      };

      fetchUserDetails();
    }
  }, [decodedJwt]);

  const login = (accessToken, userDetails) => {
    Cookies.set("accessToken", accessToken, { expires: 1 });
    setUser(userDetails);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
