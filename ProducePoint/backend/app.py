import os
from location import get_coordinates, get_address
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from pymongo import MongoClient, GEOSPHERE
from flask_cors import CORS

api = Flask(__name__)
load_dotenv()

client = MongoClient(os.getenv('MONGO_CONNECTION'))

cors = CORS(api, resources={
    r"/*": {
        "origins": "http://localhost:5173"
    }
})

cors.init_app(api)

db = client['ProducePoint']
users = db['users']
all_produce = db['produce']

@api.route('/')
def index():
    return 'ProducePoint API'

@api.route('/api/create', methods=['POST']) # Creates a new user
def create_user():
    email = request.args.get('email')
    name = request.args.get('name')
    address = request.args.get('address')

    if not name or not email or not address:
        return jsonify({'status': 404})
    
    coordinates = get_coordinates(address)
    if coordinates:
        longitude, latitude = coordinates
    else:
        return jsonify({'status': 404})

    user = {
        'email': email,
        'name': name,
        'inventory': {},
        'location': {'type': 'Point', 'coordinates': [longitude, latitude]},
        'homelocation': {'type': 'Point', 'coordinates': [longitude, latitude]}
    }

    users.insert_one(user)
    return jsonify({'status': 200})

@api.route('/api/update', methods=['POST']) # Updates the user's location
def update_location():
    email = request.args.get('email')
    longitude = float(request.args.get('longitude'))
    latitude = float(request.args.get('latitude'))

    if not email or not longitude or not latitude:
        return jsonify({'status': 404})
    try:
        users.update_one(
            {'email': email},
            {'$set': {'location.coordinates': [longitude, latitude]}})
        return jsonify({'status': 200})
    except:
        return jsonify({'status': 404})

@api.route('/api/add', methods=['POST']) # Adds produce to the user's inventory
def add_produce():
    email = request.args.get('email')
    produce = request.args.get('produce')
    quantity = request.args.get('quantity')

    if not email or not produce or not quantity:
        return jsonify({'status': 404})

    result = users.find_one({'email': email})
    if not result:
        return jsonify({'status': 404})
    try:
        if produce in result['inventory']:
            quantity += result['inventory'][produce]
        users.update_one(
            {'email': email},
            {'$set': {f'inventory.{produce}': quantity}})
        return jsonify({'status': 200})
    except:
        return jsonify({'status': 404})

@api.route('/api/remove', methods=['POST']) # Removes produce from the user's inventory
def remove_produce():
    email = request.args.get('email')
    produce = request.args.get('produce')
    quantity = request.args.get('quantity')

    if not email or not produce or not quantity:
        return jsonify({'status': 404})

    result = users.find_one({'email': email})
    if not result:
        return jsonify({'status': 404})
    
    try:
        if produce in result['inventory']:
            quantity = result['inventory'][produce] - quantity

        if quantity > 0:
            users.update_one(
                {'email': email},
                {'$set': {f'inventory.{produce}': quantity}})
        else:
            users.update_one(
                {'email': email},
                {'$unset': {f'inventory.{produce}': ''}})
        return jsonify({'status': 200})
    except:
        return jsonify({'status': 404})

@api.route('/api/edit', methods=['POST']) # Edits the user's profile
def edit_profile():
    email = request.args.get('email')
    name = request.args.get('name')
    address = request.args.get('address')
    newemail = request.args.get('newemail')

    if not email:
        return jsonify({'status': 404})
    
    result = users.find_one({'email': email})
    if not result:
        return jsonify({'status': 404})
    
    if name:
        try:
            users.update_one(
                {'email': email},
                {'$set': {'name': name}})
        except:
            return jsonify({'status': 404})
    if address:
        coordinates = get_coordinates(address)
        if coordinates:
            longitude, latitude = coordinates
        else:
            return jsonify({'status': 404})
        
        try:
            users.update_one(
                {'email': email},
                {'$set': {'location.coordinates': [longitude, latitude]}})
        except:
            return jsonify({'status': 404})
    if newemail:
        try:
            users.update_one(
                {'email': email},
                {'$set': {'email': newemail}})
        except:
            return jsonify({'status': 404})
    
    return jsonify({'status': 200})

@api.route('/api/request', methods=['GET']) # Returns a list of users within a specific radius that have the produce
def data():
    response = {
        'names': [],
        'emails':  [],
        'locations': [],
        'quantites': []
    }

    latitude = float(request.args.get('latitude'))
    longitude = float(request.args.get('longitude'))
    produce = request.args.get('produce')
    max_distance = float(request.args.get('max_distance'))

    query_location = {'type': 'Point', 'coordinates': [longitude, latitude]}

    results = users.find({'homelocation': {'$near': {'$geometry': query_location, '$maxDistance': max_distance}}})
    for result in results:
        if produce in result['inventory']:
            response['names'].append(result['name'])
            response['emails'].append(result['email'])
            response['locations'].append(get_address(result['homelocation']['coordinates'][0], result['homelocation']['coordinates'][1]))
            response['quantites'].append(result['inventory'][produce])

    return jsonify(response)

@api.route('/api/getname', methods=['GET']) # Returns the user's profile
def name():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    return jsonify({'status': 200, 'name': results['name']})

@api.route('/api/getaddress', methods=['GET']) # Returns the user's profile
def address():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    address = get_address(results['homelocation']['coordinates'][0], results['homelocation']['coordinates'][1])
    
    return jsonify({'status': 200, 'address': address})

@api.route('/api/getlocation', methods=['GET']) # Returns the user's location
def location():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    address = get_address(results['location']['coordinates'][0], results['location']['coordinates'][1])
    
    return jsonify({'status': 200, 'address': address})

@api.route('/api/getinv', methods=['GET']) # Returns the user's inventory
def inventory():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    return jsonify({'status': 200, 'inventory': results['inventory']})

@api.route('/api/getproduce', methods=['GET']) # Returns the amount of an item in the user's inventory
def produce():
    email = request.args.get('email')
    produce = request.args.get('produce')

    if not email or not produce:
        return jsonify({'status': 404})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    if produce in results['inventory']:
        return jsonify({'status': 200, 'quantity': results['inventory'][produce]})
    else:
        return jsonify({'status': 200, 'quantity': 0})

@api.route('/api/getallproduce', methods=['GET']) # Returns the user's profile
def allproduce():
    return jsonify({'status': 200, 'items': [item['name'] for item in all_produce.find()]})

if __name__ == '__main__':
    api.run(debug=True)