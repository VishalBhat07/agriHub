import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faLeaf,
  faChartLine,
  faLocationDot,
  faDollarSign,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer";
import Modal from "./Modal"; // Import the Modal component

const FarmerMarket = ({ farmerID }) => {
  const [farmer, setFarmer] = useState(null);
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [cropData, setCropData] = useState({
    cropName: "",
    cropVariety: "",
    cropPrice: "",
    cropWeight: "",
    cropLocation: "",
  });

  useEffect(() => {
    async function fetchFarmer() {
      try {
        const fetchedFarmer = await Farmer.getFarmer(farmerID);
        setFarmer(fetchedFarmer);
        return fetchedFarmer;
      } catch (error) {
        console.error("Error fetching farmer details", error);
        return null;
      }
    }

    async function fetchCrops(farmer) {
      if (!farmer) return;
      try {
        const fetchedCrops = await farmer.getCrops();
        setCrops(
          fetchedCrops.map((crop) => ({
            ...crop,
            minPrice: crop.minPrice || 0,
            maxPrice: crop.maxPrice || 0,
            avgPrice: crop.avgPrice || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching farmer crops", error);
      }
    }

    fetchFarmer().then(fetchCrops);
  }, [farmerID]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCrop(null);
    setCropData({
      cropName: "",
      cropVariety: "",
      cropPrice: "",
      cropWeight: "",
      cropLocation: "",
    });
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    if (!farmer) return;

    try {
      const crop = new Crop(
        cropData.cropName,
        cropData.cropVariety,
        parseFloat(cropData.cropPrice),
        parseFloat(cropData.cropWeight),
        cropData.cropLocation
      );

      if (editingCrop) {
        crop.cropID = editingCrop.cropID;
        await farmer.updateCrop(crop);
      } else {
        await farmer.addCrop(crop);
      }

      const fetchedCrops = await farmer.getCrops();
      setCrops(
        fetchedCrops
      );
      handleModalClose();
    } catch (error) {
      console.error("Error saving crop:", error);
    }
  };

  const deleteCrop = async (crop) => {
    if (!farmer) return;

    try {
      await farmer.deleteCrop(crop.cropID);
      const fetchedCrops = await farmer.getCrops();
      setCrops(
        fetchedCrops.map((crop) => ({
          ...crop,
          minPrice: crop.minPrice || 0,
          maxPrice: crop.maxPrice || 0,
          avgPrice: crop.avgPrice || 0,
        }))
      );
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  function TableRow({ crop }) {
    const [predictedPrices, setPredictedPrices] = useState({
      minPrice: 0,
      maxPrice: 0,
      modalPrice: 0,
    });
    useEffect(() => {
      // Extract district from location (assuming format like "District, State")
      const getDistrict = (location) => {
        if (!location) return "";
        return location.split(",")[0].trim();
      };

      const fetchPrediction = async () => {
        try {
          const requestData = {
            district: getDistrict(crop.cropLocation),
            commodity: crop.cropName,
            variety: crop.cropVariety,
            month: new Date().toLocaleString("default", { month: "long" }), // Current month name
          };

          const response = await fetch("http://localhost:3000/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          const data = await response.json();

          if (data.success && data.predictions) {
            // Handle the case where predictions might be nested or direct
            const predictions = data.predictions.predictions || data.predictions;
            
            setPredictedPrices({
              minPrice: predictions.min_price || 2000,
              maxPrice: predictions.max_price || 3000,
              modalPrice: predictions.modal_price || 2500,
            });
          } else {
            console.error("Prediction failed:", data.error || "Unknown error");
            // Set fallback values to ensure UI doesn't break
            setPredictedPrices({
              minPrice: 2000,
              maxPrice: 3000,
              modalPrice: 2500,
            });
          }
        } catch (error) {
          console.error("Error making prediction:", error);
          // Set fallback values on error
          setPredictedPrices({
            minPrice: 2000,
            maxPrice: 3000,
            modalPrice: 2500,
          });
        }
      };

      fetchPrediction();
    }, [crop]);

    return (
      <motion.tr
        key={crop.cropID}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="hover:bg-[#FEFAE0]/50 transition-colors"
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLeaf} className="text-[#606C38] mr-2" />
            <span className="font-medium text-[#283618]">{crop.cropName}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-[#283618]">{crop.cropVariety}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {/* <FontAwesomeIcon icon={faDollarSign} className="text-[#BC6C25] mr-2" /> */}
            <span className="font-medium text-[#BC6C25]">₹{crop.cropPrice}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center text-[#606C38]">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            <span>₹{Math.floor(predictedPrices.minPrice)/100}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center text-[#606C38]">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            <span>₹{Math.floor(predictedPrices.maxPrice)/100}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center text-[#606C38]">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            <span>₹{Math.floor(predictedPrices.modalPrice)/100}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faWeightScale} className="text-[#606C38] mr-2" />
            <span className="text-[#283618]">{crop.cropWeight} kg</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="text-[#DDA15E] mr-2" />
            <span className="text-[#283618]">{crop.cropLocation}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingCrop(crop);
                setCropData(crop);
                setIsModalOpen(true);
              }}
              className="text-[#606C38] hover:text-[#283618] transition-colors"
            >
              <FontAwesomeIcon icon={faPen} size="lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => deleteCrop(crop)}
              className="text-[#BC6C25] hover:text-red-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </motion.button>
          </div>
        </td>
      </motion.tr>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#FEFAE0]/50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-8"
          variants={itemVariants}
        >
          <div className="bg-[#283618] p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FontAwesomeIcon 
                icon={faLeaf} 
                className="text-[#FEFAE0] text-3xl mr-4" 
              />
              <h1 className="text-2xl font-bold text-[#FEFAE0]">
                Crop Manager
              </h1>
            </div>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#DDA15E] text-[#283618] rounded-lg font-medium flex items-center space-x-2 shadow-md"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add New Crop</span>
            </motion.button>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-[#DDA15E]/20">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Crop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Variety
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Price/kg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Min Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Max Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Avg Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#DDA15E]/10">
                <AnimatePresence>
                  {crops.length > 0 ? (
                    crops.map((crop) => (
                      <TableRow key={crop.cropID} crop={crop} />
                    ))
                  ) : (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="9" className="px-6 py-12 text-center">
                        <div className="text-[#606C38] flex flex-col items-center">
                          <FontAwesomeIcon icon={faLeaf} className="text-4xl mb-3 opacity-50" />
                          <p className="text-lg">No crops added yet. Click "Add New Crop" to get started.</p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCropSubmit}
        cropData={cropData}
        setCropData={setCropData}
        editingCrop={editingCrop}
      />
    </motion.div>
  );
};

export default FarmerMarket;
