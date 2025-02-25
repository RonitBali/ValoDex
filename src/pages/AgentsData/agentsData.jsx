import React, { useEffect, useState } from 'react';
import Home from '../Home/Home';

const AgentsData = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://valorant-api.com/v1/agents");
        const data = await res.json();
        setAgents(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      
      <ul>
        {agents.map((agent)=>(
          <div key={agent.uuid}>
            <img src={agent.displayIcon} alt="" />
            <h2>{agent.displayName}</h2>
            <p>{agent.description}</p>
          </div>
        ))}
      </ul>
      <Home agents = {agents}/>
    </div>
    
  );
};

export default AgentsData;