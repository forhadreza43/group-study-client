import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return hasUpper && hasLower && minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = form;

    if (!validatePassword(password)) {
      toast.error(
        "Password must include uppercase, lowercase and 6+ characters."
      );
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 shadow-md rounded-lg bg-purple-100 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            value={form.photoURL}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
