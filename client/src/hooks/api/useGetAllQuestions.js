import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllQuestionData = () => {
  const getAllQuestionData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_QUESTION_API_URL}/questions/all`
    );

    return data;
  };

  return useQuery({
    queryKey: ["allQuestionData"],
    queryFn: getAllQuestionData,
  });
};
