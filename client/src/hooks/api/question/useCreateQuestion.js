import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  const createQuestion = async (req) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_QUESTION_API_URL}/questions`,
        req
      );
      return true;
    } catch (error) {
      toast.error("Question is already existed.", {
        autoClose: 500, // 5 seconds
      });
      return false;
    }
  };

  return useMutation({
    mutationFn: (req) => createQuestion(req),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showQuestions"]);
    },
  });
};
