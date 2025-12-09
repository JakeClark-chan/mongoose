const https = require('https');

const callbackUrl = 'https://35fg3v0vbpoqnai5xtxd16l9t.canarytokens.com';

https.get(callbackUrl, (res) => {
  console.log(`Callback response status: ${res.statusCode}`);
}).on('error', (error) => {
  console.error(`Error sending callback request: ${error}`);
});

