import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/login";
import { Layout } from "./pages/layout";
import Dashboard from "./pages/dashboard/page";
import AuthProvider from "./components/context/AuthProvider";
import Signup from "./pages/signup";
import Error from "./pages/error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthProvider>
            <App />
          </AuthProvider>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthProvider>
            <Login />
          </AuthProvider>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthProvider>
            <Signup />
          </AuthProvider>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
