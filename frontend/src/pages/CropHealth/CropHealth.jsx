import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import {
  faUpload,
  faPaperPlane,
  faLeaf,
  faSeedling,
  faCommentDots,
  faLightbulb,
  faSun,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import "./CropHealth.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CropHealthModal = ({ isOpen, onClose }) => {
  const backendImageURL = backendUrl + "/api/gemini/analyze-image";
  const backendChatURL = backendUrl + "/api/gemini/chat";
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const chatLogRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("Only image files (JPEG, PNG, GIF) are allowed.");
      return;
    }

    const maxFileSize = 5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size exceeds the 5MB limit.");
      return;
    }

    setImage(file);
  };

  const analyzeImage = async () => {
    if (!image) {
      alert("No image selected. Please upload an image.");
      return;
    }
    setLoading(true);
    setImageLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${backendImageURL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response?.data?.caption;
      setLoading(false);
      setImageLoading(false);

      setChatLog((prevLog) => [...prevLog, { user: "Bot", text: result }]);
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error analyzing the image:", error);
      alert("There was an error analyzing the image. Please try again.");
      setLoading(false);
      setImageLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${backendChatURL}`,
        { message: message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = response?.data?.response;
      setLoading(false);

      setChatLog((prevLog) => [
        ...prevLog,
        { user: "You", text: message },
        { user: "Bot", text: responseText },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error with the chatbot. Please try again.");
      setLoading(false);
    }
  };

  const dummyPrompts = [
    "What is the health of my plant?",
    "Can you help me with plant diseases?",
    "How to improve plant growth?",
  ];

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const chatMessageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-[#DDA15E]/20 bg-[#FEFAE0]/30">
            <h2 className="text-xl font-bold text-[#283618] flex items-center">
              <FontAwesomeIcon
                icon={faSeedling}
                className="mr-2 text-[#606C38]"
              />
              Plant Health Assistant
            </h2>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#DDA15E]/20 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-[#283618] text-xl"
              />
            </motion.button>
          </div>

          {/* Chat Content */}
          <div
            ref={chatLogRef}
            className="flex-1 overflow-y-auto bg-[#FEFAE0]/50 p-4"
          >
            {chatLog.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="mb-6 flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-[#606C38]/10 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <FontAwesomeIcon
                    icon={faSeedling}
                    className="text-4xl sm:text-6xl text-[#606C38]"
                  />
                </motion.div>

                <motion.h3
                  className="text-xl sm:text-2xl font-bold text-[#283618] mb-4 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="mr-2 sm:mr-3 text-[#606C38]"
                  />
                  Welcome to Plant Health Assistant
                </motion.h3>

                <motion.p
                  className="text-base sm:text-lg text-[#283618]/80 mb-6 max-w-md px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Got plant questions? I'm here to help! Upload an image or ask
                  about plant health.
                </motion.p>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto w-full px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {dummyPrompts.map((prompt, index) => (
                    <motion.div
                      key={index}
                      className="bg-white border border-[#DDA15E]/30 rounded-lg p-3 
                       hover:bg-[#DDA15E]/10 transition-all duration-300 
                       flex items-center justify-center space-x-2 
                       cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMessage(prompt)}
                    >
                      <FontAwesomeIcon
                        icon={
                          index === 0
                            ? faLeaf
                            : index === 1
                            ? faLightbulb
                            : faSun
                        }
                        className="text-[#606C38]"
                      />
                      <span className="text-sm text-[#283618]">{prompt}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {chatLog.map((entry, index) => (
                  <motion.div
                    key={index}
                    className={`flex w-full ${
                      entry.user === "You" ? "justify-end" : "justify-start"
                    }`}
                    variants={chatMessageVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      className={`p-3 sm:p-4 rounded-lg shadow-sm max-w-[85%] sm:max-w-[75%] break-words
                        ${
                          entry.user === "You"
                            ? "bg-[#606C38]/10 text-[#283618] border border-[#606C38]/30"
                            : "bg-[#283618] text-[#FEFAE0]"
                        }`}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                            entry.user === "You"
                              ? "bg-[#606C38]/20"
                              : "bg-[#DDA15E]/20"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={entry.user === "You" ? faSeedling : faLeaf}
                            className={
                              entry.user === "You"
                                ? "text-[#606C38]"
                                : "text-[#DDA15E]"
                            }
                          />
                        </div>
                        <strong className="font-semibold text-sm sm:text-base">
                          {entry.user}
                        </strong>
                      </div>
                      <div className="text-sm sm:text-base ml-10">
                        <ReactMarkdown>{entry.text}</ReactMarkdown>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}

            {loading && (
              <motion.div
                className="flex justify-center items-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ClipLoader size={40} color="#606C38" loading={loading} />
              </motion.div>
            )}
          </div>

          {/* Input Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border-t border-[#DDA15E]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.label
              htmlFor="image-upload"
              className="flex items-center justify-center px-3 py-2 bg-[#606C38] text-[#FEFAE0] rounded-md cursor-pointer transition-all duration-300"
              whileHover={{ scale: 1.05, backgroundColor: "#4d5a27" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              <span className="truncate max-w-[150px]">
                {image ? image.name : "Upload Image"}
              </span>
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </motion.label>
            <div className="flex-1 flex gap-2">
              <motion.input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something about plant health..."
                className="flex-grow px-3 py-2 bg-[#FEFAE0]/30 text-[#283618] border border-[#DDA15E]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all duration-300"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                whileFocus={{ scale: 1.01 }}
              />
              <motion.button
                onClick={analyzeImage}
                className="px-3 py-2 bg-[#DDA15E] text-[#283618] rounded-md disabled:opacity-50 whitespace-nowrap transition-all duration-300"
                disabled={!image || imageLoading}
                whileHover={{ scale: 1.05, backgroundColor: "#BC6C25" }}
                whileTap={{ scale: 0.95 }}
              >
                Analyze
              </motion.button>
              <motion.button
                onClick={sendMessage}
                className="bg-[#606C38] text-[#FEFAE0] px-3 py-2 rounded-md flex items-center justify-center whitespace-nowrap transition-all duration-300"
                whileHover={{ scale: 1.05, backgroundColor: "#4d5a27" }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                <span className="hidden sm:inline">Send</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook for managing modal state
export const useCropHealthModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default CropHealthModal;
