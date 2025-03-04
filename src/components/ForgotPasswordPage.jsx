import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebaseConfig"; // Firebase configuration import

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for the password reset link.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex w-full h-full">
      {/* Background Shapes */}
      <div className="absolute top-[-500px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-br from-[#FF90C6] to-[#002aff] rounded-full"></div>
      <div className="absolute bottom-[-160px] right-[-350px] w-[400px] h-[400px] bg-gradient-to-bl from-[#b6c4ff61] to-[#ff9ecdd9] rounded-full"></div>

      {/* Left Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img src={illustration} alt="Illustration" className="w-3/4" />
      </div>

      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <img src={logo} alt="Talkmate Logo" className="w-23 h-20" />
            <h2 className="text-3xl font-semibold">Talkmate</h2>
          </div>
          <p className="text-xl font-bold">Forgot Password</p>
        </div>

        {/* Input Field */}
        <div className="space-y-6 mt-6">
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineMail className="text-gray-400 text-lg" />
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-2 outline-none border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Reset Password Button */}
          <div className="mt-4">
            <Button
              className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80"
              onClick={handleResetPassword}
            >
              Send Reset Link
            </Button>
          </div>

          {/* Display Success/Error Messages */}
          {message && (
            <p className="text-center text-green-500 text-sm mt-4">{message}</p>
          )}
          {error && (
            <p className="text-center text-red-500 text-sm mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
