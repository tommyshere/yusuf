const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});
// An a list of Player Objects
var _players = [];

var _deck = {};

io.on('connection', (socket) => {
  var addedUser = false;

  // listen to user coming into a server
  socket.on('login', (username) => {
    if (addedUser) return;

    // store the player object in the socket session for this client
    const player = {
      id: _players.length + 1,
      username: username,
      points: 0
    };
    _players.push(player);
    socket.currentPlayer = player;
    addedUser = true;
    emitGetUser(addedUser);
    emitAllUsers();
  });

  // get the current user
  socket.on('get current player', () => {
    emitgetUser(addedUser);
  })

  // get all the users
  socket.on('get players', () => {
    emitAllUsers();
  })

  // get deck
  socket.on('get deck', deck => {
    _deck = deck;
    emitDeck();
  })

  // admin starts game
  socket.on('admin start game', () => {
    io.emit('admin start game');
  })

  // whenever a player plays does an action
  socket.on('action', (data) => {
    io.emit('action', {
      action: data
    });
  });
  
  socket.on('disconnect', () => {
    if (addedUser) {
      // _.remove(_players, (player) => { player === socket.username });

      socket.emit('user disconnected', {
        username: socket.currentPlayer.username,
        players: _players
      })
    console.log('user disconnected', socket.currentPlayer.username);
    }
  });


  // ------------------- Reusable functions ----------------------------------

  // emit the current User
  emitGetUser = function(bool) {
    socket.emit('set current player', {
      currentPlayer: bool ? socket.currentPlayer : undefined
    })
  }

  // emit all players
  emitAllUsers = function() {
    io.emit('set players', {
      players: _players
    })
  }

  // emit deck
  emitDeck = function() {
    io.emit('set deck', {
      deck: _deck
    })
  }
  
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});