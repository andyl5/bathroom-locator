# Bathroom Locator
You’re outside in NYC exploring a new part of the city, but then you get the urge to use the bathroom. Where is the nearest bathroom? That's when you use Bathroom Locator!

Bathroom Locator shows you nearby public bathrooms based on your device's GPS location. It also shows details about a bathroom such as user ratings and reviews, so you can choose the best bathroom to take care of your business.

DEMO COMING SOON

## How It's Made:

**Tech used:** Flask, React, Tailwind, Axios, MySQL, LeafletJS

## How It Works:

All bathroom locations are sourced from the [got2gonyc map](https://www.got2gonyc.com/about), a crowdsourced list of public bathrooms in NYC.
1. The web app will ask for the user's current location. If the user consents, the device's coordinates will be passed to a Flask API endpoint.
2. The backend will execute an SQL query that returns the 20 nearest bathrooms. It achieves this by calculating the distance between the user and each bathroom in the database, using the Haversine formula. The results are formatted into a JSON object and sent to the frontend for rendering.
3. The frontend will render cards with bathroom details, including directions. 

## Lessons Learned:

I learned how to design a RESTful API with Flask to handle client HTTP requests and perform CRUD operations on the MySQL database with the `mysql-connector-python` module. I also learned to handle Python exceptions by wrapping code in try/except blocks. This prevented unexpected errors from disrupting the backend server.

One challenge I encountered was the Leaflet map failing to reposition its view to its corresponding location when a new bathroom was selected. To solve this issue, I utilized the `useEffect` hook to dynamically re-render the map when the latitude and longitude changes.

## In Progress
* Review queue to approve user-submitted bathrooms
* Adding more bathroom details, user ratings, reviews
* User login and authentication (Google OAuth)
