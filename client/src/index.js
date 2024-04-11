import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import ErrorPage from "./routes/errorPage";
import LoginPage from "./routes/loginPage";
import HomePage from "./routes/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionPage } from "./routes/questionPage";
import ProfilePage from "./routes/profilePage";
import RegisterPage from "./routes/registerPage";
import QuestionDetailsPage from "./routes/questionDetailsPage";
import MatchingPage from "./routes/matchingPage";
import { MatchFoundDetails } from "./components/matcher/matchFoundDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/question/:id",
        element: <QuestionDetailsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/matching",
        element: <MatchingPage />,
      },
      {
        path: "/matchDetails",
        element: <MatchFoundDetails />,
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
