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
        debug: false,
        gravity: {
          y: 3,
        },
      }

    }
  },
  autoFocus: false
};

var fontainezone;
var fontainezone2;

function preload() {
  this.load.atlas('dessinatrice1', 'assets/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');
}


function create() {
  // this.matter.world.disableGravity();

  this.tween = null;
  this.graph = this.add.graphics();

  this.vieEquipe = {
    "A": 100,
    "B": 100
  }

      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 5 }),
        frameRate: 6,
        yoyo: true,
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
        repeat: -1
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
        delay: 1,
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
  fontainezone = this.add.zone(-1370, 137, 210, 210).setSize(640, 613)
  fontainezone2 = this.add.zone(8235, -1553, 210, 210).setSize(640, 613)


  this.events = new Phaser.Events.EventEmitter()
  this.events.on('changement-vie-equipe', changementVieEquipe, this)
  this.events.on('changement-vie', changementVie, this)

  let soclePlatformeGauche = self.add.zone(0, 327, 210, 210).setSize(3500, 40);
  let socleToitGauche = self.add.zone(-120, -253, 210, 210).setSize(1631, 40);
  let soclePlatformeDroit = self.add.zone(7000, -1363, 210, 210).setSize(3500, 40);
  let socleToitDroit = self.add.zone(7000, -1943, 210, 210).setSize(1631, 40);


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
  var socleTobogan = self.matter.add.gameObject(tobogan).setStatic(true).setIgnoreGravity(true).setAngle(-26).setFriction(0);


  this.bullet = this.matter.add.image(1210, -400, 'bullet', null, { ignoreGravity: true });
  this.bullet.setFixedRotation();
  this.bullet.setStatic(true).setDepth(2);

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
        attaque: false,
        alpha: 1,
        attacked: false,
        degat: 0,
        vie: 5,
        depth: 30,
        anim: 'profil',
        scale: 0.38,
        size: 200,
        vieEquipe: self.vieEquipe,
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


  this.matter.world.on('collisionstart', function (event) {
    if (event.pairs[0].bodyB.gameObject.equipe && event.pairs[0].bodyA.gameObject.equipe) {
      console.log("VIE B");
      console.log(event.pairs[0].bodyB.gameObject.vie);
      console.log("VIE A");
      console.log(event.pairs[0].bodyA.gameObject.vie);
      this.events.emit('changement-vie', event.pairs[0].bodyA.gameObject.playerId)
    }
    // if (event.pairs[0].bodyB.gameObject.equipe != event.pairs[0].bodyA.gameObject.equipe) {
    //   this.events.emit('changement-vie', event.pairs[0].bodyA.gameObject.playerId)
    // }
    // if (event.pairs[0].bodyB.gameObject.texture.key == "enemy") {
  	// if (event.pairs[0].bodyA.gameObject){
  //   // if (event.pairs[0].bodyB.gameObject.texture.key == "enemy") {
  //   //
  //   //  }
  //   // }
    // console.log("COLISION");
	},this)


}

function update() {

    this.players["Naruto"].getChildren().forEach((player) => {
      const input = players[player.arene][player.playerId].input;

      player.ombre.x = player.x

      if (input.special) {
        player.setScale(0.8)
        input.special = false;
      }

      if (player.attacked) {
      player.setAlpha(0.5)
      // player.setAngularVelocity(5)
      this.socket.
      player.attacked = false;
      }

      /**
       * DROITE-GAUCHE
       */

      if (input.right) {
        if (input.walk) {
          player.thrust(0.1)
          player.play('walk', true)
          player.setFlipX(false)
        } else {
          player.thrust(0)
          if (player.body.speed < 1.5) {
            player.play("idle_walk", true)
          }
        }
      } else if (input.left) {
        if (input.walk) {
          player.thrustBack(0.1)
          player.play('walk', true)
          player.setFlipX(true)
        } else {
          player.thrust(0)
          if (player.body.speed < 1.5) {
          player.play("idle_walk", true)
          }
        }
      }


      /**
       * ANIMATION ATTAQUE + ombre
       */
      if (input.attaque) {
        var count;
        if (input.charge) {
          count = false;
          this.tween = this.tweens.add({
            targets: player.ombre,
            from: 0,
            to: 1,
            scale: 2,
            duration: 2000
          })
          player.play('idle_attack', true)
          input.charge = false;
        } else {
          let puissance = this.tween.totalProgress;
          if (this.tween.isPlaying()) {
          this.tween.stop()
          }
          player.play('attack', true)
          count = true;
          this.tween = this.tweens.add({
            targets: player.ombre,
            from: 0,
            to: 1,
            scale: 1,
            duration: 500,
            onUpdateParams: [ this.events ],
            onUpdate: function functionName(tween, targets, events) {
              if (player.anims.getFrameName() == "attack4") {
                if (count) {
                  var distance = Phaser.Math.Distance.BetweenPoints(player, {x: fontainezone.x, y: fontainezone.y});
                  var distance2 = Phaser.Math.Distance.BetweenPoints(player, {x: fontainezone2.x, y: fontainezone2.y});
                  if (distance < 530 && distance < 540) {
                    events.emit('changement-vie-equipe', "B", puissance)
                  } else if (distance2 < 530 && distance2 < 540) {
                    events.emit('changement-vie-equipe', "A", puissance)
                  }
                  count = false;
                }
              }
            }
          })
        }
        input.attaque = false;
      }

      /**
       * SAUT
       */

      if (input.saut) {
        player.setVelocityY(-50)
        input.saut = false
      }


      //TIROLIENNE
      if (input.tirolienne) {
        var dist = Phaser.Math.Distance.BetweenPoints(player, this.bullet);
        if (dist < 530 && dist < 540) {
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
        input.tirolienne = false

      }
      else {
        player.world.localWorld.constraints = []
      }
    }
      input.tirolienne = false;
    }

    //CANON FEU
    if (input.canonMaintenu) {
      var distCanon = Phaser.Math.Distance.BetweenPoints(player, this.canon1);

      console.log("DISTANCE CANON");
      console.log(distCanon);
      if (distCanon < 106 && distCanon < 121) {
        input.canonMaintenu = false;
        this.bulletCanon = this.groupeBullets.create(this.canon1.x, this.canon1.y + 20, 'bullet').setScale(0.2).setDepth(100);
        this.charge = this.tweens.add({
          targets: this.bulletCanon,
          scale: 4,
          paused: false,
          duration: 2000,
          repeat: 0
        });
      }
    } else if (input.canonRelache) {
      if (this.charge) {
      this.charge.stop()

      this.l = new Phaser.Geom.Line(this.canon1.x, this.canon1.y, this.canon1.x + 5400, this.canon1.y);
      var rad = Phaser.Math.DegToRad(this.canon1.angle);
      let line = Phaser.Geom.Line.SetToAngle(this.l, this.canon1.x, this.canon1.y, rad, 4000);
      this.graph.lineStyle(10, 0xcf0000, 1);
      this.charge = this.tweens.add({
        targets: this.bulletCanon,
        x: this.l.x2,
        y: this.l.y2,
        paused: false,
        duration: 500,
        repeat: 0,
      });
      }
      input.canonRelache = false;

    }

    /**
     * ROTATION CANON
     */

    if (input.x) {
      input.x = false;
      this.canon1.setAngle(this.canon1.angle + 5)
    }

    if (input.v) {
      input.v = false;
      this.canon1.setAngle(this.canon1.angle - 5)
    }

      players[player.arene][player.playerId].x = player.x;
      players[player.arene][player.playerId].y = player.y;
      // players[player.arene][player.playerId].anims = player.anims.getName();
      players[player.arene][player.playerId].frame = player.anims.getFrameName();
      players[player.arene][player.playerId].flipX = player.flipX;
      players[player.arene][player.playerId].scale = player.scale;
      players[player.arene][player.playerId].alpha = player.alpha;
      players[player.arene][player.playerId].ombreX = player.ombre.x;
      players[player.arene][player.playerId].ombreScale = player.ombre.scale;
      players[player.arene][player.playerId].bulletX = this.bullet.x;
      players[player.arene][player.playerId].bulletY = this.bullet.y;
      players[player.arene][player.playerId].rotation = player.rotation;


      if (this.bulletCanon) {
        players[player.arene][player.playerId].bulletCanonY = this.bulletCanon.y
        players[player.arene][player.playerId].bulletCanonX = this.bulletCanon.x
        players[player.arene][player.playerId].bulletCanonScale = this.bulletCanon.scale
        players[player.arene][player.playerId].canonAngle = this.canon1.angle
      }

    });
    io.to("Naruto").emit("playerUpdates", players["Naruto"]);

}

function changementVieEquipe(equipe, puissance) {
  this.vieEquipe[equipe] -= puissance * 10;
  if (this.vieEquipe[equipe] <= 0) {
  io.to("Naruto").emit("fin_de_partie", equipe);
  this.players["Naruto"].remove(true);
  this.vieEquipe["A"] = 100;
  this.vieEquipe["B"] = 100;
  }


  io.to("Naruto").emit("changement_vie_equipe", equipe, this.vieEquipe[equipe]);
}


function changementVie(id) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.vie -= 1;
  // this.vieEquipe[equipe] -= puissance * 10;
  io.to("Naruto").emit("changement_vie", id, joueur.vie);
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
  joueur.playerId = playerInfo.playerId;
  joueur.arene = playerInfo.arene;
  joueur.equipe = playerInfo.equipe;
  joueur.atlas = playerInfo.atlas;
  joueur.vie = playerInfo.vie;
  joueur.vieEquipe = playerInfo.vieEquipe;
  joueur.degat = playerInfo.degat;
  joueur.attacked = playerInfo.attacked;
  joueur.setFrictionAir(0.05);
  joueur.setMass(30);
  self.players[playerInfo.arene].add(joueur);
  // joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -55, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  joueur.ombre = self.add.ellipse(-79, 327 - 30, 100, 20, 0x0009).setAlpha(0.5);
  // var socleJoueur = self.matter.add.gameObject(joueur.socle);
  // socleJoueur.setIgnoreGravity(true).setStatic(true)
}

function removePlayer(self, playerId, arene) {
  self.players[arene].getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
