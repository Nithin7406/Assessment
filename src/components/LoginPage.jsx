import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock, AiOutlinePhone } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import googlelogo from "../assets/googlelogo.png";

export default function LoginPage({ setUser }) {
  const [identifier, setIdentifier] = useState(""); // Can be email or phone
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  const auth = getAuth();

  // Email & Phone Number Validation
  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isPhone = (input) => /^\+?\d{10,15}$/.test(input); // Simple phone validation

  const generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
  };

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!identifier) {
      setEmailError("Email or phone number is required");
      return;
    }

    if (isEmail(identifier)) {
      signInWithEmailAndPassword(auth, identifier, password)
        .then((userCredential) => {
          const user = userCredential.user;
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
    } else if (isPhone(identifier)) {
      setIsPhoneLogin(true);
      const randomOtp = generateRandomOTP();
      setGeneratedOtp(randomOtp);
      alert(`Your OTP is: ${randomOtp}`); // Shows OTP in an alert
    } else {
      setEmailError("Invalid email or phone number format.");
    }
  };

  const verifyOTP = () => {
    if (otp === generatedOtp) {
      alert("Login Successful!");
      setUser({ phone: identifier });
      Navigate("/");
    } else {
      setEmailError("Invalid OTP. Please try again.");
    }
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
              {isPhone(identifier) ? (
                <AiOutlinePhone className="text-gray-400 text-lg" />
              ) : (
                <AiOutlineMail className="text-gray-400 text-lg" />
              )}
              <Input
                type="text"
                placeholder="Email or Phone"
                className="w-full pl-2 outline-none border-none"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {!isPhoneLogin && (
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
          )}

          {isPhoneLogin && (
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="Enter OTP"
                className="w-full pl-2 outline-none border-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button className="mt-2 w-full" onClick={verifyOTP}>
                Verify OTP
              </Button>
            </div>
          )}

          {/* Keep me signed in */}
          <div className="flex items-center text-sm space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="cursor-pointer"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <label htmlFor="remember" className="text-gray-600">
              Keep me signed in
            </label>
          </div>

          {/* Login Button */}
          {!isPhoneLogin && (
            <Button
              className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
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
