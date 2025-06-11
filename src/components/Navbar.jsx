import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          📘 GroupStudy
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base font-medium">
          <li>
            <NavLink to="/assignments">Assignments</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/pending">Pending Assignments</NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
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
                  <NavLink to="/myAssignments">My Attempted Assignments</NavLink>
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
  );
};

export default Navbar;
