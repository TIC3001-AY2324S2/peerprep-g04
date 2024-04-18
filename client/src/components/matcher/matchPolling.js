import { useEffect } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { RoundLoading } from "../common/roundLoading";
import { useJoinQueue } from "../../hooks/api/match/useJoinQueue";
import { useGetFindMatchByUserId } from "../../hooks/api/match/useGetFindMatchByUserId";

export const MatchPolling = ({ userId, formData }) => {
  const navigate = useNavigate();
  const { mutate: joinQueue } = useJoinQueue();

  const {
    data: isMatched,
    isLoading: isLoadingFindMatched,
    refetch,
  } = useGetFindMatchByUserId(userId);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refetch]);

  const onSubmit = () => {
    const { matchType, ...restFormData } = formData;
    joinQueue({ data: { matchType: "ANY", ...restFormData } });
  };

  return (
    <div>
      <RoundLoading />
      <Button onClick={onSubmit}>Match with any difficulty</Button>
    </div>
  );
};
