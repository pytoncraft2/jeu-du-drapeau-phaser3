const players = {};
players['Naruto'] = {};
players['Pikachu'] = {};
barils = {};
drapeaux = {};
constraints = {};

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
      },
      arcade: {
        debug: false
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
var matDrapeauBleu;

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


    this.drapeaux = this.add.group()

  let matDrapeauBleu = this.add.zone(-4868.428561331542, -775.2723001427164, 32, 640)
  let matDrapeauVert = this.add.zone(8242.130999766403, -1566.8232688524165, 32, 640)

  var matBleu = this.matter.add.gameObject(matDrapeauBleu);
  matBleu.setFixedRotation().setIgnoreGravity(true).setCollidesWith(0).setCollisionGroup(32)
  matBleu.id = 1;


  var matVert = this.matter.add.gameObject(matDrapeauVert);
  matVert.setFixedRotation().setIgnoreGravity(true).setCollidesWith(0).setCollisionGroup(32)
  matVert.id = 2;

  this.drapeaux.addMultiple([matVert, matBleu]);

  // matDrapeauBleu = this.matter.add.image(-4848.428561331542, -1043.2723001427164, 'matDrapeauBleu').setDepth(1)


this.tonneaux = this.add.group()
let tonneau1 = this.add.zone(-1000, 1700, 210, 210).setSize(155, 215.6)
tonneau1.id = 1;
let tonneau2 = this.add.zone(-1200, 1700, 210, 210).setSize(155, 215.6)
tonneau2.id = 2;
let tonneau3 = this.add.zone(-1400, 1700, 210, 210).setSize(155, 215.6)
tonneau3.id = 3;
let tonneau4 = this.add.zone(-1600, 1700, 210, 210).setSize(155, 215.6)
tonneau4.id = 4;

t1 = self.matter.add.gameObject(tonneau1);
t1.setMass(40).setFriction(2).setFrictionAir(0.1)


t2 = self.matter.add.gameObject(tonneau2);
t2.setMass(40).setFriction(2).setFrictionAir(0.1)


t3 = self.matter.add.gameObject(tonneau3);
t3.setMass(40).setFriction(2).setFrictionAir(0.1)


t4 = self.matter.add.gameObject(tonneau4);
t4.setMass(40).setFriction(2).setFrictionAir(0.1)

this.tonneaux.addMultiple([t1, t2, t3, t4])


  this.events = new Phaser.Events.EventEmitter()
  this.events.on('changement-vie-equipe', changementVieEquipe, this)
  this.events.on('changement-vie', changementVie, this)
  this.events.on('lancer-tonneau', lancerTonneau, this)
  this.events.on('fin-de-vie', finDeVie, this)
  this.events.on('fin-de-partie', finDePartie, this)

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

    constraints[socket.id] = {};
    constraints[socket.id]['bullet'] = {}
    constraints[socket.id]['tonneau'] = {}
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

}

function update() {


    this.drapeaux.getChildren().forEach((drapeau) => {
      drapeaux[drapeau.id] = {
        x: drapeau.x,
        y: drapeau.y,
        id: drapeau.id
      }
    });


    this.tonneaux.getChildren().forEach((tonneau) => {
      barils[tonneau.id] = {
        x: tonneau.x,
        y: tonneau.y,
        angle: tonneau.angle,
        id: tonneau.id,
        alpha: tonneau.alpha
      }
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
        this.tweens.addCounter({
          duration: 5000,
          onComplete: () => (player.active ? (player.setAlpha(1), player.ombre.setAlpha(1)) : null)
        })
        this.tweens.add({
          targets: player,
          alpha: 0,
          duration: 500
        })
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


      // #1
      // if (input.interactionTonneau) {
      //   //SI LE DRAPEAU SE SITUE A LA MEME POSITION QUE LA FONTAINE
      //   // console.log("DEBUT-----");
      //   // console.log(Object.keys(constraints[player.playerId]).length);
      //
      //   if (!fontainezone2.active) {
      //     var distance = Phaser.Math.Distance.BetweenPoints(this.drapeaux.getChildren()[0], {x: fontainezone.x, y: fontainezone.y});
      //
      //     if (distance < 530 && distance < 540) {
      //       this.events.emit('fin-de-partie', "A")
      //     }
      //
      //     //ATTRAPER DRAPEAU BLEU
      //     var distanceDrapeauBleu = Phaser.Math.Distance.BetweenPoints(player, {x: this.drapeaux.getChildren()[0].x, y: this.drapeaux.getChildren()[0].y});
      //     if (distanceDrapeauBleu < 130 && distanceDrapeauBleu < 140) {
      //         this.matter.add.constraint(this.drapeaux.getChildren()[0], player, 0)
      //     }
      //   } else if (!fontainezone.active) {
      //     var distance2 = Phaser.Math.Distance.BetweenPoints(this.drapeaux.getChildren()[1], {x: fontainezone2.x, y: fontainezone2.y});
      //     if (distance2 < 530 && distance2 < 540) {
      //       this.events.emit('fin-de-partie', "B")
      //     }
      //
      //     //ATTRAPER DRAPEAU VERT
      //     var distanceDrapeauVert = Phaser.Math.Distance.BetweenPoints(player, {x: this.drapeaux.getChildren()[1].x, y: this.drapeaux.getChildren()[1].y});
      //     if (distanceDrapeauVert < 130 && distanceDrapeauVert < 140) {
      //         this.matter.add.constraint(this.drapeaux.getChildren()[1], player, 0)
      //     }
      //   }
      //
      //   // if (player.equipe == "A") {
      //   //
      //   //   if (Object.keys(constraints[player.playerId]).length == 0) {
      //   //     constraints[player.playerId] = this.matter.add.constraint(this.drapeaux.getChildren()[0], player, 0)
      //   //   } else {
      //   //     this.matter.world.removeConstraint(constraints[player.playerId]);
      //   //     constraints[player.playerId] = {}
      //   //   }
      //   // } else {
      //   //
      //   //   if (Object.keys(constraints[player.playerId]).length == 0) {
      //   //   constraints[player.playerId] = this.matter.add.constraint(this.drapeaux.getChildren()[1], player, 0)
      //   //   } else {
      //   //     this.matter.world.removeConstraint(constraints[player.playerId]);
      //   //     constraints[player.playerId] = {}
      //   //   }
      //   //
      //   // }
      //   input.interactionTonneau = false;
      // }
/*

--------ORIGNINAL

      if (input.interactionTonneau) {
        if (player.world.localWorld.constraints.length == 0) {
        // TODO: EVITER REPETITION (recupereLePlusProche)

        //RECUPERE LE TONNEAU LE PLUS PROCHE
        const recupereLePlusProche = this.tonneaux.getChildren().map(t => {
          if (Phaser.Math.Distance.BetweenPoints(player, t) < 300 && Phaser.Math.Distance.BetweenPoints(player, t) < 310) {
            return t
          }
        } );

        //RECUPERE LE DRAPEAU LE PLUS PROCHE
        //SI FONTAINE DESACTIVÉ
        if (!fontainezone2.active) {
          var distance = Phaser.Math.Distance.BetweenPoints(this.drapeaux.getChildren()[0], {x: fontainezone.x, y: fontainezone.y});

          if (distance < 530 && distance < 540) {
            this.events.emit('fin-de-partie', "A")
          }

          //ATTRAPER DRAPEAU BLEU
          var distanceDrapeauBleu = Phaser.Math.Distance.BetweenPoints(player, {x: this.drapeaux.getChildren()[0].x, y: this.drapeaux.getChildren()[0].y});
          if (distanceDrapeauBleu < 130 && distanceDrapeauBleu < 140) {
              this.matter.add.constraint(this.drapeaux.getChildren()[0], player, 0)
          }
        } else if (!fontainezone.active) {
          var distance2 = Phaser.Math.Distance.BetweenPoints(this.drapeaux.getChildren()[1], {x: fontainezone2.x, y: fontainezone2.y});
          if (distance2 < 530 && distance2 < 540) {
            this.events.emit('fin-de-partie', "B")
          }

          //ATTRAPER DRAPEAU VERT
          var distanceDrapeauVert = Phaser.Math.Distance.BetweenPoints(player, {x: this.drapeaux.getChildren()[1].x, y: this.drapeaux.getChildren()[1].y});
          if (distanceDrapeauVert < 130 && distanceDrapeauVert < 140) {
              this.matter.add.constraint(this.drapeaux.getChildren()[1], player, 0)
          }
        }




        var tonneau = recupereLePlusProche.filter( Boolean );
      } else if (player.world.localWorld.constraints[0]) {
        var tonneau = [player.world.localWorld.constraints[0].bodyA]
      }
        if (tonneau[0]) {
          if (player.world.localWorld.constraints.length == 0) {
            tonneau[0].body.collisionFilter.mask = 0
            tonneau[0].setFixedRotation().setIgnoreGravity(true)
            barils[tonneau[0].id].alpha = 0.7

            this.tweens.add({
              targets: tonneau[0],
              x: player.x,
              y: player.y - player.displayHeight / 2 - 105,
              onComplete: () => (tonneau[0].setCollidesWith(-1).setIgnoreGravity(false), this.matter.add.constraint(tonneau[0] ,player)),
              duration: 500
            })
            input.interactionTonneau = false
          }
          else if (player.world.localWorld.constraints[0].bodyA.id == tonneau[0].id) {
            player.world.localWorld.constraints = []
            x = player.flipX ? (player.x - player.displayWidth - 50) : (player.x + player.displayWidth + 50)
            y = player.y - 85
          }
        }


        //SI LE DRAPEAU SE SITUE A LA MEME POSITION QUE LA FONTAINE
        input.interactionTonneau = false;
      }

      */



      // #2
      if (input.interactionTonneau) {

        //si le joueur ne tient pas de tonneau:
        // attrape le tonneau le plus proche
        if (Object.keys(constraints[player.playerId]['tonneau']).length == 0) {
          var tonneau = recupereLeTonneauLePlusProche(player, this.tonneaux.getChildren())
        }
      // !tonneau.length : false => un tonneau est atteignable
      // !tonneau.length : true => aucun tonneau est atteignable
      console.log("RESULTAT TONNEAU");
      console.log(!tonneau.length);

      // else if (player.world.localWorld.constraints[0]) {
      //   var tonneau = [player.world.localWorld.constraints[0].bodyA]
      // }

      // if (tonneau[0]) {
      //   if (Object.keys(constraints[player.playerId]['tonneau']).length == 0) {
      //     tonneau[0].body.collisionFilter.mask = 0
      //     tonneau[0].setFixedRotation().setIgnoreGravity(true)
      //     barils[tonneau[0].id].alpha = 0.7
      //
      //     this.tweens.add({
      //       targets: tonneau[0],
      //       x: player.x,
      //       y: player.y - player.displayHeight / 2 - 105,
      //       onComplete: () => (tonneau[0].setCollidesWith(-1).setIgnoreGravity(false), this.matter.add.constraint(tonneau[0] ,player)),
      //       duration: 500
      //     })
      //     input.interactionTonneau = false
      //   }
      //   else if (player.world.localWorld.constraints[0].bodyA.id == tonneau[0].id) {
      //     this.matter.world.removeConstraint(constraints[player.playerId]);
      //     constraints[player.playerId] = {}
      //     x = player.flipX ? (player.x - player.displayWidth - 50) : (player.x + player.displayWidth + 50)
      //     y = player.y - 85
      //   }
      // }


      //SI LE DRAPEAU SE SITUE A LA MEME POSITION QUE LA FONTAINE
      // if (!fontainezone2.active) {
      //   var distance = Phaser.Math.Distance.BetweenPoints(this.drapeaux.getChildren()[0], {x: fontainezone.x, y: fontainezone.y});
      //
      //   if (distance < 530 && distance < 540) {
      //     this.events.emit('fin-de-partie', "A")
      //   }
      //
      //   //ATTRAPER DRAPEAU BLEU
      //   var distanceDrapeauBleu = Phaser.Math.Distance.BetweenPoints(player, {x: this.drapeaux.getChildren()[0].x, y: this.drapeaux.getChildren()[0].y});
      //   if (distanceDrapeauBleu < 130 && distanceDrapeauBleu < 140) {
      //     this.matter.add.constraint(this.drapeaux.getChildren()[0], player, 0)
      //   }
      // } else if (!fontainezone.active) {
      //   var distance2 = Phaser.Math.Distance.BetweenPoints(this.drapeaux.getChildren()[1], {x: fontainezone2.x, y: fontainezone2.y});
      //   if (distance2 < 530 && distance2 < 540) {
      //     this.events.emit('fin-de-partie', "B")
      //   }
      //
      //   //ATTRAPER DRAPEAU VERT
      //   var distanceDrapeauVert = Phaser.Math.Distance.BetweenPoints(player, {x: this.drapeaux.getChildren()[1].x, y: this.drapeaux.getChildren()[1].y});
      //   if (distanceDrapeauVert < 130 && distanceDrapeauVert < 140) {
      //     if (player.world.localWorld.constraints.length == 0) {
      //       this.matter.add.constraint(this.drapeaux.getChildren()[1], player, 0)
      //     } else {
      //       this.matter.world.removeConstraint(constraints[player.playerId]);
      //       constraints[player.playerId] = {}
      //     }
      //   }
      // }


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
          if (player.body.speed < 2) {
            player.play("idle_walk", true)
          }
        }
        if (input.ctrl) {
          this.tween = this.tweens.add({
            targets: player,
            angle: 0,
            duration: 500
          })
        }
      } else if (input.left) {
        if (input.walk) {
          player.thrustBack(0.1)
          player.play('walk', true)
          player.setFlipX(true)
        } else {
          player.thrust(0)
          if (player.body.speed < 2) {
          player.play("idle_walk", true)
          }
        }
        if (input.ctrl) {
          this.tween = this.tweens.add({
            targets: player,
            angle: 0,
            duration: 500
          })
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

          this.tween = this.tweens.timeline({

               tweens: [{
                   targets: player,
                   scale: 0.35,
                   ease: 'Power1',
                   duration: 250
               },
               {
                   targets: player,
                   ease: 'Power1',
                   scale: 0.38,
                   duration: 250
               },
               {
                   targets: player,
                   scale: 0.35,
                   ease: 'Power1',
                   duration: 250,
               },
               {
                   targets: player,
                   ease: 'Power1',
                   scale: 0.38,
                   duration: 250
               },
               {
                   targets: player,
                   scale: 0.34,
                   ease: 'Power1',
                   duration: 250,
               },
               {
                   targets: player,
                   scale: 0.39,
                   ease: 'Power1',
                   duration: 250,
               },
               {
                   targets: player,
                   scale: 0.34,
                   ease: 'Power1',
                   duration: 250,
               },
               {
                   targets: player,
                   scale: 0.39,
                   ease: 'Power1',
                   duration: 250,
               }],
               onComplete: () => player.setTint(0xff0000)

           });

          player.play('idle_attack', true)
          input.charge = false;
        } else {
          let puissance = this.tween.totalProgress;
          player.clearTint()
          if (this.tween.isPlaying()) {
          this.tween.stop()
          }
          const recupereLePlusProche = this.tonneaux.getChildren().map(t => {
            if (Phaser.Math.Distance.BetweenPoints(player, t) < 300 && Phaser.Math.Distance.BetweenPoints(player, t) < 310) {
              return t
            }
          } );
          var tonneau = recupereLePlusProche.filter( Boolean );
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
                  } else if (tonneau[0]) {
                    // events.emit('lancer-tonneau', player.flipX, puissance + player.puissanceBonus, tonneau[0].id)
                    tonneau[0].setVelocity((player.flipX ? -10 * (puissance * 5)  : 10 * (puissance * 5)), - (puissance * 100) )
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
        // this.matter.world.removeConstraint(this.matter.world.getAllConstraints()[0]);

        // console.log(this.matter.world.getAllConstraints()[0]);
      }

      /**
       * TIROLIENNE
       * QUAND LE JOUEUR EST PROCHE DE LA TIROLIENNE
       * LE JOUEUR SUIT LA BALLE DE LA TIROLIENNE
       * SINON IL S'EN DETACHE
       *
       * @param  { Object } constraints attache des joueurs
       * @param { Object } constraints['bullet'] attache de la balle correspondant au joueur
       */

      //TIROLIENNE
      if (input.tirolienne) {
        var dist = Phaser.Math.Distance.BetweenPoints(player, this.bullet);
        if (dist < 530 && dist < 540) {
          if (Object.entries(constraints[player.playerId]['bullet']).length === 0) {
            constraints[player.playerId]['bullet'] = this.matter.add.constraint(this.bullet, player)

            var tween = this.tweens.add({
              targets: this.bullet,
              x: 5675,
              y: -2376,
              onComplete: () => (this.matter.world.removeConstraint(constraints[player.playerId]['bullet']), constraints[player.playerId]['bullet'] = {}),  // set context? how?
              yoyo: true,
              // onYoyo: function () { addEvent('onYoyo') },
              duration: 3500,
            });
            input.tirolienne = false

          }
          else {
            this.matter.world.removeConstraint(constraints[player.playerId]['bullet']);
            constraints[player.playerId]['bullet'] = {}
          }
        }
        input.tirolienne = false;
      }

    //CANON FEU
    if (input.canonMaintenu) {
      var distCanon = Phaser.Math.Distance.BetweenPoints(player, this.canon1);

      if (distCanon < 106 && distCanon < 121) {
        input.canonMaintenu = false;
        this.bulletCanon = this.matter.add.image(this.canon1.x, this.canon1.y + 20, 'bullet').setCircle().setIgnoreGravity(true).setBounce(1.6)
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
      players[player.arene][player.playerId].frame = player.anims.getFrameName();
      players[player.arene][player.playerId].flipX = player.flipX;
      players[player.arene][player.playerId].scale = player.scale;
      players[player.arene][player.playerId].tint = player.tintBottomLeft;
      players[player.arene][player.playerId].alpha = player.alpha;
      players[player.arene][player.playerId].ombreX = player.ombre.x;
      players[player.arene][player.playerId].ombreScale = player.ombre.scale;
      players[player.arene][player.playerId].ombreAlpha = player.ombre.alpha;
      players[player.arene][player.playerId].bulletX = this.bullet.x;
      players[player.arene][player.playerId].bulletY = this.bullet.y;
      players[player.arene][player.playerId].rotation = player.rotation;

      players[player.arene][player.playerId].socleMouventY = this.plots2.y

      if (this.bulletCanon) {
        players[player.arene][player.playerId].bulletCanonY = this.bulletCanon.y
        players[player.arene][player.playerId].bulletCanonX = this.bulletCanon.x
        players[player.arene][player.playerId].bulletCanonScale = this.bulletCanon.scale
        players[player.arene][player.playerId].canonAngle = this.canon1.angle
      }

    });
    io.to("Naruto").emit("playerUpdates", players["Naruto"], barils, drapeaux);

}


function recupereLeTonneauLePlusProche(player, tonneaux) {
  const recupereLePlusProche = tonneaux.map(t => {
    if (Phaser.Math.Distance.BetweenPoints(player, t) < 300 && Phaser.Math.Distance.BetweenPoints(player, t) < 310) {
      return t
    }
  });
  return recupereLePlusProche.filter( Boolean );
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
  if (equipe == "A" && fontainezone2.active) {
  fontainezone2.setActive(false);
  io.to("Naruto").emit("drapeau_debloque", equipe);
} else if (equipe == "B" && fontainezone.active){
  fontainezone.setActive(false);
  io.to("Naruto").emit("drapeau_debloque", equipe);
}

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
  let y = joueur.equipe == "A" ? 100 : -1600
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


function finDePartie(equipe) {
  io.to("Naruto").emit("fin_de_partie", equipe);
  this.players["Naruto"].remove(true);
  this.vieEquipe["A"] = 100;
  this.vieEquipe["B"] = 100;
  fontainezone2.setActive(true);
  fontainezone.setActive(true);
  this.drapeaux.getChildren()[0].setPosition(8242.130999766403, -1566.8232688524165)
  this.drapeaux.getChildren()[1].setPosition(-4868.428561331542, -775.2723001427164)
}

function lancerTonneau(direction, puissance, tonneauId) {
console.log("LANCER TONNEAU");
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
