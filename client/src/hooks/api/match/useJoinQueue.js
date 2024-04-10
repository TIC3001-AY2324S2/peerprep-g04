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
      return true;
    } catch (error) {
      toast.error("Error joining Queue. Please try again.", {
        autoClose: 500, // 5 seconds
      });
      return false;
    }
  };

  return useMutation({
    mutationFn: (req) => joinQueue(req),
    onSuccess: (_, req) => {
      toast.success("Joined Queue.", {
        autoClose: 500, // 5 seconds
      });
      queryClient.invalidateQueries(["joinQueue"]);
    },
  });
};
