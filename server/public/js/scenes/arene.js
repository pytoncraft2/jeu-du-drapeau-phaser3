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
    this.socket = io({
      extraHeaders: {
        "atlas": this.personnage,
        "page": "Jeu",
        arene: this.arene,
        equipe: this.equipe
      }
    });

        this.socket.emit("nouveau_joueur", this.arene, this.equipe);

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

    this.groupeBullets = this.add.group();
    this.bulletCanon = this.groupeBullets.create(this.canon1.x, this.canon1.y + 20, 'bullet').setScale(0.2).setDepth(100);


      var ellipse1 = this.add.ellipse(poteau1.x, poteau1.y + poteau1.displayHeight /2, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);
      var ellipse2 = this.add.ellipse(poteau2.x, poteau2.y + poteau2.displayHeight /2, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);

      this.tweens.add({

        targets: [ellipse1, ellipse2],
        alpha: 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'

      });

    this.add.image(3426, -500, 'tobogan', null, { isStatic: true }).setAngle(-26);
    this.bullet = this.add.image(1210, -400, 'bullet');

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
            player.setVelocity(players[id].velocityX, players[id].velocityY);
            player.setPosition(players[id].px, players[id].py);
            player.x = players[id].x
            player.y = players[id].y
            player.setAngle(players[id].angle);
            player.setFrictionStatic(players[id].frictionstatic);
            player.setIgnoreGravity(players[id].ignoreGravity);
            player.setMass(players[id].mass);
            player.ombre.x = players[id].ombreX
            player.ombre.y = players[id].ombreY
            self.bullet.x = players[id].bulletX
            self.bullet.y = players[id].bulletY

            // console.log(players[id].bulletCanonX);
            if (self.bulletCanon) {
            self.bulletCanon.x = players[id].bulletCanonX
            self.bulletCanon.y = players[id].bulletCanonY
            }
            if (players[id].anim && players[id].anim !== false) {
              player.play('' + players[id].anim + '_' + players[id].atlas + '', 5);
            }
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
    this.canonKeyPressed = this.input.keyboard.addKey('C');
    this.aKeyPressed = this.input.keyboard.addKey('A');
    this.tKeyPressed = this.input.keyboard.addKey('T');
    this.cKeyPressed = this.input.keyboard.addKey('CTRL');
    this.cursors = this.input.keyboard.createCursorKeys();
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
        self.canon1.setAngle(self.canon1.angle - 5)
      } else if (event.key == "ArrowDown") {
        // self.rect.setAngle(self.canon1.angle + 5)
        self.canon1.setAngle(self.canon1.angle + 5)
      }

    });

  },

  update: function () {
    const left = this.leftKeyPressed,
      right = this.rightKeyPressed,
      up = this.upKeyPressed,
      down = this.downKeyPressed,
      space = this.spaceKeyPressed,
      ak = this.aKey,
      tk = this.tKey,
      ck = this.cKey;

    this.cursors.left.isDown ? this.leftKeyPressed = true :
      this.cursors.right.isDown ? this.rightKeyPressed = true :
      (this.leftKeyPressed = false, this.rightKeyPressed = false)

    this.cursors.up.isDown ? this.upKeyPressed = true :
      this.cursors.down.isDown ? this.downKeyPressed = true :
      (this.upKeyPressed = false, this.downKeyPressed = false)

    this.aKeyPressed.isDown ? this.aKey = true : this.aKey = false
    this.tKeyPressed.isDown ? this.tKey = true : this.tKey = false

    this.cKeyPressed.isDown ? this.cKey = true : this.cKey = false

    this.cursors.space.isDown ? this.spaceKeyPressed = true : this.spaceKeyPressed = false

    if (Phaser.Input.Keyboard.JustDown(this.zKeyPressed)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed,
        a: this.aKey,
        t: this.tKey,
        space: this.spaceKeyPressed,
        c: this.cKey,
        z: true,
      });
    }


    if (Phaser.Input.Keyboard.JustDown(this.canonKeyPressed)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed,
        a: this.aKey,
        t: this.tKey,
        space: this.spaceKeyPressed,
        c: this.cKey,
        canonMaintenu: true,
        canonRelache: false,
        z: false,
      });

      /*
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
      */
    }

    if (Phaser.Input.Keyboard.JustUp(this.canonKeyPressed)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed,
        a: this.aKey,
        t: this.tKey,
        space: this.spaceKeyPressed,
        c: this.cKey,
        canonMaintenu: false,
        canonRelache: true,
        z: false,
      });

      /*
      this.charge.stop()

      console.log(this.groupeBullets.getChildren()[0]);
      this.l = new Phaser.Geom.Line(this.canon1.x, this.canon1.y, this.canon1.x + 5400, this.canon1.y);
      var rad = Phaser.Math.DegToRad(this.canon1.angle);
      let line = Phaser.Geom.Line.SetToAngle(this.l, this.canon1.x, this.canon1.y, rad, 4000);
      this.graph.lineStyle(10, 0xcf0000, 1);
      var b = this.graph.strokeLineShape(this.l).setDepth(1000);

      b.setAlpha(0)

      this.charge = this.tweens.add({
        targets: b,
        alpha: 0.7,
        yoyo: true,
        paused: false,
        duration: 200,
        repeat: 0,
        onComplete: function () { console.log('onComplete'); arguments[1][0].clear(); },
      });

      this.charge = this.tweens.add({
        targets: this.bulletCanon,
        x: this.l.x2,
        y: this.l.y2,
        paused: false,
        duration: 500,
        repeat: 0,
      });
      */
    }

    if (left !== this.leftKeyPressed ||
      right !== this.rightKeyPressed ||
      up !== this.upKeyPressed ||
      down !== this.downKeyPressed ||
      ak !== this.aKey ||
      tk !== this.tKey ||
      ck !== this.cKey ||
      space !== this.spaceKeyPressed || this.zkey == true) {
        console.log(this.zKey);
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed,
        a: this.aKey,
        t: this.tKey,
        space: this.spaceKeyPressed,
        c: this.cKey,
        z: this.zKey,
      });
    }
  },
  displayPlayers: function(self, playerInfo, iscurrent) {
    console.log("Ajout joueur function");
    const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setScale(0.38);

    joueur.playerId = playerInfo.playerId;
    joueur.arene = playerInfo.arene;
    joueur.ombre = playerInfo.ombre;
    joueur.setFrictionAir(0.03);
    joueur.setMass(15);
    joueur.socle = self.add.zone(playerInfo.x, playerInfo.y + 30, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    joueur.ombre = self.add.ellipse(joueur.socle.x, joueur.socle.y - 35, 100, 20, 0x0009).setAlpha(0.5);

    self.players.add(joueur);
    if (iscurrent) {
      self.cameras.main.startFollow(joueur, false, 0.2, 0.2);
    }
  },
});

export default Arene;
