/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";


const Home = ({agents = []}) => {
  const featuredAgents = agents.filter((agent) =>
    ["Jett", "Phoenix", "Sova"].includes(agent.displayName)
  );
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-red-500 ml-10">ValoDex</h1>
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="hover:text-red-400">Home</Link></li>
          <li><Link href="/agents" className="hover:text-red-400">Agents</Link></li>
        
        </ul>
        <input
          type="text"
          placeholder="Search Agents..."
          className="px-3 py-1 rounded bg-gray-700 text-white border border-gray-600"
        />
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[500px] flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp10461819.jpg')` }}>
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
        <a href="/agents">
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            className="mt-5 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full"
          >
            Explore Agents 🚀
          </motion.button>
        </a>
      </header>

      {/* Featured Agents Section */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center mb-6">🔥 Featured Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Replace with API data later */}
          {featuredAgents.map((agent, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-5 rounded-lg shadow-lg text-center"
            >
              <img 
                src={agent.displayIcon}
                alt={agent}
                className="w-24 h-24 mx-auto mb-3"
              />
              <h3 className="text-xl font-semibold">{agent}</h3>
              <p className="text-gray-400">Duelist</p>
            </motion.div>
          ))}
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
