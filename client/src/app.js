import "./styles/input.css";
import { NavBar } from "./components/common/NavBar";
import { Outlet } from "react-router-dom";
import { CustomFooter } from "./components/common/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow justify-center">
          <Outlet />
        </div>
        <div className="mt-5">
          <CustomFooter />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
