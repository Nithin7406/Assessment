import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Menu, X } from "lucide-react"; // For mobile menu
import Icon from "../assets/icon.png";
import MovingForword from "../assets/MovingForword.png";
import NotificationPanel from "../assets/NotificationPanel.png";
import LoginCard from "../assets/LoginCard.png";
import StatsCard from "../assets/StatsCard.png";
import PolicyForm from "../assets/PolicyForm.png";
import Page3 from "../assets/page 3.png";
import Page4 from "../assets/page 4.png";
import Page5 from "../assets/page 5.png";

export default function HomePage({ user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Reload to clear any cached user data
  };

  const onSignup = () => {
    localStorage.removeItem("user");
    navigate("/signup");
    window.location.reload();
  };

  const onLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-4 shadow-sm bg-white relative">
        <div className="flex items-center space-x-2">
          <img src={Icon} alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-semibold text-gray-800">
            Leave<span className="text-blue-600">Tracker</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-600">
          <Link to="/" className="hover:text-blue-600">
            Features
          </Link>
          <Link to="/" className="hover:text-blue-600">
            Contact
          </Link>
          <Link
            to="/"
            className="text-blue-600 font-medium border-b-2 border-blue-600"
          >
            Price
          </Link>
        </div>

        {/* Desktop Login/Logout Button */}
        <div className="hidden md:block">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            onClick={user ? onLogout : onLogin}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <div className="flex flex-col items-center space-y-4 py-4 text-gray-600">
            <Link
              to="/"
              className="hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/"
              className="hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/"
              className="text-blue-600 font-medium border-b-2 border-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Price
            </Link>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              onClick={() => {
                setIsOpen(false);
                user ? onLogout() : onLogin();
              }}
            >
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 space-y-10 md:space-y-0">
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">Our Future Works</h1>
          <p className="text-gray-600 mt-4">
            LeaveTracker Team Will Be Working On A New Module Called{" "}
            <strong>EOD</strong>.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
              <span>Sign up now</span> <AiOutlineArrowRight />
            </Button>
            <Button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg">
              Contact us
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={MovingForword}
            alt="Future Works Illustration"
            className="w-full max-w-md object-contain"
          />
        </div>
      </section>

      {/* Hero Section 2 */}
      <section className="py-16 flex justify-center">
        <div className="bg-gray-50 px-6 md:px-15 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
            <div className="max-w-lg text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                Access the application at an ease
              </h1>
              <p className="text-gray-600 mt-4">
                Organize and track teams' vacations on one centralized platform
                and instantly find what you need.
              </p>
              <div className="flex justify-center md:justify-start mt-6">
                <Button className="bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2">
                  <span>Get Started</span> <AiOutlineArrowRight />
                </Button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] gap-6 p-6">
              <img
                src={NotificationPanel}
                alt="Notifications"
                className="w-40 sm:w-56 mx-auto"
              />
              <img
                src={LoginCard}
                alt="Login Card"
                className="w-44 sm:w-64 mx-auto"
              />
              <img
                src={StatsCard}
                alt="Stats"
                className="w-44 sm:w-64 mx-auto"
              />
              <img
                src={PolicyForm}
                alt="Policy Form"
                className="w-44 sm:w-64 mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-16 flex justify-center">
        <img
          src={Page3}
          alt="Walkthrough"
          className="w-full max-w-4xl object-contain"
        />
      </section>

      <section className="py-20 flex justify-center">
        <img
          src={Page4}
          alt="Integration Banner"
          className="w-full max-w-7xl object-contain cursor-pointer"
          onClick={onSignup}
        />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 flex justify-center">
        <img
          src={Page5}
          alt="Footer Section"
          className="w-full max-w-6xl object-contain"
        />
      </footer>
    </div>
  );
}
