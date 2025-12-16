# hash_auth
hash_auth client for node.js, single line authentication

# install 

npm install hash_auth

# usage

  
  
  on the server side for express, just add
  
  ```
  const hash_auth=require('hash_auth');
  app.use(hash_auth.auth);
  hash_auth.setOrigin('mydomain.com'); //this must match the host of your call back url, can also be a RegEx to match a group of domains
  ```

  That is all. 
  No registration, no keys , no routs... just those lines.
  
  for the login buttons the href is :
   ```
   https://Authenticator.wizcloud.co.il/googleAuth/authTo/{callback url} 
   https://Authenticator.wizcloud.co.il/facebookAuth/authTo/{callback url}
   https://Authenticator.wizcloud.co.il/outlookAuth/authTo/{callback url}
   ```
   
   The calback url shuold be encoded (you can use  encodeURIComponent() in the chrome console for this)
   
   Done !
   After login you will be redirectd to the callback url, there in the req you will have hash_auth with the profile data
   For example 
   ```
   app.get('/afterLoginCallback',  function(req,res){
       console.log(req.hash_auth.data) //this holdes the user profile  
      res.send(`Hi <b> ${req.hash_auth.data.emails[0].value} </b> <br>this all the profile info <br> ${JSON.stringify(req.hash_auth.data)}` )

})

   ```
   
   If you use session, the session object will also holde the user profile under ```req.session.hash_auth```
   
   # Complete server example that will work anywhere out of the box 
   ```
    const express = require('express')
    const app = express()

    const port = 80
    const hash_auth=require('hash_auth');

    app.use(express.static('public'))
    app.use(hash_auth.auth);
    hash_auth.setOrigin(/(.*?)/); //regex match all. DO NOT DO THIS IN PRODUCTION, IT IS NOT SAFE,math only subdomains or domains you trust
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening at port :${port}`)
    })

    app.get('/userLogin', async function(req,res){
           console.log(req.hash_auth.data) 
          res.send(`Hi <b> ${req.hash_auth.data.emails[0].value} </b> <br>this all the profile info <br> ${JSON.stringify(req.hash_auth.data)}` )

    })

   ```
   
   login buttons for google and facebook (put any domain and rout instead of  127.0.0.1/userLogin)

   
   ```
    <!--callback url is encodeURIComponent('http://127.0.0.1/userLogin')-->   
    <a href="http://auth.azjs.io/googleAuth/authTo/http%3A%2F%2F127.0.0.1%2FuserLogin">GOOLLE LOGNIN</a>
    <a href="http://auth.azjs.io/facebookAuth/authTo/http%3A%2F%2F127.0.0.1%2FuserLogin">facebook LOGNIN</a>
   ```
    
   Enjoy 
   
