import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const editUser= async ({ data, id }) => {
    try {
      return await axios.patch(
      `${process.env.REACT_APP_USER_API_URL}/users`,
      {
        ...data, // Spread the form data
        id: id, // Include the ID in the body
      });
    }catch (error) {
      toast.error("username is already existed.", {
        autoClose: 500, // 5 seconds
      });
      return false;
    }
  };

  return useMutation({
    mutationFn: (req, id) => editUser(req, id),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showUsers"]);
    },
  });
};
