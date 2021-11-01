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
  this.players = {}
  this.players['Naruto'] = this.add.group();
  this.players['Pikachu'] = this.add.group();
  self.room = ""
  this.matter.world.disableGravity();



  io.on('connection', function(socket) {
    console.log("ONE CONNEXION");
    socket.on("nouveau_joueur", (room, equipe) => {
      console.log("ROOM");
      console.log(room);
      socket.join(room);
      socket.room = room;
      socket.equipe = equipe;
      // self.room = room


      // console.log("CLIENTS");
      const clients = io.sockets.adapter.rooms.get(socket.room);
      // console.log(clients);

      for (const clientId of clients ) {

     //this is the socket of each client in the room.
     // console.log("CLIENT SOCKET");
     const clientSocket = io.sockets.sockets.get(clientId);

     // console.log(clientSocket);

     //you can do whatever you need with this
     // clientSocket.leave('Other Room')

   }

      // console.log("CLIENTS");
      // console.log(clients);
      // console.log("PLAYER SOCKET");
      // console.log(clientSocket);
      console.log("SOCKET ROOM");
      console.log(socket.room);
      players[socket.room][socket.id] = {
        atlas: socket.handshake.headers.atlas,
        arene: socket.room,
        equipe: equipe,
        wall: false,
        attack: false,
        alpha: 1,
        depth: 30,
        anim: 'profil',
        scale: 0.38,
        size: 200,
        x: /*Math.floor(Math.random() * 700) + 50*/ 1000,
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
      // console.log("le j");
      // console.log(players[socket.room][socket.id]);
      addPlayer(self, players[socket.room][socket.id]);
      socket.emit("tout_les_joueurs", players);
      // let player;

      // players[socket.room][socket.id] = player;
      // console.log("J SOLO");


      // console.log("sTart");
      // Object.keys(players).forEach(function(arene) {
      //   self.players[arene].getChildren().forEach(function(player) {
      //     console.log(player);
      //     // console.log(players[id]);
      //     // console.log(player.playerId);
      //     // if (players[id].playerId === player.playerId) {
      //     //   player.flipX = (players[id].flipX);
      //     //   player.setScale(players[id].scale);
      //     //   player.setPosition(players[id].x, players[id].y);
      //     //   player.setDepth(players[id].depth);
      //     //   player.setAlpha(players[id].alpha);
      //     // //   // players.[id].base = ;
      //     // //
      //     //   if (players[id].anim && players[id].anim !== false) {
      //     //     player.play('' + players[id].anim + '_' + players[id].atlas + '', 5);
      //     //   }
      //     // }
      //   });
      // });
      // console.log("End");

      // console.log(players[socket.room]);
      // console.log("start loop");
      // Object.keys(players).forEach(function(id) {
        // console.log(players);
      //   console.log(players[id].playerId );
      //   if (players[id].playerId === self.socket.id) {
      //     self.displayPlayers(self, players[id]);
      //   } else {
      //     self.displayPlayers(self, players[id]);
      //   }
      // });
      // console.log("end loop");

      // QUESTION: LOOP FOR A PEUT ETRE AJOUTER POUR RECUPERER LES JOUREURS DE L ARENE COURANTE

      socket.broadcast.to(room).emit("nouveau_joueur", players[socket.room][socket.id]);

      socket.on('disconnect', function() {
      console.log('user disconnected');
      // remove player from server
      removePlayer(self, socket.id);
      // remove this player from our players object
      delete players[socket.id];
      // emit a message to all players to remove this player
      io.emit('disconnection', socket.id);
    });


    socket.on('playerInput', function(inputData) {
      handlePlayerInput(self, socket.id, socket.room, inputData);
    });


    });

  })
}

function update() {
  // console.log(this.players.getChildren());
  // console.log(arene);
  Object.keys(this.players).forEach((arene) => {
  this.players[arene].getChildren().forEach((player) => {
    const input = players[player.arene][player.playerId].input;

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


    players[player.arene][player.playerId].x = player.x;
    players[player.arene][player.playerId].y = player.y;
    players[player.arene][player.playerId].scale = player.scale;
    players[player.arene][player.playerId].flipX = player.flipX;
    players[player.arene][player.playerId].anim = player.anim;
    players[player.arene][player.playerId].base = player.base;
    players[player.arene][player.playerId].depth = player.depth;
    players[player.arene][player.playerId].size = player.size;
    players[player.arene][player.playerId].alpha = player.alpha;
    players[player.arene][player.playerId].attack = player.attack;
    players[player.arene][player.playerId].wall = player.wall;
    // console.log(player.playerId);
    // console.log(player.arene);
    // console.log("inside");


  });
// this.players[arene] = {}
// console.log(this.players[arene])
// console.log(players[player.arene][player.playerId]);
  // console.log(this.players[arene]);
  io.to(arene).emit("playerUpdates", players[arene]);

  });

  // this.players.getChildren().forEach((player) => {
    // console.log(this.players['Pikachu']);
    // console.log(player.arene]);
    // console.log(player);
    // console.log(players[player.arene]);
//     const input = players[player.arene][player.playerId].input;
//
//     player.base = 0;
//     player.anim = false;
//     player.attack = false;
//     player.wall = false;
//
// if (input.left && !input.c) {
//   player.thrust(-0.025);
//   player.flipX = true, player.anim = 'walk';
// }
//
// if (input.right && !input.c) {
//   player.thrust(0.025);
//   player.flipX = false, player.anim = 'walk';
// }
//
//     if (input.up) {
//       if (player.x < 605  ) {
//         player.scale = player.scale - 0.003;
//         player.y -= 2;
//         player.depth = player.depth - 1;
//         if (!input.space) {
//         player.anim = 'goback';
//        }
//       }
//       if (player.x > 605 ) {
//         player.scale = player.scale - 0.003;
//         player.y -= 2;
//         player.depth = player.depth - 1;
//         if (!input.space) {
//         player.anim = 'goback';
//         }
//       }
//     }
//
//     // bigger
//     if (input.down && player.scale <= 2) {
//       player.scale = player.scale + 0.003;
//       player.y += 2;
//       player.depth += 1;
//       if (!input.space) {
//       player.anim = 'front';
//       }
//     }
//
//     if (input.a) {
//       if (!input.space) {
//       player.anim = 'attack1';
//       }
//       player.setSize(900);
//       player.attack = true;
//       player.wall = true;
//     }
//
//     if (input.t) {
//       player.anim = 'heal';
//     }
//
//     if (input.space) {
//       player.base = player.y;
//       // player.setIgnoreGravity(false);
//       player.setVelocityY(-59);
//       player.anim = 'jump';
//     }
//
//     if (player.x !== 0 && player.x === player.base) {
//       // player.setIgnoreGravity(true);
//     }
//       // if (!player.anims.getFrameName().includes("jump") && player.body.touching.down) {
//         // player.anims.play('jump');
//       // }
//       // if (player.body.touching.down) {
//         // player.setVelocityY(-59);
//       // }
//
//     if (input.c) {
//       if (input.left) player.setVelocityX(-800);
//       if (input.right) player.setVelocityX(800);
//       player.anim = 'run';
//     }
//
//
//     players[player.playerId].x = player.x;
//     players[player.playerId].y = player.y;
//     players[player.playerId].scale = player.scale;
//     players[player.playerId].flipX = player.flipX;
//     players[player.playerId].anim = player.anim;
//     players[player.playerId].base = player.base;
//     players[player.playerId].depth = player.depth;
//     players[player.playerId].size = player.size;
//     players[player.playerId].alpha = player.alpha;
//     players[player.playerId].attack = player.attack;
//     players[player.playerId].wall = player.wall;
  // console.log(player);
// console.log(players[player.arene][player.playerId].input);
  // });
//   //envoi mise à jour de tout les players
  // io.emit('playerUpdates', players);
  // console.log(this.test);
  // let players['joueur'] = "bonsoir";

}

function handlePlayerInput(self, playerId, arene, input) {

    Object.keys(players[arene]).forEach(function(a) {

      self.players[arene].getChildren().forEach((player) => {

        if (playerId === player.playerId) players[arene][player.playerId].input = input

      });

      // console.log(a);
    });

  // self.players[arene].getChildren().forEach((player) => {
  //   Object.keys(player).forEach(function(a) {
  //     console.log(a);
  //   });
  //
  // // console.log(arene);
  //   // console.log(player);
  //
    // console.log(players[player.playerId]);
  //   // if (playerId === player.playerId) players[player.arene][player.playerId].input = input
  // });
}

function addPlayer(self, playerInfo) {
  const player = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, null).setOrigin(0.5, 0.5).setDisplaySize(10, 10).setSize(100);
  player.playerId = playerInfo.playerId;
  player.arene = playerInfo.arene;
  player.setFrictionAir(0.1);
  player.setMass(10);
  self.players[playerInfo.arene].add(player);
}

function removePlayer(self, playerId) {
  self.arene.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
