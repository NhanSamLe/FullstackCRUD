import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/user.jsx";
import HomePage from "./pages/home.jsx";
import { AuthWrapper } from "./components/context/auth.wrapper.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // Layout chính có Header
    children: [
      {
        index: true,     // tương đương path: "/"
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,   // Trang login KHÔNG có Header
  },
  {
    path: "/register",
    element: <Register />, // Trang register KHÔNG có Header
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
