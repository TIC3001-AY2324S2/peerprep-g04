import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useEditQuestion = () => {
  const queryClient = useQueryClient();

  const editQuestion = async ({ data, id }) => {
    try {
      return await axios.patch(
        `${process.env.REACT_APP_QUESTION_API_URL}/questions`,
        {
          ...data, // Spread the form data
          id: id, // Include the ID in the body
        }
      );
    } catch (error) {
      toast.error("Question is already existed.", {
        autoClose: 500, // 5 seconds
      });
      return false;
    }
  };

  return useMutation({
    mutationFn: (req, id) => editQuestion(req, id),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showQuestions"]);
    },
  });
};
