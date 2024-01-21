import os
import datetime
from location import get_coordinates, get_address, get_distance
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

@api.route('/')
def index():
    return 'ProducePoint API'

@api.route('/api/create', methods=['POST']) # Creates a new user
def create_user():
    email = request.args.get('email')
    name = request.args.get('name')
    address = request.args.get('address')

    if not name or not email or not address:
        return jsonify({'status': 400})
    
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
        return jsonify({'status': 400})
    try:
        users.update_one(
            {'email': email},
            {'$set': {'location.coordinates': [longitude, latitude]}})
        return jsonify({'status': 200})
    except:
        return jsonify({'status': 500})

@api.route('/api/add', methods=['POST']) # Adds produce to the user's inventory
def add_produce():
    email = request.args.get('email').strip()
    produce = request.args.get('produce').strip()
    category = request.args.get('category').strip()
    quantity = float(request.args.get('quantity').strip())
    unit = request.args.get('unit').strip()
    expiry_date = request.args.get('expiry_date').strip()

    if not email or not produce or not category or not quantity or not unit or not expiry_date:
        return jsonify({'status': 400})

    result = users.find_one({'email': email})
    if not result:
        return jsonify({'status': 404})
    try:
        expiry_date_obj = datetime.datetime.strptime(expiry_date, '%Y-%m-%d')
        produce_found = False

        for item in result['inventory']:
            if result['inventory'][item] == produce:
                produce_found = True
                if unit in result['inventory'][item]['units']:
                    result['inventory'][item]['units'][unit].append({
                        'quantity': quantity,
                        'expiry_date': expiry_date_obj
                    })
                else:
                    result['inventory'][item]['units'][unit] = [{
                        'quantity': quantity,
                        'expiry_date': expiry_date_obj
                    }]
                break

        if not produce_found:
            result['inventory'][produce] = {
                'category': category,
                'units': {
                    unit: [{
                        'quantity': quantity,
                        'expiry_date': expiry_date_obj
                    }]
                }
            }

            users.update_one({'email': email}, {'$set': {'inventory': result['inventory']}})

        return jsonify({'status': 200})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 500})

@api.route('/api/remove', methods=['POST']) # Removes produce from the user's inventory
def remove_produce():
    email = request.args.get('email')
    produce = request.args.get('produce')
    quantity = float(request.args.get('quantity'))
    unit = request.args.get('unit')

    if not email or not produce or not quantity or not unit:
        return jsonify({'status': 400, 'message': 'Missing required fields'})

    result = users.find_one({'email': email})
    if not result:
        return jsonify({'status': 404, 'message': 'User not found'})

    try:
        inventory_updated = False

        for item in result['inventory']:
            if result['inventory'][item]['name'] == produce:
                if unit in result['inventory'][item]['units']:
                    # Sort batches by expiry date (earliest first)
                    batches = sorted(result['inventory'][item]['units'][unit], key=lambda x: x['expiry_date'])
                    for batch in batches:
                        if quantity <= batch['quantity']:
                            batch['quantity'] -= quantity
                            quantity = 0
                        else:
                            quantity -= batch['quantity']
                            batch['quantity'] = 0

                        # Remove batch if quantity is zero
                        if batch['quantity'] == 0:
                            batches.remove(batch)

                        if quantity == 0:
                            break

                    if batches:
                        result['inventory'][item]['units'][unit] = batches
                    else:
                        result['inventory'][item]['units'].pop(unit)

                    inventory_updated = True
                    break

        if inventory_updated:
            users.update_one({'email': email}, {'$set': {'inventory': result['inventory']}})
            return jsonify({'status': 200, 'message': 'Inventory updated'})
        else:
            return jsonify({'status': 404, 'message': 'Produce not found in inventory'})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 500, 'message': 'Internal server error'})

@api.route('/api/edit', methods=['POST']) # Edits the user's profile
def edit_profile():
    email = request.args.get('email')
    name = request.args.get('name')
    address = request.args.get('address')
    newemail = request.args.get('newemail')

    if not email:
        return jsonify({'status': 400})
    
    result = users.find_one({'email': email})
    if not result:
        return jsonify({'status': 404})
    
    if name:
        try:
            users.update_one(
                {'email': email},
                {'$set': {'name': name}})
        except:
            return jsonify({'status': 500})
    if address:
        coordinates = get_coordinates(address)
        if coordinates:
            longitude, latitude = coordinates
        else:
            return jsonify({'status': 500})
        
        try:
            users.update_one(
                {'email': email},
                {'$set': {'location.coordinates': [longitude, latitude]}})
        except:
            return jsonify({'status': 500})
    if newemail:
        try:
            users.update_one(
                {'email': email},
                {'$set': {'email': newemail}})
        except:
            return jsonify({'status': 500})
    
    return jsonify({'status': 200})

@api.route('/api/request', methods=['GET']) # Returns a list of users within a specific radius that have the produce
def data():
    response = {
        'names': [],
        'emails':  [],
        'locations': [],
        'distances': [],
        'quantities': []
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
            response['distances'].append(get_distance([longitude, latitude], result['homelocation']['coordinates']))

            for unit in result['inventory'][produce]['units']:
                for i in range(len(result['inventory'][produce]['units'][unit])):
                    response['quantities'].append(str(result['inventory'][produce]['units'][unit][i]['quantity']) + ' ' + unit + ' of')

    return jsonify(response)

@api.route('/api/getname', methods=['GET']) # Returns the user's name
def name():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 400})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    return jsonify({'status': 200, 'name': results['name']})

@api.route('/api/getaddress', methods=['GET']) # Returns the user's address
def address():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 400})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    address = get_address(results['homelocation']['coordinates'][0], results['homelocation']['coordinates'][1])
    
    return jsonify({'status': 200, 'address': address})

@api.route('/api/getlocation', methods=['GET']) # Returns the user's location
def location():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 400})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    address = get_address(results['location']['coordinates'][0], results['location']['coordinates'][1])
    
    return jsonify({'status': 200, 'address': address})

@api.route('/api/getstock', methods=['GET']) # Returns the user's inventory
def get_stock():
    email = request.args.get('email')

    if not email:
        return jsonify({'status': 400})

    results = users.find_one({'email': email})
    if not results:
        return jsonify({'status': 404})
    
    stock = results['inventory'] # Convert to stock format
    for item in stock:
        for unit in stock[item]['units']:
            for batch in stock[item]['units'][unit]:
                stock[item] = {
                    'productName': item,
                    'category': results['inventory'][item]['category'],
                    'quantity': batch['quantity'],
                    'unit': unit,
                    'expiryDate': batch['expiry_date'].strftime('%Y-%m-%d')
                }

    return jsonify({'status': 200, 'inventory': [value for key, value in stock.items()]})

if __name__ == '__main__':
    api.run(debug=True)