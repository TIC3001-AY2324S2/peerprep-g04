import { useEffect } from "react";
import { Button } from "flowbite-react";
import { useGetPollMatchByUserId } from "../../hooks/api/match/useGetPollMatchByUserId";
import { useNavigate } from "react-router-dom";
import { RoundLoading } from "../common/roundLoading";
import { useJoinQueue } from "../../hooks/api/match/useJoinQueue";

export const MatchPolling = ({ userId, formData }) => {
  const navigate = useNavigate();
  const {
    data: foundMatch,
    isLoading,
    setShouldFetch,
  } = useGetPollMatchByUserId(userId.userId);

  const { mutate: joinQueue } = useJoinQueue();

  const onSubmit = () => {
    const { matchType, ...restFormData } = formData;
    joinQueue({ data: { matchType: "ANY", ...restFormData } });
  };

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
      <Button onClick={onSubmit}>Match with any difficulty</Button>
    </div>
  );
};
