/* eslint-disable react/prop-types */
import React from 'react'
import '../AgentCard/agentCard.css'
import { motion } from 'framer-motion';


const AgentsCard = ({ agent }) => {
    return (
        
        <motion.section 
        initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            viewport={{ once: true, amount: 0.1 }}
        className='card-container'>
            <div className='card'>
            <div className="background"  style = {{ backgroundImage: `url(${agent.background})` }}>  
            </div>
            <div className='card-contents'>
                <img src={agent.displayIcon} alt={agent.displayName} />
                <h1 className='text-gray-400 font-bold text-2xl'>{agent.displayName}</h1>
                <p className='text-gray-400'>{agent.role?.displayName}</p>
            </div>
            </div>
        </motion.section>

    );
};

export default AgentsCard