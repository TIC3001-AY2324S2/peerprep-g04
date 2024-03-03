import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../components/common/AuthProvider";

export const useLoginUser = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginUser = async (req) => {
    const response = await axios.post(
      `${process.env.REACT_APP_USER_API_URL}/auth/login`,
      req
    );
    return response.data;
  };

  return useMutation({
    mutationFn: (req) => loginUser(req),
    onSuccess: async (data, req) => {
      const { accessToken } = data;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_USER_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              email: req.email,
            },
          }
        );

        await login(accessToken, response.data);
        await queryClient.invalidateQueries(["userLogin"]);
        navigate("/");
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
