var server = require('./app'),
    io = require('socket.io').listen(server),
    session = require('./config/session'),
    connect = require('connect'),
    cookieParser = connect.cookieParser('cookies secure key'),
    session = require('./config/session')(connect),
    Session = require('connect').middleware.session.Session;;




io.sockets.on('connection', function(socket){
    // socket.emit('connected', {'msg': 'socket.io has connected! Welcome you, '+socket.handshake.session.user.name});


    var hs = socket.handshake;

    console.log('A socket with sessionID ' + hs.sessionID 
        + ' connected!');

    // setup an inteval that will keep our session fresh
    var intervalID = setInterval(function () {
        // reload the session (just in case something changed,
        // we don't want to override anything, but the age)
        // reloading will also ensure we keep an up2date copy
        // of the session with our connection.
        hs.session.reload( function () { 
            // "touch" it (resetting maxAge and lastAccess)
            // and save it back again.
            hs.session.touch().save();
        });
    }, 60 * 1000);

    // 结束连接时，不再刷新cookie时间
    socket.on('disconnect', function () {
        console.log('A socket with sessionID ' + hs.sessionID 
            + ' disconnected!');
        // clear the socket interval to stop refreshing the session
        clearInterval(intervalID);
    });

    // socket.join('room');
 
    socket.on('newMsg', function (data){
        var d = new Date;
        var now = d.getFullYear() + '-' +
                    (d.getMonth() + 1) + '-' + 
                    d.getDate() + ' ' + 
                    d.getHours() + ':' +
                    d.getMinutes() + ':' + 
                    d.getSeconds();
        socket.broadcast.emit('message', {
            user: hs.session.user.name,
            message: data.message,
            time: now
        });
        socket.emit('message', {
            user: hs.session.user.name,
            message: data.message,
            time: now
        });
    });
});


io.configure(function (){
    io.set('authorization', function (handshakeData, callback) {
        // console.log(handshakeData);
        handshakeData.originalUrl = handshakeData.url;
        cookieParser(handshakeData, {}, function(){});
        session(handshakeData, {on: function(){}}, function(){});
        handshakeData.sessionStore.get(handshakeData.sessionID, function(err, sess){
            if (err || !sess.user || !sess.user.name) {
                callback(err || 'neet to login', false);
            } else {
                handshakeData.session = new Session(handshakeData, sess);
                callback(null,true);
            }
        });
    });
});
