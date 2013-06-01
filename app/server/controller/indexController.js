var Controller = require('../../lib/Controller');
var User = {} ;
var view = require('../view');
var indexController = Controller.extend({
  uri: /^\/?$/,
  start: function(){
    this.emit('render');
  },
  render: function(){
    this.res.write(view.use('page')({title:'Welcome to My Page'}));
    this.emit('end');
  }
});

module.exports = indexController;

