import { useEffect } from "react";
import { Button } from "flowbite-react";
import { useGetPollMatchByUserId } from "../../hooks/api/match/useGetPollMatchByUserId";
import { useNavigate } from "react-router-dom";
import { RoundLoading } from "../common/roundLoading";

export const MatchPolling = (userId, setRenderMatching) => {
  const navigate = useNavigate();
  const {
    data: foundMatch,
    isLoading,
    setShouldFetch,
  } = useGetPollMatchByUserId(userId.userId);

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
      <RoundLoading />
    </div>
  );
};
