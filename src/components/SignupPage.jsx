import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import Signup from "../assets/Signup.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error.code, error.message);
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

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <img src={Signup} alt="Talkmate Logo" className="w-25 h-25" />
          </div>
          <p className="text-xl font-bold">Sign Up</p>
        </div>

        {/* Input Fields with Icons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* First Name */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineUser className="text-gray-400 text-lg" />
            <Input
              type="text"
              placeholder="First Name"
              className="w-full pl-2 outline-none border-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineUser className="text-gray-400 text-lg" />
            <Input
              type="text"
              placeholder="Last Name"
              className="w-full pl-2 outline-none border-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineMail className="text-gray-400 text-lg" />
            <Input
              type="email"
              placeholder="Email ID"
              className="w-full pl-2 outline-none border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Mobile Number */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlinePhone className="text-gray-400 text-lg" />
            <Input
              type="text"
              placeholder="Mobile Number"
              className="w-full pl-2 outline-none border-none"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm w-full col-span-2">
            <FaMapMarkerAlt className="text-gray-400 text-lg" />
            <textarea
              placeholder="Address"
              className="w-full pl-2 outline-none border-none h-20"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Pin Code */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <MdLocationOn className="text-gray-400 text-lg" />
            <Input
              type="text"
              placeholder="Pin Code"
              className="w-full pl-2 outline-none border-none"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          {/* State */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <MdLocationOn className="text-gray-400 text-lg" />
            <select
              className="w-full pl-2 outline-none border-none"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
            <AiOutlineLock className="text-gray-400 text-lg" />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-2 outline-none border-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Sign Up Button */}
        <Button
          className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80 mt-6"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        {/* Already have an account */}
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Login Now
          </a>
        </div>
      </div>
    </div>
  );
}
