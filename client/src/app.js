import "./styles/input.css";
import { NavBar } from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
