import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-900">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-200 hover:scale-110">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-200 mt-2">
                Create Account
              </h1>
              <p className="text-gray-400">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center transition-opacity duration-300 hover:opacity-80"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-500" />
                  ) : (
                    <Eye className="size-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-transform duration-200 hover:scale-105"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Animated Background */}
      <div className="relative hidden lg:flex items-center justify-center">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-900 opacity-50 animate-gradient"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
