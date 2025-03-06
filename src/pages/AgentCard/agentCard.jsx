/* eslint-disable react/prop-types */
import React from 'react'
import '../AgentCard/agentCard.css'


const AgentsCard = ({ agent }) => {
    return (
        <section className='card'>
            <div className="background"  style = {{ backgroundImage: `url(${agent.background})` }}>  
            </div>
            <div className='card-contents'>
                <img src={agent.displayIcon} alt={agent.displayName} />
                <h1 className='text-gray-400 font-bold text-2xl'>{agent.displayName}</h1>
                <p className='text-gray-400'>{agent.role?.displayName}</p>
            </div>
        </section>

    );
};

export default AgentsCard