import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { Layout } from "./pages/layout";
import Dashboard from "./pages/dashboard/page";
import AuthProvider from "./components/context/AuthProvider";
import Signup from "./pages/signup";
import Error from "./pages/error";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route
          path="/"
          index
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        />

        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthProvider>
              <Signup />
            </AuthProvider>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <Dashboard />
            </AuthProvider>
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
