from flask import Flask, render_template, request, Response
from flask import jsonify
import json
import random
import os
import logging
from time import gmtime, strftime
import datetime
from contextlib import suppress
import re

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(funcName)25s() %(levelname)-9s %(message)s',
                    datefmt="%Y-%m-%d %H:%M:%S",
                    )
import operator
import jsonpickle
from flask_cors import CORS

logging.debug("Started logging")

# Create app
app = Flask(__name__)

# Enable Cross Origin Resource Sharing
CORS(app)

EMOJI_MAP = {
        'happy'     :   'happy'  ,
        'sad'       :   'sad'    ,
        'neutral'   :   'neutral',
        'angry'     :   'angry'  ,
    }

TWEET_MAP = {
        'happy'     :   "I love hacking media! #hacking #media"  ,
        'sad'       :   "Why am I here, this code doesn't compile! #sad #demotivated"    ,
        'neutral'   :   "Hello from Media Hackday, I wish I had more sleep #sleepy #sheep",
        'angry'     :   "I hate hacking, I hate Media. #fu #media"  ,
    }

#--- Landing page
@app.route("/")
def index():
        return render_template("index.html")


@app.route("/get_test_trip")
def get_test_trip():
    data = {
        'Service Provider ID':115579,
        'Trip ID': 558,
        'Service Provider Name':"Deutsche Bahn",
        'Start Point':"Munich",
        'End Point':"Berlin",
        'Start Time':"08Jun2018 1159",
        'End Time':"08Jun2018 1630",
        'Total Time':4+31/60,
        'Class':'economy',
        'Temperature':24
        }

    #data = [0.3, 0.5, 0.9]

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    logging.info("Returning a trip: {} ".format(data))
    return response    

#--- Sentiment (
@app.route('/sentiment')
def sentiment():
    data = {
        'happy':np.random.uniform(),
        'sad':np.random.uniform(),
        'neutral':np.random.uniform(),
        'angry':np.random.uniform(),
        }

    #data = [0.3, 0.5, 0.9]

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    logging.info("Returning sentiment: {} ".format(data))
    return response

def emoji_from_senti(sent_response):
    senti_vec = sent_response.json
    #logging.info("Emoji from {}".format(senti_vec))
    max_sentiment_key = max(senti_vec.items(), key=operator.itemgetter(1))[0]

    this_emoji = EMOJI_MAP[max_sentiment_key]
    logging.info("Emoji {} from {}".format(this_emoji,senti_vec))

    return EMOJI_MAP[max_sentiment_key]

@app.route('/emoji')
def emoji():
    sent = sentiment().json

    max_sentiment_key = max(sent.items(), key=operator.itemgetter(1))[0]

    data = EMOJI_MAP[max_sentiment_key]

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    logging.info("Returning emoji: {}".format(data))

    return response


@app.route('/imagepush', methods=['POST'])
def imagepush():
    r = request

    # convert string of image data to uint8
    nparr = np.fromstring(r.data, np.uint8)
    # decode image
    #img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    logging.info('Image received. size={}'.format(img.shape))

    # do some fancy processing here....
    #
    #

    # build a response dict to send back to client
    response = {'message': 'image received. size={}'.format(img.shape)
                }

    # encode response using jsonpickle
    response_pickled = jsonpickle.encode(response)

    return Response(response=response_pickled, status=200, mimetype="application/json")



def get_files_by_name_ext(folder_path, search_name, search_ext):

    all_files = os.listdir(folder_path)
    filtered_file_list = [f for f in os.listdir(folder_path) if re.match(r'^audio.*\.audio', f)]
    
    logging.info("Found {} {} files matching '{}' in {}, out of {} total files".format(len(filtered_file_list),
                                                                           search_ext,
                                                                           search_name,
                                                                           folder_path,
                                                                           len(all_files)))

    return filtered_file_list

def save_file(file_object):
    currtime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    path_audio_file_saved = os.path.join('./SERVER INCOMING', 'audio'+currtime+'.audio')
    file_object.save(path_audio_file_saved)

    return




if __name__ == "__main__":
        #app.run(host='0.0.0.0', debug=True, ssl_context='adhoc')
        
        app.run(host='0.0.0.0', debug=True)
