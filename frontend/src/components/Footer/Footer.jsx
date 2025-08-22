import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLeaf,
  faStore,
  faBook,
  faLandmark,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
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

  const linkVariants = {
    hover: { 
      x: 5, 
      color: "#606C38",
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer className="footer-bg text-[#283618]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="footer-section"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="bg-[#606C38] w-10 h-10 rounded-full flex items-center justify-center text-[#FEFAE0]"
              >
                <img src="/new_logo2.png" alt="" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[#283618]">Bharath Harvest</h2>
            </div>
            <p className="text-[#283618]/80 leading-relaxed">
              Bharath Harvest is dedicated to connecting farmers, learners, and
              stakeholders in agriculture. Explore resources, marketplaces, and
              schemes to empower your journey.
            </p>
          </motion.div>

          <motion.div
            className="footer-section"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-[#606C38] mb-6 pb-2 border-b-2 border-[#DDA15E]/30 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/marketplace" className="flex items-center gap-2">
                  <div className="text-[#BC6C25] text-sm">
                    <FontAwesomeIcon icon={faStore} />
                  </div>
                  <span>Market Place</span>
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/learn" className="flex items-center gap-2">
                  <div className="text-[#BC6C25] text-sm">
                    <FontAwesomeIcon icon={faBook} />
                  </div>
                  <span>Learning Resources</span>
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/schemes" className="flex items-center gap-2">
                  <div className="text-[#BC6C25] text-sm">
                    <FontAwesomeIcon icon={faLandmark} />
                  </div>
                  <span>Government Schemes</span>
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/contact" className="flex items-center gap-2">
                  <div className="text-[#BC6C25] text-sm">
                    <FontAwesomeIcon icon={faAddressBook} />
                  </div>
                  <span>Contact Us</span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-section"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-[#606C38] mb-6 pb-2 border-b-2 border-[#DDA15E]/30 inline-block">
              Contact
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }}>
                <a href="mailto:tharunkrishnam@bharathharvest.com" className="flex items-center gap-3">
                  <div className="bg-[#606C38] w-8 h-8 rounded-full flex items-center justify-center text-[#FEFAE0] text-sm">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <span className="text-sm">tharunkrishnam@bharathharvest.com</span>
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="mailto:tallamsrisai@bharathharvest.com" className="flex items-center gap-3">
                  <div className="bg-[#606C38] w-8 h-8 rounded-full flex items-center justify-center text-[#FEFAE0] text-sm">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <span className="text-sm">tallamsrisai@bharathharvest.com</span>
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="mailto:vssreenivaas@bharathharvest.com" className="flex items-center gap-3">
                  <div className="bg-[#606C38] w-8 h-8 rounded-full flex items-center justify-center text-[#FEFAE0] text-sm">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <span className="text-sm">vssreenivaas@bharathharvest.com</span>
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <div className="flex items-center gap-3">
                  <div className="bg-[#606C38] w-8 h-8 rounded-full flex items-center justify-center text-[#FEFAE0] text-sm">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <span className="text-sm">+91 7892781710</span>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="py-4 text-center text-sm bg-[#283618] text-[#FEFAE0]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Bharath Harvest | All Rights Reserved
      </motion.div>
    </footer>
  );
};

export default Footer;