/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../AgentCard/agentCard.css";
import { motion } from "framer-motion";

const AgentsCard = ({ agent }) => {
  const [isHeld, setIsHeld] = useState(false);
  let holdTimeout;

  
  const handleTouchStart = () => {
    holdTimeout = setTimeout(() => {
      setIsHeld(true);
    }, 500);
  };


  const handleTouchEnd = () => {
    clearTimeout(holdTimeout);
    setIsHeld(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className="card-container"
    >
      <motion.div 
        className="card"
        initial="initial"
        whileHover="hover"
        animate={isHeld ? "hover" : "initial"} 
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.05 }
        }}
        transition={{ duration: 0.1 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="background"  
          style={{ backgroundImage: `url(${agent.background})` }}
        ></div>

     
        <motion.div 
          className="card-contents"
          variants={{
            initial: { opacity: 1 },
            hover: { opacity: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-gray-400 font-bold text-2xl">{agent.displayName}</h1>
          <p className="text-gray-400">{agent.role?.displayName}</p>
        </motion.div>

     
        <motion.img 
          src={agent.fullPortrait}
          alt={agent.displayName}
          className="agent-image"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            hover: { opacity: 1, scale: 2.7, y: -200 }
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.section>
  );
};

export default AgentsCard;

                //  initial={{scale:0.8,opacity:0}}
                //  whileHover={{opacity:1,scale:2.7,y:-200}}
                //  transition={{duration:0.2}}



