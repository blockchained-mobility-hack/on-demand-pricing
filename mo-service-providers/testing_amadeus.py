import requests
import yaml
#r = requests.get('https://api.github.com/events')

amadeus_url = r"https://test.api.amadeus.com/v1/security/oath2/token"
r = requests.get(amadeus_url)

with open('keys.txt') as f:
    keys = yaml.load(f)

keys['API_Key']
keys['API_Secret']

yaml.r