import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetQuestionById = (id) => {
  const getQuestionById = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_QUESTION_API_URL}/questions/find`,
      { params: id }
    );

    return data;
  };

  return useQuery({
    queryKey: ["getQuestionById", id],
    queryFn: getQuestionById,
  });
};
