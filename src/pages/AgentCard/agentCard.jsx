/* eslint-disable react/prop-types */
import React from "react";
import "../AgentCard/agentCard.css";
import { motion } from "framer-motion";

const AgentsCard = ({ agent }) => {
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
        whileHover="hover"
        initial="initial"
      >
        {/* Background Image */}
        <div 
          className="background"  
          style={{ backgroundImage: `url(${agent.background})` }}
        ></div>

        {/* Card Contents (Text and Display Icon) */}
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

        {/* Enlarged Full Portrait on Hover */}
        <motion.img 
          src={agent.fullPortrait}
          alt={agent.displayName}
          className="agent-image"
        
          initial={{scale:0.8,opacity:0}}
                 whileHover={{opacity:1,scale:2.7,y:-200}}
                 transition={{duration:0.2}}
          
        />
      </motion.div>
    </motion.section>
  );
};

export default AgentsCard;



