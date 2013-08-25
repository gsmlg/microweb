var socket = io.connect('http://localhost:3000');

// io.sockets.clients('room');

socket.on('message', function (data) {
    var tr = $('<tr />');
    tr.append($('<td />').html(data.user));
    tr.append($('<td />').html(data.message));
    tr.append($('<td />').html(data.time));
    $('#chat-title').after(tr);
    console.log(data);
    // console.log(tr);
});

$('#ChatBox form').on('submit', function(e){
    var msg = $('#msg').val();
    if (msg.length > 0){
        socket.emit('newMsg', {message: msg});
    }
    e.preventDefault();
    return false;
});
