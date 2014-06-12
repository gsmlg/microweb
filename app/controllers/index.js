var Control = Object.create(null),
    fs = require('fs'),
    path = require('path');

Control.map = (function(dir){
  var controllers = [],
      regexp = /^[a-zA-Z0-9_]+Controller\.js$/,
      files = fs.readdirSync(dir),
      func = arguments.callee;
  files.forEach(function(name){
    if (regexp.test(name)) {
      controllers.push(require(path.join(dir,name)));
    } else if (fs.statSync(path.join(dir,name)).isDirectory()) {
      controllers = controllers.concat(func(path.join(dir,name)));
    }
  });
  return controllers;
})(__dirname);

Control.find = function(uri) {
  var map = Control.map;
  return map.filter(function(ctrl){
	if (ctrl.test(uri))
	  	return true;
  	return false;
  })[0];
};

function NotFound(req, res, next) {
  // res.write('Your request url "' + req.url + '" does not exists!');
  // res.redirect('/404.html');
  res.statusCode = 404;
  next();
};

module.exports = Control;
