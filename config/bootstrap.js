var Application = {},
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app);

Application.app = app;

app.get('/', function(req, res, next){
    res.status = 200;
    res.end("Hello there!\n");
});

Application.server = server;

module.exports = Application;

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("Server is listen on port %d. and PID: %d", port, process.pid);
//    var pidFile = fs.open(path.join(__filename, '..', 'tmp', 'server.pid'));

});
