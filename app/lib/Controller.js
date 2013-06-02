var Class = require('./Class'),
    emitter = require('events').EventEmitter,
    Controller = Class.extend( emitter.prototype, emitter );
module.exports = Controller.extend({
  constructor: function(req, res, next){
    this.req = req;
    this.res = res;
    this.next = next;
    this.on('start',this.start);
    this.on('get', this.get);
    this.on('post', this.post);
    this.on('delete', this.delete);
    this.on('put', this.put);
    this.on('end',this.end);
    this.on('auth',this.auth);
    this.on('render', this.render);
    this.on('error', this.error);
    this.on('init', this.initialize);
    this.on('json', this.json);
    this.initialize.apply(this, arguments);
  },
  start: function(){
    this.emit('auth');
  },
  auth: function() {
    this.emit('render');
  },
  initialize: function(){
  },
  render: function(template, data){
    this.res.write(template(data));
    this.emit('end');
  },
  error: function() {
    this.next();
  },
  end: function() {
    return this.res.end();
  },
  get: function(){
    return this.res.redirect('/404');
  },
  put: function(){
    return this.res.redirect('/404');
  },
  delete: function(){
    return this.res.redirect('/404');
  },
  post: function(){
    return this.res.redirect('/404');
  },
  json: function(data, code){
	  this.res.statusCode = (typeof code === 'number') ? code : 200;
	  this.res.setHeader('Content-Type','application/json');
	  this.res.end(JSON.stringify(data));
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



