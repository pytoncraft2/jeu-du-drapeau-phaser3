const players = {};
const clones = {};
var evenement = null;
players['Naruto'] = {};
clones['Naruto'] = {};
players['Pikachu'] = {};
barils = {};
drapeaux = {};
constraints = {};


function invisible(scene, player) {
  scene.tweens.addCounter({
    duration: 5000,
    onComplete: () => (player.active ? (player.setAlpha(1), player.ombre.setAlpha(1)) : null)
  })
  scene.tweens.add({
    targets: player,
    alpha: 0,
    duration: 500
  })
  player.ombre.setAlpha(0)
}

function tirer(scene, player, relache) {
  console.log("IIIIIIIIIIIIIIIIIII");
  // console.log(charge);
  if (relache) {
    scene.bulletCanon = scene.matter.add.image(player.flipX ? player.x - 80 : player.x + 80, player.y, 'bullet').setCircle().setIgnoreGravity(true).setBounce(1.6)
    scene.bulletCanon.type = "boulet";
    scene.charge = scene.tweens.add({
      targets: scene.bulletCanon,
      scale: 4,
      paused: false,
      duration: 2000,
      repeat: 0
    });
  } else {
      scene.charge.stop()
      scene.bulletCanon.setIgnoreGravity(false)
      var coefDir;
      if (player.direction == 'gauche') { coefDir = -1; } else { coefDir = 1 }
      scene.bulletCanon.setVelocity(90 * coefDir, 0); // vitesse en x et en y

      // this.charge = this.tweens.add({
      //   targets: this.bulletCanon,
      //   x: this.l.x2,
      //   y: this.l.y2,
      //   paused: false,
      //   duration: 2000,
      //   repeat: 0,
      // });
  }


  // if (charge) {
  //   player.play('idle_attack', true)
  //   charge = false;
  // } else {
  //   let puissance = scene.tween.totalProgress;
  //   player.clearTint()
  //   if (scene.tween.isPlaying()) {
  //     scene.tween.stop()
  //     player.setAlpha(1)
  //   }
  //   player.play('attack', true)
  //
  // }





}

function agrandissement(scene, player) {
  scene.tweens.addCounter({
    duration: 10000,
    onComplete: () => (player.active ? player.setDisplaySize(player.displayWidth -= 100, player.displayHeight -= 100) : null, player.puissanceBonus = 0)
  })

  player.setDisplaySize(player.displayWidth + 100, player.displayHeight + 100)
  player.puissanceBonus = 3;
}

function toupie(tweens, player) {
  tweens.addCounter({
    duration: 2000,
    onComplete: () => (player.active ? (player.setRotation(0)) : null)
  })
  player.setAngularVelocity(1)
}

function saut(chargeSaut, scene, player) {
  var puissance
  if (chargeSaut) {
    if (player.body.speed < 2) {
      player.play('sautPreparation')
    }

    scene.tweenSaut = scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 800,
    })

    chargeSaut = false;
  } else {
      puissance = scene.tweenSaut.getValue()
    if (scene.tweenSaut.isPlaying()) {
      scene.tweenSaut.stop()
    }
    if (player.body.speed < 2) {
      player.play('saut')
    } else {
      player.play('jump')
    }
    player.setVelocity( player.body.speed > 2 ? (player.flipX ? -puissance: puissance) : 0, -puissance)
  }
}

function multiclonage(scene, player) {

}

function recevoirDegat(scene, player) {
        // console.log(player.repousser);
        if (!player.protege) {
          player.vie -= 1;
          player.setTint(0xff0000)
          scene.matter.world.removeConstraint(constraints[player.playerId]['tonneau']);
          scene.matter.world.removeConstraint(constraints[player.playerId]['drapeau']);
          scene.matter.world.removeConstraint(constraints[player.playerId]['bullet']);
          constraints[player.playerId]['tonneau'] = {}
          constraints[player.playerId]['drapeau'] = {}
          constraints[player.playerId]['bullet'] = {}

          scene.tweens.addCounter({
            duration: 300,
            onComplete: () => (player.clearTint())
          })

          if (player.etatAttaque.repousser) {
            player.setVelocityX(player.etatAttaque.direction ? player.etatAttaque.repousser * 30 : -player.etatAttaque.repousser * 30)
          }
          io.to("Naruto").emit("changement_vie", player.playerId, player.vie);
        }
}

function attaque(charge, scene, player) {
  if (charge) {
    scene.tween = scene.tweens.timeline({
      tweens: [{
        targets: player,
        alpha: 0.35,
        ease: 'Power1',
        duration: 200
      },
      {
        targets: player,
        ease: 'Power1',
        alpha: 0.58,
        duration: 200
      },
      {
        targets: player,
        ease: 'Power1',
        alpha: 0.34,
        duration: 200
      },
      {
        targets: player,
        ease: 'Power1',
        alpha: 0.58,
        duration: 200
      },
      {
        targets: player,
        alpha: 0.35,
        ease: 'Power1',
        duration: 200,
      },
      {
        targets: player,
        ease: 'Power1',
        alpha: 0.58,
        duration: 200
      },
      {
        targets: player,
        alpha: 0.30,
        ease: 'Power1',
        duration: 200,
      },
      {
        targets: player,
        alpha: 0.80,
        ease: 'Power1',
        duration: 200,
      },
      {
        targets: player,
        alpha: 0.54,
        ease: 'Power1',
        duration: 200,
      },
      {
        targets: player,
        alpha: 0.80,
        ease: 'Power1',
        duration: 200,
      }],
      onComplete: () => (player.setTint(0xffa500).setAlpha(1))

    });

    player.play('idle_attack', true)
    charge = false;
  } else {
    let puissance = scene.tween.totalProgress;
    player.clearTint()
    if (scene.tween.isPlaying()) {
      scene.tween.stop()
      player.setAlpha(1)
    }
    player.play('attack', true)

    const startHit = (anim, frame) => {
        if (frame.textureFrame == player.attaqueFrame)
        {
          player.flipX ?
          (player.zoneAttaque.x = player.getLeftCenter().x - 70, player.zoneAttaque.y = player.getLeftCenter().y)
          : (player.zoneAttaque.x = player.getRightCenter().x + 70, player.zoneAttaque.y = player.getRightCenter().y)


          scene.matter.overlap([...scene.players['Naruto'].getChildren(), ...scene.tonneaux.getChildren()], player.zoneAttaque, (objet1, objet2) => {
            if (objet1.gameObject.playerId) {
              gestionVie(objet1.gameObject.vie, objet1.gameObject.playerId, scene.tweens, puissance, objet1.gameObject.flipX)
            }

            if (objet1.gameObject.name == "tonneau") {
              gestionTonneaux(puissance, player.flipX, objet1.gameObject)
            }

          })


          if (fontainezone.contains(player.x, player.y)) {
            evenement.emit('changement-vie-equipe', "B", puissance + player.puissanceBonus, player.puissanceDeBase)
          }

          if (fontainezone2.contains(player.x, player.y)) {
            evenement.emit('changement-vie-equipe', "A", puissance + player.puissanceBonus, player.puissanceDeBase)
          }
        player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)
        }
        // console.log(frame.textureFrame);
        // player.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)
        // console.log(frame.textureFrame);
      }

        player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)
        player.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'attack', () => {
          console.log("FIN ATTACK ANIM");
        })
  }
}

function interactionTonneau(player, scene) {
  /**
  * GESTION TONNEAU
  * @param  {constraints[player.playerId]} Object le tonneau auquel le joueur est attaché
  * si le joueur ne tient pas de tonneau: attrape le tonneau le plus proche
  * sinon détache le tonneau du joueur
  *   !tonneau.length : false => un tonneau est atteignable
  *   !tonneau.length : true => aucun tonneau est atteignable
  */

  if (Object.keys(constraints[player.playerId]['tonneau']).length == 0) {
    var tonneau = recupereLeTonneauLePlusProche(player, scene.tonneaux.getChildren())
    if (tonneau) {
      if (tonneau[0]) {
        if (Object.keys(constraints[player.playerId]['tonneau']).length == 0) {
          tonneau[0].body.collisionFilter.mask = 0
          tonneau[0].setFixedRotation().setIgnoreGravity(true)
          barils[tonneau[0].id].alpha = 0.7

          scene.tweens.add({
            targets: tonneau[0],
            x: player.x,
            y: player.y - player.displayHeight / 2 - 105,
            onComplete: () => {
              tonneau[0].setCollidesWith(-1).setIgnoreGravity(false); constraints[player.playerId]['tonneau'] = scene.matter.add.constraint(tonneau[0], player)
            },
            duration: 500
          })
        }
      }
    }

  }

  //si le joueur tient un tonneau
  // enleve la constrainte
  else {
    scene.matter.world.removeConstraint(constraints[player.playerId]['tonneau']);
    constraints[player.playerId]['tonneau'] = {}
  }
  /**
  * -----GESTION DRAPEAU
  * APPLIQUE L'ATTACHE AU DRAPEAU SI :
  * FONTAINE ENNEMIE DÉTRUITE et DRAPEAU ACCESSIBLE
  *
  * @param  {[type]} fontainezone2 emplacement de la zone de la fontaine
  * @return {[type]}               [description]
  */
  //SI LE DRAPEAU SE SITUE A LA MEME POSITION QUE LA FONTAINE
  if (!fontainezone2.active) {
    var distance = Phaser.Math.Distance.BetweenPoints(scene.drapeaux.getChildren()[0], {x: fontainezone.x, y: fontainezone.y});


    //ATTRAPER DRAPEAU BLEU
    var distanceDrapeauBleu = Phaser.Math.Distance.BetweenPoints(player, {x: scene.drapeaux.getChildren()[0].x, y: scene.drapeaux.getChildren()[0].y});
    if (distanceDrapeauBleu < 130 && distanceDrapeauBleu < 140) {
      if (Object.keys(constraints[player.playerId]['drapeau']).length == 0) {
        constraints[player.playerId]['drapeau'] = scene.matter.add.constraint(scene.drapeaux.getChildren()[0], player, 0)
      } else {
        scene.matter.world.removeConstraint(constraints[player.playerId]['drapeau']);
        constraints[player.playerId]['drapeau'] = {}
        if (distance < 530 && distance < 540) {
          scene.events.emit('fin-de-partie', "A")
        }
      }
    }
  }

  if (!fontainezone.active) {
    var distance2 = Phaser.Math.Distance.BetweenPoints(scene.drapeaux.getChildren()[1], {x: fontainezone2.x, y: fontainezone2.y});
    //ATTRAPER DRAPEAU VERT
    var distanceDrapeauVert = Phaser.Math.Distance.BetweenPoints(player, {x: scene.drapeaux.getChildren()[1].x, y: scene.drapeaux.getChildren()[1].y});
    if (distanceDrapeauVert < 130 && distanceDrapeauVert < 140) {
      if (Object.keys(constraints[player.playerId]['drapeau']).length == 0) {
        constraints[player.playerId]['drapeau'] = scene.matter.add.constraint(scene.drapeaux.getChildren()[1], player, 0)
      } else {
        scene.matter.world.removeConstraint(constraints[player.playerId]['drapeau']);
        constraints[player.playerId]['drapeau'] = {}
        if (distance2 < 530 && distance2 < 540) {
          scene.events.emit('fin-de-partie', "B")
        }
      }
    }
  }
}

/**
 * INTERACTION: TONNEAU + DRAPEAU
 * @param  {[type]} player [description]
 * @param  {[type]} scene  [description]
 * @return {[type]}        [description]
 */

function interactionTonneauDrapeau(player, scene) {

  //TONNEAU
  player.flipX ?
  (player.zoneAttaque.x = player.getLeftCenter().x - 70, player.zoneAttaque.y = player.getLeftCenter().y)
  : (player.zoneAttaque.x = player.getRightCenter().x + 70, player.zoneAttaque.y = player.getRightCenter().y)

    scene.matter.overlap([...scene.tonneaux.getChildren(), ...scene.drapeaux.getChildren()], player.zoneAttaque, (objet1, objet2) => {
  if (Object.keys(constraints[player.playerId]['tonneau']).length == 0) {

      if (objet1.gameObject.name == "tonneau") {
        objet1.gameObject.body.collisionFilter.mask = 0
        objet1.gameObject.setFixedRotation().setIgnoreGravity(true)
        scene.tweens.add({
          targets: objet1.gameObject,
          x: player.x,
          y: player.y - player.displayHeight / 2 - 105,
          onComplete: () => {
            objet1.gameObject.setCollidesWith(-1).setIgnoreGravity(false); constraints[player.playerId]['tonneau'] = scene.matter.add.constraint(objet1.gameObject, player)
          },
          duration: 500
        })
      }


  }
  else {
    scene.matter.world.removeConstraint(constraints[player.playerId]['tonneau']);
    constraints[player.playerId]['tonneau'] = {}
  }


})

//FONTAINE

// if (!fontainezone2.active) {
  var distanceDrapeauVert = Phaser.Math.Distance.BetweenPoints(player, {x: drapeauVert.x, y: drapeauVert.y});
  if (distanceDrapeauVert < 130 && distanceDrapeauVert < 140) {
      if (!fontainezone2.active) {
        if (Object.keys(constraints[player.playerId]['drapeau']).length == 0) {
          constraints[player.playerId]['drapeau'] = scene.matter.add.constraint(drapeauVert, player, 0)
        } else {
          scene.matter.world.removeConstraint(constraints[player.playerId]['drapeau']);
          constraints[player.playerId]['drapeau'] = {}
        }
          if (fontainezone.contains(drapeauVert.x, drapeauVert.y)) {
            evenement.emit('fin-de-partie', "A")
          }

      }
  }

  var distanceDrapeauBleu = Phaser.Math.Distance.BetweenPoints(player, {x: drapeauBleu.x, y: drapeauBleu.y});
  if (distanceDrapeauBleu < 130 && distanceDrapeauBleu < 140) {
    if (!fontainezone.active) {
      if (Object.keys(constraints[player.playerId]['drapeau']).length == 0) {
        constraints[player.playerId]['drapeau'] = scene.matter.add.constraint(drapeauBleu, player, 0)
      } else {
        scene.matter.world.removeConstraint(constraints[player.playerId]['drapeau']);
        constraints[player.playerId]['drapeau'] = {}
      }
      if (fontainezone2.contains(drapeauBleu.x, drapeauBleu.y)) {
        evenement.emit('fin-de-partie', "B")
      }
    }
  }
}


function interactionTirolienne(player, scene) {
  var dist = Phaser.Math.Distance.BetweenPoints(player, scene.bullet);
  if (dist < 900 && dist < 700) {
    if (Object.entries(constraints[player.playerId]['bullet']).length === 0) {
      constraints[player.playerId]['bullet'] = scene.matter.add.constraint(scene.bullet, player)

      var tween = scene.tweens.add({
        targets: scene.bullet,
        x: 5675,
        y: -2376,
        onComplete: () => (scene.matter.world.removeConstraint(constraints[player.playerId]['bullet']), constraints[player.playerId]['bullet'] = {}),  // set context? how?
        yoyo: true,
        // onYoyo: function () { addEvent('onYoyo') },
        duration: 3500,
      });
    }
    else {
      scene.matter.world.removeConstraint(constraints[player.playerId]['bullet']);
      constraints[player.playerId]['bullet'] = {}
    }
  }
}


function gestionVie(vie, id, tween, superAttaque, direction) {
  // console.log("GESTION VIE");
  // console.log(superAttaque);
  if (vie <= 0) {
    evenement.emit('fin-de-vie', id)
  } else {
    evenement.emit('changement-vie', id, tween, superAttaque, direction)
  }
}

function gestionTonneaux(puissance, rotation, tonneau) {
  tonneau.setVelocity((rotation ? -10 * (puissance * 5)  : 10 * (puissance * 5)), - (puissance * 100) )
}
/**
 * CONFIGURATION DE BASE POUR RECOMMENCER LA PARTIE
 * @type {Objects}
 */

const parametres = {};

parametres['dessinatrice1'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 104,
    displayHeight: 302,
    masse: 30,
    puissanceDeBase: 10,
    attaqueFrame: "positiona3"
  },
  toucheA: (charge, scene, player) => {
    attaque(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    agrandissement(scene, player)
  },
  toucheE: (scene, player) => {
    agrandissement(scene, player)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheR: (scene, player) => {
    invisible(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}

parametres['ninja'] = {
  etatInitial: {
    vie: 4,
    displayWidth: 149,
    displayHeight: 140,
    masse: 10,
    puissanceDeBase: 12,
    attaqueFrame: "positiona1"
  },
  toucheA: (charge, scene, player) => {
    attaque(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    invisible(scene, player)
  },
  toucheE: (scene, player) => {
    // interactionTonneau(scene, player)
    interactionTonneauDrapeau(scene, player)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheR: (scene, player) => {
    toupie(scene.tweens, player)
  },

  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}


parametres['ninja2'] = {
  etatInitial: {
    vie: 5,
    puissanceDeBase: 8,
    displayWidth: 158.8,
    displayHeight: 160.4,
    masse: 15,
    attaqueFrame: "positiona1"
  },
  toucheA: (charge, scene, player) => {
    attaque(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    agrandissement(scene, player)
  },
  toucheE: (scene, player) => {
    interactionTonneauDrapeau(scene, player)
  },
  toucheR: (scene, player) => {
    invisible(scene, player)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}

parametres['aventuriere2'] = {
  etatInitial: {
    vie: 5,
    puissanceDeBase: 10,
    displayWidth: 38.40,
    displayHeight: 51.2,
    masse: 20,
    attaqueFrame: "positiona3"
  },
  toucheA: (charge, scene, player) => {
    attaque(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    agrandissement(scene, player)
  },
  toucheE: (scene, player) => {
    interactionTonneauDrapeau(scene, player)
  },
  toucheR: (scene, player) => {
    invisible(scene, player)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}

parametres['chevalier'] = {
  etatInitial: {
    vie: 20,
    displayWidth: 217.60,
    displayHeight: 241.6,
    masse: 35,
    puissanceDeBase: 12,
    attaqueFrame: "positiona3"
  },
  toucheA: (charge, scene, player) => {
    attaque(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    agrandissement(scene, player)
  },
  toucheE: (scene, player) => {
    interactionTonneauDrapeau(scene, player)
  },
  toucheR: (scene, player) => {
    invisible(scene, player)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}

parametres['naruto'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 102,
    displayHeight: 300,
    masse: 25,
    puissanceDeBase: 8,
    attaqueFrame: "positiona3"
  },
  toucheA: (charge, scene, player) => {
    attaque(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    agrandissement(scene, player)
  },
  toucheE: (scene, player) => {
    interactionTonneauDrapeau(scene, player)
  },
  toucheR: (scene, player, charge) => {
    // multiclonage(scene, player)
    tirer(scene, player, charge)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}

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
var drapeauBleu;
var drapeauVert;

function preload() {
  this.load.atlas('dessinatrice1', 'assets/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');
}


function create() {


  this.tween = null;
  this.tweenSaut = null;
  this.graph = this.add.graphics();

  this.vieEquipe = {
    "A": 100,
    "B": 100
  }

      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'positiona', start: 0, end: 5 }),
        frameRate: 6,
        repeat: 0
      });
      this.anims.create({
        key: "goback",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start: 0, end: 6 }),
        frameRate: 7,
        repeat: 0
      });

      this.anims.create({
        key: "front",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'face', start: 0, end: 5 }),
        frameRate: 6,
        repeat: 0
      });
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'marche', start: 1, end: 7 }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'jump', start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      });

      this.anims.create({
        key: "idle_walk",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'marche', start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
      });

      this.anims.create({
        key: "idle_attack",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'positiona', start: 0, end: 0 }),
        frameRate: 1,
        repeat: 0
      });

      this.anims.create({
        key: "saut",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'jumpface', start: 0, end: 5 }),
        frameRate: 7,
        repeat: 0
      })

      this.anims.create({
        key: "sautPreparation",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'jumpface', start: 5, end: 5 }),
        frameRate: 1,
        repeat: 0
      })



  const self = this;
  this.players = {}
  this.clones = {}
  this.players['Naruto'] = this.add.group();
  this.players['Pikachu'] = this.add.group();
  this.clones['Naruto'] = this.add.group();
  this.platformeGaucheCollision = this.add.group();
  this.platformeDroiteCollision = this.add.group();
  this.groupeBullets = this.add.group();
  this.canon1 = this.add.rectangle(0, -460, 333, 125)

  fontainezone2 = new Phaser.Geom.Rectangle(7935, -1900, 640, 613);
  fontainezone = new Phaser.Geom.Rectangle(-5200, -1100, 640, 613);

  fontainezone.active = true;
  fontainezone2.active = true;


    this.drapeaux = this.add.group()
    this.drapeaux.name = "drapeaux";

  let matDrapeauBleu = this.add.zone(-4868.428561331542, -775.2723001427164, 32, 640)
  let matDrapeauVert = this.add.zone(8242.130999766403, -1566.8232688524165, 32, 640)

  drapeauBleu = this.matter.add.gameObject(matDrapeauBleu);
  drapeauBleu.setFixedRotation().setIgnoreGravity(true)
  drapeauBleu.body.collisionFilter.mask = 42
  drapeauBleu.id = 1;
  drapeauBleu.name = "A"


  drapeauVert = this.matter.add.gameObject(matDrapeauVert);
  drapeauVert.setFixedRotation().setIgnoreGravity(true)
  drapeauVert.id = 2;
  drapeauVert.name = "B"

  drapeauVert.body.collisionFilter.mask = 44
  this.drapeaux.addMultiple([drapeauVert, drapeauBleu]);

  // matDrapeauBleu = this.matter.add.image(-4848.428561331542, -1043.2723001427164, 'matDrapeauBleu').setDepth(1)


this.tonneaux = this.add.group()
this.tonneaux.name = "tonneaux";
let tonneau1 = this.add.zone(-1000, 1700, 210, 210).setSize(155, 215.6)
tonneau1.id = 1;
let tonneau2 = this.add.zone(-1200, 1700, 210, 210).setSize(155, 215.6)
tonneau2.id = 2;
let tonneau3 = this.add.zone(-1400, 1700, 210, 210).setSize(155, 215.6)
tonneau3.id = 3;
let tonneau4 = this.add.zone(-1600, 1700, 210, 210).setSize(155, 215.6)
tonneau4.id = 4;


t1 = self.matter.add.gameObject(tonneau1);
t1.setMass(20).setFriction(0).setFrictionAir(0.1)
t1.name = "tonneau"


t2 = self.matter.add.gameObject(tonneau2);
t2.setMass(20).setFriction(0).setFrictionAir(0.1)
t2.name = "tonneau"


t3 = self.matter.add.gameObject(tonneau3);
t3.setMass(20).setFriction(0).setFrictionAir(0.1)
t3.name = "tonneau"


t4 = self.matter.add.gameObject(tonneau4);
t4.setMass(20).setFriction(0).setFrictionAir(0.1)
t4.name = "tonneau"

this.tonneaux.addMultiple([t1, t2, t3, t4])


  evenement = new Phaser.Events.EventEmitter()
  evenement.on('changement-vie-equipe', changementVieEquipe, this)
  evenement.on('changement-vie', changementVie, this)
  evenement.on('lancer-tonneau', lancerTonneau, this)
  evenement.on('fin-de-vie', finDeVie, this)
  evenement.on('fin-de-partie', finDePartie, this)

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
    constraints[socket.id]['drapeau'] = {}


      players[socket.room][socket.id] = {
        ...parametres[socket.atlas]['etatInitial'],
        protege: false,
        direction: "gauche",
        atlas: socket.atlas,
        arene: socket.room,
        equipe: socket.equipe,
        mask: mask,
        wall: false,
        attaque: false,
        puissanceBonus: 0,
        alpha: 1,
        etatAttaque: {
          attacked: false,
          repousser: false,
          direction: null
        },
        degat: 0,
        depth: 30,
        anim: 'profil',
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
      if (input.escape) {
        this.matter.world.localWorld.constraints = []
        this.matter.world.removeConstraint(constraints[player.playerId]['tonneau']);
        constraints[player.playerId]['tonneau'] = {}
        input.escape = false;
      }

      // A
      if (input.attaque) {
        parametres[player.atlas].toucheA(input.charge, this, player)
        input.attaque = false;
      }

      // z
      if (input.special2) {
        parametres[player.atlas].toucheZ(this, player)
        input.special2 = false;
      }


      // E
      if (input.interactionTonneau) {
        parametres[player.atlas].toucheE(player, this)
        input.interactionTonneau = false;
      }

      // R
      if (input.special) {
        // if (input.chargeSpecial) {
        //
        // }
        parametres[player.atlas].toucheR(this, player, input.specialRelache);
        input.special = false;
      }

      // T
      if (input.tirolienne) {
        parametres[player.atlas].toucheT(player, this)
        input.tirolienne = false;
      }


      // ESPACE
      if (input.saut) {
        parametres[player.atlas].toucheEspace(input.chargeSaut, this, player)
        input.saut = false
      }

      if (input.protection) {
      player.setTint(0x14b2f9)
      player.protege = true;
      this.tweens.addCounter({
        duration: 1000,
        onComplete: () => (player.protege = false, player.clearTint())
      })
      input.protection = false;
      }


      /**
      * INTERACTION AVEC LES AUTRES PERSONNAGES
      * @param  {[type]} player [description]
      * @return {[type]}        [description]
      */
      if (player.etatAttaque.attacked) {
        parametres[player.atlas].gestionRecevoirDegat(this, player)
        player.etatAttaque.attacked = false;
      }

      /**
       * DROITE-GAUCHE
       */

      if (input.right) {
        player.direction = "droite"
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
      } else if (input.left) {
        player.direction = "gauche"
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
      } else if (input.up) {
        player.play('goback')
        input.up = false;
      } else if (input.down) {
        player.play('front')
        input.down = false;
      }


      //SE REDRESSER
      if (input.redresser) {
        this.tween = this.tweens.add({
          targets: player,
          angle: 0,
          duration: 500
        })
        input.redresser = false;
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

 function changementVieEquipe(equipe, puissance, puissanceDeBase) {
   this.vieEquipe[equipe] -= puissance * puissanceDeBase;
   if (this.vieEquipe[equipe] <= 0) {
     if (equipe == "A" && fontainezone2.active) {
       fontainezone2.active = false;
       io.to("Naruto").emit("drapeau_debloque", equipe);
     } else if (equipe == "B" && fontainezone.active){
       fontainezone.active = false;
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

function changementVie(id, tween, superAttaque, direction) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.etatAttaque.attacked = true;
  // if (superAttaque == true) {
  joueur.etatAttaque.repousser = superAttaque;
  joueur.etatAttaque.direction = direction;
  // }
}


/**
 * REMISE A 5 DE LA VIE DU JOUEUR
 * RESPAWN AVEC ANIMATION
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */

function finDeVie(id) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.vie = parametres[joueur.atlas].etatInitial.vie
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
  this.matter.world.localWorld.constraints = []
  io.to("Naruto").emit("fin_de_partie", equipe);
  this.players["Naruto"].remove(true);
  this.drapeaux.remove(true)
  drapeaux = {}
  this.vieEquipe["A"] = 100;
  this.vieEquipe["B"] = 100;
  fontainezone2.active = true;
  fontainezone.active = true;

  // this.scene.restart();

  // this.drapeaux.getChildren()[1].body.position.x = 8242
  // this.drapeaux.getChildren()[0].body.position.x = 8242.130999766403;
  // this.drapeaux.getChildren()[0].body.position.y = -1566.8232688524165

  // this.scene.pause();
  this.drapeaux.getChildren()[0].setPosition(8242.130999766403, -1566.8232688524165).setSize(32, 640).setIgnoreGravity(true).setVelocity(0, 0)
  this.drapeaux.getChildren()[1].setPosition(-4868.428561331542, -775.2723001427164).setSize(32, 640).setIgnoreGravity(true).setVelocity(0, 0)
  // this.scene.resume();
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
  const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, 'dessinatrice1', 'face0').setDisplaySize(playerInfo.displayWidth, playerInfo.displayHeight).setAlpha(1);
  joueur.playerId = playerInfo.playerId;
  joueur.arene = playerInfo.arene;
  joueur.equipe = playerInfo.equipe;
  joueur.atlas = playerInfo.atlas;
  joueur.vie = playerInfo.vie;
  joueur.vieEquipe = playerInfo.vieEquipe;
  joueur.degat = playerInfo.degat;
  joueur.etatAttaque = {}
  joueur.etatAttaque.attacked = playerInfo.etatAttaque.attacked;
  joueur.etatAttaque.repousser = playerInfo.etatAttaque.repousser
  joueur.etatAttaque.direction = playerInfo.etatAttaque.direction
  joueur.direction = playerInfo.direction
  joueur.protege = playerInfo.protege;
  joueur.masse = playerInfo.masse;
  joueur.puissanceBonus = playerInfo.puissanceBonus;
  joueur.puissanceDeBase = playerInfo.puissanceDeBase;
  joueur.attaqueFrame = playerInfo.attaqueFrame
  joueur.setFrictionAir(0.05);
  joueur.setMass(joueur.masse);

  joueur.zoneAttaque = self.add.rectangle(0, 0 ,joueur.displayWidth, joueur.displayHeight, 0x0e88bd, 0.5).setDepth(400);
  joueur.zoneAttaque.x = joueur.getRightCenter().x
  joueur.zoneAttaque.y = joueur.getRightCenter().y

  var zoneAttaque = self.matter.add.gameObject(joueur.zoneAttaque);
  zoneAttaque.setCollisionCategory(null);
  zoneAttaque.setIgnoreGravity(true).setStatic(true)

  self.players[playerInfo.arene].add(joueur);

  joueur.ombre = self.add.ellipse(-79, 327 - 30, 100, 20, 0x0009).setAlpha(0.5);
  self.tweens.add({
  targets: joueur,
  alpha: 1,
  delay: 700,
  duration:2000,
  // onComplete: () => (joueur.setScale(0.4), joueur.setCollidesWith(0), joueur.setCollisionGroup(-1)),
  ease: 'Sine.easeInOut'
});
}

function handleCollide(objet1, objet2, info) {
}

function removePlayer(self, playerId, arene) {
  self.players[arene].getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy(true)
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
