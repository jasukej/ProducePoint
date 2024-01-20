import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from pymongo import MongoClient, GEOSPHERE

api = Flask(__name__)
load_dotenv()

client = MongoClient(os.getenv('MONGO_CONNECTION'))
db = client['ProducePoint']
users = db['users']
inventory = db['inventory']

@api.route('/create') # Creates a new user
def create_user():
    name = request.args.get('name')
    email = request.args.get('email')
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')

    if not name or not longitude or not latitude:
        return jsonify({'status': 404})

    user = {
        'name': name,
        'email': email,
        'inventory': {},
        'location': {'type': 'Point', 'coordinates': [longitude, latitude]}
    }

    users.insert_one(user)
    return jsonify({'status': 200})

@api.route('/add') # Adds produce to the user's inventory
def add_produce():
    email = request.args.get('email')
    produce = request.args.get('produce')
    quantity = request.args.get('quantity')

    if not email or not produce or not quantity:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    inventory = results['inventory']
    if produce in inventory:
        inventory[produce] += quantity
    else:
        inventory[produce] = quantity
    
    return jsonify({'status': 200})

@api.route('/request') # Returns a list of users within a specific radius that have the produce
def data():
    response = {
        'names': [],
        'emails':  [],
        'locations': [],
        'quantites': []
    }

    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    produce = request.args.get('produce')
    max_distance = request.args.get('max_distance')

    query_location = {'type': 'Point', 'coordinates': [longitude, latitude]}

    results = users.find({'location': {'$near': {'$geometry': query_location, '$maxDistance': max_distance}}})
    for result in results:
        if produce in result['inventory']:
            response['names'].append(result['name'])
            response['emails'].append(result['email'])
            response['locations'].append(result['location']['coordinates'])
            response['quantites'].append(result['inventory'][produce])

    return jsonify(response)