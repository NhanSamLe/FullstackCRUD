import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth.context";
import { AuthContext } from "../context/auth.context";  

const NavLeft = () => {
  const { auth } = useContext(AuthContext);
  const [current, setCurrent] = useState("home");

  return (
    <ul className="flex space-x-6">
      <li>
        <Link
          to="/"
          onClick={() => setCurrent("home")}
          className={`${
            current === "home" ? "text-blue-400" : "text-white"
          } hover:text-blue-400 transition`}
        >
          Home
        </Link>
      </li>
      {auth?.isAuthenticated && (
        <li>
          <Link
            to="/profile"
            onClick={() => setCurrent("profile")}
            className={`${
              current === "profile" ? "text-blue-400" : "text-white"
            } hover:text-blue-400 transition`}
          >
            Profile
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLeft;
