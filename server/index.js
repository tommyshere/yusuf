const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});
const _ = require('lodash/core');

var _players = [];

io.on('connection', (socket) => {
  var addedUser = false;

  // listen to user coming into a server
  socket.on('login', (username) => {
    if (addedUser) return;

    // store the username in the socket session for this client
    socket.username = username;
    _players.push(username);
    addedUser = true;
    emitGetUser(addedUser);
  });

  // get the current user
  socket.on('get current player', () => {
    emitgetUser(addedUser);
  })

  // get all the users
  socket.on('get players', () => {
    emitAllUsers();
  })

  // whenever a player plays does an action
  socket.on('action', (data) => {
    socket.broadcast.emit('action', {
      playerId: socket.id,
      username: socket.username,
      action: data
    });
  });
  
  socket.on('disconnect', () => {
    if (addedUser) {
      // _.remove(_players, (player) => { player === socket.username });

      socket.emit('user disconnected', {
        username: socket.username,
        players: _players
      })
    console.log('user disconnected', socket.username);
    }
  });


  // ------------------- Reusable functions ----------------------------------

  // get the current User
  emitGetUser = function(bool) {
    socket.emit('get current player', {
      username: bool ? socket.username : '',
      playerId: bool ? _players.indexOf(socket.username) : -1
    })
  }

  emitAllUsers = function() {
    io.emit('get players', {
      players: _players
    })
  }
  
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});