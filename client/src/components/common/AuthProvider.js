import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, clearUser, loginUser } from "../../store/slices/userSlices";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userObj);
  const lastToken = useRef();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken && accessToken !== lastToken.current) {
      lastToken.current = accessToken;
      const decodedJwt = parseJwt(Cookies.get("accessToken"));

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
          dispatch(setUser(response.data));
        } catch (error) {
          console.error("Failed to fetch user details", error);
          dispatch(clearUser());
          Cookies.remove("accessToken");
        }
      };

      fetchUserDetails();
    } else if (!accessToken) {
      dispatch(clearUser());
    }
  }, [dispatch]);

  const login = (userDetails) => {
    dispatch(loginUser(userDetails));
    dispatch(setUser(userDetails));
  };

  const logout = () => {
    Cookies.remove("accessToken");
    dispatch(clearUser());
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      <pre>This is my user: {JSON.stringify(user)}</pre>
      {children}
    </AuthContext.Provider>
  );
};
