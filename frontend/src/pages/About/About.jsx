import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faGlobe,
  faUsers,
  faHandHoldingHeart,
  faBook,
  faArrowRight,
  faMedal,
  faChartLine,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import "./About.css";

const teamInfo = [
  {
    name: "Tharunkrishna M",
    role: "Chief Cultivator (Project Lead)",
  },
  {
    name: "V S Sreenivaas",
    role: "Soil Analyst (Backend Developer)",
  },
  {
    name: "Tallam Sri Sai Subramanyam",
    role: "Irrigation Specialist (Frontend Developer)",
  },
];

const Popup = ({ closePopup }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closePopup}
    >
      <motion.div 
        className="bg-[#FEFAE0] rounded-lg shadow-xl p-8 w-full max-w-md relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="absolute top-3 right-3 text-[#283618]/50 hover:text-[#283618] w-8 h-8 flex items-center justify-center rounded-full"
          onClick={closePopup}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(96, 108, 56, 0.1)" }}
          whileTap={{ scale: 0.9 }}
        >
          ✖
        </motion.button>
        <motion.h2 
          className="text-2xl font-bold text-[#606C38] mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Our Team
        </motion.h2>
        <motion.ul 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {teamInfo.map((member, index) => (
            <motion.li 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-sm border border-[#DDA15E]/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 4px 12px rgba(221, 161, 94, 0.2)",
                backgroundColor: "rgba(254, 250, 224, 0.5)"
              }}
            >
              <h3 className="text-lg font-semibold text-[#283618]">{member.name}</h3>
              <p className="text-sm text-[#606C38]">Role: {member.role}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

const LeftSection = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="flex flex-col justify-center p-8 bg-[#FEFAE0] w-full min-h-[90vh] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold text-[#283618] mb-2">
          About <span className="text-[#606C38]">BharathHarvest</span>
        </h1>
        <motion.div 
          className="h-1 w-20 bg-[#DDA15E] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-medium text-[#606C38] mb-4">
          Our Mission and Vision
        </h2>
        <div className="text-lg text-[#283618]/80 leading-relaxed space-y-4">
          <p>
            At BharathHarvest, we believe in transforming agriculture through
            technology and community support. Our mission is to empower farmers
            by providing innovative solutions that bridge information gaps and
            enhance agricultural productivity.
          </p>
          <p>
            We are committed to creating a sustainable ecosystem that supports
            farmers at every step of their journey, from crop planning to market
            access.
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="flex gap-4" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.button
          className="px-6 py-3 bg-[#606C38] text-[#FEFAE0] rounded-md transition-all duration-300"
          whileHover={{ scale: 1.05, backgroundColor: "#4d5a27" }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePopup}
        >
          Meet Our Team
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-transparent text-[#606C38] border-2 border-[#606C38] rounded-md transition-all duration-300"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(96, 108, 56, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isPopupVisible && <Popup closePopup={togglePopup} />}
      </AnimatePresence>
    </div>
  );
};

const RightSection = () => {
  const features = [
    { icon: faGlobe, text: "Global Agricultural Innovation" },
    { icon: faUsers, text: "Community-Driven Approach" },
    { icon: faSeedling, text: "Sustainable Farming Practices" },
    { icon: faBook, text: "Continuous Learning Platform" },
    { icon: faLeaf, text: "Empowering Farmers Worldwide" },
  ];

  return (
    <div className="flex flex-col items-center justify-around p-8 bg-[#283618] w-full min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-12"
      >
        <motion.div 
          className="flex items-center justify-center w-32 h-32 bg-[#FEFAE0] rounded-full"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 2 }}
        >
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-6xl text-[#606C38]"
          />
        </motion.div>
      </motion.div>

      <div className="w-full max-w-lg">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-[#FEFAE0]/10 hover:bg-[#FEFAE0]/20 transition-all duration-300 group"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-[#DDA15E]/20 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-[#DDA15E]"
                  />
                </motion.div>
                <span className="font-medium text-[#FEFAE0]">{feature.text}</span>
              </div>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[#DDA15E]"
                />
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row w-full mx-auto overflow-hidden">
      <div className="w-full md:w-1/2">
        <LeftSection />
      </div>
      <div className="w-full md:w-1/2">
        <RightSection />
      </div>
    </div>
  );
};

export default About;
