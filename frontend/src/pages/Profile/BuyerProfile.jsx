import React from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { ShoppingCart, LogOut, Settings, ShoppingBag, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function BuyerProfile() {
  const { userID } = useParams(); // Get buyerID from the URL

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const dashboardItems = [
    {
      title: "Recent Orders",
      icon: ShoppingBag,
      description: "Track your purchases and order history",
    },
    {
      title: "Account Details",
      icon: User,
      description: "Update your personal information and preferences",
    },
    {
      title: "Upcoming Deliveries",
      icon: Calendar,
      description: "Check status of crops you've purchased",
    },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-[#FEFAE0]/30 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="bg-[#606C38] rounded-t-2xl px-8 py-12 text-center shadow-lg"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.3 
            }}
            className="w-24 h-24 bg-[#FEFAE0] rounded-full flex justify-center items-center mx-auto mb-6 shadow-md"
          >
            <ShoppingCart className="w-12 h-12 text-[#283618]" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-[#FEFAE0] mb-3">
            Buyer Dashboard
          </h2>
          <motion.div 
            className="h-1 w-24 bg-[#DDA15E] mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <span className="text-[#FEFAE0]/80 bg-[#283618]/30 px-3 py-1 rounded-full text-sm">
            ID: {userID}
          </span>
        </motion.div>

        {/* Profile Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-b-2xl p-8 shadow-lg"
        >
          <div className="space-y-8">
            {dashboardItems.map((item, index) => (
              <motion.div 
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#606C38]/10 flex items-center justify-center group-hover:bg-[#606C38]/20 transition-colors">
                    <item.icon className="w-5 h-5 text-[#606C38]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#283618]">
                    {item.title}
                  </h3>
                </div>
                
                <div className="ml-14 p-4 bg-[#FEFAE0] rounded-lg border-l-4 border-[#DDA15E]">
                  <p className="text-[#606C38]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-[#DDA15E]/20"
          >
            <motion.button 
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg shadow-md font-medium"
              whileHover={{ scale: 1.03, backgroundColor: "#283618" }}
              whileTap={{ scale: 0.97 }}
            >
              <Settings className="w-5 h-5" />
              Account Settings
            </motion.button>
            <motion.button
              onClick={handleSignOut}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#BC6C25] text-[#FEFAE0] rounded-lg shadow-md font-medium"
              whileHover={{ scale: 1.03, backgroundColor: "#9c5a1d" }}
              whileTap={{ scale: 0.97 }}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
