import { toast } from "react-toastify";

async function placeOrder(buyerClerkId, farmerClerkId, crop, setSelectedCrop) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await fetch(
      `${backendUrl}/api/buyer/${buyerClerkId}/orders/place`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmerClerkId,
          crop,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to place order");
    }

    const data = await response.json();
    console.log("Order placed successfully", data.order);
    toast.success("Order placed successfully");
    setSelectedCrop(null);
  } catch (error) {
    console.error("Error placing order:", error);
    toast.success("Error placing order");
    setSelectedCrop(null);
    throw error;
  }
}

export default placeOrder;
