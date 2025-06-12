import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-purple-100 shadow-md dark:bg-gray-900">
      <div className="navbar w-11/12 max-w-7xl mx-auto">
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold text-primary">
            📘 Study Together
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-900 dark:text-white font-medium">
            <li>
              <NavLink to="/assignments">Assignments</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/pendingAssignments">Pending Assignments</NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end">
          <button
            onClick={() => setIsDark(!isDark)}
            className="btn btn-sm btn-ghost relative mr-10 rounded-full"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {!user ? (
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName || "User"}
              >
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="user profile" />
                  </div>
                </button>
              </div>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-52 p-2 shadow bg-base-200 rounded-box z-50 menu menu-sm">
                  <li>
                    <NavLink to="/createAssignment">Create Assignment</NavLink>
                  </li>
                  <li>
                    <NavLink to="/mySubmittedAssignments">
                      My Attempted Assignments
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
