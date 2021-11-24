const players = {};
players['Naruto'] = {};
players['Pikachu'] = {};
barils = {};

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
          y: 6,
        },
      }

    }
  },
  autoFocus: false
};

var fontainezone;
var fontainezone2;
var CATEGORIE_JOUEUR = 0b0001
var CATEGORIE_ENNEMIE = 0b0010
var CATEGORIE_PLATFORME = 1

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
  fontainezone = this.add.zone(-4870, -790, 210, 210).setSize(640, 613)
  fontainezone2 = this.add.zone(8235, -1553, 210, 210).setSize(640, 613)

  this.tonneaux = this.add.group();

let tonneau1 = this.add.zone(1300, 1700, 210, 210).setSize(162.58, 215.6)
let tonneau2 = this.add.zone(-1500, 1700, 210, 210).setSize(162.58, 215.6)
let tonneau3 = this.add.zone(-1700, 1700, 210, 210).setSize(162.58, 215.6)
let tonneau4 = this.add.zone(-1900, 1700, 210, 210).setSize(162.58, 215.6)

t1 = self.matter.add.gameObject(tonneau1);
t1.setMass(40).setFriction(2).setFrictionAir(0.1)


t2 = self.matter.add.gameObject(tonneau2);
t2.setMass(40).setFriction(2).setFrictionAir(0.1)


t3 = self.matter.add.gameObject(tonneau3);
t3.setMass(40).setFriction(2).setFrictionAir(0.1)


t4 = self.matter.add.gameObject(tonneau4);
t4.setMass(40).setFriction(2).setFrictionAir(0.1)

this.tonneaux.addMultiple([t1, t2, t3, t4])


//width 162.58
//height 215.6







  this.events = new Phaser.Events.EventEmitter()
  this.events.on('changement-vie-equipe', changementVieEquipe, this)
  this.events.on('changement-vie', changementVie, this)
  this.events.on('fin-de-vie', finDeVie, this)

  //tobogan mini socles
  let microPlatforme = self.add.zone(1916, 235, 210, 210).setSize(200, 40);
  var socleJoueur = self.matter.add.gameObject(microPlatforme).setIgnoreGravity(true).setStatic(true).setFriction(0);


  //mini socles de gauche + min platforme
  let baseFontaine = self.add.zone(-4820, -490, 210, 210).setSize(1500, 40);
  let plotFontaine1 = self.add.zone(-3300, -490, 210, 210).setSize(300, 40);
  let plotFontaine2 = self.add.zone(-2500, -190, 210, 210).setSize(300, 40);

  //platforme principal
  let soclePlatformeGauche = self.add.zone(0, 327, 210, 210).setSize(3500, 40);
  let socleToitGauche = self.add.zone(-120, -253, 210, 210).setSize(1631, 40);
  let soclePlatformeDroit = self.add.zone(7000, -1363, 210, 210).setSize(3500, 40);
  let socleToitDroit = self.add.zone(7000, -1943, 210, 210).setSize(1631, 40);


  //platforme bas
  let soclePlatformeBas = self.add.zone(-2500, 1800, 210, 210).setSize(3500, 40);
  var platformeBas = self.matter.add.gameObject(soclePlatformeBas);
  platformeBas.setIgnoreGravity(true).setStatic(true).setFriction(0)

  /**
   * COLISION GROUPE
   * 1: platforme
   * 2: joueur
   */

  var socleJoueur = self.matter.add.gameObject(soclePlatformeGauche);
  socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)
  var socleJoueur2 = self.matter.add.gameObject(socleToitGauche);
  socleJoueur2.setIgnoreGravity(true).setStatic(true).setFriction(0).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)

  var socleJoueur3 = self.matter.add.gameObject(soclePlatformeDroit);
  socleJoueur3.setIgnoreGravity(true).setStatic(true).setFriction(0).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)
  var socleJoueur4 = self.matter.add.gameObject(socleToitDroit);
  socleJoueur4.setIgnoreGravity(true).setStatic(true).setFriction(0).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)


  let tonneau = this.add.zone(-2000, 1700, 210, 210).setSize(162.58, 215.6)

  this.tonneau = self.matter.add.gameObject(tonneau);
  this.tonneau.setMass(40).setFriction(2).setFrictionAir(0.1)


      var socleFontaineJoueur = self.matter.add.gameObject(baseFontaine).setIgnoreGravity(true).setStatic(true).setFriction(0);
      var plots1 = self.matter.add.gameObject(plotFontaine1).setIgnoreGravity(true).setStatic(true).setFriction(0);
      this.plots2 = self.matter.add.gameObject(plotFontaine2).setIgnoreGravity(true).setStatic(true).setFriction(0);
      this.tweens.add({
        targets: this.plots2,
        y: this.plots2.y + 2000,
        yoyo: true,
        repeat: -1,
        duration: 3000,
        ease: 'Sine.easeInOut'
      });



this.platformeGaucheCollision.addMultiple([soclePlatformeGauche, socleToitGauche]);
this.platformeDroiteCollision.addMultiple([soclePlatformeDroit, socleToitDroit]);



  self.room = ""

  let tobogan = this.add.zone(3500, -500, 210, 210).setSize(3246, 40)
  var socleTobogan = self.matter.add.gameObject(tobogan).setStatic(true).setIgnoreGravity(true).setAngle(-26).setFriction(0).setCollisionGroup(2).setCollidesWith([7]);


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
      if (socket.equipe == "A") {
      mask = 0b0001
    } else {
      mask = 0b0010
    }
      players[socket.room][socket.id] = {
        atlas: socket.atlas,
        arene: socket.room,
        equipe: socket.equipe,
        mask: mask,
        wall: false,
        attaque: false,
        puissanceBonus: 0,
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
        handlePlayerInput(self, socket.id, socket.room, inputData);
      });

    });

  })


  this.matter.world.on('collisionstart', function (event) {
    if (event.pairs[0].bodyA.gameObject.type == "boulet" && event.pairs[0].bodyB.gameObject.equipe) {
      if (event.pairs[0].bodyB.gameObject.vie > 0) {
        this.events.emit('changement-vie', event.pairs[0].bodyB.gameObject.playerId)
      } else {
        this.events.emit('fin-de-vie', event.pairs[0].bodyB.gameObject.playerId)
      }
    } else if (event.pairs[0].bodyB.gameObject.type == "boulet" && event.pairs[0].bodyA.gameObject.equipe) {
      if (event.pairs[0].bodyA.gameObject.vie > 0) {
        this.events.emit('changement-vie', event.pairs[0].bodyA.gameObject.playerId)
      } else {
        this.events.emit('fin-de-vie', event.pairs[0].bodyA.gameObject.playerId)
      }
    }
	},this)

}

function update() {

    this.tonneaux.getChildren().forEach((tonneau) => {
      barils.x = tonneau.x
      barils.y = tonneau.y
      barils.angle = tonneau.angle
    });


    this.players["Naruto"].getChildren().forEach((player) => {
      const input = players[player.arene][player.playerId].input;

      player.ombre.x = player.x

      if (input.special) {
        this.tweens.addCounter({
          duration: 10000,
          onComplete: () => (player.active ? player.setScale(0.38) : null, player.puissanceBonus = 0)
        })

        player.setScale(0.8)
        player.puissanceBonus = 3;
        input.special = false;
      }

      if (input.special2) {
        var invisible = true;
        this.tweens.addCounter({
          duration: 5000,
          onComplete: () => (player.active ? (player.setAlpha(1), player.ombre.setAlpha(1)) : null, invisible = false)
        })
        this.tweens.add({
          targets: player,
          alpha: 0,
          duration: 500
        })
        // player.setAlpha(0)
        player.ombre.setAlpha(0)
        input.special2 = false;
      }

      if (input.special3) {
        this.tweens.addCounter({
          duration: 2000,
          onComplete: () => (player.active ? (player.setRotation(0)) : null)
        })
        player.setAngularVelocity(1)
        input.special3 = false;
      }


      if (input.interactionTonneau) {
        var distT = Phaser.Math.Distance.BetweenPoints(player, this.tonneau);
        if (distT < 300 && distT < 310) {
          if (player.world.localWorld.constraints.length == 0) {
            this.tonneau.y = player.y - player.displayHeight / 2 - 105;
            this.tonneau.x = player.x
            this.tonneau.setFixedRotation().setIgnoreGravity(true)
            this.matter.add.constraint(this.tonneau ,player);
            input.interactionTonneau = false
          }
          else {
            player.world.localWorld.constraints = []
            this.tonneau.x = player.flipX ? (player.x - player.displayWidth) : (player.x + player.displayWidth)
            this.tonneau.y = player.y
            this.tonneau.setIgnoreGravity(false)
          }
        }
        input.interactionTonneau = false;
      }

      if (player.attacked) {
      player.setAlpha(0.5)
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
        if (input.ctrl) {
          player.angle += 20
          input.ctrl = false;
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
        if (input.ctrl) {
          player.angle -= 20
          input.ctrl = false;
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
              if (player.active) {
              if (player.anims.getFrameName() == "attack4") {
                if (count) {
                  var distance = Phaser.Math.Distance.BetweenPoints(player, {x: fontainezone.x, y: fontainezone.y});
                  var distance2 = Phaser.Math.Distance.BetweenPoints(player, {x: fontainezone2.x, y: fontainezone2.y});
                  if (distance < 530 && distance < 540) {
                    events.emit('changement-vie-equipe', "B", puissance + player.puissanceBonus)
                  } else if (distance2 < 530 && distance2 < 540) {
                    events.emit('changement-vie-equipe', "A", puissance + player.puissanceBonus)
                  }
                  count = false;
                }
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
        this.bulletCanon = this.matter.add.image(this.canon1.x, this.canon1.y + 20, 'bullet').setCircle().setIgnoreGravity(true).setBounce(1.6)
        // console.log(this.bulletCanon);
        this.bulletCanon.type = "boulet";
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
        duration: 2000,
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
      players[player.arene][player.playerId].ombreAlpha = player.ombre.alpha;
      players[player.arene][player.playerId].bulletX = this.bullet.x;
      players[player.arene][player.playerId].bulletY = this.bullet.y;
      players[player.arene][player.playerId].rotation = player.rotation;

      players[player.arene][player.playerId].socleMouventY = this.plots2.y
      players[player.arene][player.playerId].tonneauX = this.tonneau.x
      players[player.arene][player.playerId].tonneauY = this.tonneau.y
      players[player.arene][player.playerId].tonneauAngle = this.tonneau.angle

      if (this.bulletCanon) {
        players[player.arene][player.playerId].bulletCanonY = this.bulletCanon.y
        players[player.arene][player.playerId].bulletCanonX = this.bulletCanon.x
        players[player.arene][player.playerId].bulletCanonScale = this.bulletCanon.scale
        players[player.arene][player.playerId].canonAngle = this.canon1.angle
      }

    });
    io.to("Naruto").emit("playerUpdates", players["Naruto"], barils);

}

/**
 * DIMINUTION VIE EQUIPE SELON LA PUISSANCE DE L'ATTAQUE DU JOUEUR
 * @param  {[type]} equipe    [description]
 * @param  {[type]} puissance [description]
 * @return {[type]}           [description]
 */

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


/**
 * DIMINUTION VIE DU JOUEUR: NOMBRE DE VIE -1
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */

function changementVie(id) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.vie -= 1;
  io.to("Naruto").emit("changement_vie", id, joueur.vie);
}


/**
 * REMISE A 5 DE LA VIE DU JOUEUR
 * RESPAWN AVEC ANIMATION
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */

function finDeVie(id) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.vie = 5;
  let x = joueur.equipe == "A" ? -379 : 7000
  let y = joueur.equipe == "A" ? 137 : -1553
  joueur.setCollisionGroup(6).setCollidesWith(4)


  io.to("Naruto").emit("fin_de_vie", id, joueur.vie);
  this.tweens.add({
    targets: joueur,
    props: {
      alpha: {value: 0.1, duration: 1000},
      y: { value: y, delay: 1000, duration: 1500, ease: 'Power2' },
      x: { value: x, delay: 1000, duration: 1500, ease: 'Power2'},
    },
   onComplete: () => joueur.setAlpha(1).setCollisionGroup(CATEGORIE_JOUEUR).setCollidesWith(-1).setRotation(0),
    ease: 'Sine.easeInOut'
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
  const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setDisplaySize(127, 368.22).setAlpha(0);
  joueur.playerId = playerInfo.playerId;
  joueur.arene = playerInfo.arene;
  joueur.equipe = playerInfo.equipe;
  joueur.atlas = playerInfo.atlas;
  joueur.vie = playerInfo.vie;
  joueur.vieEquipe = playerInfo.vieEquipe;
  joueur.degat = playerInfo.degat;
  joueur.attacked = playerInfo.attacked;
  joueur.puissanceBonus = playerInfo.puissanceBonus;
  joueur.setFrictionAir(0.05);
  joueur.setMass(30);
  self.players[playerInfo.arene].add(joueur);
  // joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -55, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  joueur.ombre = self.add.ellipse(-79, 327 - 30, 100, 20, 0x0009).setAlpha(0.5);
  self.tweens.add({
  targets: joueur,
  alpha: 1,
  duration:2000,
  // onComplete: () => (joueur.setScale(0.4), joueur.setCollidesWith(0), joueur.setCollisionGroup(-1)),
  ease: 'Sine.easeInOut'
});

  // var socleJoueur = self.matter.add.gameObject(joueur.socle);
  // socleJoueur.setIgnoreGravity(true).setStatic(true)
}

function removePlayer(self, playerId, arene) {
  self.players[arene].getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy(true)
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
