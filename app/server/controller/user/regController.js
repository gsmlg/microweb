var Controller = require('../../../lib/Controller');
var User = require('../../model/user');
var view = require('../../view');
var regController = Controller.extend({
  uri: /^\/user\/regist\/?$/,
  start: function(){
    console.log(this.req.method);
    this.emit(this.req.method.toLowerCase());
  },
  get: function(){
    this.emit('render', view.use('user/regist'), {title: '用户注册'});
  },
  post: function(){
	if (this.req.session.user)
		this.emit('end');
	var user = this.req.body.user;
	user.registTime = new Date;
	user.password = user.passwd;
	var u = new User(user),
		self = this;
	u.save(function(err, user) {
		if (err)
			return self.emit('json', { status: 0, message: err.message });
		if (user)
			return self.emit('json', { status: 1, message: '注册成功!' });
		return self.emit('error');
	});

  }
});

module.exports = regController;

