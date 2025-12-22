import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../redux/AuthSlice.js";
import { RegisterformControlls } from "../utils/FormControlls";
import Form from "../components/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  // ✅ Submit registration and handle toast + redirect
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(userRegisterAction(formData));

      // if registration is successful
      if (result?.payload?.success) {
        toast.success(result.payload.message || "Registration successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "colored",
        });

        // redirect to login after delay
        setTimeout(() => navigate("/login"), 2000);
      } else {
        // registration failed (e.g. email already exists)
        toast.error(result?.payload?.message || "Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Server error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deepnavy-900 via-black to-green-600 p-6 relative">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-red-500/30">
        {/* Gradient Border Animation */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-red-600/30 to-transparent opacity-30 blur-xl animate-pulse"></div>

        {/* Header */}
        <div className="relative text-center z-10">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Create Account
          </h1>
          <p className="text-gray-300 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="relative z-10">
          <Form
            formControls={RegisterformControlls}
            buttonText={isLoading ? "Creating..." : "Create Account"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </div>

        {/* Optional status display */}
        <div className="text-center z-10">
          {isLoading && <p className="text-blue-400">Registering...</p>}
        </div>
      </div>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
