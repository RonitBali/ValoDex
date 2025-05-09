import React from 'react'
import { useState, useEffect } from 'react'

const Map = () => {
    const [mapdata, setMapData] = useState([]);

    useEffect(() => {
        async function getmapData() {
            const res = await fetch("https://valorant-api.com/v1/maps");
            const data = await res.json();
            // console.log(data.data)
            setMapData(data.data);
        }
        getmapData();
    }, [])


    return (
        <div  className="min-h-screen bg-[linear-gradient(135deg,_#0f172a,_#1e293b)] font-[Outfit]">
            <div>
             <h1 className='text-gray-400 text-4xl text-center'>Valorant Maps</h1>
             </div>
            <div>
                {mapdata.map((map) => (
                    <>
                    {/* <img src={map.premierBackgroundImage} alt={map.displayName} height={300} width={300} /> */}
                    <img src={map.splash} alt={map.displayName} height={300} width={300} />
                    <p className='text-gray-100 text-3xl' key={map.uuid}>{map.displayName}</p>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Map


