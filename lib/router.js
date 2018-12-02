 //Define a requrest router
 const handlers = require("./handlers");

 const router = {
    'hello' : handlers.hello,
    '404' : handlers.notFound
 };

 module.exports = router;