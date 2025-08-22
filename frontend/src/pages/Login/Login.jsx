import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../../firebaseFunctions/firebaseConfig"; // Import Firestore
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom"; // Import the navigate hook
import { Farmer } from "../../../firebaseFunctions/cropFarmer";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [category, setCategory] = useState(""); // Track category selection
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || (isSignUp && !category)) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      if (isSignUp) {
        // Sign up with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (category === "farmer") {
          const farmer = new Farmer(email);
          farmer.addFarmer();
        }

        toast.success("Sign-up successful!", {
          onClose: () => navigate("/"), // Navigate after the toast disappears
        });
      } else {
        // Login with Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!", {
          onClose: () => navigate("/"), // Navigate after the toast disappears
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 50
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Left Side */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-[#FEFAE0]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#283618] mb-5">
            Welcome to <span className="text-[#606C38]">BharathHarvest</span>
          </h1>
          <p className="text-lg text-[#283618]/80 leading-relaxed">
            Empowering farmers with tools and resources to make farming smarter
            and easier. Log in to explore your dashboard and stay connected.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="w-16 h-16 bg-[#DDA15E]/20 rounded-full flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
          >
            <FontAwesomeIcon
              icon={faSeedling}
              className="text-3xl text-[#606C38]"
            />
          </motion.div>
          <span className="text-xl font-medium text-[#606C38]">
            Let's Grow Together
          </span>
        </motion.div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#283618] text-[#FEFAE0] p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold mb-8"
            variants={itemVariants}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </motion.h2>

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-md bg-[#FEFAE0]/10 text-[#FEFAE0] focus:ring-2 focus:ring-[#DDA15E] outline-none border border-[#FEFAE0]/20 transition-all duration-300"
                placeholder="example@domain.com"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-lg font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-md bg-[#FEFAE0]/10 text-[#FEFAE0] focus:ring-2 focus:ring-[#DDA15E] outline-none border border-[#FEFAE0]/20 transition-all duration-300"
                placeholder="Enter your password"
              />
            </motion.div>

            {/* Category Input (Only shown for sign-up) */}
            {isSignUp && (
              <motion.div variants={itemVariants}>
                <label className="block text-lg font-medium mb-3">
                  Category
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="category"
                        value="farmer"
                        checked={category === "farmer"}
                        onChange={() => setCategory("farmer")}
                        className="opacity-0 absolute w-0 h-0"
                      />
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${category === "farmer" ? "border-[#DDA15E]" : "border-[#FEFAE0]/50 group-hover:border-[#FEFAE0]"}`}>
                        {category === "farmer" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-[#DDA15E] rounded-full"
                          />
                        )}
                      </div>
                    </div>
                    <span>Farmer</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="category"
                        value="buyer"
                        checked={category === "buyer"}
                        onChange={() => setCategory("buyer")}
                        className="opacity-0 absolute w-0 h-0"
                      />
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${category === "buyer" ? "border-[#DDA15E]" : "border-[#FEFAE0]/50 group-hover:border-[#FEFAE0]"}`}>
                        {category === "buyer" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-[#DDA15E] rounded-full"
                          />
                        )}
                      </div>
                    </div>
                    <span>Buyer</span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Remember Me & Forgot Password (Only shown for login) */}
            {!isSignUp && (
              <motion.div 
                variants={itemVariants}
                className="flex justify-between items-center text-sm"
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-[#FEFAE0]/50 rounded group-hover:border-[#FEFAE0] transition-colors">
                    <input type="checkbox" className="hidden" />
                  </div>
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#DDA15E] hover:text-[#BC6C25] transition-colors">
                  Forgot Password?
                </a>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-3 bg-[#606C38] hover:bg-[#4d5a27] rounded-md text-lg font-medium transition-all duration-300 mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </motion.button>
          </form>

          {/* Toggle Sign Up / Log In */}
          <motion.p 
            className="text-center mt-8 text-[#FEFAE0]/80"
            variants={itemVariants}
          >
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <motion.button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#DDA15E] font-medium hover:text-[#BC6C25] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </motion.button>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
