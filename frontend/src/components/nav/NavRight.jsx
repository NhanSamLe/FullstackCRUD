import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import DropdownMenu from "./DropdownMenu";

const NavRight = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      user: { email: "", name: "" },
    });
    navigate("/");
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
      >
        <span>
          Welcome {auth?.isAuthenticated ? auth.user?.name : "Guest"}
        </span>
        <svg
          className={`w-4 h-4 transform transition ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <DropdownMenu
          isAuthenticated={auth?.isAuthenticated}
          user={auth?.user}
          onLogout={handleLogout}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default NavRight;
