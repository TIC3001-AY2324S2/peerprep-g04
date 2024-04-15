import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteMatch = (userId) => {
  const queryClient = useQueryClient();
  const deleteMatch = async (matchId) => {
    return axios.delete(
      `${process.env.REACT_APP_MATCHING_API_URL}/matching/deleteMatch`,
      {
        data: { id: matchId },
      }
    );
  };

  return useMutation({
    mutationFn: (req) => deleteMatch(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["getFindMatchByUserId", userId]);
    },
  });
};
