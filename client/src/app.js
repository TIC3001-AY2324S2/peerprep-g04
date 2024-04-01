import "./styles/input.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow justify-center">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
