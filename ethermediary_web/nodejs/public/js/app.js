var socket = io.connect('http://localhost:3000');

socket.on('message', function(message) {alert(message);});

$('#start_button').click(function () {
socket.emit('message', 'Salut serveur, ça va ?');
});

/*
$('#myForm').on('submit', function (event) {

  event.preventDefault(); // Stop the form from causing a page refresh.
  var data = {
    username: $('#username').val(),
    password: $('#password').val()
  };

  $.ajax({
    url: 'http://localhost/my/url',
    data: data,
    method: 'POST'
  }).then(function (response) {
    // Do stuff with the response, like add it to the page dynamically.
    $('body').append(response);
  }).catch(function (err) {
    console.error(err);
  });
});*/
