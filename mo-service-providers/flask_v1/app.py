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

#===============================================================================
# Logging
#===============================================================================

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(funcName)25s() %(levelname)-9s %(message)s',
                    datefmt="%Y-%m-%d %H:%M:%S",
                    )

#===============================================================================
# Constants
#===============================================================================

PATH_PROVIDERS = "./PROVIDER_DATA/trips offered.xlsx"
assert os.path.exists(PATH_PROVIDERS)

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
def load_trips(data_path):
    xls = pd.ExcelFile(data_path)

    df_trips = pd.read_excel(xls, 'trips')
    logging.debug("Loaded  {} trips".format(len(df_trips)))

    df_providers = pd.read_excel(xls, 'providers')
    logging.debug("Loaded  {} providers".format(len(df_providers)))

    df_rules = pd.read_excel(xls, 'rules')
    logging.debug("Loaded  {} rules".format(len(df_rules)))
    
    df_combined = pd.merge(df_trips, df_rules, how='left', left_on=['ruleID'], right_on=['ruleID'])
    logging.debug("Returning  {} merged trip records".format(len(df_combined)))
    
    return df_combined
    
#===============================================================================
# JSON methods
#===============================================================================
#--- Landing page
@app.route("/")
def index():
        return flask.render_template("index.html")

#--- get all trips
@app.route("/get_all_trips")
def get_all_trips():
    df = load_trips(PATH_PROVIDERS)
    data = df.transpose().to_json()
    
    response = app.response_class(
        response=data,
        status=200,
        mimetype='application/json'
    )
    logging.info("Returning a trip: {}".format(data))
    return response    


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
