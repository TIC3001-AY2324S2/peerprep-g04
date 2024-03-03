import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useAuth } from "../../../components/common/AuthProvider";

export const useLoginUser = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const loginUser = async (req) => {
    const response = await axios.post(
      `${process.env.REACT_APP_USER_API_URL}/auth/login`,
      req
    );
    return response.data;
  };

  return useMutation({
    mutationFn: (req) => loginUser(req),
    onSuccess: (data, req) => {
      const { accessToken } = data;
      const email = req.email;
      login(accessToken, email);
      queryClient.invalidateQueries(["userLogin"]);
      redirect("/");
    },
    onError: (error) => {
      // Handle login error
      console.error("Login failed:", error);
    },
  });
};
