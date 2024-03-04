import "./styles/input.css";
import { NavBar } from "./components/common/NavBar";
import { Outlet } from "react-router-dom";
import { CustomFooter } from "./components/common/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/common/AuthProvider";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore.js";

const queryClient = new QueryClient();
const persistor = persistStore(store);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-grow justify-center">
              <Outlet />
            </div>
            <div className="mt-5">
              <CustomFooter />
            </div>
          </div>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
