import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import ErrorPage from "./routes/errorPage";
import LoginPage from "./routes/loginPage";
import HomePage from "./routes/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionPage } from "./routes/questionPage";
import ProfilePage from "./routes/profilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
