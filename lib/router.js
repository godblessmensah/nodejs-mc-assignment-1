 //Define a requrest router
 const handlers = require("./handlers");

 var router = {
    'hello' : handlers.hello,
    '404' : handlers.notFound
 };

 module.exports = router;