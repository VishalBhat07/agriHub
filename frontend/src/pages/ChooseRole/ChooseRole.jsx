import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const [role, setRole] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    try {
      const response = await fetch(backendUrl + `/api/${role}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          emailId: user.primaryEmailAddress.emailAddress,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Profile created as ${role}`);
        navigate("/"); // Redirect to homepage or profile
      } else {
        alert(data.message || "Failed to create profile");
      }
    } catch (error) {
      console.error("Error creating profile", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-[#FEFAE0] rounded-xl shadow-lg border border-[#DDA15E]/50">
      <h2 className="text-3xl font-extrabold text-[#283618] mb-6 text-center">
        Choose Your Role
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="flex items-center space-x-3 cursor-pointer text-[#606C38] font-semibold text-lg">
          <input
            type="radio"
            name="role"
            value="farmer"
            checked={role === "farmer"}
            onChange={(e) => setRole(e.target.value)}
            className="w-5 h-5 text-[#606C38] accent-[#DDA15E] focus:ring-[#DDA15E]"
          />
          <span>Farmer</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer text-[#606C38] font-semibold text-lg">
          <input
            type="radio"
            name="role"
            value="buyer"
            checked={role === "buyer"}
            onChange={(e) => setRole(e.target.value)}
            className="w-5 h-5 text-[#606C38] accent-[#DDA15E] focus:ring-[#DDA15E]"
          />
          <span>Buyer</span>
        </label>
        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-lg bg-[#606C38] text-[#FEFAE0] font-semibold shadow-md hover:bg-[#405728] transition-colors duration-300"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ChooseRole;
