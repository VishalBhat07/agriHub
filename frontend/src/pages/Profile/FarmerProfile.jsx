import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, LogOut, Settings } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, useClerk } from "@clerk/clerk-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const orderStatuses = [
  "pending",
  "accepted",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderRow = ({ order, userID, onUpdateStatus }) => {
  const [status, setStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      setStatus(newStatus);
      await onUpdateStatus(order._id, newStatus);
    } catch (error) {
      // Revert status on error
      setStatus(order.status);
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Format crops safely
  const formatCrops = () => {
    if (!order.crop) return "No crops";
    return `${order.crop.name} - ${order.crop.variety}`;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="hover:bg-[#FEFAE0]/50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap text-[#283618] font-mono text-sm">
        {order._id || order.id || "N/A"}
      </td>
      <td className="px-6 py-4 text-[#283618]">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className="bg-[#FEFAE0] border border-[#DDA15E] px-2 py-1 rounded text-[#283618] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {orderStatuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        {isUpdating && (
          <span className="ml-2 text-sm text-[#606C38]">Updating...</span>
        )}
      </td>
      <td className="px-6 py-4 text-[#283618]">{formatCrops()}</td>
      <td className="px-6 py-4 text-[#283618] font-semibold">
        ₹{order.crop.price?.toLocaleString() || 0}
      </td>
      <td className="px-6 py-4 text-[#283618]">
        {order.orderDate
          ? new Date(order.orderDate).toLocaleDateString("en-IN")
          : "N/A"}
      </td>
    </motion.tr>
  );
};

export default function FarmerProfile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const userID = user?.id;
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!userID) {
        setLoading(false);
        return;
      }

      try {
        setError(null);

        // Fetch farmer data
        const farmerRes = await fetch(`${backendUrl}/api/user/${userID}`);
        if (!farmerRes.ok) {
          throw new Error(
            `Failed to fetch farmer data: ${farmerRes.status} ${farmerRes.statusText}`
          );
        }
        const farmerData = await farmerRes.json();
        setFarmer(farmerData);

        // Fetch orders
        const ordersRes = await fetch(
          `${backendUrl}/api/farmer/${userID}/orders`
        );
        if (!ordersRes.ok) {
          if (ordersRes.status === 404) {
            // No orders found is not an error
            setOrders([]);
          } else {
            throw new Error(
              `Failed to fetch orders: ${ordersRes.status} ${ordersRes.statusText}`
            );
          }
        } else {
          const ordersData = await ordersRes.json();
          console.log(ordersData);
          setOrders(Array.isArray(ordersData) ? ordersData : []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userID, backendUrl]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `${backendUrl}/api/farmer/${userID}/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to update order status: ${res.status}`
        );
      }

      // Update local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      throw error; // Re-throw to handle in OrderRow component
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFAE0]/30 flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-[#606C38] animate-spin mx-auto mb-4" />
          <p className="text-[#283618] text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#FEFAE0]/30 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-[#283618] mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-[#606C38] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#606C38] text-white rounded-lg hover:bg-[#283618] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[#FEFAE0]/30 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="max-w-4xl mx-auto">
        <motion.div className="bg-[#283618] rounded-t-2xl px-8 py-12 text-center shadow-lg overflow-hidden">
          <motion.div
            className="w-24 h-24 bg-[#FEFAE0] rounded-full flex justify-center items-center mx-auto mb-6 shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sprout className="w-12 h-12 text-[#606C38]" />
          </motion.div>

          <h2 className="text-3xl font-bold text-[#FEFAE0] mb-3">
            Welcome, {farmer?.name || user?.firstName || "Farmer"}!
          </h2>
          <motion.div className="h-1 w-24 bg-[#DDA15E] mx-auto rounded-full mb-4" />
          <span className="text-[#FEFAE0]/80 bg-[#606C38]/50 px-3 py-1 rounded-full text-sm">
            ID: {userID}
          </span>
        </motion.div>

        <motion.div className="bg-white rounded-b-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-[#283618] mb-6 flex items-center">
            <FontAwesomeIcon
              icon={faWheatAwn}
              className="text-[#606C38] mr-2"
            />
            Your Orders ({orders.length})
          </h3>

          <div className="overflow-x-auto rounded-lg border border-[#DDA15E]/20">
            <table className="min-w-full divide-y divide-[#DDA15E]/20">
              <thead className="bg-[#FEFAE0]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Crops
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#DDA15E]/10">
                <AnimatePresence>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <OrderRow
                        key={order._id || order.id}
                        order={order}
                        userID={userID}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="text-[#606C38] flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faLeaf}
                            className="text-4xl mb-3 opacity-50"
                          />
                          <p className="text-lg font-medium">
                            No orders placed yet.
                          </p>
                          <p className="text-sm opacity-75 mt-1">
                            Your orders will appear here once customers place
                            them.
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <motion.div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-[#DDA15E]/20">
            <motion.button
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg shadow-md font-medium transition-colors hover:bg-[#283618]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
              Account Settings
            </motion.button>
            <motion.button
              onClick={handleSignOut}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#BC6C25] text-[#FEFAE0] rounded-lg shadow-md font-medium transition-colors hover:bg-[#9c5a1d]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
