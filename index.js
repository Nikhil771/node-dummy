var http = require('http');
var fs = require('fs');
var events  = require('events');
var eventEmitter = new events.EventEmitter();

var myFunctionHandler = function() {
  console.log('clicked');
}

eventEmitter.on('click', myFunctionHandler);
eventEmitter.emit('click');

http.createServer(function (req, res) {
    fs.readFile('document1.html', function(err, data) {
        res.writeHead(200, {'content-type': 'text/html' });
        res.write(data);
        res.end('Hello from server');
    });
}).listen(8080);

// const express = require('express');
// const app = express();
// var fs = require('fs');
// const port = 8080;

// app.get('/', (req, res) => {
//     fs.readFile('document1.html', function(err,data) {
//         res.writeHead(200, {'content-type': 'text/html' });
//         res.write(data);
//         res.end('Hello from server');
//     });
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });