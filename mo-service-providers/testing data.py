#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jul 21 17:36:28 2018

@author: batman
"""
import os
import pandas as pd
import logging

BASE_PATH  = "flask_v1"
PATH_PROVIDERS = os.path.join(BASE_PATH, "./PROVIDER_DATA/trips offered.xlsx")
assert os.path.exists(os.path.join(PATH_PROVIDERS))

#%% LOGGING
import importlib
importlib.reload(logging)

import sys
logging.basicConfig(format="%(message)s",level=logging.DEBUG,stream=sys.stdout)
#logger = logging.getLogger(__name__)
#logger = logging.getLogger("")

#%%
data_path = PATH_PROVIDERS
def load_trips(data_path):
    xls = pd.ExcelFile(data_path)

    df_trips = pd.read_excel(xls, 'trips')
    logging.debug("Loaded  {} trips".format(len(df_trips)))

    df_providers = pd.read_excel(xls, 'providers')
    logging.debug("Loaded  {} providers".format(len(df_providers)))

    df_rules = pd.read_excel(xls, 'rules')
    logging.debug("Loaded  {} rules".format(len(df_rules)))
    
    df_combined = pd.merge(df_trips, df_rules, how='left', left_on=['ruleID'], right_on=['ruleID'])

    return df_combined
    
df = load_trips(PATH_PROVIDERS)

#%%

res = df.transpose().to_json()

