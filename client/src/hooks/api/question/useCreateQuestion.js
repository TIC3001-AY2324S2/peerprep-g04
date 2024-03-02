import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  const createQuestion = async (req) => {
    await axios.post(
      `${process.env.REACT_APP_QUESTION_API_URL}/questions`,
      req
    );
  };

  return useMutation({
    mutationFn: (req) => createQuestion(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showQuestions"]);
    },
  });
};
