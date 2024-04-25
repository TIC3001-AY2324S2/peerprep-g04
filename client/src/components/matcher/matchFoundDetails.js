import { useEffect, useRef } from "react";
import { useGetFindMatchByUserId } from "../../hooks/api/match/useGetFindMatchByUserId";
import { useAuth } from "../common/AuthProvider";
import { Spinner } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDeleteMatch } from "../../hooks/api/match/useDeleteMatch";
import { Button, Badge } from "flowbite-react";

export const MatchFoundDetails = () => {
  const { user } = useAuth();
  const userId = user?.userDetails._id;
  const { data, isLoading } = useGetFindMatchByUserId(user?.userDetails._id);
  const { mutate: deleteMatch } = useDeleteMatch(userId);
  const navigate = useNavigate();
  const renderUserCard = (username) => {
    return (
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10 pt-10">
          <Avatar rounded />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <div class="flex mt-4 md:mt-6"></div>
        </div>
      </div>
    );
  };

  const joinRoom = () => {
    navigate("/collaboration_room");
  };

  if (!isLoading && !data) {
    navigate("/matching");
  } else if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = async () => {
    await deleteMatch(data?.data._id);
    navigate("/");
  };

  return (
    <div>
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row justify-between gap-10">
            {renderUserCard(data?.data?.userOneName)}
            {renderUserCard(data?.data?.userTwoName)}
          </div>
          <Badge>Room Key: {data?.data?.roomKey}</Badge>
          <Badge>Complexity: {data?.data?.complexity}</Badge>
          <div className="flex flex-row justify-end gap-2">
            <Button onClick={joinRoom}>Enter Room</Button>
            <Button onClick={handleDelete}>Leave Match</Button>
          </div>
        </>
      )}
    </div>
  );
};
