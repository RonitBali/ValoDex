/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/Components/loading";
import AgentsCard from "../AgentCard/agentCard";

const Home = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://valorant-api.com/v1/agents");
        const data = await res.json();
        console.log("API Response:", data.data);
        
        setAgents(data.data || []); // Ensure it's always an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // 🔥 Fix search logic
  const filteredAgents = agents.filter((agent) =>
    agent.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-red-500 ml-10">ValoDex</h1>
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-red-400">Home</Link></li>
          <li><Link to="/agents" className="hover:text-red-400">Agents</Link></li>
        </ul>
        <input
          type="text"
          placeholder="Search Agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 rounded bg-gray-700 text-white border border-gray-600"
        />
      </nav>

      {/* Hero Section */}
      <header 
        className="relative w-full h-[500px] flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/e1ba56c2480992f0e85b03258b12647e03222869-854x484.png?auto=format&fit=fill&q=80&w=854')` }}>
        
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl font-bold text-white relative"
        >
          Master the Game. Know Your Agents.
        </motion.h1>
        
        <p className="mt-3 text-lg text-gray-300 relative">
          Explore all Valorant agents, their abilities, and roles.
        </p>

        {/* 🔥 Fixed Button */}
        <Link to="/agents">
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            className="mt-5 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full"
          >
            Explore Agents 🚀
          </motion.button>
        </Link>
      </header>

      {/* 🔥 Agents Section (Filtered Based on Search) */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center mb-6">🔥 Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <AgentsCard key={agent.uuid} agent={agent} />
            ))
          ) : (
            <p className="text-center text-gray-400">No agents found...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-center">
        <p>© 2025 ValoDex | Built with Valorant API</p>
      </footer>
    </div>
  );
};

export default Home;
