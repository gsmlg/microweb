var Class = require('./Class'),
    emitter = require('events').EventEmitter,
    Controller = Class.extend( emitter.prototype, emitter );
module.exports = Controller.extend({
  constructor: function(req, res, next){
    this.req = req;
    this.res = res;
    this.next = next;
    this.on('start',this.start);
    this.on('end',this.end);
    this.on('auth',this.auth);
    this.on('render', this.render);
    this.on('error', this.error);
    this.on('init', this.initialize);
    this.initialize.apply(this, arguments);
  },
  start: function(){
    this.emit('auth');
  },
  auth: function() {
    this.emit('rendern');
  },
  initialize: function(){
  },
  render: function(){
    this.emit('end');
  },
  error: function() {
    this.next();
  },
  end: function() {
    return this.res.end();
  }

}, {

  test: function(uri){
    this._createRegExpFromUrl();
    return this.uriRegExp.test(uri);
  },


  _createRegExpFromUrl: function(){
    var uri = this.prototype.uri || this.uri || /^\/?$/;
    if ( '[object RegExp]' === Object.prototype.toString.call(uri) ) {
      return this.uriRegExp = uri;
    } else if (typeof uri === 'string') {

    } else {
      return {test:function(){return false;}};
    }
  }

});



