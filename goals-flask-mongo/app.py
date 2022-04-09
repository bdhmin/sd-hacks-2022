from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import yaml
import certifi
from blueprints.blueprint_template import blueprint_template

ca = certifi.where()
app = Flask(__name__)
config = yaml.safe_load(open('database.yaml'))
client = MongoClient(config['uri'], tlsCAFile=ca)
# db = client.lin_flask
db = client['test']
CORS(app)

app.register_blueprint(blueprint_template, url_prefix='/api/blu-template')

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/api/users', methods=['POST', 'GET'])
def data():
    
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        username = body['username']
        password = body['password']
        # db.users.insert_one({
        db['users'].insert_one({
            "username": username,
            "password": password,
        })
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            'username': username,
            'password': password,
        })
    
    # GET all data from database
    if request.method == 'GET':
        allData = db['users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            username = data['username']
            password = data['password']
            dataDict = {
                '_id': str(id),
                'username': username,
                'password': password,
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)

@app.route('/api/users/id/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def user_from_id(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = db['users'].find_one({'_id': ObjectId(id)})
        id = data['_id']
        username = data['username']
        password = data['password']
        dataDict = {
            '_id': str(id),
            'username': username,
            'password': password,
        }
        print(dataDict)
        return jsonify(dataDict)
        
    # DELETE a data
    if request.method == 'DELETE':
        db['users'].delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        username = body['username']
        password = body['password']

        db['users'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "username":username,
                    "password":password,
                }
            }
        )

        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})

@app.route('/api/users/username/<string:username>', methods=['GET'])
def find_username(username):

    # GET a specific data by username
    if request.method == 'GET':
        data = db['users'].find_one({'username': username})
        print('received data', data)
        if (data == None):
            return 'DNE'
        id = data['_id']
        username = data['username']
        password = data['password']
        dataDict = {
            '_id': str(id),
            'username': username,
            'password': password,
        }
        print(dataDict)
        return jsonify(dataDict)

@app.route('/api/users/username/<string:username>/<string:inputted_password>', methods=['GET'])
def login(username, inputted_password):

    # GET a specific data by username
    if request.method == 'GET':
        data = db['users'].find_one({'username': username})
        print('received data', data)
        if (data == None):
            return 'DNE'
        id = data['_id']
        username = data['username']
        password = data['password']
        if (inputted_password != password):
            return 'WRNG'
        dataDict = {
            '_id': str(id),
            'username': username,
            'password': password,
        }
        print(dataDict)
        return jsonify(dataDict)

if __name__ == '__main__':
    app.debug = True
    app.run()

