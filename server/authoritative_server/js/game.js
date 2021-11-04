const players = {};
players['Naruto'] = {};
players['Pikachu'] = {};

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 1500,
  height: 720,
  scene: {
    create: create,
    update: update,
    physics: {
        matter: {
            debug: true,
        gravity: { y: 10 }
        }

    }
},
  autoFocus: false
};


function create() {
  const self = this;
  this.players = {}
  this.players['Naruto'] = this.add.group();
  this.players['Pikachu'] = this.add.group();
  self.room = ""
  // this.matter.world.disableGravity();



  io.on('connection', function(socket) {
    console.log("ONE CONNEXION");
    socket.on("nouveau_joueur", (room, equipe) => {
      console.log("EQUIPE");
      console.log(equipe);
      equipe == "A"

      let x = equipe == "A" ? -379 : 7000
      let y = equipe == "A" ? 137 : -1553

      socket.join(room);
      socket.room = room;
      socket.equipe = equipe;
      players[socket.room][socket.id] = {
        atlas: socket.handshake.headers.atlas,
        arene: socket.room,
        equipe: socket.equipe,
        wall: false,
        attack: false,
        alpha: 1,
        depth: 30,
        anim: 'profil',
        scale: 0.38,
        size: 200,
        x: x,
        y: y,
        playerId: socket.id,
        input: {
          left: false,
          right: false,
          up: false,
          down: false,
          a: false
        },
      };
      addPlayer(self, players[socket.room][socket.id]);
      socket.emit("tout_les_joueurs", players);

      socket.broadcast.to(room).emit("nouveau_joueur", players[socket.room][socket.id]);

      socket.on('disconnect', function() {
      console.log('user disconnected');
      // remove player from server
      removePlayer(self, socket.id, socket.room);
      // remove this player from our players object
      delete players[socket.room][socket.id];
      // emit a message to all players to remove this player
      io.to(socket.room).emit("disconnection", socket.id);

    });


    socket.on('playerInput', function(inputData) {
      handlePlayerInput(self, socket.id, socket.room, inputData);
    });


    });

  })
}

function update() {
  Object.keys(this.players).forEach((arene) => {
  this.players[arene].getChildren().forEach((player) => {
    const input = players[player.arene][player.playerId].input;

    // player.base = 0;
    // player.anim = false;
    // player.attack = false;
    // player.wall = false;

if (input.left && !input.c) {
  // player.thrust(-0.025);
  player.setVelocityX(-10)
  player.flipX = true, player.anim = 'walk';
}

if (input.right && !input.c) {
  // player.thrust(0.025);
  player.setVelocityX(10)
  player.flipX = false, player.anim = 'walk';
}

    // if (input.up) {
    //   if (player.x < 605  ) {
    //     player.scale = player.scale - 0.003;
    //     player.y -= 2;
    //     player.depth = player.depth - 1;
    //     if (!input.space) {
    //     player.anim = 'goback';
    //    }
    //   }
    //   if (player.x > 605 ) {
    //     player.scale = player.scale - 0.003;
    //     player.y -= 2;
    //     player.depth = player.depth - 1;
    //     if (!input.space) {
    //     player.anim = 'goback';
    //     }
    //   }
    // }

    // bigger
    // if (input.down && player.scale <= 2) {
    //   player.scale = player.scale + 0.003;
    //   player.y += 2;
    //   player.depth += 1;
    //   if (!input.space) {
    //   player.anim = 'front';
    //   }
    // }

    if (input.a) {
      if (!input.space) {
      player.anim = 'attack1';
      }
      player.setSize(900);
      player.attack = true;
      player.wall = true;
    }

    if (input.t) {
      player.setVelocityY(10);
      player.anim = 'heal';
    }

    if (input.space) {
      // player.base = player.y;
      // player.setIgnoreGravity(false)
      player.setVelocityY(-10);
      player.anim = 'jump';
      console.log(player.body.ignoreGravity);
    } else {
      // player.setVelocityY(10);
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
      if (input.left) player.setVelocityX(-100);
      if (input.right) player.setVelocityX(100);
      player.anim = 'run';
    }

    players[player.arene][player.playerId].velocityX = player.body.velocity.x;
    players[player.arene][player.playerId].velocityY = player.body.velocity.y;
    players[player.arene][player.playerId].scale = player.scale;
    players[player.arene][player.playerId].flipX = player.flipX;
    players[player.arene][player.playerId].anim = player.anim;
    // players[player.arene][player.playerId].base = player.base;
    players[player.arene][player.playerId].depth = player.depth;
    // players[player.arene][player.playerId].size = player.size;
    players[player.arene][player.playerId].alpha = player.alpha;
    // players[player.arene][player.playerId].attack = player.attack;
    // players[player.arene][player.playerId].wall = player.wall;
    players[player.arene][player.playerId].x = player.x;
    players[player.arene][player.playerId].y = player.y;
    players[player.arene][player.playerId].angle = player.angle;
    players[player.arene][player.playerId].friction = player.body.friction;
  });
  io.to(arene).emit("playerUpdates", players[arene]);

  });
}

function handlePlayerInput(self, playerId, arene, input) {

    Object.keys(players[arene]).forEach(function(a) {

      self.players[arene].getChildren().forEach((player) => {

        if (playerId === player.playerId) players[arene][player.playerId].input = input

      });
    });
}

function addPlayer(self, playerInfo) {
  const player = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, null).setOrigin(0.5, 0.5).setScale(0.38);
  player.playerId = playerInfo.playerId;
  player.arene = playerInfo.arene;


  player.setFrictionAir(0.1);
  player.setMass(1);
  // player.setIgnoreGravity(true)

  self.players[playerInfo.arene].add(player);
}

function removePlayer(self, playerId, arene) {
  self.players[arene].getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
