
var connect = require('connect'),
    config = require('./config'),
    path = require('path'),
    app = module.exports = connect();

app.use(connect.logger('dev'));

app.use(connect.methodOverride());

app.use(connect.compress());

app.use(connect.bodyParser());

app.use(connect.cookieParser('cookies secure key'));

app.use(config.session(connect));

app.use(connect.static(path.join(__dirname, 'client')));

app.use(function(req,res,next){
  res.redirect = function(url){
    res.statusCode = 302;
    res.setHeader('location',url);
    res.end();
  };
  next();
});

app.use(config.route(connect));
var jade = require('jade'),
    fs = require('fs'),
    viewPath = path.join(__dirname, 'server/view/');

app.use(function(req, res, next) {
  if (req.url === '/404'){
    res.statusCode = 404;
    var tpl = fs.readFileSync(viewPath + '404.jade', {encoding: 'utf8'});
    res.end(jade.compile(tpl)());
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (res.statusCode === 404) {
    res.statusCode = 302;
    res.setHeader('location', '/404');
    res.end();
  }
  res.end('You are in node web! \n' +
          Object.getOwnPropertyNames(req) +'\n' +
          Object.getOwnPropertyNames(res) + '\n' +
         req.url + ' ' + req.method);
});
