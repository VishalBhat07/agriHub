import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { Sprout, LogOut, Settings, Plus, Leaf } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faLeaf, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer";
import Modal from "../MarketPlace/Modal";

export default function FarmerProfile() {
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
  const { userID } = useParams();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
      setCrops(fetchedCrops);
      handleModalClose();
    } catch (error) {
      console.error("Error saving crop:", error);
    }
  };

  useEffect(() => {
    async function fetchFarmer() {
      try {
        const fetchedFarmer = await Farmer.getFarmer(userID);
        setFarmer(fetchedFarmer);
        return fetchedFarmer;
      } catch (error) {
        console.error("Error fetching farmer details:", error);
        return null;
      }
    }

    async function fetchCrops(farmer) {
      if (!farmer) return;
      try {
        const fetchedCrops = await farmer.getCrops();
        setCrops(fetchedCrops);
      } catch (error) {
        console.error("Error fetching farmer crops:", error);
      }
    }

    fetchFarmer().then(fetchCrops);
  }, [userID]);

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

  const deleteCrop = async (crop) => {
    if (!farmer) return;
    try {
      await farmer.deleteCrop(crop.cropID);
      const fetchedCrops = await farmer.getCrops();
      setCrops(fetchedCrops);
    } catch (error) {
      console.error("Error deleting crop:", error);
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

  const TableRow = ({ crop }) => {
    return (
      <motion.tr
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
          <span className="font-medium text-[#BC6C25]">₹{crop.cropPrice}</span>
        </td>
        <td className="px-6 py-4">
          <span className="text-[#283618]">{crop.cropWeight} kg</span>
        </td>
        <td className="px-6 py-4 text-[#283618]">{crop.cropLocation}</td>
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
  };

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
        <motion.div
          variants={itemVariants}
          className="bg-[#283618] rounded-t-2xl px-8 py-12 text-center shadow-lg overflow-hidden"
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
            <Sprout className="w-12 h-12 text-[#606C38]" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-[#FEFAE0] mb-3">
            Farmer Dashboard
          </h2>
          <motion.div 
            className="h-1 w-24 bg-[#DDA15E] mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <span className="text-[#FEFAE0]/80 bg-[#606C38]/50 px-3 py-1 rounded-full text-sm">
            ID: {userID}
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-b-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#283618] flex items-center">
              <FontAwesomeIcon icon={faWheatAwn} className="text-[#606C38] mr-2" />
              Your Crops
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#283618" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium inline-flex items-center gap-2 shadow-md"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Crop
            </motion.button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#DDA15E]/20">
            <table className="min-w-full divide-y divide-[#DDA15E]/20">
              <thead className="bg-[#FEFAE0]">
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
                      <td colSpan="6" className="px-6 py-12 text-center">
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

          <Modal
            isModalOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleCropSubmit}
            cropData={cropData}
            setCropData={setCropData}
            editingCrop={editingCrop}
          />

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