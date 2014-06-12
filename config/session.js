module.exports = function(connect) {
  var Store = require('connect-mongo')(connect),
      store = new Store({
        db: 'microweb',
        collecion: 'sessions',
        host: '127.0.0.1',
        port: 27017
      });

  return connect.session({
    key : 'NODESSID',
    store : store,
    secret : 'signed',
    cookie : {
      path : '/',
      maxAge : 1440000
    }
  });

};
