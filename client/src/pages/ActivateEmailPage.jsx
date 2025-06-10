import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { activateEmail, reset } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";

const ActivateEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(activateEmail(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
      navigate("/signin");
    }

    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      navigate("/signin");
    }
  }, [isError, isSuccess, message, dispatch, navigate]);

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner text-success loading-lg mb-4"></span>
            <p className="text-gray-600">Activating your email...</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Activation
            </h2>
            <p className="text-gray-600">
              Please wait while we activate your email...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ActivateEmailPage; 