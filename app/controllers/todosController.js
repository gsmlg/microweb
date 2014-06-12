var Controller = require('../../lib/Controller');
var Todos = require('../model/todos.js');
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
    var todos = [{title:'Controller',processed:'35'},{title:'Model',processed:'80'},{title:'View',processed:'73'}];
    var todo = new Todos();
    var self = this;
    Todos.find({$or:[{state:'pending'}, {state:'doing'}]}, function(err,list){
      if(err)
        return self.emit('json',{status: 0, message: err.errors});
      if (todo)
        return self.emit('json', {status: 1, message: 'done', todo: list});
      return self.emit('json', {status: 0, message: 'unknown'});
    });
  },
  post: function(){
    var todo = this.req.body;
    var self = this;console.log(this.req.body);
    Todos.create(todo, function(err, _todo){
      if(err){
        console.log(err);
        return self.emit('json',{status: 0, message: err.errors});
      }
      if (_todo){
        console.log(_todo);
        return self.emit('json', {status: 1, message: 'done', todo: _todo});
      }
      return self.emit('json', {status: 0, message: 'unknown'});
    });
  },
  put: function(){
    var todo = this.req.body,
        id = todo['_id'],
        self = this;
    delete todo['_id'];
    Todos.findByIdAndUpdate(id, todo, {upsert: false}, function(err, _todo){
      if(err){
        console.log(err);
        return self.emit('json',{status: 0, message: err.errors});
      }
      if (_todo){
        console.log(_todo);
        return self.emit('json', {status: 1, message: 'done', todo: _todo});
      }
      return self.emit('json', {status: 0, message: 'unknown'});
    });
  },
  delete: function(){
    var id = this.req.url.match(/^\/todos\/api\/(\w{24})/)[1],
        self = this;
    Todos.findByIdAndUpdate(id, {$set:{state:'trash'}}, {upsert: false}, function(err, _todo){
      if(err){
        return self.emit('json',{status: 0, message: err.errors});
      }
      if (_todo){
        return self.emit('json', {status: 1, message: 'done'});
      }
      return self.emit('json', {status: 0, message: 'unknown'});
    });
  }
});

module.exports = todosController;

