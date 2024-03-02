import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const loginUser = async (credentials) => {
    return axios.post(`${process.env.REACT_APP_USER_API_URL}/auth/login`, {
      data: {
        username: "SampleUserName",
        email: "sample@gmail.com",
        password: "SecurePassword",
      },
    });
  };

  return useMutation({
    mutationFn: (req) => loginUser(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["userLogin"]);
    },
  });
};
