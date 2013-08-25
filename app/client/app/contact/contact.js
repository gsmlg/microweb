var socket = io.connect('http://' + window.location.host);

socket.on('message', function (data) {
    var tr = $('<tr />');
    tr.append($('<td />').html(data.user));
    tr.append($('<td />').html(data.message));
    tr.append($('<td />').html(data.time));
    $('#chat-title').after(tr);
    // console.log(tr);
});

$('#ChatBox form').on('submit', function(e){
    var msg = $('#msg').val();
    if (msg.length > 0){
        socket.emit('newMsg', {message: msg});
        $('#msg').val('').focus();
    }
    e.preventDefault();
    return false;
});
