import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import ErrorPage from "./routes/errorPage";
import HomePage from "./routes/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionPage } from "./routes/questionPage";
import QuestionDetailsPage from "./routes/questionDetailsPage";

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
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/question/:id",
        element: <QuestionDetailsPage />,
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
