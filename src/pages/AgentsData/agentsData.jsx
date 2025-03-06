// import React, { useEffect, useState } from 'react';
// import Home from '../Home/Home';
// import AgentsCard from '../AgentCard/agentCard';
// import Loading from '@/Components/Loading';

// const AgentsData = () => {
//   const [agents, setAgents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading,setLoading] = useState(true);

//   useEffect(() => {
//     async function getData() {
//       try {
//         const res = await fetch("https://valorant-api.com/v1/agents");
//         const data = await res.json();
//         setAgents(data.data);
//         setLoading(false)
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getData();
//   }, []);

//   if (loading) {
//     return <Loading/>
//   }

//   const filteredAgent =
//    search ? agents.filter((agent)=> agent.displayName.toLowerCase.includes(search.toLowerCase()))
//    : agents;

//   return (
//     <section className="p-10 bg-gray-900 text-white min-h-screen">
//         <h2 className="text-3xl font-bold text-center mb-6">🔥 All Valorant Agents</h2>
//         <div className='flex justify-center mb-6'>
//       <input type="text"
//       placeholder='Search agent...' 
//       value={search}
//       onChange={(e)=>{setSearch(e.target.value)}}
//       />
//       <div/>
//       {/* <ul>
//         {agents.map((agent)=>(
//           <div key={agent.uuid}>
//             <img src={agent.displayIcon} alt="" />
//             <h2>{agent.displayName}</h2>
//             <p>{agent.description}</p>
//           </div>
//         ))}
//       </ul> */}
//       <div className="agent-card-list">
//         {filteredAgent.map((agent) => (
//           <AgentsCard key={agent.uuid} agent={agent} />
//         ))}
//       </div>
//     </div>
//     </section>
    
//   );
// };

// export default AgentsData;