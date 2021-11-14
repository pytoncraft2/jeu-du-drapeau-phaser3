import PanelViewer from './elements/panel-viewer.js'
import Animations from './elements/liste-animations.js'
import Maison from './elements/objets/maison.js'
var body;

var cursors
var health = 100
var portal
var bullet
var groupeBullets
var charge
var events
var yKey
var zKey
var rKey
var rIsDown
var eKey
var follow
var mKey
var aKey
var pKey
var tKey
var ombre
var protect
var pannelRight
var pannelBottom
var count
var ctrlKey
var cKey
var spaceBar
var ennemy
var ennemy2
var ennemy3
var ennemy4
var girlMap
var graphics
// private block1: Phaser.Physics.Arcade.Image;
var  block1
var block2
var block3
var block4
var imageFakhear
var barrelGroup
var  info
var fakehear
var abonner
// var  zone
var  barrelzone
var  ennemyzone
var  gfx
var  lastHealth = 100

const Arene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Arene()
    {
        Phaser.Scene.call(this, { key: 'arene' });
    },
    init: function(data) {
      this.personnage = data.personnage.slice(0, -1);
      this.arene = data.arene;
      this.equipe = data.equipe;
    },

    create: function ()
    {

      this.players = {}

      this.players = this.add.group();



    this.cameras.main.fadeIn(1000);
    gfx = this.add.graphics();
    this.graph = this.add.graphics();

    var self = this;
    new Animations(this.anims)
    /**
     * CONNEXION
     * Démarre connexion socket
     * Envoi dès la connexion un entete avec le nom de l'atlas à charger pour Definir atlas
     * @type {string}
     */
    this.socket = io();
    this.matter.world.disableGravity();


        this.socket.emit("nouveau_joueur", this.arene, this.equipe, this.personnage);

        this.socket.on("nouveau_joueur", (data) => {
          console.log("NOUVEAU JOUEUR DATA");
          self.displayPlayers(self, data, false);
        });

        this.socket.on("tout_les_joueurs", (arene) => {
          Object.keys(arene[self.arene]).forEach(function(id) {
            if (arene[self.arene][id].playerId === self.socket.id) {
              self.displayPlayers(self, arene[self.arene][id], true);
            } else {
              self.displayPlayers(self, arene[self.arene][id], false);
            }
          });
        });

    let interieurMaison1 = this.add.image(-135, 40, 'interieur-maison')
    let poteau1 = this.add.image(1210, 0, 'poteau')
    this.canon1 = this.add.image(0, -460, 'canon').setDepth(4)

    this.rect = this.add.rectangle(0, -460, 333, 125)


    let canonSocle1 = this.add.image(0, -340, 'canon-socle').setDepth(3)
    let platforme1 = this.add.image(0, 290, 'platforme').setDepth(-2)
    let facade1 = this.add.image(-135, 106, 'facade').setDepth(1).setAlpha(0.4)
    let toit1 = this.add.image(-135, -245, 'plafond').setDepth(2)
    let fontaine1 = this.add.image(-1370, 137, 'fontaine').setDepth(2)
    let maison1 = this.add.group()
    maison1.addMultiple([interieurMaison1, facade1, toit1]);   // array of game objects

    let interieurMaison2 = this.add.image(7000, -1650, 'interieur-maison')
    let poteau2 = this.add.image(5675, -1676, 'poteau')
    let platforme2 = this.add.image(7000, -1400, 'platforme').setDepth(-2)
    let facade2 = this.add.image(7000, -1584, 'facade').setDepth(1).setAlpha(0.4)
    let toit2 = this.add.image(7000, -1935, 'plafond').setDepth(2)
    let fontaine2 = this.add.image(8235, -1553, 'fontaine').setDepth(2)

    let maison2 = this.add.group()
    maison2.addMultiple([interieurMaison2, facade2, toit2]);   // array of game objects

    var ellipse1Potteau = this.add.ellipse(poteau1.x, poteau1.y + poteau1.displayHeight /2, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);
    var ellipse2Potteau = this.add.ellipse(poteau2.x, poteau2.y + poteau2.displayHeight /2, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);

    this.tweens.add({

      targets: [ellipse1Potteau, ellipse2Potteau],
      alpha: 0.2,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'

    });


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


    this.groupeBullets = this.add.group();
    this.bulletCanon = this.groupeBullets.create(this.canon1.x, this.canon1.y + 20, 'bullet').setScale(0.2).setDepth(100).setTintFill(0xff0000)




    this.add.image(3426, -500, 'tobogan', null, { isStatic: true }).setAngle(-26);
    this.bullet = this.add.image(1210, -400, 'bullet').setDepth(2);


    var fil = new Phaser.Geom.Line(1210, -400, 5675, -2373);

    var graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xaa00aa } });

    graphics.strokeLineShape(fil);

    /**
     * AFFICHAGE JOUEURS
     * Affiche le joueur principal si l'id correspond a mon id
     * sinon Affiche les autres personnes
     * @param  {Object} players liste de l'id du socket de tout les joueurs
     * @return {void}
     */

    /**
     * NOUVEAU JOUEUR
     * Affiche les nouveau joueur
     * @param  {Object} playerInfo liste des parametres(coordonnés,scale,depth...)
     * @return {void}
     */

    /**
     * DÉCONNEXION
     * Cherche l'id de la personne déconnecté et supprime le joueur
     * @param  {string} playerId id du joueur (ou l'id du socket)
     * @return {[type]}          [description]
     */

    this.socket.on('disconnection', function(playerId) {
      self.players.getChildren().forEach(function(player) {
        if (playerId === player.playerId) player.destroy();
      });
    });

    /**
     * MISE À JOUR DU JOUEUR
     * Cherche l'id du joueur et Modifie les parametres de celui ci
     * @param  {Object} players liste de l'id du socket de tout les joueurs
     * @return {void}
     */

    this.socket.on('playerUpdates', function(players) {
      Object.keys(players).forEach((id) => {
        self.players.getChildren().forEach(function(player) {
          if (players[id].playerId === player.playerId) {
            player.flipX = (players[id].flipX);
            // player.setScale(players[id].scale);
            // player.setVelocity(players[id].velocityX, players[id].velocityY);
            player.setPosition(players[id].x, players[id].y);
            player.setRotation(players[id].rotation);
            player.setFlipX(players[id].flipX);
            player.setAlpha(players[id].alpha);
            player.ombre.x = players[id].ombreX;
            player.ombre.setScale(players[id].ombreScale);
            player.play(players[id].anims, true);
            self.bullet.setPosition(players[id].bulletX, players[id].bulletY)

            if (self.bulletCanon) {
            self.bulletCanon.x = players[id].bulletCanonX
            self.bulletCanon.y = players[id].bulletCanonY
            self.bulletCanon.setScale(players[id].bulletCanonScale)
            }

            self.canon1.setAngle(players[id].canonAngle)
            // player.setRotation(players[id].rotation);

            // if (players[id].animation) {
            // player.play(players[id].animation);
            // }
            // player.ombre.setPosition(players[id].ombreX, players[id].ombreY)
            // if (players[id].animation) {
              // player.play('' + players[id].anim + '_' + players[id].atlas + '', 5);
            // }
          }
        });
      });
    });
    /**
     * ---------Définis la valeur par défault des touches------
     * par default :false (touche non appuyé)
     * @type {Object} état de la touche (pressé ou non)
     */



    this.zKeyPressed = this.input.keyboard.addKey('Z');
    this.vKeyPressed = this.input.keyboard.addKey('V');
    this.xKeyPressed = this.input.keyboard.addKey('X');
    this.canonKeyPressed = this.input.keyboard.addKey('C');
    this.aKeyPressed = this.input.keyboard.addKey('A');
    this.tKeyPressed = this.input.keyboard.addKey('T');
    this.cKeyPressed = this.input.keyboard.addKey('CTRL');
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log("CURSOR");
    console.log(this.cursors);
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;
    this.spaceKeyPressed = false;
    this.cKey = false;
    this.aKey = false;
    this.tKey = false;
    this.zKey = false;

    this.matter.add.mouseSpring();

    this.cameras.main.setZoom(0.5);


    this.input.keyboard.on('keydown', function (event) {
      if (event.key == "-") {
        self.cameras.main.zoomTo(self.cameras.main.zoom - 0.2, 1000)
      } else if (event.key == "+"){
        self.cameras.main.zoomTo(self.cameras.main.zoom + 0.2, 1000)
      } else if (event.key == "Enter") {
        self.cameras.main.zoomTo(0.5, 2000)
      } else if (event.key == "End") {
        self.cameras.main.zoomTo(0.1, 1500)
      } else if (event.key == "ArrowUp") {
        // self.rect.setAngle(self.canon1.angle - 5)
        // self.canon1.setAngle(self.canon1.angle - 5)
      } else if (event.key == "ArrowDown") {
        // self.rect.setAngle(self.canon1.angle + 5)
        // self.canon1.setAngle(self.canon1.angle + 5)
      }

    });

  },

  update: function () {


    /**
     * TIROLIENNE CONTROLE
     */
    if (Phaser.Input.Keyboard.JustDown(this.zKeyPressed)) {
      this.socket.emit('playerInput', {
        z: true,
      });
    }

    /**
     * SAUT
     */

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.socket.emit('playerInput', {
        saut: true,
        // haut: true
      });
    }

    // if (Phaser.Input.Keyboard.JustUp(this.cursors.space)) {
    //   this.socket.emit('playerInput', {
    //     saut: true,
    //     haut: false
    //   });
    // }


    /**
     * DIRECTION DROITE GAUCHE
     */

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.socket.emit('playerInput', {
        left: true,
        walk: true,
      });
    }


    if (Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
      this.socket.emit('playerInput', {
        left: true,
        walk: false,
      });
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.socket.emit('playerInput', {
        right: true,
        walk: true,
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
      this.socket.emit('playerInput', {
        right: true,
        walk: false,
      });
    }


      if (Phaser.Input.Keyboard.JustDown(this.aKeyPressed)) {
      this.socket.emit('playerInput', {
        attaque: true,
        charge: true,
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.aKeyPressed)) {
      this.socket.emit('playerInput', {
        attaque: true,
        charge: false,
      });
    }




    if (Phaser.Input.Keyboard.JustDown(this.vKeyPressed)) {
      this.socket.emit('playerInput', {
        v: true,
      });
    }

    if (Phaser.Input.Keyboard.JustDown(this.xKeyPressed)) {
      this.socket.emit('playerInput', {
        x: true,
      });
    }

    /**
     * CANON FEU
     * @param  {[type]} Phaser [description]
     * @return {[type]}        [description]
     */
    if (Phaser.Input.Keyboard.JustDown(this.canonKeyPressed)) {
      this.socket.emit('playerInput', {
        canonMaintenu: true,
        canonRelache: false
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.canonKeyPressed)) {
      this.socket.emit('playerInput', {
        canonMaintenu: false,
        canonRelache: true
      });
    }
  },
  displayPlayers: function(self, playerInfo, iscurrent) {
    console.log("Ajout joueur function");
    const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, 'dessinatrice1', 'face1').setScale(0.38);
    // self.add.image(playerInfo.x, playerInfo.y, "dessinatrice1_").setScale(0.38).setOrigin(0.5, 0.5)

    joueur.playerId = playerInfo.playerId;
    joueur.arene = playerInfo.arene;
    joueur.atlas = playerInfo.atlas;
    joueur.equipe = playerInfo.equipe;
    // joueur.socle = self.add.zone(playerInfo.x +700, playerInfo.y + 190, 210, 210).setSize(150, 40);
    // joueur.setFixedRotation()
joueur.setFrictionAir(0.05);
joueur.setMass(30);


let couleur = playerInfo.equipe == "A" ? 0x0ea733 : 0x0e88bd
let position = playerInfo.equipe == "A" ? {x: -79, y:327} : {x: 7300, y:-1363}

    joueur.ombre = self.add.ellipse(position.x, position.y - 30, 100, 20, couleur).setAlpha(0.8).setDepth(-1);

    // joueur.socle2 = self.add.zone(playerInfo.x, playerInfo.y + 190, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    // var socleJoueur = self.matter.add.gameObject(joueur.socle);
    // socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0)

    self.players.add(joueur);
    if (iscurrent) {
      self.cameras.main.startFollow(joueur);
    }
  },
});

export default Arene;
