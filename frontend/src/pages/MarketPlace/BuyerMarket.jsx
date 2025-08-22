import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  faSeedling,
  faLocationDot,
  faWeightScale,
  faSearch,
  faXmark,
  faLeaf,
  faShoppingBasket,
  faFilter,
  faSort
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllFarmersCrops } from "../../../firebaseFunctions/cropFarmer";
import { searchFarmerByCrop } from "../../../firebaseFunctions/cropFarmer";

const MotionCard = motion.div;

export default function ModernMarketplace() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [cropImages, setCropImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  useEffect(() => {
    const fetchCrops = async () => {
      setIsLoading(true);
      try {
        const farmersWithCrops = await getAllFarmersCrops();
        const allCrops = farmersWithCrops.flatMap(({ crops }) => crops);
        setCrops(allCrops);
      } catch (error) {
        console.error("Error fetching crops", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const fetchCropImage = async (cropID, cropName) => {
    if (cropImages[cropID]) return; // Skip if image already fetched
    try {
      console.log(cropName);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: cropName,
            client_id: UNSPLASH_API_KEY,
            per_page: 1,
          },
        }
      );
      if (response.data.results.length > 0) {
        setCropImages((prevImages) => ({
          ...prevImages,
          [cropID]: response.data.results[0].urls.small,
        }));
      } else {
        setCropImages((prevImages) => ({
          ...prevImages,
          [cropID]: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching crop image from Unsplash", error);
    }
  };

  const filteredCrops = crops.filter((crop) => {
    const search = searchTerm.toLowerCase();
    return (
      crop.cropName.toLowerCase().includes(search) ||
      crop.cropVariety.toLowerCase().includes(search) ||
      crop.cropLocation.toLowerCase().includes(search)
    );
  });

  const getMapUrl = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedLocation},India`;
  };

  const handlePurchaseClick = async (crop) => {
    try {
      const farmer = await searchFarmerByCrop(crop);
      if (farmer) {
        navigate(`/farmer/${farmer.farmerID}`);
      } else {
        console.error("No farmer found for this crop");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
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

  const CropCard = ({ crop, index }) => {
    useEffect(() => {
      fetchCropImage(crop.cropID, crop.cropName);
    }, [crop.cropID, crop.cropName]);

    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(40, 54, 24, 0.1)",
        }}
        className="bg-white rounded-xl overflow-hidden shadow-md transform-gpu border border-[#DDA15E]/20"
      >
        <motion.div
          className="h-48 bg-gradient-to-br from-[#606C38] to-[#283618] relative"
          whileHover={{ scale: 1.05 }}
        >
          <FontAwesomeIcon
            icon={faSeedling}
            className="absolute inset-0 m-auto text-white/20 w-24 h-24"
          />
          {cropImages[crop.cropID] ? (
            <img
              src={cropImages[crop.cropID]}
              alt={crop.cropName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg">
              <FontAwesomeIcon icon={faSeedling} className="text-4xl opacity-70" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-[#283618]/70 backdrop-blur-sm p-4">
            <h3 className="text-xl font-bold text-[#FEFAE0]">{crop.cropName}</h3>
            <p className="text-[#FEFAE0]/90">{crop.cropVariety}</p>
          </div>
        </motion.div>

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-[#606C38]">
              <FontAwesomeIcon icon={faWeightScale} />
              <span>{crop.cropWeight}kg</span>
            </div>
            <div className="flex items-center space-x-2 text-[#606C38]">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{crop.cropLocation}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-[#BC6C25]">
              ₹{crop.cropPrice}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#283618" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCrop(crop)}
              className="px-4 py-2 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium transition-colors shadow-sm"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </MotionCard>
    );
  };

  const CropModal = ({ crop }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedCrop(null)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-[#FEFAE0] rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#283618] text-[#FEFAE0] p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Crop Details</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCrop(null)}
              className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-[#283618]">
                    {crop.cropName}
                  </h2>
                  <p className="text-lg text-[#606C38]">{crop.cropVariety}</p>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 text-[#606C38]">
                    <FontAwesomeIcon icon={faWeightScale} className="w-5 h-5" />
                    <span className="text-lg">{crop.cropWeight} kg</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#606C38]">
                    <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5" />
                    <span className="text-lg">{crop.cropLocation}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-[#BC6C25]">
                      ₹{crop.cropPrice}
                    </span>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#283618" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePurchaseClick(crop)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium text-lg shadow-md"
                >
                  Contact Farmer
                </motion.button>
              </div>

              <motion.div 
                className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <iframe
                  title={`Map showing location of ${crop.cropName}`}
                  src={getMapUrl(crop.cropLocation)}
                  className="w-full h-full border-0 rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <motion.div 
      className="min-h-screen bg-[#FEFAE0]/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <FontAwesomeIcon 
              icon={faShoppingBasket} 
              className="text-5xl text-[#606C38]" 
            />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-[#283618] mb-3"
          >
            Crop Marketplace
          </motion.h1>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-32 bg-[#DDA15E] mx-auto rounded-full mb-6"
          />
          <motion.p variants={itemVariants} className="text-[#606C38] text-lg max-w-2xl mx-auto">
            Connect directly with farmers and purchase fresh, high-quality crops at competitive prices
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto mb-12 relative"
        >
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38]"
            />
            <motion.input
              variants={itemVariants}
              type="text"
              className="w-full pl-12 pr-4 py-4 border-2 border-[#DDA15E]/20 focus:border-[#DDA15E] outline-none rounded-xl bg-white/80 text-[#283618] placeholder-[#606C38]/60 shadow-sm transition-all duration-200"
              placeholder="Search by name, variety, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              whileFocus={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-end gap-3 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#DDA15E" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-[#606C38] rounded-lg border border-[#DDA15E]/30 font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Filter</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#DDA15E" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsGridView(!isGridView)}
              className="px-4 py-2 bg-white text-[#606C38] rounded-lg border border-[#DDA15E]/30 font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <FontAwesomeIcon icon={faSort} />
              <span>{isGridView ? "List View" : "Grid View"}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <FontAwesomeIcon 
                icon={faSeedling} 
                className="text-5xl text-[#606C38]" 
              />
            </motion.div>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredCrops.length > 0 ? (
                filteredCrops.map((crop, index) => (
                  <CropCard key={crop.cropID} crop={crop} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-12"
                >
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className="w-16 h-16 text-[#606C38]/30 mb-4"
                  />
                  <p className="text-xl text-[#606C38]">
                    No crops found matching your search
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {selectedCrop && <CropModal crop={selectedCrop} />}
      </div>
    </motion.div>
  );
}
