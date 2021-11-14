const players = {};
players['Naruto'] = {};
players['Pikachu'] = {};

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 1500,
  height: 720,
  scene: {
    preload: preload,
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

function preload() {
  this.load.atlas('dessinatrice1', 'assets/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');
}


function create() {


      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 5 }),
        frameRate: 6,
        repeat: 0
      });
      this.anims.create({
        key: "goback",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start: 1, end: 7 }),
        frameRate: 7,
        repeat: 0
      });

      this.anims.create({
        key: "front",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'face', start: 1, end: 5 }),
        frameRate: 6,
        repeat: 0
      });
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 1, end: 5 }),
        frameRate: 5,
        repeat: 0
      });
      this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'jump', start: 0, end: 5 }),
        frameRate: 7,
        repeat: 0
      });

      this.anims.create({
        key: "idle_walk",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 5, end: 5 }),
        frameRate: 1,
        repeat: -1
      });

      this.anims.create({
        key: "idle_attack",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 1 }),
        frameRate: 1,
        repeat: 0
      });

      this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 4 }),
        frameRate: 6,
        repeat: -1
      })

  const self = this;
  this.players = {}
  this.players['Naruto'] = this.add.group();
  this.players['Pikachu'] = this.add.group();
  this.platformeGaucheCollision = this.add.group();
  this.platformeDroiteCollision = this.add.group();
  this.groupeBullets = this.add.group();
  this.canon1 = this.add.rectangle(0, -460, 333, 125)



  let soclePlatformeGauche = self.add.zone(-79, 327, 210, 210).setSize(3500, 40);
let socleToitGauche = self.add.zone(-79, -253, 210, 210).setSize(1631, 40);
  let soclePlatformeDroit = self.add.zone(7300, -1363, 210, 210).setSize(3500, 40);
  let socleToitDroit = self.add.zone(7300, -1943, 210, 210).setSize(1631, 40);


  var socleJoueur = self.matter.add.gameObject(soclePlatformeGauche);
  socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0)
  var socleJoueur2 = self.matter.add.gameObject(socleToitGauche);
  socleJoueur2.setIgnoreGravity(true).setStatic(true).setFriction(0)

  var socleJoueur3 = self.matter.add.gameObject(soclePlatformeDroit);
  socleJoueur3.setIgnoreGravity(true).setStatic(true).setFriction(0)
  var socleJoueur4 = self.matter.add.gameObject(socleToitDroit);
  socleJoueur4.setIgnoreGravity(true).setStatic(true).setFriction(0)

this.platformeGaucheCollision.addMultiple([soclePlatformeGauche, socleToitGauche]);
this.platformeDroiteCollision.addMultiple([soclePlatformeDroit, socleToitDroit]);



  self.room = ""

  let tobogan = this.add.zone(3500, -500, 210, 210).setSize(3246, 40)
  var socleTobogan = self.matter.add.gameObject(tobogan).setStatic(true).setIgnoreGravity(true).setAngle(-26);


  this.bullet = this.matter.add.image(1210, -400, 'bullet', null, { ignoreGravity: true });
  this.bullet.setFixedRotation();
  // this.bullet.setMass(500);
  this.bullet.setStatic(true);

  // this.ellipse1 = this.add.ellipse(1210, 301, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);
  // this.ellipse2 = this.add.ellipse(5675, -1676 + 301, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);



  io.on('connection', function(socket) {
    console.log("ONE CONNEXION");
    socket.on("nouveau_joueur", (room, equipe, atlas) => {
      console.log("EQUIPE");
      console.log(equipe);
      equipe == "A"

      let x = equipe == "A" ? -379 : 7000
      let y = equipe == "A" ? 137 : -1553

      socket.join(room);
      socket.room = room;
      socket.equipe = equipe;
      socket.atlas = atlas;
      players[socket.room][socket.id] = {
        atlas: socket.atlas,
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

      // console.log("AAAAAATTTLAS");

      // console.log(socket.atlas);

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

  // this.matter.world.on('collisionstart', function (event) {
  // 	// if (event.pairs[0].bodyA.gameObject){
  //   // if (event.pairs[0].bodyB.gameObject.texture.key == "enemy") {
  //   //
  //   //  }
  //   // }
  //   console.log("COLISION");
	// })


}

function update() {

    this.players["Naruto"].getChildren().forEach((player) => {
      const input = players[player.arene][player.playerId].input;

      //TIROLIENNE
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
      //DEPLACEMENT HAUT-BAS
      if (input.up) {
        player.thrustLeft(0.1);
      } else if (input.down) {
        player.thrustRight(0.1)
      }


      //DEPLACEMENT DROITE-GAUCHE
      if (input.right) {
        player.thrust(0.1)
      } else if (input.left) {
        player.thrustBack(0.1)
      }

      players[player.arene][player.playerId].x = player.x;
      players[player.arene][player.playerId].y = player.y;
      players[player.arene][player.playerId].rotation = player.rotation;
    });
    io.to("Naruto").emit("playerUpdates", players["Naruto"]);

}

function handlePlayerInput(self, playerId, arene, input) {

  Object.keys(players[arene]).forEach(function(a) {

    self.players[arene].getChildren().forEach((player) => {

      if (playerId === player.playerId) players[arene][player.playerId].input = input

    });
  });
}

function addPlayer(self, playerInfo) {
  const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setDisplaySize(127, 368.22);
  // joueur.setFixedRotation()

  joueur.playerId = playerInfo.playerId;
  joueur.arene = playerInfo.arene;
  joueur.atlas = playerInfo.atlas;
  joueur.setFrictionAir(0.05);
  joueur.setMass(30);

  // joueur.setFrictionAir(0.03);
  // joueur.setFriction(1);

  // joueur.setMass(15);

  // player.socle = this.add.zone(200, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  // this.physics.add.existing(ennemy['ennemyzone']);
  // player.socle.body.friction.x = 0;
  // player.socle.setIgnoreGravity(true);

  // joueur.socle = self.add.zone(playerInfo.x + 300, playerInfo.y + 190, 210, 210).setSize(3500, 40);



  self.players[playerInfo.arene].add(joueur);


  // joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -55, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  // joueur.ombre = self.add.ellipse(self..x, joueur.socle.y - 30, 100, 20, 0x0009).setAlpha(0.5);
  // console.log(self.platformeGaucheCollision.getChildren());


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
