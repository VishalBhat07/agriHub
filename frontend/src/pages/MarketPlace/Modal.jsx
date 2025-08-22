import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({
  isModalOpen,
  onClose,
  onSubmit,
  cropData,
  setCropData,
  editingCrop,
}) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        delay: 0.1, 
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      y: 20,
      transition: { 
        duration: 0.2
      }
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  const formFields = [
    { name: "cropName", label: "Crop Name" },
    { name: "cropVariety", label: "Variety" },
    { name: "cropPrice", label: "Price per kg", type: "number" },
    { name: "cropWeight", label: "Weight in kg", type: "number" },
    { name: "cropLocation", label: "Location" },
  ];

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-[#FEFAE0] rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-[#283618] text-[#FEFAE0] p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingCrop ? "Edit Crop" : "Add New Crop"}
              </h2>
              <motion.button
                type="button"
                onClick={onClose}
                className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </motion.button>
            </div>

            <div className="p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                {formFields.map(({ name, label, type }, i) => (
                  <motion.div 
                    key={name}
                    custom={i}
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label 
                      htmlFor={name}
                      className="block text-sm font-medium text-[#283618] mb-1"
                    >
                      {label}
                    </label>
                    <motion.input
                      type={type || "text"}
                      id={name}
                      name={name}
                      placeholder={label}
                      value={cropData[name]}
                      onChange={(e) =>
                        setCropData((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border-2 border-[#DDA15E]/30 focus:border-[#DDA15E] focus:ring-1 focus:ring-[#DDA15E] rounded-lg bg-white/80 text-[#283618] transition-all duration-200"
                      required
                      whileFocus={{ scale: 1.01 }}
                      {...(type === "number" ? { min: "0", step: "0.01" } : {})}
                    />
                  </motion.div>
                ))}

                <div className="flex justify-end gap-3 mt-8">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-[#606C38] text-[#606C38] rounded-lg hover:bg-[#606C38]/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-[#606C38] text-[#FEFAE0] rounded-lg hover:bg-[#283618] transition-colors shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingCrop ? "Save Changes" : "Add Crop"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
