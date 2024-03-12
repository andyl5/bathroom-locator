from flask import Flask, request, url_for, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os
app = Flask(__name__)
CORS(app)  # This enables CORS for all routes
app.json.sort_keys = False


# API endpoints
@app.route("/bathrooms/<id>", methods=["GET"])
def get_one_bathroom(id):
    
    cnx = connect_to_database()

    try:
        cursor = cnx.cursor(dictionary=True)
        query = ("SELECT * FROM bathroom_locator.bathrooms "
                "WHERE id = %s")
        cursor.execute(query, (id,))
        rows = cursor.fetchall()
    
        result = []
        for d in rows:
            d["coordinates"] = {
                "latitude": d.pop("latitude"),
                "longitude": d.pop("longitude")
            }
            result.append(d)
            print(d)
        return result
    except:
        print("some error happened here")
        return {"Error": "Could not retrieve bathroom."}
    finally:
        cursor.close()
        cnx.close()

@app.route("/bathrooms/<lat>/<long>/<dist>")
def get_nearby_bathrooms(lat, long, dist):
    print(lat, long, dist)
    cnx = connect_to_database()
    try:
        # Execute stored procedure to retrieve the nearest bathrooms based on coordinates
        cursor = cnx.cursor(dictionary=True)
        result = []
        cursor.callproc('GetNearestBathrooms', (lat, long, dist))
        for row in cursor.stored_results():
            for d in row.fetchall():
                d["coordinates"] = {
                    "latitude": d.pop("latitude"),
                    "longitude": d.pop("longitude")
                }
                result.append(d)
                print(d)
        return result            
    except:
        print('Could not retrieve bathrooms')
        return {"Error": "Could not retrieve bathrooms."}
    finally:
        cursor.close()
        cnx.close()

@app.route("/new_bathrooms", methods=["GET", "POST"])
def add_bathroom():

    if request.method == "GET":
    # Get location name based on address via Nominatim
        lat = request.args["latitude"]
        lng = request.args["longitude"]

        geolocator = Nominatim(user_agent="test1", timeout=5)
        try:
            location = geolocator.reverse(f"{lat}, {lng}")
            latitude = location.latitude
            longitude = location.longitude            
            return {
                "latitude": latitude, 
                "longitude": longitude, 
                "address": location.raw["address"]
            }
        except Exception as e:
            print(e)
            return {"Error": "Unable to check inputted location."}

    elif request.method == "POST":
        name = request.form.get("name")
        address = request.form.get("address")
        city = request.form.get("city")
        state = request.form.get("state")
        postcode = request.form.get("postcode")
        complete_address = f"{address}, {city}, {state} {postcode}"

        latitude = request.form.get("latitude")
        longitude = request.form.get("longitude")
        cnx = connect_to_database()
        try:
            cursor = cnx.cursor(dictionary=True)
            query = ("INSERT INTO bathroom_locator.bathrooms "
                    "(name, address, latitude, longitude) "
                    "VALUES (%s, %s, %s, %s)"
            )
            bathroom_data = (name, complete_address, latitude, longitude)
            print(bathroom_data)
            cursor.execute(query, bathroom_data)
            cnx.commit()
            print("Successful insert into the database!")
            return {"message": "Successful insert into the database!"}
        except:
            print("Error occurred when inserting to the database.")
            return {"error": "Error occurred when inserting to the database."}
        finally:
            cursor.close()
            cnx.close()


# Utility Functions
def connect_to_database():
    try:
        db_user = os.getenv("DB_USER")
        db_password = os.getenv("DB_PASSWORD")
        db_host = os.getenv("DB_HOST")
        db_port = os.getenv("DB_PORT")
        db_name = os.getenv("DB_NAME")
    except:
        print("Add database credentials to the .env file")
    try:
        cnx = mysql.connector.connect(user=db_user, password=db_password, database=db_name, 
                                      host=db_host, port=db_port)
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)


if __name__ == "__main__":
    app.run(debug=True)