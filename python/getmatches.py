import json
import urllib.request

url = "http://bcrscout.com:8090/event/2020cadm/matches"
token="INSERT-YOUR-LOGIN-TOKEN-HERE"

req = urllib.request.Request(url)
req.add_header('Content-Type', 'application/json')
req.add_header('AuthToken', token)

resp = urllib.request.urlopen(req).read()

j = json.loads(resp)

print (json.dumps(j, indent=2, sort_keys=True))
