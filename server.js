const express = require('express');

const app = express();

/* app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.url}`);
    next();
}) */

app.use('/', express.static(`${__dirname}/public`))
  
app.listen(80, function () {
console.log('Snake is listening on localhost!');
});