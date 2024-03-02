import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const loginUser = async (req) => {
    return axios.post(`${process.env.REACT_APP_USER_API_URL}/auth/login`, req);
  };

  return useMutation({
    mutationFn: (req) => loginUser(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["userLogin"]);
    },
  });
};
