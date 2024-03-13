"use client";

import { useState, useEffect } from "react";
import BathroomDetail from "./BathroomDetail";

export default function BathroomCard() {

  const bathroomData = [
    {
        "id": 1,
        "name": "Grand Central Terminal",
        "address": "89 E 42nd St, New York, NY 10017",
        "distance": 5.263035387440032,
        "coordinates": {
            "latitude": 40.753502977601556,
            "longitude": -73.97670958600733
        }
    },
    {
        "id": 2,
        "name": "Starbucks",
        "address": "90 Park Ave, New York, NY 10016",
        "distance": 5.326886049510473,
        "coordinates": {
            "latitude": 40.750708278655836,
            "longitude": -73.97877332387064
        }
    },
    {
        "id": 9,
        "name": "Andaz 5th Avenue - a Concept by Hyatt",
        "address": "At E, 485 5th Avenue, E 41st St, New York, NY 10017",
        "distance": 5.459944805109933,
        "coordinates": {
            "latitude": 40.75287592736497,
            "longitude": -73.98076498882166
        }
    },
    {
        "id": 15,
        "name": "New York Public Library - Stephen A. Schwarzman Building",
        "address": "476 5th Ave, New York, NY 10018",
        "distance": 5.498525238186707,
        "coordinates": {
            "latitude": 40.75371870632685,
            "longitude": -73.98126634714245
        }
    },
    {
        "id": 7,
        "name": "The Langham, New York, Fifth Avenue",
        "address": "400 5th Ave, New York, NY 10018",
        "distance": 5.576772010437946,
        "coordinates": {
            "latitude": 40.75020969294856,
            "longitude": -73.98376053204085
        }
    },
    {
        "id": 5,
        "name": "Le Pain Quotidien",
        "address": "70 W 40th St, New York, NY 10018",
        "distance": 5.656587914502839,
        "coordinates": {
            "latitude": 40.75319530955161,
            "longitude": -73.98451967073959
        }
    },
    {
        "id": 8,
        "name": "COOK EATERY",
        "address": "115 W 45th St, New York, NY 10036",
        "distance": 5.668346077071181,
        "coordinates": {
            "latitude": 40.75721911017587,
            "longitude": -73.98344154923089
        }
    },
    {
        "id": 6,
        "name": "Ole & Steen",
        "address": "80 W 40th St, New York, NY 10018",
        "distance": 5.670069683679319,
        "coordinates": {
            "latitude": 40.75334566627758,
            "longitude": -73.98473961187187
        }
    },
    {
        "id": 3,
        "name": "Whole Foods Market",
        "address": "1095 6th Ave, New York, NY 10036",
        "distance": 5.677444294685751,
        "coordinates": {
            "latitude": 40.754624318733995,
            "longitude": -73.98449634690898
        }
    },
    {
        "id": 4,
        "name": "Pret A Manager",
        "address": "4 Bryant Pk, New York, NY 10018",
        "distance": 5.697513626735561,
        "coordinates": {
            "latitude": 40.75406902676953,
            "longitude": -73.98506160246566
        }
    },
    {
        "id": 11,
        "name": "Hard Rock Hotel New York",
        "address": "159 W 48th St, New York, NY 10036",
        "distance": 5.709861803999694,
        "coordinates": {
            "latitude": 40.759890933999124,
            "longitude": -73.98324331407873
        }
    },
    {
        "id": 13,
        "name": "Museum of Broadway",
        "address": "145 W 45th St, New York, NY 10036",
        "distance": 5.722966860902427,
        "coordinates": {
            "latitude": 40.757805569402734,
            "longitude": -73.98431056557268
        }
    },
    {
        "id": 12,
        "name": "Famous Original Ray's Pizza",
        "address": "736 7th Ave, New York, NY 10019",
        "distance": 5.7621231378493825,
        "coordinates": {
            "latitude": 40.760445881107856,
            "longitude": -73.98406166363345
        }
    },
    {
        "id": 14,
        "name": "Disney Store",
        "address": "1540 Broadway, New York, NY 10036",
        "distance": 5.764439722796333,
        "coordinates": {
            "latitude": 40.75828619841715,
            "longitude": -73.98495556058029
        }
    },
    {
        "id": 18,
        "name": "CAVA",
        "address": "1165 Broadway, New York City, New York 10001",
        "distance": 5.793976004837772,
        "coordinates": {
            "latitude": 40.74480222350963,
            "longitude": -73.98900121450426
        }
    },
    {
        "id": 10,
        "name": "Pink Taco",
        "address": "7 Times Sq, New York, NY 10036",
        "distance": 5.824357771454576,
        "coordinates": {
            "latitude": 40.755439957931586,
            "longitude": -73.98712438777311
        }
    }
]
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
