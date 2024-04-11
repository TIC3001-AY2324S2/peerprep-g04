import { useEffect } from "react";
import { useGetFoundMatchByUserId } from "../../hooks/api/match/useGetFoundMatch";

export const MatchPolling = (userId) => {
  const {
    data: foundMatch,
    isLoading: isGetFindMatchLoading,
    setShouldFetch,
  } = useGetFoundMatchByUserId(userId.userId);

  useEffect(() => {
    // Start the polling when the component is mounted
    if (foundMatch) {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  }, [foundMatch]); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <pre> {JSON.stringify(foundMatch, null, 2)}</pre>

      <h1>Match Polling...</h1>
    </div>
  );
};
