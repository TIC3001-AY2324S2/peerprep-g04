import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const deleteUser = async (userEmail) => {
    return axios.delete(`${process.env.REACT_APP_USER_API_URL}/users`, {
      data: { email: userEmail },
    });
  };

  return useMutation({
    mutationFn: (req) => deleteUser(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showUsers"]);
    },
  });
};
