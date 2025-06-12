import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hook/useAuth";

export default function Login() {
  const { signIn, googleSignIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await signIn(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to login");
      setFormLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormLoading(true);
    try {
      await googleSignIn();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed");
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-purple-100 dark:bg-gray-900 shadow-lg rounded-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-700">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full input-field"
              disabled={formLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="input input-bordered w-full input-field"
              disabled={formLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${formLoading ? "loading" : ""}`}
            disabled={formLoading}
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className={`btn btn-outline dark:bg-blue-100 w-full flex justify-center items-center gap-3 mx-auto ${
            formLoading ? "loading" : ""
          }`}
          disabled={formLoading}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.3-1.5-34-4.5-50.4H272v95.6h146.9c-6.3 34-25.7 62.9-54.8 82.2v68h88.4c51.7-47.7 81.6-118 81.6-195.4z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c73.7 0 135.6-24.4 180.8-66.1l-88.4-68c-24.4 16.3-56 26-92.4 26-71 0-131.1-47.8-152.7-112.1H28.4v70.4c45 89.1 137.3 149.7 243.6 149.7z"
              fill="#34a853"
            />
            <path
              d="M119.3 320.1c-10.6-31.8-10.6-66.1 0-97.9V151.8H28.4c-40.7 79.5-40.7 174.2 0 253.7l90.9-70.4z"
              fill="#fbbc04"
            />
            <path
              d="M272 107.7c39.8 0 75.6 13.7 103.7 40.6l77.9-77.9C408 23.6 346.2 0 272 0 165.7 0 73.4 60.6 28.4 151.8l90.9 70.4c21.6-64.3 81.7-112.1 152.7-112.1z"
              fill="#ea4335"
            />
          </svg>
          <span>Login with Google</span>
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
