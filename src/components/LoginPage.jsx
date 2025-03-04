import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import googlelogo from "../assets/googlelogo.png";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const auth = getAuth();

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        if (keepSignedIn) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        Navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setEmailError("Invalid email format");
        } else if (error.code === "auth/user-not-found") {
          setEmailError("No user found with this email");
        } else if (error.code === "auth/wrong-password") {
          setPasswordError("Incorrect password");
        } else {
          setEmailError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="fixed inset-0 flex w-full h-full">
      <div className="absolute top-[-500px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-br from-[#FF90C6] to-[#002aff] rounded-full"></div>
      <div className="absolute bottom-[-160px] right-[-350px] w-[400px] h-[400px] bg-gradient-to-bl from-[#b6c4ff61] to-[#ff9ecdd9] rounded-full"></div>

      {/* Left Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img src={illustration} alt="Illustration" className="w-3/4" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 p-50 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Talkmate Logo" className="w-23 h-20" />
            <h2 className="text-3xl font-semibold">Talkmate</h2>
          </div>
          <p className="text-xl font-bold">Login</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mt-6">
          <div className="flex flex-col">
            <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
              <AiOutlineMail className="text-gray-400 text-lg" />
              <Input
                type="email"
                placeholder="Email"
                className="w-full pl-2 outline-none border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
              <AiOutlineLock className="text-gray-400 text-lg" />
              <Input
                type="password"
                placeholder="Password"
                className="w-full pl-2 outline-none border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center text-sm space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="cursor-pointer"
              value={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <label htmlFor="remember" className="text-gray-600">
              Keep me signed in
            </label>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-black-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>

        {/* Or Login with */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">Or Login with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="p-4 rounded-lg border border-gray-300 bg-white flex items-center justify-center w-25 h-12 hover:shadow-lg">
            <FaFacebook className="text-blue-600 text-2xl" />
          </button>
          <button className="p-4 rounded-lg border border-gray-300 bg-white flex items-center justify-center w-24 h-12 hover:shadow-lg">
            <img src={googlelogo} alt="Google" className="w-6 h-6" />
          </button>

          <button className="p-4 rounded-lg border border-gray-300 bg-white flex items-center justify-center w-25 h-12 hover:shadow-lg">
            <FaApple className="text-black text-2xl" />
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
