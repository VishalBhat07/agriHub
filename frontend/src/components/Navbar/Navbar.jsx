import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/new_logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

// Logo component with updated styling
const Logo = () => (
  <motion.div 
    className="flex items-center space-x-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img src={logo} alt="logo" className="h-10 w-auto" />
    <div className="font-bold flex">
      <motion.span 
        className="text-[#BC6C25] text-3xl" 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Bharath
      </motion.span>
      <motion.span 
        className="text-[#606C38] text-3xl" 
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Harvest
      </motion.span>
    </div>
  </motion.div>
);

const Navbar = ({ farmer }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      toast.success("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Error signing out!");
    }
  };

  const getUsername = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  const navItems = [
    { path: "/marketplace", label: "Market Place" },
    { path: "/learn", label: "Learning Resources" },
    { path: "/schemes", label: "Government Schemes" },
    { path: "/about", label: "About us" },
    { path: "/contact", label: "Contact us" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -5 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <nav className="bg-[#FEFAE0] shadow-md">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="cursor-pointer" 
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Logo />
          </motion.div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#283618] p-2 hover:text-[#606C38]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-[#283618] hover:text-[#606C38] transition-colors relative py-2"
                custom={i}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#606C38]"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}

            {user ? (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer text-[#283618] bg-[#DDA15E] bg-opacity-20 px-4 py-2 rounded-full"
                  whileHover={{ backgroundColor: "rgba(221, 161, 94, 0.3)" }}
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <FaUserCircle className="text-xl text-[#BC6C25]" />
                  <span className="font-medium">{getUsername(user.email)}</span>
                  <motion.span 
                    animate={{ rotate: dropdownVisible ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </motion.div>

                <AnimatePresence>
                  {dropdownVisible && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        className="block w-full text-left px-4 py-2 text-[#283618] hover:bg-[#FEFAE0]"
                        whileHover={{ x: 5 }}
                        onClick={() =>
                          navigate(
                            farmer
                              ? `/profile/${farmer.farmerID}`
                              : `/profile/${user.uid}`
                          )
                        }
                      >
                        My Profile
                      </motion.button>
                      <motion.button
                        className="block w-full text-left px-4 py-2 text-[#283618] hover:bg-[#FEFAE0]"
                        whileHover={{ x: 5 }}
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.button
                onClick={() => navigate("/login")}
                className="bg-[#606C38] text-[#FEFAE0] px-5 py-2 rounded-full hover:bg-[#283618] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sign in
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden border-t border-[#DDA15E]/20"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-[#283618] hover:bg-[#DDA15E]/10 rounded-md"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {user ? (
                  <>
                    <motion.button
                      onClick={() => {
                        navigate(`/profile/${user.uid}`);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-[#283618] hover:bg-[#DDA15E]/10 rounded-md"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      My Profile
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-[#283618] hover:bg-[#DDA15E]/10 rounded-md"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-center px-3 py-2 text-[#FEFAE0] bg-[#606C38] hover:bg-[#283618] rounded-md mt-3"
                    variants={itemVariants}
                  >
                    Sign in
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;