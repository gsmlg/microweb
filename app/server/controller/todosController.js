var Controller = require('../../lib/Controller');
var User = {} ;
var view = require('../view');
var todosController = Controller.extend({
  uri: /^\/todos(\/api.*)?$/,
  start: function(){
    user = this.req.session.user;
    if (/^\/todos\/?$/.test(this.req.url))
      this.emit('render',view.use('todos'), {title: 'TODOS',user: user, activeBar: 'todos'});
    if (/^\/todos\/api/.test(this.req.url))
      this.emit('auth');
  },
  auth: function(){
    if (!this.req.session.user || !this.req.session.user.name){
      this.emit('redirect','/404');
    }
    switch(this.req.method.toLowerCase()){
    case 'get':
      this.emit('get');
      break;
    case 'post':
      this.emit('post');
      break;
    case 'put':
      this.emit('put');
      break;
    case 'delete':
      this.emit('delete');
      break;
    default:
      this.emit('redirect','/404');
    }
  },
  get: function(){
    var todos = [{title:'Controller'},{title:'Model'},{title:'View'}];
    this.emit('json',todos);
  }
});

module.exports = todosController;

