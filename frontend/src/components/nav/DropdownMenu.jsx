import React from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ isAuthenticated, user, onLogout, onClose }) => {
  return (
    <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg">
      {isAuthenticated ? (
        <li>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <Link
            to="/login"
            onClick={onClose}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Login
          </Link>
        </li>
      )}
    </ul>
  );
};

export default DropdownMenu;
