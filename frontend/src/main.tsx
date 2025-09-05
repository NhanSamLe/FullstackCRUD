import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/user.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";

// Khai báo routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Trang chính
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

// Render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>
);
