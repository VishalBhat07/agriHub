import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function LeftSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 50 }
    }
  };

  return (
    <div className="flex flex-col justify-center p-8 bg-[#FEFAE0] w-full min-h-[90vh] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-[#283618] mb-2">
          Contact <span className="text-[#606C38]">BharathHarvest</span>
        </h1>
        <motion.div 
          className="h-1 w-20 bg-[#DDA15E] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        <motion.div 
          variants={itemVariants}
          className="group"
        >
          <label
            htmlFor="name"
            className="block text-[#283618] font-medium mb-2"
          >
            Full Name
          </label>
          <motion.input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#DDA15E]/30 rounded-lg text-[#283618] bg-white focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all duration-300"
            placeholder="Enter your full name"
            whileFocus={{ scale: 1.01 }}
          />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="group"
        >
          <label
            htmlFor="email"
            className="block text-[#283618] font-medium mb-2"
          >
            Email Address
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#DDA15E]/30 rounded-lg text-[#283618] bg-white focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all duration-300"
            placeholder="Enter your email address"
            whileFocus={{ scale: 1.01 }}
          />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="group"
        >
          <label
            htmlFor="message"
            className="block text-[#283618] font-medium mb-2"
          >
            Your Message
          </label>
          <motion.textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-[#DDA15E]/30 rounded-lg text-[#283618] bg-white focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all duration-300"
            placeholder="Type your message here"
            whileFocus={{ scale: 1.01 }}
          ></motion.textarea>
        </motion.div>

        <motion.button
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.05, backgroundColor: "#4d5a27" }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-4 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2">
            <span>Send Message</span>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </motion.button>
      </motion.form>
    </div>
  );
}

function RightSection() {
  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email",
      text: "vssreenivaas@bharathharvest.com",
      action: "Email Us",
    },
    {
      icon: faPhone,
      title: "Phone",
      text: "+91 7892781710",
      action: "Call Now",
    },
    {
      icon: faMapMarkerAlt,
      title: "Address",
      text: "Mysuru Road, RVCE, Bengaluru, 560059",
      action: "View on Map",
    },
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
            icon={faPaperPlane}
            className="text-6xl text-[#606C38]"
          />
        </motion.div>
      </motion.div>

      <div className="w-full max-w-lg">
        <motion.ul 
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {contactInfo.map((contact, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-[#FEFAE0]/10 hover:bg-[#FEFAE0]/20 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-[#DDA15E]/20 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <FontAwesomeIcon
                    icon={contact.icon}
                    className="text-[#DDA15E]"
                  />
                </motion.div>
                <div>
                  <div className="font-semibold text-[#FEFAE0]">{contact.title}</div>
                  <div className="text-sm text-[#FEFAE0]/80">{contact.text}</div>
                </div>
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
        </motion.ul>
      </div>
    </div>
  );
}

export default function Contact() {
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
}
