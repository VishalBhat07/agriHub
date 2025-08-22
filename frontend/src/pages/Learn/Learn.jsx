import React from "react";
import { motion } from "framer-motion";

const resources = [
  {
    title: "Crop Management Fundamentals",
    type: "Video Course",
    description:
      "Comprehensive video series covering basic to advanced crop management techniques, pest control, and yield optimization.",
    duration: "8 hours",
    topics: [
      "Soil Preparation",
      "Crop Rotation",
      "Pest Management",
      "Harvest Techniques",
    ],
    level: "Beginner",
    color: "bg-[#606C38]",
    link: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/crop-management", // Link to a course on Coursera
  },
  {
    title: "Sustainable Farming Practices",
    type: "Interactive Guide",
    description:
      "Learn about eco-friendly farming methods, organic cultivation, and sustainable resource management.",
    duration: "6 hours",
    topics: [
      "Organic Farming",
      "Water Conservation",
      "Natural Fertilizers",
      "Biodiversity",
    ],
    level: "Intermediate",
    color: "bg-[#283618]",
    link: "https://www.coursera.org/learn/sustainable-agriculture", // Link to a course on edX
  },
  {
    title: "Modern Agricultural Technology",
    type: "Workshop Series",
    description:
      "Explore modern farming technologies, smart irrigation systems, and precision agriculture techniques.",
    duration: "10 hours",
    topics: [
      "Smart Irrigation",
      "Drone Technology",
      "IoT in Agriculture",
      "Data Analytics",
    ],
    level: "Advanced",
    color: "bg-[#606C38]",
    link: "https://www.futurelearn.com/courses/modern-agricultural-technology", // Link to a course on FutureLearn
  },
  {
    title: "Financial Management for Farmers",
    type: "Online Course",
    description:
      "Master financial planning, budgeting, and risk management specifically tailored for agricultural businesses.",
    duration: "5 hours",
    topics: [
      "Budgeting",
      "Risk Management",
      "Credit Planning",
      "Market Analysis",
    ],
    level: "Beginner",
    color: "bg-[#283618]",
    link: "https://www.udemy.com/course/financial-management-for-farmers/", // Link to a course on Udemy
  },
  {
    title: "Agricultural Marketing Skills",
    type: "Practical Guide",
    description:
      "Learn effective marketing strategies for agricultural products and direct-to-consumer sales techniques.",
    duration: "4 hours",
    topics: [
      "Market Research",
      "Digital Marketing",
      "Value Chain",
      "Pricing Strategies",
    ],
    level: "Intermediate",
    color: "bg-[#606C38]",
    link: "https://www.agriculture.gov.au/ag-farm-food/agricultural-marketing-skills", // Link to an Australian government resource
  },
  {
    title: "Climate-Smart Agriculture",
    type: "Certificate Course",
    description:
      "Understanding climate change impacts on agriculture and adaptation strategies for sustainable farming.",
    duration: "12 hours",
    topics: [
      "Climate Adaptation",
      "Resilient Crops",
      "Weather Monitoring",
      "Risk Mitigation",
    ],
    level: "Advanced",
    color: "bg-[#283618]",
    link: "https://www.coursera.org/learn/climate-smart-agriculture", // Link to a course on Coursera
  },
];

const ResourceCard = ({ resource, index }) => {
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
        <div className={`p-6 h-full ${resource.color} text-[#FEFAE0]`}>
          <div className="space-y-5">
            <div className="flex justify-between items-start mb-5">
              <div className="relative">
                <h2 className="text-2xl font-bold mb-2">
                  {resource.title}
                </h2>
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-[#DDA15E] rounded-full" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <span className="px-3 py-1 bg-[#FEFAE0]/10 rounded-full text-[#FEFAE0]/90 text-sm font-medium">
                {resource.level}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[#FEFAE0]/90">
              <span className="text-[#DDA15E]">{resource.type}</span>
              <span className="text-[#FEFAE0]/50">•</span>
              <span>{resource.duration}</span>
            </div>

            <motion.div 
              className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-lg p-4 overflow-hidden relative"
              whileHover={{ 
                scale: 1.02, 
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
                <p className="text-[#FEFAE0]/90">{resource.description}</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-lg p-4 overflow-hidden relative"
              whileHover={{ 
                scale: 1.02, 
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
                <h3 className="text-lg font-semibold mb-3 text-[#DDA15E]">
                  Key Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resource.topics.map((topic, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-[#FEFAE0]/20 rounded-full text-[#FEFAE0] text-sm"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(254, 250, 224, 0.3)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex space-x-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#BC6C25" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 bg-[#DDA15E] text-[#283618] rounded-lg font-medium transition-all duration-300"
                onClick={() => window.open(resource.link, "_blank")} // Opens course link in a new tab
              >
                Start Learning
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(254, 250, 224, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#FEFAE0]/10 text-[#FEFAE0] rounded-lg font-medium transition-all duration-300"
              >
                Preview
              </motion.button> */}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LearningResourcesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] py-16 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#283618] mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-[#606C38] max-w-2xl mx-auto">
            Enhance your agricultural knowledge with our comprehensive learning
            materials designed for modern farmers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LearningResourcesPage;