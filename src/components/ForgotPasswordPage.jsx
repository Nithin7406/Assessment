import { AiOutlineLock } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset successfully!");
  };

  return (
    <div className="fixed inset-0 flex w-full h-full">
      <div className="absolute top-[-500px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-br from-[#FF90C6] to-[#002aff] rounded-full"></div>
      <div className="absolute bottom-[-160px] right-[-350px] w-[400px] h-[400px] bg-gradient-to-bl from-[#b6c4ff61] to-[#ff9ecdd9] rounded-full"></div>

      {/* Left Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img src={illustration} alt="Illustration" className="w-3/4" />
      </div>

      <div className="w-full md:w-1/2 p-50 flex flex-col justify-center">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <img src={logo} alt="Talkmate Logo" className="w-23 h-20" />
            <h2 className="text-3xl font-semibold">Talkmate</h2>
          </div>
          <p className="text-xl font-bold">Forgot Password</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-9 mt-10">
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineLock className="text-gray-400 text-lg" />
            <Input
              type="password"
              placeholder="Enter New Password"
              className="w-full pl-2 outline-none border-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineLock className="text-gray-400 text-lg" />
            <Input
              type="password"
              placeholder="Re-enter New Password"
              className="w-full pl-2 outline-none border-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Reset Password Button */}
          <div className="mt-4">
            <Button
              className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80"
              onClick={handleResetPassword}
            >
              Password Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
