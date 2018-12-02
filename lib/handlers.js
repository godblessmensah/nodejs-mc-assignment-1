
//Dependencies
const https = require('https');

let handlers = {};

handlers.hello = function(data, callback) {
     
    //Let us try to load a github user's public information 
    if(data.payload) {

        let username = JSON.parse(data.payload).githubusername;

        if(username != "") {

            let options = {
                hostname: 'api.github.com',
                port: 443,
                path: `/users/${username}`,
                method: 'GET',
                headers:{
                    //Intentionally using postman as user-agent since github api requires a user-agent.
                    "user-agent":"PostmanRuntime/7.1.1" 
                }
            };
    
            https.get(options, (resp) => {
                let data = '';
        
                resp.on('data', (chunk) => {
                    data += chunk;
                });
        
                resp.on('end', () => {
                    const githubuserinfo = JSON.parse(data);
                    callback(200, githubuserinfo);
                });
        
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
        
    } else {
        callback(200, {'Thanks':'Thank you for testing my first assignment for Node.js Masterclass'});
    }

};

 //Not found handler
handlers.notFound = function(data, callback) {
    callback(404, "Not Found");
};


module.exports = handlers;