const https = require('https');

// Replace with your Burp Collaborator URL
const burpCollaboratorUrl = 'x640e10yd989u1v16wl1c1qw6nce06ov.oastify.com';

const options = {
  hostname: burpCollaboratorUrl,
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
});

req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

req.end();
