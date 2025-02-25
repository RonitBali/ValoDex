import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/Components/ui/input";

// const fetchAgents = async () => {
//   try {
//     const response = await fetch("https://valorant-api.com/v1/agents");
//     const data = await response.json();
//     return data.data.filter(agent => agent.isPlayableCharacter);
//   } catch (error) {
//     console.error("Error fetching agents:", error);
//     return [];
//   }
// };

// const HomePage = () => {
//   const [agents, setAgents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     fetchAgents().then(setAgents);
//   }, []);

//   const filteredAgents = agents.filter(
//     (agent) =>
//       agent.displayName.toLowerCase().includes(search.toLowerCase()) &&
//       (filter === "All" || agent.role?.displayName === filter)
//   );

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Valorant Agents</h1>
//       <Input placeholder="Search Agents..." className="mb-4" onChange={(e) => setSearch(e.target.value)} />
//       <select className="mb-4 p-2 border" onChange={(e) => setFilter(e.target.value)}>
//         <option>All</option>
//         <option>Duelist</option>
//         <option>Controller</option>
//         <option>Sentinel</option>
//         <option>Initiator</option>
//       </select>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {filteredAgents.map((agent) => (
//           <Link to={`/agent/${agent.uuid}`} key={agent.uuid}>
//             <Card className="hover:shadow-lg">
//               <img src={agent.displayIcon} alt={agent.displayName} className="w-full h-40 object-cover" />
//               <CardContent>
//                 <h2 className="text-lg font-bold">{agent.displayName}</h2>
//                 <p className="text-gray-500">{agent.role?.displayName || "Unknown"}</p>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// const AgentDetails = () => {
//   const { id } = useParams();
//   const [agent, setAgent] = useState(null);

//   useEffect(() => {
//     fetch(`https://valorant-api.com/v1/agents/${id}`)
//       .then((res) => res.json())
//       .then((data) => setAgent(data.data));
//   }, [id]);

//   if (!agent) return <div>Loading...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <img src={agent.fullPortrait} alt={agent.displayName} className="w-full h-auto rounded-lg" />
//       <h1 className="text-4xl font-bold mt-4">{agent.displayName}</h1>
//       <p className="text-lg text-gray-600 mb-4">{agent.role?.displayName}</p>
//       <h2 className="text-2xl font-semibold">Abilities:</h2>
//       <ul>
//         {agent.abilities.map((ability) => (
//           <li key={ability.slot} className="mt-2">
//             <strong>{ability.displayName}:</strong> {ability.description}
//           </li>
//         ))}
//       </ul>
//       <Link to="/" className="text-blue-500 mt-4 block">Back to Agents</Link>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/agent/:id" element={<AgentDetails />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

