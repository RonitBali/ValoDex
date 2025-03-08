import React from "react";
import { useLocation } from "react-router-dom";
import "../Home/Home.css"
import { motion } from "framer-motion";

const AbilitiesPage = () => {
  const location = useLocation();
  const { agent } = location.state || {}; 

  if (!agent) {
    return <h1 className="text-center text-white text-2xl">No Agent Selected</h1>;
  }

  return (
    <div className="bodyui">
    <div className=" min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 ">
      <h1 className="text-4xl font-bold">{agent.displayName} Abilities</h1>
      <motion.div 
      
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {agent.abilities.map((ability, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            {ability.displayIcon && (
              <img src={ability.displayIcon} alt={ability.displayName} className="mx-auto h-16" />
            )}
            <h2 className="text-xl font-semibold mt-2">{ability.displayName}</h2>
            <p className="text-gray-400 text-sm mt-1">{ability.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default AbilitiesPage;
