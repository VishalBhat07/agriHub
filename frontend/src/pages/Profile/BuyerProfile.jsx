import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, Settings } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faBox } from "@fortawesome/free-solid-svg-icons";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function BuyerProfile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const userID = user?.id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch buyer orders
  useEffect(() => {
    async function fetchOrders() {
      if (!userID) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const res = await fetch(`${backendUrl}/api/buyer/${userID}/orders`);
        console.log(res);
        if (!res.ok) {
          if (res.status === 404) {
            setOrders([]); // no orders yet
          } else {
            throw new Error(`Failed to fetch orders: ${res.statusText}`);
          }
        } else {
          const data = await res.json();
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [userID]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Order row component
  const OrderRow = ({ order }) => (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="hover:bg-[#FEFAE0]/50 transition-colors"
    >
      <td className="px-6 py-4 font-mono text-sm text-[#283618]">
        {order._id}
      </td>
      <td className="px-6 py-4 text-[#283618]">
        {order.farmerId?.name || "Farmer"}
      </td>
      <td className="px-6 py-4 text-[#283618]">
        {order.crop.name} - {order.crop.variety}
      </td>
      <td className="px-6 py-4 font-semibold text-[#BC6C25]">
        ₹{order.crop.price || 0}
      </td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#606C38]/20 text-[#283618]">
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {order.orderDate
          ? new Date(order.orderDate).toLocaleDateString("en-IN")
          : "N/A"}
      </td>
    </motion.tr>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFAE0]/30 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-[#606C38] animate-spin mx-auto mb-4" />
          <p className="text-[#283618] text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#FEFAE0]/30 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-[#283618] mb-2">
            Error Loading Orders
          </h2>
          <p className="text-[#606C38] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#606C38] text-white rounded-lg"
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
    >
      <motion.div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div className="bg-[#606C38] p-8 rounded-t-2xl text-center shadow-lg">
          <div className="w-24 h-24 text-[#FEFAE0] flex items-center justify-center rounded-full mx-auto mb-6 shadow-md">
            <ShoppingCart className="w-12 h-12 text-[#283618]" />
          </div>
          <h2 className="text-[#FEFAE0] text-3xl font-bold">
            Welcome, {user?.firstName || "Buyer"}!
          </h2>
          <motion.div className="h-1 w-24 bg-[#DDAE30] mx-auto my-4" />
          <span className="text-[#FEFAE0]/80 bg-[#283618]/40 px-3 py-1 rounded-full text-sm">
            ID: {userID}
          </span>
        </motion.div>

        {/* Orders Table */}
        <motion.div className="bg-white p-8 rounded-b-2xl shadow-lg">
          <h3 className="text-xl font-bold text-[#283618] mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faBox} className="text-[#606C38]" />
            Your Orders ({orders.length})
          </h3>

          <div className="overflow-x-auto border border-[#DDAE30]/30 rounded-lg">
            <table className="min-w-full divide-y divide-[#DDAE30]/20">
              <thead className="bg-[#FEFAE0]">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-left text-[#606C38] uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-[#606C38] uppercase tracking-wider">
                    Farmer
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-[#606C38] uppercase tracking-wider">
                    Crops
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-[#606C38] uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-[#606C38] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-[#606C38] uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#DDAE30]/10">
                <AnimatePresence>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <OrderRow key={order._id} order={order} />
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center text-[#606C38]">
                          <FontAwesomeIcon
                            icon={faLeaf}
                            className="text-4xl mb-2 opacity-50"
                          />
                          <p className="text-lg font-medium">
                            No orders found yet.
                          </p>
                          <p className="text-sm opacity-75">
                            Your orders will appear here once you place them.
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <motion.div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-[#DDAE30]/20">
            <motion.button
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#606C38] text-white rounded-lg shadow-md font-medium hover:bg-[#283618]"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
              Account Settings
            </motion.button>
            <motion.button
              onClick={handleSignOut}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 bg-[#B8860B] text-white rounded-lg shadow-md font-medium hover:bg-[#9c6e0b]"
              whileHover={{ scale: 1.02 }}
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
