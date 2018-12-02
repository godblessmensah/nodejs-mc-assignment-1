/**
 * Event Listeners  
 */

//Dependencies
const https = require('https');

let handlers = {};

handlers.hello = (data, callback) => {
     
    //Let us try to load a github user's public information 
    if(data.payload) {

        const username = JSON.parse(data.payload).githubusername;

        if(username != undefined && username != "") {

            const options = {
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
                    callback(201, githubuserinfo);
                });
        
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
        
    } else {
        callback(202, {'Thanks':'Thank you for testing my first assignment for Node.js Masterclass'});
    }

};

 //Not found handler
handlers.notFound = (data, callback) => {
    callback(404, "Not Found");
};


module.exports = handlers;