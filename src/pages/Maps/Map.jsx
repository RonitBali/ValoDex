import React from 'react'
import { useState, useEffect } from 'react'

const Map = () => {
    const [mapdata, setMapData] = useState([]);

    useEffect(() => {
        async function getmapData() {
            const res = await fetch("https://valorant-api.com/v1/maps");
            const data = await res.json();
            // console.log(data.data)
            const uniquemaps = data.data.filter(map, index, self => 
                index === self.findindex((m)=>m.uuid === map.uuid) );
            setMapData(uniquemaps);
        }
        getmapData();
    }, [])


    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,_#0f172a,_#1e293b)] font-[Outfit]">
            <div>
                <h1 className='text-gray-400 text-4xl text-center'>Valorant Maps</h1>
            </div>
            <div className='mt-5 flex flex-wrap gap-6 justify-center'>
                {mapdata.map((map) => (
                    <div key={map.uuid} 
                    className='bg-[#112a37b4] rounded-xl overflow-hidden shadow-xl w-80 flex flex-col items-center p-4'>
                        <img src={map.splash}
                            alt={map.displayName}
                            className='w-full h-70 rounded-lg object-cover'
                        />
                        <p className='text-gray-200 text-xl mt-2'>
                            {map.displayName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Map


