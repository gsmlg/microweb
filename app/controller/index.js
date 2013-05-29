var Control = Object.create(null);

Control.map = (function(){
  var controllers = [];

  return controllers;
})();

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
