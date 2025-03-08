import React from "react";
import { useLocation } from "react-router-dom";
import "../Home/Home.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const AbilitiesPage = () => {
  const location = useLocation();
  const { agent } = location.state || {}; 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (!agent) {
    return <h1 className="text-center text-white text-2xl">No Agent Selected</h1>;
  }

  return (
    <div className="bodyui2">
      <div className="abilities-container">
        <h1 className="abilities-title">{agent.displayName} Abilities</h1>
        <motion.div className="abilities-grid">
          {agent.abilities.map((ability, index) => (
            <motion.div 
              key={index} 
              className="ability-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="ability-slot">{ability.slot}</h1>
              {ability.displayIcon && (
                <img src={ability.displayIcon} alt={ability.displayName} className="ability-image" />
              )}
              <h2 className="ability-name">{ability.displayName}</h2>
              <p className="ability-description">{ability.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AbilitiesPage;
