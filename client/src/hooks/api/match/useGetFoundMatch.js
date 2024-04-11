import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetFoundMatchByUserId = (userId) => {
  const queryClient = useQueryClient();
  const [shouldFetch, setShouldFetch] = useState(false); // Default to false

  const getFoundMatchByUserId = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_MATCHING_API_URL}/matching/findMatch`,
      { params: { userId } }
    );

    return data;
  };

  const queryInfo = useQuery({
    queryKey: ["getFoundMatchByUserId", userId],
    queryFn: getFoundMatchByUserId,
    refetchInterval: shouldFetch ? 5000 : false,
    staleTime: Infinity,
    refetchIntervalInBackground: shouldFetch,
    refetchOnWindowFocus: shouldFetch,
    enabled: shouldFetch,
    onSuccess: (_, req) => {
      queryClient.invalidateQueries(["getFoundMatchByUserId", userId]);
      setShouldFetch(false);
    },
  });

  return { ...queryInfo, setShouldFetch };
};
