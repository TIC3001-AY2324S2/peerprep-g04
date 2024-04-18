import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { RoundLoading } from "../common/roundLoading";
import { useJoinQueue } from "../../hooks/api/match/useJoinQueue";
import { useGetFindMatchByUserId } from "../../hooks/api/match/useGetFindMatchByUserId";
import { AiOutlineLoading } from "react-icons/ai";

export const MatchPolling = ({ userId, formData }) => {
  const navigate = useNavigate();
  const { mutate: joinQueue } = useJoinQueue();
  const [isAnyMatch, setIsAnyMatch] = useState(false);

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
    setIsAnyMatch(true);
    joinQueue({ data: { matchType: "ANY", ...restFormData } });
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <RoundLoading />
        <Button
          color="gray"
          onClick={onSubmit}
          isProcessing={isAnyMatch}
          processingSpinner={
            <AiOutlineLoading className="h-6 w-6 animate-spin" />
          }
        >
          Match with any difficulty
        </Button>
      </div>
    </>
  );
};
