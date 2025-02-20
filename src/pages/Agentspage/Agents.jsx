/* eslint-disable react/jsx-key */
import "../Agentspage/Agents.css"
import React, { useState, useEffect } from 'react';

const Agents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://valorant-api.com/v1/agents");
        const json = await res.json();
        // Access the `data` field in the API response
        if (json.data && json.data.length) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((agent) => (
          <section key={agent.uuid} id={agent.uuid}>
            <img src={agent.displayIconSmall} alt="" />
            <li>Title: {agent.displayName}</li>
            <li>Body: {agent.description || "No description available"}</li>
          </section>
        ))}
      </ul>
    </div>
  );
};

export default Agents;
