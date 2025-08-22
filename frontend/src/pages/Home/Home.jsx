import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faLightbulb,
  faSun,
  faLeaf,
  faPaperPlane,
  faArrowRight,
  faTractor,
  faHandHoldingHeart,
  faUsers,
  faChartLine,
  faCloud,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Hero = () => (
  <section className="relative min-h-[90vh] overflow-hidden bg-[#FEFAE0]">
    <div className="absolute w-full h-full bg-pattern opacity-5 z-0"></div>
    
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-[#283618] mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          BharathHarvest: <span className="text-[#606C38]">Empowering</span> Farmers
        </motion.h1>
        
        <motion.h2
          className="text-xl md:text-2xl text-[#283618]/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Farming Made Easier
        </motion.h2>
        
        <motion.p
          className="text-lg text-[#283618]/70 leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          BharathHarvest is here to support farmers with crop sales, modern farming
          techniques, weather updates, and more. Empowering the agricultural
          community, one farmer at a time.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-6 py-3 bg-[#606C38] text-[#FEFAE0] rounded-md font-medium"
            whileHover={{ scale: 1.05, backgroundColor: "#283618" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Get Started
          </motion.button>
          <motion.button
            className="px-6 py-3 border-2 border-[#606C38] text-[#606C38] rounded-md font-medium"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(96, 108, 56, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Explore Features
          </motion.button>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative w-full max-w-md">
          <motion.div 
            className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-[#BC6C25]/20 z-0"
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#606C38]/20 z-0"
            animate={{ 
              rotate: [0, -15, 0, 15, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          
          <div className="relative z-10 bg-gradient-to-br from-[#283618]/10 to-[#DDA15E]/20 rounded-xl shadow-lg overflow-hidden p-8">
            <motion.div 
              className="w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <ul className="space-y-4">
                {[
                  { icon: faSeedling, text: "Buy and sell crops easily" },
                  { icon: faLightbulb, text: "Learn modern farming techniques" },
                  { icon: faSun, text: "Access our own chatbot" },
                  { icon: faLeaf, text: "Analyze crop prices" },
                  { icon: faPaperPlane, text: "Get notified about government schemes" },
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white bg-opacity-70 backdrop-blur-sm hover:bg-opacity-90 transition-all"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      x: 5, 
                      backgroundColor: "rgba(255, 255, 255, 0.9)" 
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#606C38] flex items-center justify-center text-[#FEFAE0]">
                      <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <span className="text-[#283618] font-medium">{feature.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
    
    <motion.div 
      className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-[#606C38] via-[#DDA15E] to-[#283618] opacity-70"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
  </section>
);

const Stats = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-[#283618] mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Our <span className="text-[#BC6C25]">Impact</span> in Numbers
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: faTractor, value: "10,000+", label: "Active Farmers" },
            { icon: faHandHoldingHeart, value: "50,000+", label: "Successful Trades" },
            { icon: faUsers, value: "100+", label: "Expert Consultants" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-[#FEFAE0] rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#606C38]/10 z-0 group-hover:bg-[#606C38]/20 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-lg bg-[#DDA15E]/20 flex items-center justify-center text-[#BC6C25]">
                  <FontAwesomeIcon icon={stat.icon} size="2x" />
                </div>
                
                <h3 className="text-3xl font-bold text-[#283618] mb-2">{stat.value}</h3>
                <p className="text-[#606C38]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-24 bg-[#283618]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-[#FEFAE0] mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose BharathHarvest?
        </motion.h2>
        
        <motion.p 
          className="text-lg text-center text-[#FEFAE0]/80 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover the tools and resources that make us the preferred platform for farmers across India
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            {
              icon: faChartLine,
              title: "Market Insights",
              description:
                "Real-time crop price analytics and market trends to help you make informed decisions.",
            },
            {
              icon: faLightbulb,
              title: "Chat Bot",
              description:
                "Your own chatbot for agricultural advisories and better crop planning.",
            },
            {
              icon: faNewspaper,
              title: "Latest Updates",
              description:
                "Stay informed about agricultural policies and government schemes.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#FEFAE0] rounded-lg p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#DDA15E]" />
              
              <div className="w-14 h-14 rounded-lg bg-[#606C38] flex items-center justify-center text-[#FEFAE0] mb-6">
                <FontAwesomeIcon icon={feature.icon} size="lg" />
              </div>
              
              <h3 className="text-xl font-bold text-[#283618] mb-4">{feature.title}</h3>
              <p className="text-[#283618]/80">{feature.description}</p>
              
              <motion.div 
                className="mt-6 flex items-center gap-2 text-[#606C38] font-medium cursor-pointer group"
                whileHover={{ x: 5 }}
              >
                <span>Learn more</span>
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="transition-transform group-hover:translate-x-1" 
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CallToAction = () => (
  <section className="py-20 bg-[#FEFAE0] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-[#283618] mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Join Our Growing Community
        </motion.h2>
        
        <motion.p 
          className="text-xl text-[#283618]/70 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connect with farmers, experts, and agriculture enthusiasts
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 bg-[#BC6C25] text-white rounded-lg text-xl font-semibold"
            whileHover={{ scale: 1.05, backgroundColor: "#a35a1f" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Join Now
          </motion.button>
        </motion.div>
      </div>
    </div>
    
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#606C38]/10 z-0" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#DDA15E]/10 z-0" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#283618]/10 z-0" />
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-[#BC6C25]/10 z-0" />
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Home;