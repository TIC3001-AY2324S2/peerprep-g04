import { useEffect } from "react";
import { Button } from "flowbite-react";
import { useGetFoundMatchByUserId } from "../../hooks/api/match/useGetFoundMatch";
import { useNavigate } from "react-router-dom";

export const MatchPolling = (userId, setRenderMatching) => {
  const navigate = useNavigate();
  const {
    data: foundMatch,
    isLoading: isGetFindMatchLoading,
    setShouldFetch,
  } = useGetFoundMatchByUserId(userId.userId);

  useEffect(() => {
    // Start the polling when the component is mounted
    if (foundMatch) {
      setShouldFetch(false);
      navigate("/matchDetails");
    } else {
      setShouldFetch(true);
    }
  }, [foundMatch]); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Match Polling...</h1>
      <pre> {JSON.stringify(foundMatch, null, 2)}</pre>
    </div>
  );
};
