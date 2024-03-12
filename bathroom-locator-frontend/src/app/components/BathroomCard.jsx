"use client";

import { useState, useEffect } from "react";
import BathroomDetail from "./BathroomDetail";

export default function BathroomCard() {

  const [bathroomArray, setBathroomArray] = useState([])
  const [curLat, setCurLat] = useState()
  const [curLng, setCurLng] = useState()
  
  function handleSetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setCurLat(latitude)
      setCurLng(longitude)
    });
  }
  
  async function getNearbyBathrooms() {
    const axios = require('axios').default;
    await axios.get(`http://127.0.0.1:5000/bathrooms/${curLat}/${curLng}/100`)
    .then(response => {
      console.log(response.data)
      setBathroomArray(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (curLat !== undefined && curLng !== undefined){
      getNearbyBathrooms()
    }
  }, [curLat, curLng])

  const bathroomCard = (
    <div
      className="space-y-4 !=flex !=flex-col !=flex-wrap">
      {bathroomArray.map((bathroom) => (
        <div 
        className="bg-white text-black container mx-auto box-border w-96 rounded-lg p-4 font-sans hover:scale-105 active:opacity-75"
				key={bathroom.id}
				onClick={() => handleOpenBathroom(bathroom)}>
          <div className="">{bathroom.name}</div>
          <div className="font-bold">{bathroom.address}</div>
          <div className="font-medium text-blue-500">{Math.round(bathroom.distance * 100) / 100}mi</div>
        </div>
      ))}
    </div>
  );

  const [selectedBathroom, setSelectedBathroom] = useState(null);
	const [showDetail, setShowDetail] = useState(false)
	function handleOpenBathroom(bathroom) {
    setShowDetail(true)
    setSelectedBathroom(bathroom)
	}

  function handleCloseBathroom() {
    setShowDetail(false)
  }

  return (
    <div>
      <div>
        {curLat && curLng ? `Your Location: ${curLat}, ${curLng}` : "Click to find nearby bathrooms!"}
      </div>
      <button className="bg-blue-500 rounded px-2 py-2" onClick={handleSetLocation}>Set Location</button>
			<div className="flex flex-row justify-center gap-16">
				{curLat && curLng ? bathroomCard : null}

				{showDetail ? (
          <div className="sticky top-0 h-screen p-4">
            <BathroomDetail 
              name={selectedBathroom.name} 
              address={selectedBathroom.address} 
              distance={Math.round(selectedBathroom.distance * 100) / 100}
              latitude={selectedBathroom.coordinates.latitude}
              longitude={selectedBathroom.coordinates.longitude}
              handleClick={handleCloseBathroom}/>
          </div>) :
          null
				}
			</div>
    </div>
  );
}
