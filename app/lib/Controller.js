var Controller = module.exports = Class.extend({
	constructor: function(req, res, next){
		this.auth.apply(this, arguments);

		this.initialize.apply(this, arguments);

		this.end.apply(this, arguments);

	},
	auth: function(req, res, next) {
		return true;
	},
	initialize: function(){},
	end: function(req, res, next) {

	}
	
}, {

	test: function(url){
		this._createRegFromUrl();
		return this.urlRegExp.test(url);
	},

	url: '/',

	_createRegExpFromUrl: function(){
		var url = this.prototype.url || this.url ;
		if ( '[object RegExp]' === Object.prototype.call(url) ) {
			return this.urlRegExp = url;
		} else if (typeof url === 'string') {

		} else {
			return {test:function(){return false;}};
		}
	}
	
});
