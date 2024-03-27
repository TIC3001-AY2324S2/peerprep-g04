import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPaginatedQuestionData = (page, limit) => {
  const getPaginatedQuestions = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_QUESTION_API_URL}/questions/paginatedQuestions`,
      { params: { page, limit } }
    );

    return data;
  };

  return useQuery({
    queryKey: ["paginatedQuestions", page, limit],
    queryFn: getPaginatedQuestions,
  });
};
