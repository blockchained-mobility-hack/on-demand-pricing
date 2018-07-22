import requests
import yaml
#r = requests.get('https://api.github.com/events')

amadeus_base_url = r"https://test.api.amadeus.com"
amadeus_auth_url = amadeus_base_url + "/v1/security/oauth2/token"
#r = requests.get(amadeus_url)

with open('keys.txt') as f:
    keys = yaml.load(f)

#keys['API_Key']
#keys['API_Secret']

#r = requests.post(amadeus_url, data = {'key':'value'})

#%% Payload
#payload = {'key1': 'value1', 'key2': 'value2'}
#r = requests.get('http://httpbin.org/get', params=payload)
#print(r.url)

#%% Prepare the AUTH Post

r = requests.post(amadeus_url, data = {'key':'value'})

headers = {'Content-Type': 'application/x-www-form-urlencoded'}
data = {'grant_type':'client_credentials', 
        'client_id':keys['API_Key'], 
        'client_secret':keys['API_Secret']}
#r = requests.get(url, headers=headers)
r = requests.post(amadeus_url, headers=headers, data = data)
print(r.url)


#%% Print this AUTH request

req = requests.Request('POST',amadeus_url,headers=headers,data=data)
prepared = req.prepare()
#prepared.body = 'No, I want exactly this as the body.'

def pretty_print_POST(req):
    """
    At this point it is completely built and ready
    to be fired; it is "prepared".

    However pay attention at the formatting used in 
    this function because it is programmed to be pretty 
    printed and may differ from the actual request.
    """
    print('{}\n{}\n\n{}'.format(
        req.method + ' ' + req.url,
        '\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.body,
    ))

pretty_print_POST(prepared)


#%% Send, get AUTH 
s = requests.Session()
r = s.send(prepared)
auth_token = r.text



#%% GET flight-offers ########################################################
get_flights_url = amadeus_base_url + r"/v1/shopping/flight-offers"

data = {'origin': 'PAR',
        'destination': 'LON',
        'departureDate' : '2018-09-25',
        'returnDate' : '2018-09-28'
        }

headers = {'Authorization': 'Bearer' + ' '+ 'm3w4oNTZSyi3MolHOgCyAj9OZl1U'}

# From json auth response, use access_token 

r = requests.get(get_flights_url, headeheadeheadeheadeheadeheade "scope": ""\n        }\n        'rs=headers, data = data)

#r = requests.get(url, headers=headers)
r = requests.post(amadeus_url, headers=headers, data = data)
print(r.url)

r.text
