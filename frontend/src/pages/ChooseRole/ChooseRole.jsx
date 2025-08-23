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

    console.log(role);

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

      console.log(data);

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
    <div className="max-w-md mx-auto p-4 mt-16 border rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Choose Your Role</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <input
            type="radio"
            name="role"
            value="farmer"
            checked={role === "farmer"}
            onChange={(e) => setRole(e.target.value)}
          />{" "}
          Farmer
        </label>
        <label className="block mb-4">
          <input
            type="radio"
            name="role"
            value="buyer"
            checked={role === "buyer"}
            onChange={(e) => setRole(e.target.value)}
          />{" "}
          Buyer
        </label>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ChooseRole;
