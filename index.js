
const http   = require('http');
const https  = require('https');
const fs     = require('fs');

const config = require('./lib/config');
const serverEvent = require('./lib/serverlistener');



const httpServer = http.createServer((req, res) => serverEvent(req, res));
 

 // Start the server and listen on port 2000
httpServer.listen(config.httpPort, () => {
    console.log(`Server is listening on port ${config.httpPort} in ${config.envName} mode.`);
});

//Reading the ssl key and cert and passing it to the https server.
var httpsOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpsOptions, (req, res) => serverEvent(req, res));

httpsServer.listen(config.httpsPort, () => {
    console.log(`Server is listening on port ${config.httpsPort} in ${config.envName} mode.`);
});