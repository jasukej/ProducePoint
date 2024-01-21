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
            return latitude, longitude
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