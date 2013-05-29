var Control = Object.create(null),
    fs = require('fs'),
    path = require('path');

Control.map = (function(dir){
  var controllers = [],
      regular = /\w+Controller\.js$/,
      files = fs.readdirSync(dir);
  for( var i in files) {
    if (regular.test(files[i])) {
      controllers.push(require(path.join(dir,files[i])));
    } else if (fs.statSync(path.join(dir,files[i])).isDirectory()) {
      // recursive directory to get all controllers
      controller = controller.concat( arguments.callee(path.join(dir,files[i])) );
    }
  }
  return controllers;
})(__dirname);

Control.find = function(url) {
  var map = Control.map;
  for ( i in map ) {
    if (map[i].test(url)) {
      return map[i];
    }
  };
  return NotFound;
};

function NotFound(req, res, next) {
  // res.write('Your request url "' + req.url + '" does not exists!');
  // res.redirect('/404.html');
  res.statusCode = 404;
  next();
};

module.exports = Control;
