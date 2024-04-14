import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetPollMatchByUserId = (userId) => {
  const queryClient = useQueryClient();
  const [shouldFetch, setShouldFetch] = useState(false); // Default to false

  const getPollMatchByUserId = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_MATCHING_API_URL}/matching/findMatch`,
      { params: { userId } }
    );

    return data;
  };

  const queryInfo = useQuery({
    queryKey: ["getPollMatchByUserId", userId],
    queryFn: getPollMatchByUserId,
    refetchInterval: shouldFetch ? 5000 : false,
    staleTime: Infinity,
    refetchIntervalInBackground: shouldFetch,
    refetchOnWindowFocus: shouldFetch,
    enabled: shouldFetch,
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["getPollMatchByUserId", userId]);
      setShouldFetch(false);
    },
  });

  return { ...queryInfo, setShouldFetch };
};
