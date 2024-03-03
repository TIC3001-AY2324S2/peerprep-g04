import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// IM NOT ABLE TO THINK OF HOW TO DO A REFETCH...SO I CANT USE THIS IN AUTH

export const useGetUserInfo = (accessToken, email) => {
  const getUserInfo = async (req) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_USER_API_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          email,
        },
      },
      {
        enabled: !!email && !!accessToken,
      }
    );
    return data;
  };

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
};
