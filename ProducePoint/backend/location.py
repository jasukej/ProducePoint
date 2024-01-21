import os
import requests
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('MAPS_API_KEY')

def get_coordinates(address):
    url = f"http://dev.virtualearth.net/REST/v1/Locations?query={address}&key={api_key}"

    response = requests.get(url)
    data = response.json()

    if data['statusCode'] == 200:
        locations = data['resourceSets'][0]['resources']
        if locations:
            latitude = locations[0]['point']['coordinates'][0]
            longitude = locations[0]['point']['coordinates'][1]
            return longitude, latitude
        else:
            print('Error: No locations found')
            return None
    else:
        print('Error: ' + data['statusDescription'])
        return None

def get_address(longitude, latitude):
    url = f"http://dev.virtualearth.net/REST/v1/Locations/{latitude},{longitude}?o=json&key={api_key}"

    response = requests.get(url)
    data = response.json()

    if data['statusCode'] == 200:
        locations = data['resourceSets'][0]['resources']
        if locations:
            address = locations[0]['address']['formattedAddress']
            return address
        else:
            print('Error: Cannot find coordinates')
            return None
    else:
        print('Error: ' + data['statusDescription'])
        return None

def get_distance(start_location, end_location):
    try:
        url = f"http://dev.virtualearth.net/REST/v1/Routes"
        params = {
            'wp.0': ','.join(map(str, start_location[::-1])),
            'wp.1': ','.join(map(str, end_location[::-1])),
            'key': api_key
        }

        response = requests.get(url, params=params)
        route_data = response.json()

        if route_data['resourceSets'][0]['resources']:
            distance = route_data['resourceSets'][0]['resources'][0]['travelDistance']
            return distance
        else:
            raise ValueError("Route not found")
    except Exception as e:
        print(f"Error: {e}")