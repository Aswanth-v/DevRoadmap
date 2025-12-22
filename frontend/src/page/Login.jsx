import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../redux/AuthSlice";
import Form from "../components/Form";
import { LoginformControlls } from "../utils/FormControlls";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(userLoginAction(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // redirect after login
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deepnavy-900 via-black to-green-600 p-6">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-green-600/30">
        {/* Glow Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-green-500/30 to-transparent opacity-30 blur-xl animate-pulse"></div>

        {/* Header */}
        <div className="relative text-center z-10">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-300 mt-2">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-400 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="relative z-10">
          <Form
            formControls={LoginformControlls}
            buttonText={isLoading ? "Logging in..." : "Login"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />

          {/* Feedback */}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
