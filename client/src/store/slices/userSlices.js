import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

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

// Login thunk to login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userDetails, { dispatch, rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_USER_API_URL}/auth/login`,
        userDetails
      );
      const { accessToken } = loginResponse.data;
      const decodedJwt = parseJwt(accessToken);

      // Fetch user data with the access token
      const userData = await dispatch(
        fetchUserData({ accessToken, email: decodedJwt.email })
      ).unwrap();

      // Combine the user data with the access token and return
      return { ...userData, accessToken };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({ accessToken, email }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_USER_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            email: email,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: null,
  },
  reducers: {
    clearUser: (state) => {
      state.userObj = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userObj = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        // Update the user object with fetched user data
        state.userObj = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
