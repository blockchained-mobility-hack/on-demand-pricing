#===============================================================================
# Imports
#===============================================================================
#from flask import Flask, render_template, request, Response
#from flask import jsonify
import flask
from flask_cors import CORS
import json
import random
import os
import logging
from time import gmtime, strftime
import datetime
#from contextlib import suppress
#import re
import pandas as pd


logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(funcName)25s() %(levelname)-9s %(message)s',
                    datefmt="%Y-%m-%d %H:%M:%S",
                    )
#===============================================================================
# Start application
#===============================================================================
logging.debug("Started logging")

# Create app
app = flask.Flask(__name__)

# Enable Cross Origin Resource Sharing
CORS(app)
logging.debug("CORS is ENABLED")

#===============================================================================
# Private methods
#===============================================================================

#===============================================================================
# JSON methods
#===============================================================================
#--- Landing page
@app.route("/")
def index():
        return flask.render_template("index.html")

#--- get_test_trip
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

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    logging.info("Returning a trip: {}".format(data))
    return response    

if __name__ == "__main__":
        #app.run(host='0.0.0.0', debug=True, ssl_context='adhoc')
        
        app.run(host='0.0.0.0', debug=True)
