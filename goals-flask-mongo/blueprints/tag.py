from pickle import TRUE
from flask import Flask, Blueprint, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import yaml
import certifi

ca = certifi.where()
config = yaml.safe_load(open('database.yaml'))
client = MongoClient(config['uri'], tlsCAFile=ca)
db = client['test']

tag = Blueprint('tag', __name__,
                        template_folder='templates')

def format_tag(tag):
    return {
        "text": tag['text'],
    }

@tag.route('/', methods=['POST', 'GET'])
def tag_data():
    
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        text = body['text']

        # POST parent tag with empty subtags
        id = db['tags'].insert_one({
            "_id": text,
            "text": text,
        }).inserted_id

        return jsonify({
            'status': 'tag is posted to MongoDB!',
            # 'id': id,
        })
    
    # GET all data from database
    if request.method == 'GET':
        alltags = db['tags'].find()
        tagJson = []
        for tag in alltags:
            id = tag['_id']
            text = tag['text']
            tagDict = {
                '_id': str(id),
                "text": text,
            }
            tagJson.append(tagDict)
        print(tagJson)
        return jsonify(tagJson)

@tag.route('/<string:text>', methods=['GET'])
def tag_from_text(text):
    # GET a specific data by id
    if request.method == 'GET':
        data = db['tags'].find_one({'text': text})
        if (data == None):
            return jsonify({data: {_id: '', text: ''}})
        id = data['_id']
        text = data['text']
        dataDict = {
            '_id': str(id),
            'text': text,
        }
        print(dataDict)
        return jsonify(dataDict)
        