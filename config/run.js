var spawn = require('child_process').spawn;
var path = require('path');
var node = process.argv[0];
var file = path.join(__dirname, 'bootstrap.js');

var child = spawn('node', [ file ], {
    stdio: ['ignore', 'ignore', 'ignore'],
    cwd: path.join(__dirname, '..'),
    env: process.env,
    detached: true
});

console.log(child.pid);

child.unref();

process.exit();
