import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPaginatedUserData = (page, limit, search) => {
  const getPaginatedUsers = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_USER_API_URL}/users/paginatedUsers`,
      { params: { page, limit, search } }
    );
    return data;
  };

  return useQuery({
    queryKey: ["paginatedUsers", page, limit, search],
    queryFn: getPaginatedUsers,
  });
};
