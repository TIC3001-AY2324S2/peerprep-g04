import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useJoinQueue = () => {
  const queryClient = useQueryClient();

  const joinQueue = async (req) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_MATCHING_API_URL}/matching/joinQueue`,
        req
      );
    } catch (error) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: (req) => joinQueue(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["joinQueue"]);
    },
    onError: () => {
      toast.error("Error joining Queue. Please try again.", {
        autoClose: 500, // 5 seconds
      });
    },
  });
};
