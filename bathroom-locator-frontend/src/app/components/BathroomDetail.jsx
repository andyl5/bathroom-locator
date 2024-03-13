"use client"

import Image from "next/image"
import bathroomImage from "../images/cook-eatery.jpg"
import Map from "./Map"
import { useState } from 'react'
import TabBar from "./TabBar"

export default function BathroomDetail({ name, address, distance, latitude, longitude, handleClick }) {

	// USE THIS ONE BECAUSE IT IS THE MOST SPECIFIC. should return the actual business, not just a building
	// name+address search (should be fine, as long as all locations are verified beforehand)
	const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${name}+${address}`

	const [activeTab, setActiveTab] = useState(1)

	function handleTabChange(tab) {
	setActiveTab(tab)
	}

	function isActiveTab(tab) {
	if (activeTab === tab) {
			return true
		}
	return false
	}

	const infoContent = (
		<div>
			{/* placeholder image. later, images will be loaded from cdn */}
			<Image src={bathroomImage} alt={address}/>
			<div>{name}</div>
			<div>{address}</div>
			<div>{distance}mi</div>
		</div>
	)

	return (
		<div>
			<div className="bg-white text-black container mx-auto box-border h-max min-h-96 w-96 rounded-lg p-4 font-sans">
				<button type="button" onClick={handleClick} className="float-right text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
					<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
					</svg>
					<span className="sr-only">Close modal</span>
				</button>
				<div className="mb-4 ~border-b border-gray-200 dark:border-gray-700">
					<ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
						<TabBar id={1} title={"Info"} activeTab={activeTab} handleTabChange={handleTabChange} />
						<TabBar id={2} title={"Map"} activeTab={activeTab} handleTabChange={handleTabChange} />
					</ul>
				</div>
				<div>
					<div className={`${isActiveTab(1) ? "" : "hidden"} p-4 rounded-lg bg-gray-50 ~dark:bg-gray-800`} role="tabpanel">
						{infoContent}
					</div>
					<div className={`${isActiveTab(2) ? "" : "hidden"} p-4 rounded-lg bg-gray-50 ~dark:bg-gray-800`} role="tabpanel">
						{isActiveTab(2) ? <Map name={name} distance={distance} url={googleMapsURL} latitude={latitude} longitude={longitude} /> : null}
					</div>
				</div>
			</div>
		</div>
	)
}