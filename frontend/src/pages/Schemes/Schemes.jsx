import React from "react";
import { motion } from "framer-motion";

const schemes = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "A scheme that provides financial assistance to farmers for purchasing agricultural inputs and other needs.",
    eligibility:
      "Small and marginal farmers who own cultivable land of up to 2 hectares.",
    benefits:
      "₹6,000 annually, paid in three equal installments, directly to the bank account of the farmer.",
    color: "bg-[#283618]",
    link: "https://pmkisan.gov.in/", // Link to PM-KISAN official site
  },
  {
    name: "National Mission on Agricultural Extension and Technology",
    description:
      "Focuses on improving the productivity and income of farmers through various agricultural extension services.",
    eligibility:
      "Farmers, particularly those in underserved areas, requiring capacity building in farming techniques.",
    benefits:
      "Training on advanced farming techniques, provision of subsidies for adopting new technologies.",
    color: "bg-[#606C38]",
    link: "https://agri-horti.assam.gov.in/schemes/national-mission-on-agricultre-extension-technology-nmaet", // Link to official site
  },
  {
    name: "Fasal Bima Yojana",
    description:
      "Provides insurance coverage to farmers for losses due to natural calamities or pests affecting crops.",
    eligibility:
      "Farmers growing notified crops, with insurance premiums based on the type of crop and geographical area.",
    benefits:
      "Coverage for crop losses, with a minimal premium contribution from the farmer, especially in disaster-hit areas.",
    color: "bg-[#606C38]",
    link: "https://pmfby.gov.in/", // Link to Fasal Bima Yojana official site
  },
  {
    name: "Soil Health Management Scheme",
    description:
      "Aims to improve soil health through soil testing and providing recommendations to farmers for better agricultural practices.",
    eligibility:
      "Farmers across the country, especially those with soil degradation issues.",
    benefits:
      "Free soil testing and recommendations on crop rotation, fertilizers, and other practices to improve soil health.",
    color: "bg-[#283618]",
    link: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1988294", // Link to official site
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    description:
      "Provides insurance coverage for farmers against crop loss due to natural calamities.",
    eligibility: "All farmers growing notified crops are eligible.",
    benefits:
      "Premium coverage for crops, reduced premiums for farmers in disaster-prone areas.",
    color: "bg-[#606C38]",
    link: "https://pmfby.gov.in/", // Link to PMFBY official site
  },
  {
    name: "Rashtriya Krishi Vikas Yojana",
    description:
      "Focuses on enhancing farm productivity through integrated development and investment.",
    eligibility:
      "State governments are the primary beneficiaries. Farmers can indirectly benefit.",
    benefits:
      "Infrastructure development, technology upgrades, and more accessible resources for farmers.",
    color: "bg-[#283618]",
    link: "https://www.agricoop.nic.in/en/schemes/rashtriya-krishi-vikas-yojana", // Link to official site
  },
];

const SchemeCard = ({ scheme, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="w-full"
    >
      <motion.div 
        className="h-full rounded-2xl shadow-lg overflow-hidden transform-gpu"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`p-6 h-full ${scheme.color} text-[#FEFAE0]`}>
          <div className="space-y-5">
            <div className="relative mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {scheme.name}
              </h2>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-[#DDA15E] rounded-full" 
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>

            <div className="space-y-4">
              <motion.div 
                className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-lg p-4 overflow-hidden relative"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(254, 250, 224, 0.15)" 
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="absolute top-0 left-0 w-0 h-full bg-[#DDA15E]/10"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 text-[#DDA15E]">
                    Description
                  </h3>
                  <p className="text-[#FEFAE0]/90">{scheme.description}</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-lg p-4 overflow-hidden relative"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(254, 250, 224, 0.15)" 
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="absolute top-0 left-0 w-0 h-full bg-[#DDA15E]/10"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 text-[#DDA15E]">
                    Eligibility
                  </h3>
                  <p className="text-[#FEFAE0]/90">{scheme.eligibility}</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-lg p-4 overflow-hidden relative"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(254, 250, 224, 0.15)" 
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="absolute top-0 left-0 w-0 h-full bg-[#DDA15E]/10"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2 text-[#DDA15E]">
                    Benefits
                  </h3>
                  <p className="text-[#FEFAE0]/90">{scheme.benefits}</p>
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#BC6C25" }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 px-6 py-3 bg-[#DDA15E] text-[#283618] rounded-lg font-medium transition-all duration-300"
              onClick={() => window.open(scheme.link, "_blank")} // Opens scheme link in a new tab
            >
              Apply Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SchemesPage = () => {
  return (
    <div className="min-h-screen bg-[#FEFAE0] py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#283618] mb-4">
            Government Schemes for Farmers
          </h1>
          <p className="text-lg text-[#606C38] max-w-2xl mx-auto">
            Explore various government initiatives designed to support and empower the agricultural community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SchemesPage;