import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const deleteQuestion = async (questionId) => {
    return axios.delete(`${process.env.REACT_APP_QUESTION_API_URL}/questions`, {
      data: { _id: questionId },
    });
  };

  return useMutation({
    mutationFn: (req) => deleteQuestion(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showQuestions"]);
    },
  });
};
