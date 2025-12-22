import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/AuthSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  return (
    <div className="w-full bg-transparent sticky top-0 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-end items-center p-4">

        {user ? (
          <button
            onClick={() => dispatch(logout())}
            className="px-5 py-2 rounded-full border border-red-400 text-red-400 font-semibold bg-transparent transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.7)] hover:border-red-500 hover:text-red-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = '/login')}
            className="px-5 py-2 rounded-full border border-green-400 text-green-400 font-semibold bg-transparent transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(16,185,129,0.7)] hover:border-green-500 hover:text-green-300"
          >
            Login
          </button>
        )}

      </div>
    </div>
  );
};

export default TopBar;
