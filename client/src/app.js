import "./styles/input.css";
import { NavBar } from "./components/common/NavBar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/common/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavBar />
        <div className="flex justify-center min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
