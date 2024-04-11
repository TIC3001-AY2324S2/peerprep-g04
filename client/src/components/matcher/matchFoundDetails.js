import { useEffect } from "react";
import { useGetFoundMatchByUserId } from "../../hooks/api/match/useGetFoundMatch";
import { useAuth } from "../common/AuthProvider";

export const MatchFoundDetails = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetFoundMatchByUserId(user.userDetails._id);

  // Ensure user and userDetails are defined
  if (!user || !user.userDetails) {
    return null; // or return a loading spinner
  }

  return (
    <div>
      <h1>Match Found Page</h1>
      <pre> {JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
