# -*- coding: utf-8 -*-
from amadeus import Client, ResponseError
import yaml
import logging
import datetime
import pandas as pd
#%% LOGGING
import importlib
importlib.reload(logging)

import sys
logging.basicConfig(format="%(asctime)-15s : %(message)s",level=logging.DEBUG,stream=sys.stdout)
logging.debug("Started logging".format())

#%% Get client
with open('keys.txt') as f: keys = yaml.load(f)

amadeus = Client(client_id=keys['API_Key'],client_secret=keys['API_Secret'])

try:
    response = amadeus.reference_data.urls.checkin_links.get(airline='1X')
    #print(response.data)
    logging.debug("Connection established".format())
    # => [{'type': 'checkin-link', 'id': '1XEN-GBWeb', 'href': 'https://www....
except ResponseError as error:
    #print(error)
    logging.error("{}".format(error))
    
    
#%%
r = amadeus.shopping.flight_offers.get(origin='NUE',
                                       destination='BER',
                                       departureDate='2018-09-25')

#%%
def get_flights_amadeus(amadeus):
    final_offers = list()
    for i,offer in enumerate(r.data):
        offer = offer
        my_offer = dict()
        print('{} {} ID: {}'.format(i, offer['type'],offer['id']))
        my_offer['id'] = offer['id']
        #print(offer'price'.total)
        print("\tPrice:", offer['offerItems'][0]['price']['total'])
        my_offer['price'] = offer['offerItems'][0]['price']['total']
        #print("\tSegments", len(offer['offerItems'][0]['services'][0]['segments']))
        for snum,seg in enumerate(offer['offerItems'][0]['services'][0]['segments']):
            print("\t\t{} {} - {}  at  {} - {} Duration:{}".format(
                    snum, 
                    seg['flightSegment']['departure']['iataCode'], 
                    seg['flightSegment']['arrival']['iataCode'],
                    seg['flightSegment']['departure']['at'],
                    seg['flightSegment']['arrival']['at'],
                    seg['flightSegment']['duration'],
                  ))
            #datetime.datetime.strptime(seg['flightSegment']['duration'], "%dDT%HH%M")
        my_offer['number_segs'] = snum +1
        my_offer['arrival_time'] = seg['flightSegment']['arrival']['at']
        #TODO This is a hack!!
        my_offer['duration_hack'] = seg['flightSegment']['duration']
        
        final_offers.append(my_offer)
    
        df = pd.DataFrame(final_offers)
    return df
#%%
df = get_flights_amadeus(amadeus)









