/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/Components/loading";
import AgentsCard from "../AgentCard/agentCard";
import "../Home/Home.css"


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

        console.log(data.data);

        const playableAgents = data.data?.filter(agent => agent.isPlayableCharacter) || [];

        setAgents(playableAgents);
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

  const filteredAgents = agents.filter((agent) =>
    agent.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bodyui">
      <div className="bg-gray-900 text-white min-h-screen ">
        {/* Navbar */}
        <nav className="flex flex-wrap justify-between items-center px-5 py-4 bg-gray-800 shadow-md">
          <h1 className="text-3xl font-bold text-red-500">ValoDex</h1>

          {/* <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="hover:text-red-400">Home</Link></li>
        <li><Link to="/abilities" className="hover:text-red-400">Abilities</Link></li>
      </ul> */}

          {/* Search Bar (Mobile-Friendly) */}
          <input
            type="text"
            placeholder="Search Agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3  py-1 rounded bg-gray-700 text-white border border-gray-600 w-full md:w-auto mt-3 md:mt-0"
          />
        </nav>

        {/* Hero Section */}
        <header
          className="relative w-full h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/e1ba56c2480992f0e85b03258b12647e03222869-854x484.png?auto=format&fit=fill&q=80&w=854')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white relative"
          >
            Master the Game. Know Your Agents.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-base md:text-lg text-gray-300 relative">
            Explore all Valorant agents, their abilities, and roles.<br></br>
            Click on Card To See Abilities.
          </motion.p>

          {/* <Link to="/agents"> */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            className="mt-5 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full relative"
            onClick={() => { document.getElementById('agents-section').scrollIntoView({ behavior: 'smooth' }) }}
          >
            Explore Agents 🚀
          </motion.button>
          {/* </Link> */}
        </header>

        {/* Search Results Section */}
        <section id="agents-section" className="p-5 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">🔥 Search Results</h2>
          <h2 className="text-sm md:text-3xl font-bold text-center mb-10 ml-4 block md:hidden">
            Touch and Hold the Card to See Magic💫
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <AgentsCard key={agent.uuid} agent={agent} />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">No agents found...</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 p-4 text-center">
          <p>© 2025 ValoDex | Built with Valorant API</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
