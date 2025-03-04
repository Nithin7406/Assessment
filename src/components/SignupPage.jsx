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
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import Signup from "../assets/Signup.png";

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
  const [error, setError] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobileNumber ||
      !address ||
      !pinCode ||
      !state ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Mobile number must be 10 digits.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        pinCode,
        state,
        createdAt: new Date(),
      });

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName.split(" ")[0] || "",
        lastName: user.displayName.split(" ")[1] || "",
        email: user.email,
        mobileNumber: user.phoneNumber || "",
        address: "",
        pinCode: "",
        state: "",
        createdAt: new Date(),
      });

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError(error.message);
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

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <img src={Signup} alt="Talkmate Logo" className="w-25 h-25" />
          </div>
          <p className="text-xl font-bold">Sign Up</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Input Fields with Icons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <InputField
            icon={<AiOutlineUser />}
            placeholder="First Name"
            value={firstName}
            setValue={setFirstName}
          />
          <InputField
            icon={<AiOutlineUser />}
            placeholder="Last Name"
            value={lastName}
            setValue={setLastName}
          />
          <InputField
            icon={<AiOutlineMail />}
            type="email"
            placeholder="Email"
            value={email}
            setValue={setEmail}
          />
          <InputField
            icon={<AiOutlinePhone />}
            placeholder="Mobile Number"
            value={mobileNumber}
            setValue={setMobileNumber}
          />
          <InputField
            icon={<FaMapMarkerAlt />}
            placeholder="Address"
            value={address}
            setValue={setAddress}
            isTextarea
          />
          <InputField
            icon={<MdLocationOn />}
            placeholder="Pin Code"
            value={pinCode}
            setValue={setPinCode}
          />
          <SelectField value={state} setValue={setState} />
          <InputField
            icon={<AiOutlineLock />}
            type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
          <InputField
            icon={<AiOutlineLock />}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>

        {/* Sign Up Button */}
        <Button
          className="w-full bg-gradient-to-b from-[#ff90c69e] to-[#3153FF] text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80 mt-6"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        {/* Google Sign-Up */}
        {/* <Button
          className="w-full bg-red-500 text-white py-2 rounded-lg text-lg font-medium transition-all hover:opacity-80 mt-4"
          onClick={handleGoogleSignUp}
        >
          Sign Up with Google
        </Button> */}

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

function InputField({
  icon,
  type = "text",
  placeholder,
  value,
  setValue,
  isTextarea,
}) {
  return (
    <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm w-full">
      {icon}
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          className="w-full pl-2 outline-none border-none h-20"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          className="w-full pl-2 outline-none border-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}

function SelectField({ value, setValue }) {
  return (
    <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm">
      <MdLocationOn className="text-gray-400 text-lg" />
      <select
        className="w-full pl-2 outline-none border-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">Select State</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
      </select>
    </div>
  );
}
