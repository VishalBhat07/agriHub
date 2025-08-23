import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sprout, LogOut, Settings } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faLeaf,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../MarketPlace/Modal";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function FarmerProfile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const userID = user.id;
  const navigate = useNavigate();

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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch farmer info and crops from backend
  useEffect(() => {
    async function fetchData() {
      if (!userID) return;
      try {
        // Fetch farmer profile
        const farmerRes = await fetch(backendUrl + `/api/user/${userID}`);
        if (!farmerRes.ok) throw new Error("Failed to fetch farmer");
        const farmerData = await farmerRes.json();
        console.log(farmerData.profile);
        setFarmer(farmerData);

        // Fetch crops
        const cropsRes = await fetch(
          backendUrl + `/api/farmer/${userID}/crops`
        );
        if (!cropsRes.ok) throw new Error("Failed to fetch crops");
        const cropsData = await cropsRes.json();
        setCrops(cropsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userID]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    if (!farmer) return;

    try {
      const method = editingCrop ? "PUT" : "POST";
      const url = editingCrop
        ? `/api/farmer/${userID}/crops/${editingCrop._id}`
        : `/api/farmer/${userID}/crops/add`;

      const res = await fetch(backendUrl + url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cropData.cropName,
          variety: cropData.cropVariety,
          price: parseFloat(cropData.cropPrice),
          quantity: parseFloat(cropData.cropWeight),
          location: cropData.cropLocation,
        }),
      });

      if (!res.ok) throw new Error("Failed to save crop");

      // Refresh crops list
      const cropsRes = await fetch(backendUrl + `/api/farmer/${userID}/crops`);
      const updatedCrops = await cropsRes.json();
      setCrops(updatedCrops);
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCrop = async (crop) => {
    try {
      const res = await fetch(
        backendUrl + `/api/farmer/${userID}/crops/${crop._id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete crop");

      // Refresh crops list
      const cropsRes = await fetch(backendUrl + `/api/farmer/${userID}/crops`);
      const updatedCrops = await cropsRes.json();
      setCrops(updatedCrops);
    } catch (error) {
      console.error(error);
    }
  };

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

  const TableRow = ({ crop }) => (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="hover:bg-[#FEFAE0]/50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faLeaf} className="text-[#606C38] mr-2" />
          <span className="font-medium text-[#283618]">{crop.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-[#283618]">{crop.variety}</td>
      <td className="px-6 py-4">
        <span className="font-medium text-[#BC6C25]">₹{crop.price}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[#283618]">{crop.quantity} kg</span>
      </td>
      <td className="px-6 py-4 text-[#283618]">{crop.location}</td>
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

  return (
    <motion.div
      className="min-h-screen bg-[#FEFAE0]/30 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          className="bg-[#283618] rounded-t-2xl px-8 py-12 text-center shadow-lg overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 260, damping: 20 },
            },
          }}
        >
          <motion.div
            className="w-24 h-24 bg-[#FEFAE0] rounded-full flex justify-center items-center mx-auto mb-6 shadow-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
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
          className="bg-white rounded-b-2xl p-8 shadow-lg"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 300, damping: 24 },
            },
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#283618] flex items-center">
              <FontAwesomeIcon
                icon={faWheatAwn}
                className="text-[#606C38] mr-2"
              />
              Your Crops
            </h3>
            <motion.button
              className="px-4 py-2 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium inline-flex items-center gap-2 shadow-md"
              whileHover={{ scale: 1.05, backgroundColor: "#283618" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
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
                    crops.map((crop) => <TableRow key={crop._id} crop={crop} />)
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="text-[#606C38] flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faLeaf}
                            className="text-4xl mb-3 opacity-50"
                          />
                          <p className="text-lg">
                            No crops added yet. Click "Add New Crop" to get
                            started.
                          </p>
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
            className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-[#DDA15E]/20"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 24 },
              },
            }}
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
