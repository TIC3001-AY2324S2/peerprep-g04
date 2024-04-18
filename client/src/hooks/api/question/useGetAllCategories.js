import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllCategoriesData = () => {
  const getAllCategoriesData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_QUESTION_API_URL}/questions/categories`
    );

    return data;
  };

  return useQuery({
    queryKey: ["allCategoriesData"],
    queryFn: getAllCategoriesData,
  });
};
