var controller = require('../server/controller');

module.exports = function(connect) {
  return Route;
};

  var Route = function(req, res, next){
    var url = req.url;
    var currentController = controller.find(url);
    new currentController(req, res, next);
  };
