import pandas as pd
import time
import numpy as np
import threading

# from bson import ObjectId
from operator import concat
from functools import reduce
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request
from flask_ngrok import run_with_ngrok
import tensorflow.compat.v1 as tf
import pymongo
from bson.objectid import ObjectId
tf.disable_v2_behavior()
client = pymongo.MongoClient(
    "mongodb+srv://mittalvansh69:3AtqZa7sTTUbOGGm@shopkart.hulvk2l.mongodb.net/shopkart?retryWrites=true&w=majority", maxPoolSize=None)
db = client["shopkart"]
users_collection = db["users"]
app = Flask(__name__)
run_with_ngrok(app)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
df = pd.read_csv("finalTrainReviews_v2.csv")


@app.route('/api/train', methods=['GET'])
@cross_origin()
def trainer():
    def train():
        print("training started")
        userIds = users_collection.distinct("_id")
        user_item = df.groupby(['reviewerID', 'asin'])[
            'overall'].first().unstack(fill_value=0.0)
        # print(user_item)
        uim = user_item.values
        asins = user_item.columns
        reviewers = user_item.index
        graph = tf.Graph()
        nb_users = user_item.shape[0]
        nb_movies = user_item.shape[1]
        nb_factors = 600
        max_rating = 5
        top_k_movies = 15
        with graph.as_default():
            user_item_matrix = tf.placeholder(
                tf.float32, shape=(nb_users, nb_movies))
            St, Ut, Vt = tf.svd(user_item_matrix)
            Sk = tf.diag(St)[0:nb_factors, 0:nb_factors]
            Uk = Ut[:, 0:nb_factors]
            Vk = Vt[0:nb_factors, :]
            Su = tf.matmul(Uk, tf.sqrt(Sk))
            Si = tf.matmul(tf.sqrt(Sk), Vk)
            ratings_t = tf.matmul(Su, Si)
            best_ratings_t, best_items_t = tf.nn.top_k(ratings_t, top_k_movies)
        session = tf.InteractiveSession(graph=graph)
        feed_dict = {
            user_item_matrix: uim
        }
        best_items = session.run([best_items_t], feed_dict=feed_dict)
        best_items_dict = dict()
        for i in range(0, len(reviewers)):
            lis = []
            for j in range(0, 15):
                lis.append([str(asins[best_items[0][1][j]])])
            best_items_dict[reviewers[i]] = lis
        print("training complete!")
        for id in userIds:
            if str(id) in best_items_dict:
                users_collection.update_one({"_id": ObjectId(id)}, {
                    "$set": {"recommendations": reduce(concat, best_items_dict[str(id)])}})
        print("updated database")
    training_thread = threading.Thread(target=train)
    training_thread.start()
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return jsonify({"message": "Training"})


@app.route("/api/updateRating", methods=['GET', 'POST'])
@cross_origin()
def updateRating():
    global df
    body = request.get_json()
    userID = body['userID']
    asin = body['asin']
    rating = body['rating']
    df.loc[len(df.index)] = [userID, asin, rating]
    response = jsonify({"message": "Rating Updated"})
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/dev/closeServer", methods=['GET'])
@cross_origin(origins="*")
def terminate():
    df.to_csv("finalTrainReviews_v2.csv", index=False)
    response = jsonify({"message": "Rating Updated"})
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run()
