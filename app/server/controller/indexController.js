var Controller = require('../../lib/Controller');
var User = {} ;
var view = require('../view');
var indexController = Controller.extend({
  uri: /^\/?$/,
  start: function(){
	user = this.req.session.user;
    this.emit('render',view.use('project'), {title: 'a mvc web',user: user});
  }
});

module.exports = indexController;

