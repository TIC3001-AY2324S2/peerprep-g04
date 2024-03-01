import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEditQuestion = () => {
  const queryClient = useQueryClient();

  const editQuestion = async ({ data, id }) => {
    return await axios.patch(
      `${process.env.REACT_APP_QUESTION_API_URL}/questions`,
      {
        ...data, // Spread the form data
        id: id, // Include the ID in the body
      }
    );
  };

  return useMutation({
    mutationFn: (req, id) => editQuestion(req, id),
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["showQuestions"]);
    },
  });
};
