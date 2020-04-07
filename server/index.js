const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // listen to user coming into a server
  socket.on('add user', (username) => {
    if (addedUser) return;

    // store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });

    // echo globally (all clients) that a person has connected
    socket.emit('user joined', {
      username: socket.username,
      playerId: numUsers
    });

    console.log(socket.username);
  });

  // whenever a player plays does an action
  socket.on('action', (data) => {
    socket.broadcast.emit('action', {
      playerId: socket.id,
      username: socket.username,
      action: data
    });
  });
  

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});