import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faSeedling, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

// Dummy options for form fields
const dummyOptions = {
  district: [
    "Bangalore Rural",
    "Mysore",
    "Belgaum",
    "Dharwad",
    "Hassan",
    "Tumkur",
    "Mandya",
    "Kolar",
  ],
  commodity: [
    "Tomato",
    "Potato",
    "Onion",
    "Rice",
    "Wheat",
    "Maize",
    "Carrot",
    "Beans",
  ],
  variety: ["Sona", "Jawari"],
  month: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const PricePredictor = () => {
  const [formData, setFormData] = useState({
    district: "",
    commodity: "",
    variety: "",
    month: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setPredictions(data.predictions);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to get predictions");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#FEFAE0] py-12 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <FontAwesomeIcon 
            icon={faChartLine} 
            className="text-5xl text-[#606C38] mb-4"
          />
          <h1 className="text-3xl font-bold text-[#283618] mb-2">
            Crop Price Predictor
          </h1>
          <div className="h-1 w-24 bg-[#DDA15E] mx-auto rounded-full"></div>
          <p className="mt-4 text-[#606C38]">
            Forecast crop prices based on location, crop, and season
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form fields */}
              {["district", "commodity", "variety", "month"].map((field) => (
                <motion.div 
                  key={field} 
                  className="flex flex-col space-y-2"
                  variants={itemVariants}
                >
                  <label
                    htmlFor={field}
                    className="text-sm font-medium text-[#283618]"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <motion.select
                    id={field}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    required
                    whileFocus={{ scale: 1.01 }}
                    className="p-3 border rounded-lg border-[#DDA15E]/30 bg-[#FEFAE0]/50 focus:outline-none focus:ring-2 focus:ring-[#606C38] text-[#283618] transition-all duration-200"
                  >
                    <option value="">Select {field}</option>
                    {dummyOptions[field].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>
              ))}

              <motion.button
                type="submit"
                disabled={loading}
                variants={itemVariants}
                whileHover={{ scale: 1.03, backgroundColor: "#4d5a27" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg text-[#FEFAE0] font-medium ${
                  loading
                    ? "bg-[#606C38]/60 cursor-not-allowed"
                    : "bg-[#606C38] hover:bg-[#283618]"
                } transition-all duration-200 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <FontAwesomeIcon icon={faSeedling} />
                  </motion.div>
                ) : (
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                )}
                <span>{loading ? "Predicting..." : "Predict Prices"}</span>
              </motion.button>
            </form>

            {error && (
              <motion.div 
                className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.div>
            )}

            {predictions && (
              <motion.div
                className="mt-8 pt-6 border-t border-[#DDA15E]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-[#283618] mb-4">
                  Predicted Prices:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Maximum", key: "max_price" },
                    { label: "Minimum", key: "min_price" },
                    { label: "Modal", key: "modal_price" },
                  ].map((item) => (
                    <motion.div
                      key={item.key}
                      className="bg-[#FEFAE0] p-4 rounded-lg"
                      whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(221, 161, 94, 0.2)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-sm text-[#606C38] mb-1">{item.label} Price:</div>
                      <div className="text-xl font-bold text-[#283618]">
                        ₹{predictions[item.key].toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PricePredictor;
