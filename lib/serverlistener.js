//Dependencies

const url   = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const router = require('./router');


/**
 * Server event listener to handle all requests and responses.
 */
let serverEventListener = {};

serverEventListener.serverEvent = (req, res) => {
   
    const parsedUrl = url.parse(req.url, true);
    let path        = parsedUrl.pathname;
    const pathTrim  = path.replace(/^\/+|\/+$/g,'');
    const quaryobject = parsedUrl.query;
    const method    = req.method.toUpperCase();
    const headers   = req.headers;    
    const decoder   = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    //This event is alway called at the end of the request.
    req.on('end', () => {

        buffer += decoder.end();
        // Choose the handler or use not found handler;
        let curhandler = typeof(router[pathTrim]) !== 'undefined' ? router[pathTrim] : router['404'];
        //construct the data object
        const data = {
            'pathTrim' : pathTrim,
            'queryobject' : quaryobject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        //Route the request to the handler
        curhandler(data, (statuscode, payload)=>{
            statuscode = typeof(statuscode) == 'number' ? statuscode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            let payloadstring = JSON.stringify(payload);

            //Send the response
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statuscode);
            res.end(payloadstring);

            //console.log(`Response : ${statuscode} , ${payloadstring}`);            
        });
        
    });
};

module.exports = serverEventListener.serverEvent;