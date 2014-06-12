var Controller = require('../../../lib/Controller');
var User = require('../../model/user');
var view = require('../../view');
var regController = Controller.extend({
  uri: /^\/user\/login\/?$/,
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
	var self = this;
	User.findOne({email: user.email}, function(err, _user){
		if (err)
			return self.emit('json', { status: 0, message: err.message });
		if (_user) {
			if (_user.password === user.password){
				self.req.session.user = _user;
				delete _user.password;
				return self.emit('json', { status: 1, message: '登录成功!' , user: _user});
			} else {
				return self.emit('json', { status: 0, message: '密码错误!' });
			}
		} else {
			return self.emit('json', { status: 0, message: '用户不存在!'});
		}
	})
  }
});

module.exports = regController;

