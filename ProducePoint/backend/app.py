import os
from location import get_coordinates
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from pymongo import MongoClient, GEOSPHERE

api = Flask(__name__)
load_dotenv()

client = MongoClient(os.getenv('MONGO_CONNECTION'))
db = client['ProducePoint']
users = db['users']

print(client.list_database_names())

@api.route('/api/create') # Creates a new user
def create_user():
    usertype = request.args.get('usertype')
    email = request.args.get('email')
    address = request.args.get('address')

    if not usertype or not email or not address:
        return jsonify({'status': 404})
    
    longitude, latitude = get_coordinates(address)

    user = {
        'email': email,
        'type': usertype, # 'business' or 'individual'
        'inventory': {},
        'location': {'type': 'Point', 'coordinates': [longitude, latitude]}
    }

    users.insert_one(user)
    return jsonify({'status': 200})

@api.route('/api/add') # Adds produce to the user's inventory
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

@api.route('/api/request') # Returns a list of users within a specific radius that have the produce
def data():
    response = {
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
            response['emails'].append(result['email'])
            response['locations'].append(result['location']['coordinates'])
            response['quantites'].append(result['inventory'][produce])

    return jsonify(response)

@api.route('/api/get') # Returns the user's inventory
def get_inventory():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    return jsonify(results['inventory'])

@api.route('/api/remove') # Removes produce from the user's inventory
def remove_produce():
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
        inventory[produce] -= quantity
        if inventory[produce] <= 0:
            del inventory[produce]
    
    return jsonify({'status': 200})