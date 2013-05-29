
var User = {} ;// require('../model/index').get('user');

var Controller = function(req, res, next) {
  if (!('user' in req.session)) {
    req.session.user = new User();
  }

  this.request = req;
  this.response = res;
  this.next = next;

  // 权限验证
  this.auth();

  // 初始话
  this.initialize();

  this.end();

};


Controller.test = function(url) {
	var tester = /^\/?$/;
	if (tester.test(url))
		return true;
	else
		return false;

};

module.exports = Controller;
