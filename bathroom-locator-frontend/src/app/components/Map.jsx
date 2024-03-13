"use client"

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function Map({ name, latitude, longitude, url, distance }) {

  const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
      useEffect(() => {
        map.setView([lat, lng]);
      }, [lat, lng]);
    return null;
  }
  
  return (
    <div>
      <MapContainer center={[latitude, longitude]} zoom={17} scrollWheelZoom={true} style={{height: "400px"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[latitude, longitude]}>
          <Popup>
            {name} <br /> {distance} miles away
          </Popup>
        </Marker>
        <RecenterAutomatically lat={latitude} lng={longitude} />
      </MapContainer>
      <button className="bg-blue-500 rounded mt-2 px-4 py-2 text-white"><a href={url} target="_blank">Get directions</a></button>
    </div>
  );
};
