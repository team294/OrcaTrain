import json
import urllib2

url = "http://localhost:8090/user"
token="testtoken"




req = urllib2.Request(url)
req.add_header('Content-Type', 'application/json')
req.add_header('AuthToken', token)


resp = urllib2.urlopen(req).read()

j = json.loads(resp)

print (json.dumps(j, indent=2, sort_keys=True))
