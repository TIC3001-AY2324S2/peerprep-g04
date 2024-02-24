import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetRootData = () => {
  const getRootData = async () => {
    const { data } = await axios.get("http://localhost:3001/test");

    return data;
  };

  return useQuery({ queryKey: ["rootData"], queryFn: getRootData });
};
