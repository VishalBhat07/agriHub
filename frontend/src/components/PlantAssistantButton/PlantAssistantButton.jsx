import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const PlantAssistantButton = ({ openModal }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative group">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >

          {/* Main button */}
          <motion.button
            onClick={openModal}
            className="w-16 h-16 bg-gradient-to-r from-green-700 to-green-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            whileHover={{
              scale: 1.1,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing background effect */}
            <motion.div
              className="absolute inset-0 bg-orange-200 bg-opacity-20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FontAwesomeIcon icon={faSeedling} className="text-2xl relative z-10" />
            </motion.div>

            {/* Floating particles */}
            <motion.div
              className="absolute top-2 right-2 w-1 h-1 bg-orange-400 rounded-full"
              animate={{ y: [-4, -8, -4], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-100 rounded-full"
              animate={{ y: [4, 8, 4], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
            />
          </motion.button>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-green-700 bg-opacity-20 rounded-full pointer-events-none"
            initial={{ scale: 1, opacity: 0.6 }}
            whileTap={{
              scale: 1.4,
              opacity: 0,
              transition: { duration: 0.3 },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PlantAssistantButton;