var Controller = require('../../lib/Controller');
var User = {} ;
var view = require('../view');
var todosController = Controller.extend({
  uri: /^\/todos\/?$/,
  start: function(){
	user = this.req.session.user;
    this.emit('render',view.use('todos'), {title: 'TODOS',user: user, activeBar: 'todos'});
  }
});

module.exports = todosController;

