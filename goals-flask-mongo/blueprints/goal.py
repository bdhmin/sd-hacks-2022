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

goal = Blueprint('goal', __name__,
                        template_folder='templates')

def format_goal(goal):
    return {
        "_creatorId": ObjectId(goal['_creatorId']),
        "_parentId": ObjectId(goal['_parentId']) if goal['_parentId'] != '' else None,
        "title": goal['title'],
        "description": goal['description'],
        "start_date": goal['start_date'],
        "end_date": goal['end_date'],
        "subgoals": goal['subgoals'],
        "depth": goal['depth'],
        "tags": goal['tags'],
        "followers": goal['followers'],
        "follower_count": goal['follower_count'],
        "inspired_goals": goal['inspired_goals'],
    }

@goal.route('/', methods=['POST', 'GET'])
def goal_data():
    
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        _creatorId = body['_creatorId']
        _parentId = body['_parentId']
        title = body['title']
        description = body['description']
        start_date = body['start_date']
        end_date = body['end_date']
        subgoals = body['subgoals']
        depth = body['depth']
        tags = body['tags']
        followers = body['followers']
        follower_count = body['follower_count']
        inspired_goals = body['inspired_goals']
        inspired_by = body['inspired_by']

        # reformat all tags
        tagIds = []

        for tag in tags:
            print('tag', tag)
            tagIds.append(tag['_id'])

        # POST parent goal with empty subgoals
        parentGoalId = db['goals'].insert_one({
            "_creatorId": ObjectId(_creatorId),
            "_parentId": None,
            "title": title,
            "description": description,
            "start_date": start_date,
            "end_date": end_date,
            "subgoals": [],
            "depth": depth,
            "tags": tagIds,
            "followers": followers,
            "follower_count": follower_count,
            "inspired_goals": inspired_goals,
            "inspired_by": inspired_by,
        }).inserted_id


        # POST all subgoals
        subgoalIds = []

        for subgoal in subgoals:
            subgoal['_parentId'] = parentGoalId
            subgoal['tags'] = tagIds
            subgoalIds.append(ObjectId(db['goals'].insert_one(format_goal(subgoal)).inserted_id))

        # PUT parent goal's subgoals array
        db['goals'].update_one(
            {'_id': ObjectId(parentGoalId)},
            {
                "$set": {
                    "subgoals":subgoalIds,
                }
            }
        )

        return jsonify({
            'status': 'Goal is posted to MongoDB!',
        })
    
    # GET all data from database
    if request.method == 'GET':
        allGoals = db['goals'].find()
        goalJson = []
        for goal in allGoals:
            id = goal['_id']
            _creatorId = goal['_creatorId']
            _parentId = goal['_parentId']
            title = goal['title']
            description = goal['description']
            start_date = goal['start_date']
            end_date = goal['end_date']
            subgoals = goal['subgoals']
            depth = goal['depth']
            tags = goal['tags']
            followers = goal['followers']
            follower_count = goal['follower_count']
            inspired_goals = goal['inspired_goals']
            inspired_by = goal['inspired_by']
            goalDict = {
                '_id': str(id),
                "_creatorId": str(_creatorId),
                "_parentId": str(_parentId),
                "title": title,
                "description": description,
                "start_date": start_date,
                "end_date": end_date,
                "subgoals": subgoals,
                "depth": depth,
                "tags": tags,
                "followers": followers,
                "follower_count": follower_count,
                "inspired_goals": inspired_goals,
                "inspired_by": inspired_by,
            }
            goalJson.append(goalDict)
        print(goalJson)
        return jsonify(goalJson)

@goal.route('/explore/<string:userId>')
def get_explore_data(userId):
    explore_goals = db['goals'].find({'_creatorId' : { '$ne': userId }, '_parentId' : None })
    formattedGoals = []
    for goal in explore_goals:
        all_tags = db['tags'].find()
        users = db['users'].find()
        id = goal['_id']
        _creatorId = goal['_creatorId']
        _parentId = '' if goal['_parentId'] == None else goal['_parentId']

        title = goal['title']
        description = goal['description']
        start_date = goal['start_date']
        end_date = goal['end_date']

        subgoals = [] if len(goal['subgoals']) == 0 else getSubgoals(str(id))
        depth = goal['depth']
        tags = []
        for tag in all_tags:
            if tag['_id'] in goal['tags']:
                tags.append(tag)
        followers = [user for user in users if user['_id'] in goal['followers']]
        follower_count = goal['follower_count']
        inspired_goals = []
        ib = db['users'].find_one({'_id': str(goal['inspired_by'])})
        inspired_by = None if ib == None else {
            '_id': str(goal['inspired_by']),
            'username': ib['username'],
            'password': ib['password'],
        }
        formGoal = {
            '_id': str(id),
            "_creatorId": str(_creatorId),
            "_parentId": str(_parentId),
            "title": title,
            "description": description,
            "start_date": start_date,
            "end_date": end_date,
            "subgoals": subgoals,
            "depth": depth,
            "tags": tags,
            "followers": followers,
            "follower_count": follower_count,
            "inspired_goals": inspired_goals,
            "inspired_by": inspired_by
        }
        formattedGoals.append(formGoal)

    return jsonify(formattedGoals)

@goal.route('/timeline/<string:userId>')
def get_timeline_data(userId):
    explore_goals = db['goals'].find({ '_creatorId': ObjectId(userId) })
    formattedGoals = []
    for goal in explore_goals:
        all_tags = db['tags'].find()
        users = db['users'].find()
        id = goal['_id']
        _creatorId = goal['_creatorId']
        _parentId = '' if goal['_parentId'] == None else goal['_parentId']

        title = goal['title']
        description = goal['description']
        start_date = goal['start_date']
        end_date = goal['end_date']

        subgoals = [] if len(goal['subgoals']) == 0 else getSubgoals(str(id))
        depth = goal['depth']
        tags = []
        for tag in all_tags:
            if tag['_id'] in goal['tags']:
                tags.append(tag)
        followers = [user for user in users if user['_id'] in goal['followers']]
        follower_count = goal['follower_count']
        inspired_goals = []
        ib = db['users'].find_one({'_id': str(goal['inspired_by'])})
        inspired_by = None if ib == None else {
            '_id': str(goal['inspired_by']),
            'username': ib['username'],
            'password': ib['password'],
        }
        formGoal = {
            '_id': str(id),
            "_creatorId": str(_creatorId),
            "_parentId": str(_parentId),
            "title": title,
            "description": description,
            "start_date": start_date,
            "end_date": end_date,
            "subgoals": subgoals,
            "depth": depth,
            "tags": tags,
            "followers": followers,
            "follower_count": follower_count,
            "inspired_goals": inspired_goals,
            "inspired_by": inspired_by
        }
        formattedGoals.append(formGoal)

    return jsonify(formattedGoals)

def getSubgoals(parentId):
    sub_goals = db['goals'].find({'_creatorId' : { '$ne': parentId }})
    all_tags = db['tags'].find()
    users = db['users'].find()
    formattedGoals = []
    for goal in sub_goals:
        id = goal['_id']
        _creatorId = goal['_creatorId']
        _parentId = parentId

        title = goal['title']
        description = goal['description']
        start_date = goal['start_date']
        end_date = goal['end_date']

        subgoals = []
        depth = goal['depth']
        tags = [tag for tag in all_tags if tag['_id'] in list(goal['tags'])]
        followers = [user for user in users if user['_id'] in list(goal['followers'])]
        follower_count = goal['follower_count']
        inspired_goals = []
        ib = db['users'].find_one({'_id': str(goal['inspired_by'])})
        inspired_by = None if ib == None else {
            '_id': str(goal['inspired_by']),
            'username': ib['username'],
            'password': ib['password'],
        }
        formGoal = {
            '_id': str(id),
            "_creatorId": str(_creatorId),
            "_parentId": str(_parentId),
            "title": title,
            "description": description,
            "start_date": start_date,
            "end_date": end_date,
            "subgoals": subgoals,
            "depth": depth,
            "tags": tags,
            "followers": followers,
            "follower_count": follower_count,
            "inspired_goals": inspired_goals,
            "inspired_by": inspired_by
        }
        formattedGoals.append(formGoal)

    return formattedGoals
