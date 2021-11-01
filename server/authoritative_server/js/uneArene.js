const players = {};

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 1500,
  height: 720,
  scene: {
    create: create,
    update: update,
    physics: {
        arcade: {
            debug: true,
            gravity: { x: 0 , y:0}
        },
        matter: {
            debug: true,
            gravity: { x: 0, y:0 }
        }
    }
},
  autoFocus: false
};


function create() {
  const self = this;
  self.players = this.add.group();

  io.on('connection', function(socket) {

    console.log('a user connected');
    socket.join(socket.handshake.headers.arene)
    console.log("ROOOM");
    socket.arene = socket.handshake.headers.arene

    // create a new player and add it to our players object
    console.log(socket.handshake.headers.arene)
    players[socket.id] = {
      arene: socket.arene,
      atlas: socket.handshake.headers.atlas,
      equipe: socket.handshake.headers.equipe,
      wall: false,
      attack: false,
      alpha: 1,
      depth: 30,
      anim: 'profil',
      scale: 0.38,
      size: 200,
      x: 1000,
      y: 447,
      playerId: socket.id,
      input: {
        left: false,
        right: false,
        up: false,
        down: false,
        a: false
      }
    };

    // add player to server
    addPlayer(self, players[socket.id]);
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    // send the star object to the new player
    // socket.emit('updateScore', self.scores);
    socket.on('disconnect', function() {
      console.log('user disconnected');
    //   // remove player from server
      removePlayer(self, socket.id);
    //   // remove this player from our players object
      delete players[socket.id];
    //   // emit a message to all players to remove this player
      io.emit('disconnection', socket.id);
    });
    socket.on('playerInput', function(inputData) {
      handlePlayerInput(self, socket.id, inputData);
    });
  })
}

function update() {
  this.players.getChildren().forEach((player) => {

    const input = players[player.playerId].input;

    player.base = 0;
    player.anim = false;
    player.attack = false;
    player.wall = false;

if (input.left && !input.c) {
  player.thrust(-0.025);
  player.flipX = true, player.anim = 'walk';
}

if (input.right && !input.c) {
  player.thrust(0.025);
  player.flipX = false, player.anim = 'walk';
}

    if (input.up) {
      if (player.x < 605  ) {
        player.scale = player.scale - 0.003;
        player.y -= 2;
        player.depth = player.depth - 1;
        if (!input.space) {
        player.anim = 'goback';
       }
      }
      if (player.x > 605 ) {
        player.scale = player.scale - 0.003;
        player.y -= 2;
        player.depth = player.depth - 1;
        if (!input.space) {
        player.anim = 'goback';
        }
      }
    }

    // bigger
    if (input.down && player.scale <= 2) {
      player.scale = player.scale + 0.003;
      player.y += 2;
      player.depth += 1;
      if (!input.space) {
      player.anim = 'front';
      }
    }

    if (input.a) {
      if (!input.space) {
      player.anim = 'attack1';
      }
      player.setSize(900);
      player.attack = true;
      player.wall = true;
    }

    if (input.t) {
      player.anim = 'heal';
    }

    if (input.space) {
      player.base = player.y;
      // player.setIgnoreGravity(false);
      player.setVelocityY(-59);
      player.anim = 'jump';
    }

    if (player.x !== 0 && player.x === player.base) {
      // player.setIgnoreGravity(true);
    }
      // if (!player.anims.getFrameName().includes("jump") && player.body.touching.down) {
        // player.anims.play('jump');
      // }
      // if (player.body.touching.down) {
        // player.setVelocityY(-59);
      // }

    if (input.c) {
      if (input.left) player.setVelocityX(-800);
      if (input.right) player.setVelocityX(800);
      player.anim = 'run';
    }


    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].scale = player.scale;
    players[player.playerId].flipX = player.flipX;
    players[player.playerId].anim = player.anim;
    players[player.playerId].base = player.base;
    players[player.playerId].depth = player.depth;
    players[player.playerId].size = player.size;
    players[player.playerId].alpha = player.alpha;
    players[player.playerId].attack = player.attack;
    players[player.playerId].wall = player.wall;
  // console.log(player);
// console.log(players[player.arene][player.playerId].input);
  });
//   //envoi mise à jour de tout les players
  io.emit('playerUpdates', players);

}

function handlePlayerInput(self, playerId, input) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) players[player.playerId].input = input
  });
}

function addPlayer(self, playerInfo) {
  const player = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, null).setOrigin(0.5, 0.5).setDisplaySize(10, 10).setSize(100);
  player.playerId = playerInfo.playerId;
  player.setFrictionAir(0.1);
  player.setMass(10);
  self.players.add(player);
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
