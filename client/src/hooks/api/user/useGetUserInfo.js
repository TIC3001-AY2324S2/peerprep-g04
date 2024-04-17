import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserInfo = (email) => {
  const getUserInfo = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_USER_API_URL}/users/profile`,
      {params: {email}}
    );
    return data;
  };

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
};
