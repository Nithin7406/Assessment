import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock, AiOutlinePhone } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import googlelogo from "../assets/googlelogo.png";

export default function LoginPage({ setUser }) {
  const [identifier, setIdentifier] = useState(""); // Email or phone
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  // Validation functions
  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isPhone = (input) => /^\+?\d{10,15}$/.test(input);

  const generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!identifier.trim()) {
      setEmailError("Email or phone number is required");
      return;
    }

    if (isEmail(identifier)) {
      if (!password.trim()) {
        setPasswordError("Password is required");
        return;
      }

      signInWithEmailAndPassword(auth, identifier, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          if (keepSignedIn) {
            localStorage.setItem("user", JSON.stringify(user));
          }
          navigate("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setEmailError("Invalid email format.");
              break;
            case "auth/user-not-found":
              setEmailError("No account found with this email.");
              break;
            case "auth/wrong-password":
              setPasswordError("Incorrect password.");
              break;
            default:
              setEmailError("Login failed. Please try again.");
          }
        });
    } else if (isPhone(identifier)) {
      setOtpSent(true);
      const randomOtp = generateRandomOTP();
      setGeneratedOtp(randomOtp);
      alert(`Your OTP is: ${randomOtp}`); // Simulate sending OTP
    } else {
      setEmailError("Invalid email or phone number format.");
    }
  };

  const verifyOTP = () => {
    if (otp === generatedOtp) {
      alert("Login Successful!");
      setUser({ phone: identifier });
      navigate("/");
    } else {
      setEmailError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex w-full h-full">
      <div className="absolute top-[-500px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-br from-[#FF90C6] to-[#002aff] rounded-full z-0"></div>
      <div className="absolute bottom-[-160px] right-[-350px] w-[400px] h-[400px] bg-gradient-to-bl from-[#b6c4ff61] to-[#ff9ecdd9] rounded-full z-0"></div>
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img src={illustration} alt="Illustration" className="w-3/4" />
      </div>
      <div className="w-full md:w-1/2 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Talkmate Logo" className="w-23 h-20" />
            <h2 className="text-3xl font-semibold">Talkmate</h2>
          </div>
          <p className="text-xl font-bold">Login</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mt-6 max-w-md mx-auto w-full">
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
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setOtpSent(false); // Reset OTP state if user changes input
                }}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {!otpSent && !isPhone(identifier) && (
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

          {otpSent && (
            <div className="flex flex-col">
              <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full pl-2 outline-none border-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium"
                onClick={verifyOTP}
              >
                Verify OTP
              </Button>
            </div>
          )}

          {!otpSent && (
            <Button
              className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium"
              onClick={handleLogin}
            >
              {isPhone(identifier) ? "Send OTP" : "Login"}
            </Button>
          )}
        </div>

        {/* Register & Social Login */}
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Register Now
          </Link>
          {/* Or Login with */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or Login with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="p-4 rounded-lg border border-gray-300 bg-white flex items-center justify-center w-24 h-12 hover:shadow-lg"
              onClick={() => window.open("https://www.facebook.com", "_blank")}
            >
              <FaFacebook className="text-blue-600 text-2xl" />
            </button>

            <button
              className="p-4 rounded-lg border border-gray-300 bg-white flex items-center justify-center w-24 h-12 hover:shadow-lg"
              onClick={() => window.open("https://www.google.com", "_blank")}
            >
              <img src={googlelogo} alt="Google" className="w-6 h-6" />
            </button>

            <button
              className="p-4 rounded-lg border border-gray-300 bg-white flex items-center justify-center w-25 h-12 hover:shadow-lg"
              onClick={() => window.open("https://www.apple.com", "_blank")}
            >
              <FaApple className="text-black text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
