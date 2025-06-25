import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    const success = await login(
      currentState === "Sign Up" ? "signup" : "login",
      {
        fullName,
        email,
        password,
        bio,
      }
    );

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* left */}
      <img src={assets.logo} alt="Logo" className="max-w-40" />
      {/* right */}
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>
        {currentState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="p-2. border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        {currentState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself..."
          ></textarea>
        )}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-blue-500 to-navy-400 text-white rounded-md cursor-pointer hover:opacity-90 transition-opacity duration-300"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Sign Up" && !isDataSubmitted && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" required />
            <p>Agreed to terms and conditions</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-400">
              Already have an account?
              <span
                className="font-medium text-blue-400 cursor-pointer"
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
              >
                Login Now
              </span>
            </p>
          ) : (
            <p
              className="text-sm 
            text-gray-400"
            >
              Don't have an account?
              <span
                className="font-medium text-blue-400 cursor-pointer"
                onClick={() => {
                  setCurrentState("Sign Up");
                  setIsDataSubmitted(false);
                }}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
