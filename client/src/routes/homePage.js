import { Jumbotron } from "../components/Jumbotron";

import { useGetRootData } from "../hooks/api/useGetRootData";

function Example() {
  const { isPending, error, data, isFetching } = useGetRootData();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <Jumbotron />
      <Example />
    </div>
  );
}
