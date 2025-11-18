import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/authService";
import { validateSignup } from "../utils/validation";
import Input from "../components/common/input";
import Button from "../components/common/button";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate inputs
    const validationErrors = validateSignup(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      // 2. Submit to Backend
      // FIX: We send 'username' here because your Backend User model expects 'username'
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Welcome to Athlos!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      // Handle server errors (e.g., "User already exists")
      setErrors({
        server:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          CREATE ACCOUNT
        </h2>

        {errors.server && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm text-center">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <div className="mt-6">
            <Button type="submit" isLoading={isLoading} variant="primary">
              SIGN UP
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Login here
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
