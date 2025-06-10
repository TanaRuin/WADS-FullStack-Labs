import React, { useEffect } from "react";
import LogoImg from "../assets/logo.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserInfo } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedOut } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !isLoggedOut) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user, isLoggedOut]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  return (
    <nav className="flex w-full justify-between items-center bg-green-100 shadow-md py-3 px-10">
      {/* Logo */}
      <a href="/">
        <div className="flex gap-1 justify-center items-center cursor-pointer">
          <img src={LogoImg} alt="logo-image" className="h-6 w-6" />
          <p className="text-lg font-semibold text-green-600 hover:text-green-700 transition ease-in-out">
            ToDoSome
          </p>
        </div>
      </a>

      {/* Navigation Menu */}
      <div className="flex gap-6 justify-center items-center text-green-900 font-semibold">
        <a href="#" className="text-sm">
          My ToDo
        </a>
        {user && !isLoggedOut ? (
          <div className="flex items-center gap-3">
            {user.user_image ? (
              <img
                src={user.user_image}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm py-2 px-4 rounded-md hover:bg-red-500 transition ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <a
              href="/signup"
              className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
            >
              Sign Up
            </a>
            <a
              href="/signin"
              className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
