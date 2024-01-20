import os
from dotenv import load_dotenv
from googlemaps import Client

load_dotenv()

key = os.getenv('MAPS_API_KEY')