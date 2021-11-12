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
        gravity: {
          y: 3
        },
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
  this.groupeBullets = this.add.group();
  this.canon1 = this.add.rectangle(0, -460, 333, 125)


  self.room = ""
  // let a = this.add.zone(26, 144, 210, 210).setSize(4050, 40);
  // var socleJoueur = self.matter.add.gameObject(a).setStatic(true).setIgnoreGravity(true);

  // this.matter.world.disableGravity();


  // this.matter.add.image(3426, -500, 'tobogan', null, { isStatic: true }).setAngle(-26);
  // this.matter.add.image(-250, 360, 'tobogan', null, { isStatic: true });
  // this.matter.add.image(7300, -1400, 'tobogan', null, { isStatic: true });

  // let a = this.add.zone(3500, -700, 210, 210).setSize(3246, 40)
  // var socleJoueur = self.matter.add.gameObject(a).setStatic(true).setIgnoreGravity(true).setAngle(-26);

  this.bullet = this.matter.add.image(1210, -400, 'bullet', null, { ignoreGravity: true });
  this.bullet.setFixedRotation();
  // this.bullet.setMass(500);
  this.bullet.setStatic(true);

  // this.ellipse1 = this.add.ellipse(1210, 301, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);
  // this.ellipse2 = this.add.ellipse(5675, -1676 + 301, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);



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
          a: false,
          z: false
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
        // console.log(inputData);
        handlePlayerInput(self, socket.id, socket.room, inputData);
      });


    });

  })
}

function update() {

  Object.keys(this.players).forEach((arene) => {
    this.players[arene].getChildren().forEach((player) => {
      const input = players[player.arene][player.playerId].input;

      // console.log(input.z);
      if (input.z) {
        // TODO: ACTIF SI PRET DU POTEAU
        let bx = 1210;
        let by = -400;
        if (player.world.localWorld.constraints.length == 0) {
        this.matter.add.constraint(this.bullet ,player);
        var tween = this.tweens.add({
          targets: this.bullet,
          x: 5675,
          y: -2376,
          onComplete: () => (player.world.localWorld.constraints = []),  // set context? how?
          yoyo: true,
          // onYoyo: function () { addEvent('onYoyo') },
          duration: 3500,
        });
        input.z = false

      }
      else {
        player.world.localWorld.constraints = []
      }
      input.z = false;
    }

    if (input.x) {
      input.x = false;
    this.canon1.setAngle(this.canon1.angle + 5)
    }

    if (input.v) {
      console.log("VVVVVVVVVVVVVVVVVV");
      input.v = false;
    this.canon1.setAngle(this.canon1.angle - 5)
    }

    if (input.canonMaintenu) {
      input.canonMaintenu = false;
      console.log("CANON MAINTENU");
      this.bulletCanon = this.groupeBullets.create(this.canon1.x, this.canon1.y + 20, 'bullet').setScale(0.2).setDepth(100);
      this.charge = this.tweens.add({
        targets: this.bulletCanon,
        scale: 4,
        paused: false,
        duration: 2000,
        repeat: 0,
        onComplete: function () {
          console.log('onComplete');
          arguments[1][0].setTintFill(0xcf0000);
        },
      });
    }

    if (input.canonRelache) {
      input.canonRelache = false;
      this.charge.stop()

      this.l = new Phaser.Geom.Line(this.canon1.x, this.canon1.y, this.canon1.x + 5400, this.canon1.y);
      var rad = Phaser.Math.DegToRad(this.canon1.angle);
      let line = Phaser.Geom.Line.SetToAngle(this.l, this.canon1.x, this.canon1.y, rad, 4000);
      // this.graph.lineStyle(10, 0xcf0000, 1);
      // var b = this.graph.strokeLineShape(this.l).setDepth(1000);

      // b.setAlpha(0)

      // this.charge = this.tweens.add({
      //   targets: b,
      //   alpha: 0.7,
      //   yoyo: true,
      //   paused: false,
      //   duration: 200,
      //   repeat: 0,
      //   onComplete: function () { console.log('onComplete'); arguments[1][0].clear(); },
      // });

      this.charge = this.tweens.add({
        targets: this.bulletCanon,
        x: this.l.x2,
        y: this.l.y2,
        paused: false,
        duration: 500,
        repeat: 0,
      });
      console.log("RELACHER");
    }


      if (input.right && !input.c) {
        player.setVelocityX(10)
        player.anim = "walk"
        player.flipX = false;


      } else if (input.left && !input.c) {
        player.setVelocityX(-10)

        player.anim = "walk"
        player.flipX = true;
      }


      // this.girlMap.flipX = true;
      // if (this.ctrlKey.isDown) {
      // this.girlMap.anims.play('run', true);
      // this.girlMap.setVelocityX(-400);
      // } else {
      // this.girlMap.anims.play('walk', true);
      // this.girlMap.setVelocityX(-300);
      // }
      // }
      // if (input.right) {
      // this.girlMap['direction'] = 'right';
      // player.zone.x = player.x;
      // player.ombre.x = player.zone.x
      // player.ombre.y = player.zone.y - 30
      // this.girlMap.flipX = false;
      // if (this.ctrlKey.isDown) {
      // this.girlMap.anims.play('run', true);
      // this.girlMap.setVelocityX(400);
      // } else {
      // this.girlMap.anims.play('walk', true);
      // this.girlMap.setVelocityX(300);
      // }
      // }
      // player.base = 0;
      // player.anim = false;
      // player.attack = false;
      // player.wall = false;
      // if (input.left && !input.c) {
      // player.thrust(-0.025);
      // player.socle.x -= 10;
      // player.setVelocityX(-10)
      // player.flipX = true, player.anim = 'walk';
      // }

      // if (input.left && !input.c) {
      // player.thrust(0.025);
      // player.socle.x += 10;
      // player.setVelocityX(-10)
      // player.flipX = false, player.anim = 'walk';
      // }

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
        this.bullet.x += 10
        this.bullet.y -= 5
        // player.setVelocityY(10);
        // player.setIgnoreGravity(false)
        // player.anim = 'heal';
      }

      if (input.space) {
        // console.log("_____");
        // console.log(player.x);
        // console.log(player.y);
        // player.base = player.y;
        // player.setIgnoreGravity(false)

        // player.y -= 5
        // player.setIgnoreGravity(true)
        player.setVelocityY(-10);
        // console.log("XXX");
        // console.log(player.x);
        // console.log("YYY");
        // console.log(player.y);

        // player.anim = 'jump';
      } else {
        // player.setVelocityY(10);
      }

      if (player.x !== 0 && player.x === player.base) {
        // player.setIgnoreGravity(true);
      }
      // console.log(player.socle.x);
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
      players[player.arene][player.playerId].size = player.size;
      players[player.arene][player.playerId].alpha = player.alpha;
      // players[player.arene][player.playerId].attack = player.attack;
      // players[player.arene][player.playerId].wall = player.wall;
      players[player.arene][player.playerId].x = player.x;
      players[player.arene][player.playerId].y = player.y;
      // players[player.arene][player.playerId].angle = player.angle;
      players[player.arene][player.playerId].friction = player.body.friction;
      players[player.arene][player.playerId].frictionair = player.body.frictionAir;
      players[player.arene][player.playerId].frictionstatic = player.body.frictionStatic;
      players[player.arene][player.playerId].mass = player.body.mass;
      players[player.arene][player.playerId].density = player.body.density;
      players[player.arene][player.playerId].speed = player.body.speed;
      players[player.arene][player.playerId].boundsMIX = player.body.bounds.min.x;
      players[player.arene][player.playerId].boundsMIY = player.body.bounds.min.y;
      players[player.arene][player.playerId].boundsMAX = player.body.bounds.max.x;
      players[player.arene][player.playerId].boundsMAY = player.body.bounds.max.y;
      players[player.arene][player.playerId].px = player.body.position.x;
      players[player.arene][player.playerId].py = player.body.position.y;
      players[player.arene][player.playerId].x = player.x;
      players[player.arene][player.playerId].y = player.y;
      players[player.arene][player.playerId].bulletX = this.bullet.x;
      players[player.arene][player.playerId].bulletY = this.bullet.y;

      if (this.bulletCanon) {
      players[player.arene][player.playerId].bulletCanonY = this.bulletCanon.y
      players[player.arene][player.playerId].bulletCanonX = this.bulletCanon.x
      players[player.arene][player.playerId].bulletCanonScale = this.bulletCanon.scale
      players[player.arene][player.playerId].canonAngle = this.canon1.angle
      players[player.arene][player.playerId].bulletCanonTintFill = this.bulletCanon.tintBottomLeft
      }

      // players[player.arene][player.playerId].ignoreGravity = player.body.ignoreGravity;
      // players[player.arene][player.playerId].socleX = player.socle.x;
      // players[player.arene][player.playerId].socleY = player.socle.y;
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
  const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, null).setDisplaySize(127, 368.22);
  joueur.setFixedRotation()

  joueur.playerId = playerInfo.playerId;
  joueur.arene = playerInfo.arene;

  joueur.setFrictionAir(0.03);
  // joueur.setFriction(1);

  joueur.setMass(15);

  // player.socle = this.add.zone(200, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  // this.physics.add.existing(ennemy['ennemyzone']);
  // player.socle.body.friction.x = 0;
  // player.socle.setIgnoreGravity(true);

  joueur.socle = self.add.zone(playerInfo.x + 300, playerInfo.y + 190, 210, 210).setSize(3500, 40);
  joueur.socle2 = self.add.zone(playerInfo.x + 300, playerInfo.y - 390, 210, 210).setSize(1631, 40);



  var socleJoueur = self.matter.add.gameObject(joueur.socle);
  socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0)
  var socleJoueur2 = self.matter.add.gameObject(joueur.socle2);
  socleJoueur2.setIgnoreGravity(true).setStatic(true).setFriction(0)

  // self.matter.add.constraint(self.bullet, joueur, 500, 0.2);


  self.players[playerInfo.arene].add(joueur);


  // joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -55, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  // joueur.ombre = self.add.ellipse(joueur.socle.x, joueur.socle.y - 30, 100, 20, 0x0009).setAlpha(0.5);

  // var socleJoueur = self.matter.add.gameObject(joueur.socle);
  // socleJoueur.setIgnoreGravity(true).setStatic(true)


  // joueur.setIgnoreGravity(true)

}

function removePlayer(self, playerId, arene) {
  self.players[arene].getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
