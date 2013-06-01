var controller = require('../server/controller');

var Route = function(req, res, next){
  var uri = req.url;
  var currentController = controller.find(uri);
  if (currentController) {
    var ctrl = new currentController(req, res, next);
    ctrl.emit('start');
  } else {
    return next();
  }
};

module.exports = function(connect) {
  return Route;
};
