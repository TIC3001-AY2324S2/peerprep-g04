import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllQuestionData = () => {
  const getAllQuestionData = async () => {
    const { data } = await axios.get("http://localhost:3002/questions/all");

    return data;
  };

  return useQuery({
    queryKey: ["allQuestionData"],
    queryFn: getAllQuestionData,
  });
};
