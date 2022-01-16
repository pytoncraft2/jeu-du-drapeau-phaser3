/**
 * @namespace Serveur
 * @property {module:serveur} serveur
 */

 /**
* @module serveur
*/


/** @constant
    @type {Object}
    @default
    [link text]{@link ObjetJoueur}
    @description Groupe de joueurs à envoyé au client avec des parametres qui change
*/
const players = {};
const clones = {};
var evenement = null;
players['Naruto'] = {};
clones['Naruto'] = {};
players['Pikachu'] = {};
barils = {};
drapeaux = {};
constraints = {};


const parametres = {};

//Tout les joueurs Extends de la dessinatrice (pour l'instant)
parametres['dessinatrice1'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 104,
    displayHeight: 302,
    masse: 30,
    puissanceDeBase: 10,
    attaqueFrame: "positiona3",
    defaultScale: 0.4,
    scaleAugmentation: 0
  },
  toucheA: (charge, scene, player) => {
    attaque(scene, player, charge)
  },
  toucheZ: (scene, player) => {
    toupie(scene.tweens, player)
  },
  toucheE: (scene, player) => {
    interactionTonneauDrapeau(scene, player)
  },
  toucheT: (scene, player) => {
    interactionTirolienne(scene, player)
  },
  toucheR: (scene, player) => {
    invisible(scene, player)
  },
  toucheEspace: (scene, player, charge, isOnGround, isInAir) => {
    saut(scene, player, charge, isOnGround, isInAir)
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
    attaqueFrame: "positiona3",
    defaultScale: 0.4,
    scaleAugmentation: 0
  },
  toucheA: (charge, scene, player) => {
    attaque(scene, player, charge)
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
  toucheEspace: (scene, player, chargeSaut, isOnGround, isInAir) => {
    saut(scene, player, chargeSaut, isOnGround, isInAir)
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
    attaqueFrame: "positiona1",
    defaultScale: 0.4,
    scaleAugmentation: 0
  },
  toucheA: (charge, scene, player) => {
    attaque(scene, player, charge)
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

  toucheEspace: (scene, player, chargeSaut, isOnGround, isInAir) => {
    saut(scene, player, chargeSaut, isOnGround, isInAir)
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
  plugins: {
    scene: [{
      plugin: PhaserMatterCollisionPlugin.default, // The plugin class
      key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
      mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision

      // Note! If you are including the library via the CDN script tag, the plugin
      // line should be:
      // plugin: PhaserMatterCollisionPlugin.default
    }]
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    physics: {
      matter: {
        debug: false,
        gravity: {
          y: 9,
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
let {
Body,
Bodies
} = Phaser.Physics.Matter.Matter; // Native Matter modules


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
  /**
   *
   */
   /** @constant
   @type {Object}
   @default
   [link text]{@link joueurs}
   @description Groupe de joueurs que le serveur met continuellement à jour (qui reste sur le serveur)
   */

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
  drapeauBleu.id = 1;
  drapeauBleu.name = "A"


  drapeauVert = this.matter.add.gameObject(matDrapeauVert);
  drapeauVert.setFixedRotation().setIgnoreGravity(true)
  drapeauVert.id = 2;
  drapeauVert.name = "B"

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
  evenement.on('reapparaitre', reapparaitre, this)
  evenement.on('fin-de-partie', finDePartie, this)

  //platforme principal
  // let soclePlatformeGauche = self.add.zone(0, 327, 210, 210).setSize(3500, 40);
  let soclePlatformeDroit = self.add.zone(-379, -363, 210, 210).setSize(3500, 40);



  /**
   * COLISION GROUPE
   * 1: platforme
   * 2: joueur
   */

  // var socleJoueur = self.matter.add.gameObject(soclePlatformeGauche);
  // socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0.01).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)
  // socleJoueur2.setIgnoreGravity(true).setStatic(true).setFriction(0.01).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)

  var socleJoueur3 = self.matter.add.gameObject(soclePlatformeDroit);
  socleJoueur3.setIgnoreGravity(true).setStatic(true).setFriction(0.01)
  // socleJoueur4.setIgnoreGravity(true).setStatic(true).setFriction(0.01).setCollisionGroup(2).setCollidesWith(CATEGORIE_JOUEUR)


  self.room = ""

  this.bullet = this.matter.add.image(1210, -400, 'bullet', null, { ignoreGravity: true });
  this.bullet.setFixedRotation();
  this.bullet.setStatic(true).setDepth(2);

  /**
   * Démarrage de la connexion avec socket io
   * @param  {Object} socket socket.io
   * @event ConnexionServeurSocketIO
   */

  io.on('connection', function(socket) {
    console.log("ONE CONNEXION");

    /**
     * Arrivé d'un joueur sur l'arene depuis le client
     * Création de l'objet du joueur avec les parametres specifiques au personnage choisi (taille, poids ...)<br>
     * Ajout du personnage au groupe de joueur<br>
     * Ajout du nouveu joueur dans le [l'objet contenant touts les joueurs]{@link module:serveur~players}<br>
     *
     * @param room nom de l'arene (NARUO|DESSINATRICE...)
     * @param equipe equipe choisie (A|B)
     * @param atlas nom de l'atlas du personnage choisi
     * @event AjoutJoueurSeveur
     */
    socket.on("nouveau_joueur", (room, equipe, atlas) => {
      equipe == "A"

      // let x = equipe == "A" ? -379 : 7000
      let x = -379
      let y = equipe == "A" ? 137 : -553

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
        isTouching: {
          left: false,
          right: false,
          ground: false
        },
        canJump: true,
        jumpCounter: 0,
        jumpCooldownTimer: null,
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

      /**
       * @param {Object} self référence au jeu - scene Phaser
       * @param {Objet} players [Groupe de joueur]{@link module:serveur~players}
       */

      addPlayer(self, players[socket.room][socket.id]);
      //ajout du joueur dans le groupe joueur du serveur

      /**
       * Envoie à tout les clients la nouvelle liste des joueurs à afficher
       * @property {players} players les joueurs deja presents
       */
      socket.emit("tout_les_joueurs", players);

      /**
       * @fires AjoutJoueurClient
       * Envoie les parametres du nouveau joueur à toute les autres personnes déja connecté
       * @property {room} channel - le channel de destination à qui envoyé
       * @property {players} joueur les infos du joueurs (id, atlas) qui vient d'arrivé
       * @example
       * socket.broadcast.to("Naruto").emit("nouveau_joueur", players["Naruto"][12345]);
       */
      socket.broadcast.to(room).emit("nouveau_joueur", players[socket.room][socket.id]);


      /**
       * Déconnexion du joueur
       * Suppression du joueur dans l'[objet joueur]{@link ObjetJoueur} <br>
       * Suppression du joueur dans le [Groupe de joueur Phaser]{@link module:serveur~players} <br>
       * @event Deconnexion
       */
      socket.on('disconnect', function() {
        console.log('user disconnected');
        // remove player from server
        removePlayer(self, socket.id, socket.room);
        // remove this player from our players object
        delete players[socket.room][socket.id];
        // emit a message to all players to remove this player
        io.to(socket.room).emit("disconnection", socket.id);

      });


      /**
      * Change la valeur de l'objet input des touches pressés du joueur par de nouvelles valeurs<br>
      * @event EvenementTouches
      * @param inputData touches actionné
      */
      socket.on('playerInput', function(inputData) {
        handlePlayerInput(self, socket.id, socket.room, inputData);
      });

    });

  })

}

 /**
  * Mise à jour des parametres des élements des groupes de la Scene Phaser<br>
  * Position Drapeaux, Tonneaux, Joueurs ...
  * @fires MiseAjourJoueurs
  * @param  {Number} time  L'heure actuelle. Soit une valeur de minuterie haute résolution si elle provient de Request Animation Frame, soit Date.now si vous utilisez SetTimeout.<br>
  * @param  {Number} delta fps
  * @property {object}  this.drapeaux liste des drapeaux du groupe Phaser à ittérer
  * @property {object}  drapeaux recuperation de certain parametres du groupe de drapeau Phaser <br>
  * pour les retransrire dans l'objet drapeau configuration des parametres des objets drapeaux <br>
  * pour l'envoyer au client
  * @property {Object} this.tonneaux liste des tonneaux du Groupe Phaser à ittérer
  * @property {Object} tonneaux nouveau parametres des tonneaux à envoyer au client
  * @property {Object} this.players liste des joueurs du Groupe Phaser à ittérer
  * @property {Object} players [Objet des joueurs]{@link module:serveur~players} contenant les nouveaux parametres des joueurs à envoyer au client
  */
  function update(time, delta) {

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

      const isOnGround = player.isTouching.ground;
      const isInAir = !isOnGround;
      // Adjust the movement so that the player is slower in the air
      // const moveForce = isOnGround ? 9.28 : 0;

      const moveForce = isOnGround ? 0.18 : 0.205;

      //socle du joueur qui suit le joueur
      player.socle.x = player.x

      player.ombre.x = player.x
      if (input.escape) {
        this.matter.world.localWorld.constraints = []
        this.matter.world.removeConstraint(constraints[player.playerId]['tonneau']);
        constraints[player.playerId]['tonneau'] = {}
        input.escape = false;
      }

      // A
      if (input.attaque) {
        console.log("ATTTAQUEEEE");
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
        console.log("TIRO");
        parametres[player.atlas].toucheE(this, player)
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
        parametres[player.atlas].toucheT(this, player)
        input.tirolienne = false;
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
      */
      if (player.etatAttaque.attacked) {
        parametres[player.atlas].gestionRecevoirDegat(this, player)
        player.etatAttaque.attacked = false;
      }



      if (input.left && !input.c) {
        player.play('walk', true)
        player.direction = "gauche"
        player.applyForce({ x: -moveForce, y: 0 });
        player.flipX = true;
      }

      if (input.right && !input.c) {
        player.play('walk', true)
        player.direction = "droite"
        player.applyForce({ x: moveForce, y: 0 });
        player.flipX = false;
      }

      // ESPACE
      if (input.saut) {
        if (input.chargeSaut) {
          parametres[player.atlas].toucheEspace(this, player, input.chargeSaut, isOnGround, isInAir)
        } else {
          parametres[player.atlas].toucheEspace(this, player, input.chargeSaut, isOnGround, isInAir)
        }
        input.saut = false;
      }

      if (input.up) {
        player.socle.y -= 2;
        player.scaleAugmentation -= 0.001
        player.depth -= 0.001;
        // player.setDepth(player.depth + 1);
      }

      if (input.down) {
        player.socle.y += 2;
        player.scaleAugmentation += 0.001
        player.depth += 0.001;
      }

      //SE REDRESSER
      if (input.redresser) {
        this.tween = this.tweens.add({
          targets: player,
          angle: 0,
          duration: 200
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

      if (player.y > 6000) {
        evenement.emit('reapparaitre', player.playerId)
      }

      players[player.arene][player.playerId].zoneAX = player.zoneAttaque.x;
      players[player.arene][player.playerId].zoneAY = player.zoneAttaque.y;

      players[player.arene][player.playerId].x = player.x;
      players[player.arene][player.playerId].y = player.y;
      players[player.arene][player.playerId].frame = player.anims.getFrameName();
      players[player.arene][player.playerId].flipX = player.flipX;
      // players[player.arene][player.playerId].scale = player.scale;
      players[player.arene][player.playerId].scale = player.defaultScale + player.scaleAugmentation;
      players[player.arene][player.playerId].displayWidth = player.displayWidth;
      players[player.arene][player.playerId].displayHeight = player.displayHeight;
      players[player.arene][player.playerId].tint = player.tintBottomLeft;
      players[player.arene][player.playerId].alpha = player.alpha;
      players[player.arene][player.playerId].ombreX = player.ombre.x;
      players[player.arene][player.playerId].ombreScale = player.ombre.scale;
      players[player.arene][player.playerId].ombreAlpha = player.ombre.alpha;

      players[player.arene][player.playerId].socleX = player.socle.x;
      players[player.arene][player.playerId].socleY = player.socle.y;

      players[player.arene][player.playerId].bulletX = this.bullet.x;
      players[player.arene][player.playerId].bulletY = this.bullet.y;
      players[player.arene][player.playerId].rotation = player.rotation;
      players[player.arene][player.playerId].depth = player.depth;

      if (this.bulletCanon) {
        players[player.arene][player.playerId].bulletCanonY = this.bulletCanon.y
        players[player.arene][player.playerId].bulletCanonX = this.bulletCanon.x
        players[player.arene][player.playerId].bulletCanonScale = this.bulletCanon.scale
        players[player.arene][player.playerId].canonAngle = this.canon1.angle
      }

    });
    io.to("Naruto").emit("playerUpdates", players["Naruto"], barils, drapeaux);

  }


 /**
  * DIMINUTION VIE EQUIPE SELON LA PUISSANCE DE L'ATTAQUE DU JOUEUR
  * @param  {String} equipe          nom de l'equipe (A|B)
  * @param  {Number} puissance       Puissance du joueur qui a attaqué
  * @param  {Number} puissanceDeBase Puissance de base du joueur qui a attaqué
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
  * Diminution vie du joueur: nombre de vie actuelle -1
  * @param  {String} id           id du joueur ciblé
  * @param  {Object} tween        Phaser.tween
  * @param  {Boolean|Number} superAttaque valeur de la charge du joueur qui attaque (enre 0 et 1)
  * @param  {String} direction    direction du joueur qui attaque
  */

function changementVie(id, tween, superAttaque, direction) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.etatAttaque.attacked = true;
  joueur.etatAttaque.repousser = superAttaque;
  joueur.etatAttaque.direction = direction;
}


 /**
  * Reinitialise la vie du joueur<br>
  * Retour au spawn avec animation
  *
  * @param  {String} id id du joueur ciblé
  */

function reapparaitre(id) {
  let joueur = this.players["Naruto"].getMatching("playerId", id)[0]
  joueur.vie = parametres[joueur.atlas].etatInitial.vie
  let x = joueur.equipe == "A" ? -379 : 7000
  let y = joueur.equipe == "A" ? 100 : -1600


  io.to("Naruto").emit("fin_de_vie", id, joueur.vie);
  this.tweens.add({
    targets: joueur,
    props: {
      alpha: {value: 0.1, duration: 1000},
      y: { value: y, delay: 1000, duration: 1500, ease: 'Power2' },
      x: { value: x, delay: 1000, duration: 1500, ease: 'Power2'},
    },
   onComplete: () => joueur.setAlpha(1).setRotation(0),
    ease: 'Sine.easeInOut'
  });
}


/**
 * Réinitialise tout les parametres de la scene (position, scores...)
 * @param  {String} equipe nom de l'equipe qui à perdu
 * @fires finDePartie
 */

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

  this.drapeaux.getChildren()[0].setPosition(8242.130999766403, -1566.8232688524165).setSize(32, 640).setIgnoreGravity(true).setVelocity(0, 0)
  this.drapeaux.getChildren()[1].setPosition(-4868.428561331542, -775.2723001427164).setSize(32, 640).setIgnoreGravity(true).setVelocity(0, 0)
}


/**
 * Met à jour l'objet input du joueur par les nouvelles valeurs des touches pressés
 * @param  {Object} self     Phaser.scene
 * @param  {String} playerId id du joueur qui appuie sur la touche
 * @param  {String} arene    arene du joueur qui appuie sur la touche
 * @param  {Object} input    les nouvelles valeurs des touches pressés du joueur
 */

function handlePlayerInput(self, playerId, arene, input) {

  Object.keys(players[arene]).forEach(function(a) {

    self.players[arene].getChildren().forEach((player) => {

      if (playerId === player.playerId) players[arene][player.playerId].input = input

    });
  });
}


/**
 * Detection si le joueur touche le sol
 * Si les sensors du joueur touche quelquechose
 * @param  {Object} bodyA Joueur
 * @param  {Object} bodyB Sol
 * @param  {Object} pair  [description]
 */
function onSensorCollide({
  bodyA,
  bodyB,
  pair
}, joueur) {
  if (bodyB.isSensor) return; // We only care about collisions with physical objects
  if (bodyA === joueur.sensors.bottom) {
    joueur.isTouching.ground = true;
  }
  // console.log("OKAAAAAAAAAAAAAAAAAAAAAAAAAAAAY");
}


/**
 * Imbrication d'objet et action à executer sur les objets en callback
 * @param  {Object}   scene    Scene.Phaser
 * @param  {Object}  elements  Groupe d'élements qui peuvent s'imbriquer
 * @param  {Object}   cible    Element qui rencontre le groupe
 * @param  {Function} callback Action a executer sur les objets après imbrication
 */

function overlap(scene, elements, cible, callback) {
  scene.matter.overlap(elements, cible, callback)
}

/**
 * Ajout du joueur à la scene Phaser
 * @param {Object} self       Phaser.scene
 * @param {Object} playerInfo parametres special du joueur (atlas, equipe ...)
 */
function addPlayer(self, playerInfo) {
  var group1 = self.matter.world.nextGroup();
  var group2 = self.matter.world.nextGroup(true);


  var cat1 = self.matter.world.nextCategory();
  var cat2 = self.matter.world.nextCategory();

  const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, 'dessinatrice1', 'face0').setDisplaySize(playerInfo.displayWidth, playerInfo.displayHeight).setAlpha(1)


// var block1 = this.matter.add.image(400, 450, 'strip').setStatic(true);
// var fish1 = this.matter.add.image(100, 100, 'fish', 0).setVelocityY(10);


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
  joueur.isTouching = playerInfo.isTouching;
  joueur.canJump = playerInfo.canJump;
  joueur.jumpCounter = playerInfo.jumpCounter;
  joueur.jumpCooldownTimer = playerInfo.jumpCooldownTimer;
  joueur.puissanceBonus = playerInfo.puissanceBonus;
  joueur.puissanceDeBase = playerInfo.puissanceDeBase;
  joueur.attaqueFrame = playerInfo.attaqueFrame
  joueur.defaultScale = playerInfo.defaultScale;
  joueur.scaleAugmentation = playerInfo.scaleAugmentation;

  //  Here we'll create Group 2:
  //  This is a non-colliding group, so objects in this Group never collide:
  // var group2 = self.matter.world.nextGroup(true);

  //  block2 won't collide with fish2 because they share the same non-colliding group id
  // var block2 = this.matter.add.image(400, 400, 'strip').setStatic(true).setCollisionGroup(group2);
  // var fish2 = this.matter.add.image(250, 100, 'fish', 1).setBounce(1).setFriction(0, 0, 0).setCollisionGroup(group2).setVelocityY(10);

  joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -55, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
  var socle = self.matter.add.gameObject(joueur.socle);
  socle.setIgnoreGravity(true).setStatic(true)
  if (playerInfo.equipe == "A") {
    socle.setCollisionGroup(group1).setCollisionCategory(cat1).setCollidesWith(cat1);
  } else {
    socle.setCollisionGroup(group1).setCollisionCategory(cat2).setCollidesWith(cat1);
  }
// .setCollisionGroup(group1).setCollisionCategory(cat1).setCollidesWith(cat1)


//  Assign the new category to block3 and fish3 and tell them they should collide:
// var block3 = this.matter.add.image(400, 500, 'strip').setStatic(true).setCollisionCategory(cat1).setCollidesWith(cat1);
// var fish3 = this.matter.add.image(450, 100, 'fish', 2).setCollisionCategory(cat1).setCollidesWith(cat1);
  // joueur.setCollisionGroup(3).setCollidesWith(joueur.playerId)

  // joueur.setFrictionAir(0.05);
  joueur.setMass(joueur.masse);
  joueur.setFriction(0);

  joueur.zoneAttaque = self.add.rectangle(0, 0 ,joueur.displayWidth/2, joueur.displayHeight, 0x0e88bd, 0.5).setDepth(400);
  joueur.zoneAttaque.x = joueur.getRightCenter().x
  joueur.zoneAttaque.y = joueur.getRightCenter().y


  let w = joueur.displayWidth;
  let h = joueur.displayHeight;

  joueur.mainBody = Bodies.rectangle(0, 0, joueur.displayWidth * 0.6, h);
  joueur.sensors = {
    bottom: Bodies.rectangle(0, h * 0.5, w * 0.25, 2, {
      isSensor: true
    }),
    left: Bodies.rectangle(-w * 0.35, 0, 2, h * 0.5, {
      isSensor: true
    }),
    right: Bodies.rectangle(w * 0.35, 0, 2, h * 0.5, {
      isSensor: true
    })
  };
  joueur.compoundBody = Body.create({
    parts: [joueur.mainBody, joueur.sensors.bottom, joueur.sensors.left, joueur.sensors.right],
    frictionStatic: 1.4,
    frictionAir: 0.12,
    friction: 0,
    // The offset here allows us to control where the sprite is placed relative to the
    // matter body's x and y - here we want the sprite centered over the matter body.
    render: {
      sprite: {
        xOffset: 0.5,
        yOffset: 0.5
      }
    },
  });

  joueur.setExistingBody(joueur.compoundBody)
  joueur.setPosition(playerInfo.x, playerInfo.y);
  if (playerInfo.equipe == "A") {
  joueur.setCollisionGroup(group1).setCollisionCategory(cat1).setCollidesWith(cat1);
} else {
  joueur.setCollisionGroup(group1).setCollisionCategory(cat2).setCollidesWith(cat2);
}



  // let {
  //   displayWidth: w,
  //   displayHeight: h
  // } = joueur;

  joueur.isTouching = {}
  self.matter.world.on("beforeupdate", () => {
    joueur.isTouching.left = false;
    joueur.isTouching.right = false;
    joueur.isTouching.ground = false;
  }, self);
  //
  self.matterCollision.addOnCollideStart({
    objectA: [joueur.sensors.bottom],
    callback: eventData => {
      onSensorCollide(eventData, joueur)
    },
    context: this
  });
  self.matterCollision.addOnCollideActive({
    objectA: [joueur.sensors.bottom],
    callback: eventData => {
      onSensorCollide(eventData, joueur)
    },
    context: this
  });
  //
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

/**
 * Suppression du joueur de la scene Phaser<br>
 * @param  {Object} self     Phaser.scene
 * @param  {String} playerId id du joueur à supprimer
 * @param  {String} arene    arene du joueur à supprimer
 */
function removePlayer(self, playerId, arene) {
  self.players[arene].getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy(true)
  });
}


/**
 * Rendre invisible un joueur
 * @param  {Object} scene  Scene du jeu
 * @param  {Object} player le joueur qui est a rendre invisible
 */
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

/**
 * Charger et tirer une boule (pouvoir de Naruto)
 *
 * @param  {Object} scene   Scene du jeu Phaser
 * @param  {Object} player  le joueur qui tire la boule
 * @param  {Boolean} relache indique si le joueur maintient ou relache le bouton
 */

function tirer(scene, player, relache) {
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
  }
}

/**
 * Change la taille du joueur (pouvoir)
 *
 * @param  {Object} scene  Scene du jeu Phaser
 * @param  {Object} player joueur qui s'aggrandis
 */

function agrandissement(scene, player) {
  scene.tweens.addCounter({
    duration: 10000,
    onComplete: () => (player.active ? player.setDisplaySize(player.displayWidth -= 100, player.displayHeight -= 100) : null, player.puissanceBonus = 0)
  })

  player.setDisplaySize(player.displayWidth + 100, player.displayHeight + 100)
  player.puissanceBonus = 3;
}

/**
 * Effectuer plusieurs rotation sur le joueur pendant 2secondes
 *
 * @param  {Object} tweens gestion de l'animation pour le décompte
 * @param  {Object} player joueur qui effectue la rotation
 */

function toupie(tweens, player) {
  tweens.addCounter({
    duration: 2000,
    onComplete: () => (player.active ? (player.setRotation(0)) : null)
  })
  player.setAngularVelocity(1)
}

 /**
  * Charge puis Effectue un saut ou un double saut sur un joueur
  * @param  {Object}  scene      Scene Phaser.scene
  * @param  {Object}  player     joueur qui effectue le saut/double saut
  * @param  {Boolean}  chargeSaut puissance obtenu par le maintient du bouton espace
  * @param  {Boolean} isOnGround indique si il touche le sol pour effectuer son premier saut
  * @param  {Boolean} isInAir    indique si il est dans les aires pour effectuer un double saut
  */
function saut(scene, player, chargeSaut, isOnGround, isInAir) {
  var puissance
  if (chargeSaut) {
    if (player.body.speed < 3) {
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
    if (player.body.speed < 1) {
      player.play('saut')
    } else {
      player.play('jump')
    }

    if (isOnGround) {
      player.setVelocity( player.body.speed > 3 ? (player.flipX ? -puissance * 2: puissance * 2) : 0, -puissance * 2)
      player.jumpCounter = 0;
    } else if (isInAir) {
      if (player.jumpCounter == 0) {
        player.jumpCounter++;
        player.setVelocityY(-puissance * 2)
        scene.tweens.add({
          targets: player,
          angle: player.direction == "droite" ? 720 : -720,
          duration: 360
        })
      }
    }
  }
}

function multiclonage(scene, player) {

}

function fusion(scene, player) {

}

/**
 * Recevoir des dégats par un joueur
 *
 * @param  {Object} scene  Scene du jeu
 * @param  {Object} player joueur qui recoit les dégats
 */
function recevoirDegat(scene, player) {
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


/**
 * Effectuer une attaque ou/et un repoussement sur un objet|joueur
 *
 * @param  {Object} scene  Scene du jeu
 * @param  {Object} player joueur qui effectue une attaque
 * @param  {Boolean} charge indique si le joueur maintient ou relache le bouton
 */
 function attaque(scene, player, charge) {
   console.log("xxx");
   console.log(player.x);
   console.log("YYY");
   console.log(player.y);
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
         (player.zoneAttaque.x = player.getLeftCenter().x - 0, player.zoneAttaque.y = player.getLeftCenter().y)
         : (player.zoneAttaque.x = player.getRightCenter().x + 0, player.zoneAttaque.y = player.getRightCenter().y)

         overlap(scene, [...scene.players['Naruto'].getChildren(), ...scene.tonneaux.getChildren()], player.zoneAttaque, (objet1, objet2) => {
           if(objet1.gameObject.playerId !== player.playerId) {
             if (objet1.gameObject.playerId) {
               gestionAttaque(objet1.gameObject.vie, objet1.gameObject.playerId, scene.tweens, puissance, objet1.gameObject.flipX)
             }
             if (objet1.gameObject.name == "tonneau") {
               gestionTonneaux(puissance, player.flipX, objet1.gameObject)
             }
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
     }

     player.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)
     player.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'attack', () => {
       console.log("FIN ATTACK ANIM");
     })
   }
 }

/**
 * Interactions avec un tonneau|drapeau le plus proche du joueur<br>
 * celon la direction du joueur (droite|gauche)<br><br>
 *
 * si le joueur ne tient pas de tonneau|drapeau: attrape le tonneau|drapeau le plus proche<br>
 * sinon détache le tonneau du joueur<br><br>
 *
 * créer un rectangle de zone d'attaque à droite ou a gauche du joueur (celon sa direction)<br>
 * recupere et filtre les objets à l'interieur du rectangle et interagit avec eux<br>
 *
 * @param  {Object} player joueur qui interagie avec l'objet (tonneau|drapeau)
 * @param  {Object} scene  Scene du jeu
 */

function interactionTonneauDrapeau(scene, player) {

  //TONNEAU
  player.flipX ?
  (player.zoneAttaque.x = player.getLeftCenter().x - 0, player.zoneAttaque.y = player.getLeftCenter().y)
  : (player.zoneAttaque.x = player.getRightCenter().x + 0, player.zoneAttaque.y = player.getRightCenter().y)

    overlap(scene, [...scene.tonneaux.getChildren(), ...scene.drapeaux.getChildren()], player.zoneAttaque, (objet1, objet2) => {
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


/**
 * Utiliser la tirolienne quand le joueur est proche de celle ci
 *
 * @param  {Object} player joueur qui utilise la tirolienne
 * @param  {Object} scene  Scene du jeu
 */
 function interactionTirolienne(scene, player) {
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

 /**
  * Diminuer la vie d'un joueur ou faire perdre le joueur
  *
  * @param  {Number} vie          vie du joueur qui est attaqué
  * @param  {String} id           id du joueur qui est attaqué
  * @param  {Object} tween        animation pour la fin de vie
  * @param  {Boolean} superAttaque indique si le joueur qui attaque a chargé au maximum son attaque
  * @param  {String} direction    direction du joueur qui attaque (droite|gauche)
  */

 function gestionAttaque(vie, id, tween, superAttaque, direction) {
   if (vie <= 0) {
     evenement.emit('reapparaitre', id)
   } else {
     evenement.emit('changement-vie', id, tween, superAttaque, direction)
   }
 }

 /**
  * pousser un tonneau celon la puissance émis par le joueur
  *
  * @param  {Number} puissance charge du joueur
  * @param  {Boolean} rotation  position du joueur face au tonneau (droite|gauche)
  * @param  {Object} tonneau   tonneau ciblé
  */
function gestionTonneaux(puissance, rotation, tonneau) {
  tonneau.setVelocity((rotation ? -10 * (puissance * 5)  : 10 * (puissance * 5)), - (puissance * 100) )
}
const game = new Phaser.Game(config);
window.gameLoaded();
