from flask import Flask, request, jsonify

from flask_pymongo import PyMongo


app = Flask(__name__)


# MongoDB config
# app.config["MONGO_URI"] = "mongodb://localhost:27017/tutedude"
app.config["MONGO_URI"] = "mongodb://mongo:27017/tutedude"
mongo = PyMongo(app)

collection = mongo.db.names  # use your intended collection

@app.route('/')
def index():
    return jsonify({"message": "Backend is running!"})

@app.route('/api/get')
def api():
    names = collection.find()
    result = []
    for name in names:
        result.append(name['value'])
    result = {
        "names": result
    }
    
    return jsonify(result)

@app.route('/api/add/<name>')
def add(name):
    
    collection.insert_one({"value": name})
    return jsonify({"message":f'{name}' " added successfully!"}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
