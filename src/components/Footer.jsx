import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-100 w-full dark:bg-gray-900  text-gray-700 dark:text-gray-400">
      <div className="max-w-7xl w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand Info */}
        <div>
          <Link to="/" className="text-2xl text-blue-700 dark:text-blue-500 font-bold flex items-center">
            <img src="./study.svg" alt="" className="w-9 mr-2 mb-1" />
            StudyTogether
          </Link>
          <p className="mt-2 text-sm">
            Empowering collaborative learning through assignments, feedback, and
            knowledge sharing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/assignments" className="link link-hover">
                Assignments
              </Link>
            </li>
            <li>
              <Link to="/createAssignment" className="link link-hover">
                Create Assignment
              </Link>
            </li>
            <li>
              <Link to="/myAssignments" className="link link-hover">
                My Attempts
              </Link>
            </li>
            <li>
              <Link to="/pending" className="link link-hover">
                Pending Evaluation
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title">Connect</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-circle btn-outline"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-circle btn-outline"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-circle btn-outline"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-sm mt-4">
            © {new Date().getFullYear()} StudyTogether Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
