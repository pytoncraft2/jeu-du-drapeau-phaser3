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
      this.vieEquipeA = 100
      this.vieEquipeB = 100
      this.lastHealthEquipeA = 100;
      this.lastHealthEquipeB = 100;


      this.lastHealthEquipe = {"A": 100, "B": 100}
      this.vieEquipe = {"A": 100, "B": 100}
      this.derniereVieEquipe = 100;

      this.graphics = this.add.graphics()
      this.barreEquipeA = this.add.graphics()
      this.barreEquipeB = this.add.graphics()
      // this.setVieEquipeBarre(100)
      this.events = new Phaser.Events.EventEmitter()
      this.events.on('changement-vie-equipe-A', this.changementVieEquipeA, this)
      this.events.on('changement-vie-equipe-B', this.changementVieEquipeB, this)
      this.setVieEquipeA(100)
      this.setVieEquipeB(100)
      // this.events.on('changement-vie-equipe', this.gestionChangementVieEquipe, this)
      this.players = {}

      this.players = this.add.group();
      this.tonneaux = this.add.group({
        allowGravity: true,
        dragX: 800
      });

      this.tonneau1 = this.tonneaux.create(-1300, 1700, 'tonneau').setScale(0.22).setDepth(800)
      this.tonneau2 = this.tonneaux.create(-1500, 1700, 'tonneau').setScale(0.22).setDepth(800)
      this.tonneau3 = this.tonneaux.create(-1700, 1700, 'tonneau').setScale(0.22).setDepth(800)
      this.tonneau4 = this.tonneaux.create(-1900, 1700, 'tonneau').setScale(0.22).setDepth(800)

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


      this.socket.on("changement_vie_equipe", (equipe, value) => {
        if (equipe == "A") {
        // self.setVieEquipeA(value)
        self.changementVieEquipeA(value)
      } else {
        // self.setVieEquipeB(value)
        self.changementVieEquipeB(value)
      }
      });

      this.socket.on("changement_vie", (id, vie) => {
        let moi = self.players.getMatching('playerId', self.socket.id)[0].playerId

        if (id == moi) {
          this.vies.getFirstAlive().setAlpha(0.2).setActive(false)
        }
      })

      this.socket.on("fin_de_vie", (id, vie) => {
        let moi = self.players.getMatching('playerId', self.socket.id)[0].playerId

        if (id == moi) {
          this.vies.getChildren().forEach((cercle, i) => {
          cercle.setActive(true).setAlpha(1)
          });
        }
      })

      this.socket.on("fin_de_partie", (equipe) => {

        let moi = self.players.getMatching('playerId', self.socket.id)[0].equipe
        self.socket.disconnect()
        if (moi == equipe) {
          self.scene.stop()
          self.scene.start('areneEquipes', {
            equipe: true
          })

        } else {
          self.scene.stop()
          self.scene.start('areneEquipes', {
            equipe: false
          })
        }
      });


      //EQUIPE BLEU
      this.barreEquipeA.clear()
      this.barreEquipeA.fillStyle(0x0e88bd)
      this.barreEquipeA.fillRoundedRect(1700, -330, 500, 20, 5).setScrollFactor(0).setDepth(20)

      //EQUIPE VERTE
      this.barreEquipeB.clear()
      this.barreEquipeB.fillStyle(0x0ea733)
      this.barreEquipeB.fillRoundedRect(-710, -330, 500, 20, 5).setScrollFactor(0).setDepth(20)



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

    this.socket.on('playerUpdates', function(players, tonneaux) {

      // console.log(tonneaux);
    // Object.keys(tonneaux).forEach((el) => {
      // console.log(el);
      // tonneau.getChildren().forEach(function(tonneau, i) {
      Object.values(tonneaux).forEach((tonneau, i) => {
        self.tonneaux.getChildren().forEach((item, i) => {
        item.x = tonneau.x
        item.y = tonneau.y
        });
        // ;
        // self.tonneaux.getChildren()[i].setAngle(tonneau.angle)
      });

        // console.log(tonneaux.x);
        // tonneau.setPosition(tonneau.x, tonneaux.y)
      // })
    // });

      Object.keys(players).forEach((id) => {
        self.players.getChildren().forEach(function(player) {
          if (players[id].playerId === player.playerId) {

            player.flipX = (players[id].flipX);
            player.setScale(players[id].scale);
            // player.setVelocity(players[id].velocityX, players[id].velocityY);
            player.setPosition(players[id].x, players[id].y);
            player.setRotation(players[id].rotation);
            player.setFlipX(players[id].flipX);
            player.setAlpha(players[id].alpha);
            player.ombre.x = players[id].ombreX;
            player.ombre.setAlpha(players[id].ombreAlpha);
            player.ombre.setScale(players[id].ombreScale);
            self.plots2.y = players[id].socleMouventY
            // if (players[id].anims) {
            // player.play(players[id].anims);
            // }
            if (players[id].frame != "") {
              player.setFrame(players[id].frame);
            }
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


    let interieurMaison1 = this.add.image(-135, 40, 'interieur-maison')
    let poteau1 = this.add.image(1210, 0, 'poteau')
    console.log("WIDth");
    // console.log(tonneaux.displayWidth);
    console.log("HEI");
    // console.log(tonneaux.displayHeight);

    //width 162.58
    //height 215.6

    this.canon1 = this.add.image(0, -460, 'canon').setDepth(4)

    // this.rect = this.add.rectangle(0, -460, 333, 125)
    //TOOOOOOOONNNEAU RECTANGLE
    // let tonneau = this.add.zone(-2000, 1700, 210, 210).setSize(162.58, 215.6)

    // var s = self.matter.add.gameObject(tonneau);
    // s.setIgnoreGravity(true).setStatic(true).setFriction(0)


    let canonSocle1 = this.add.image(0, -340, 'canon-socle').setDepth(3)
    let platforme1 = this.add.image(0, 290, 'platforme').setDepth(-2)
    let platformeZoneTonneaux = this.add.image(-2500, 1790, 'platforme').setDepth(-2)

    let facade1 = this.add.image(-135, 106, 'facade').setDepth(1).setAlpha(0.4)
    let toit1 = this.add.image(-135, -245, 'plafond').setDepth(2)
    let fontaine1 = this.add.image(-4870, -790, 'fontaine').setDepth(2)
    // this.fontainezone = this.add.zone(-1370, 137, 210, 210).setSize(640, 613)

    // var s = self.matter.add.gameObject(this.fontainezone);
    // s.setIgnoreGravity(true).setStatic(true).setFriction(0)


    let maison1 = this.add.group()
    maison1.addMultiple([interieurMaison1, facade1, toit1]);   // array of game objects

    let interieurMaison2 = this.add.image(7000, -1650, 'interieur-maison')
    let poteau2 = this.add.image(5675, -1676, 'poteau')
    let platforme2 = this.add.image(7000, -1400, 'platforme').setDepth(-2)
    let facade2 = this.add.image(7000, -1584, 'facade').setDepth(1).setAlpha(0.4)
    let toit2 = this.add.image(7000, -1935, 'plafond').setDepth(2)
    let fontaine2 = this.matter.add.image(8235, -1553, 'fontaine').setDepth(2).setCollisionGroup(2).setCollidesWith(0)

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


    let microPlatforme = self.add.zone(1916, 235, 210, 210).setSize(200, 40);
    var microPlatformeColore = this.add.rectangle(1916, 321, 210, 210, 0xd4af2b).setSize(200, 40);


    let platformeSocleGaucheImage = this.add.image(-4820, -490, 'platforme').setDepth(-2)
    platformeSocleGaucheImage.displayWidth = platformeSocleGaucheImage.displayWidth / 2

    let baseFontaine = self.add.zone(-4700, -490, 210, 210).setSize(1500, 40);

    // let plotFontaine1 = self.add.zone(-3300, -490, 210, 210).setSize(300, 40);
    let miniPlatformeFixGauche = this.add.rectangle(-3300, -490, 210, 210, 0xd4af2b).setSize(300, 40).setOrigin(0.5, 0.5)

    let soclePlatformeBas = self.add.zone(-2500, 1800, 210, 210).setSize(3500, 40);
    let plotFontaine2 = self.add.zone(-2500, -190, 210, 210).setSize(300, 40);
  // let socleToitGauche = self.add.zone(-120, -253, 210, 210).setSize(1631, 40);
    // let soclePlatformeDroit = self.add.zone(7000, -1363, 210, 210).setSize(3500, 40);
    // let socleToitDroit = self.add.zone(7000, -1943, 210, 210).setSize(1631, 40);



      var socleMicroPlatforme = self.matter.add.gameObject(microPlatforme).setIgnoreGravity(true).setStatic(true).setFriction(0);
      // socleJoueur
      var socleFontaineJoueur = self.matter.add.gameObject(baseFontaine).setIgnoreGravity(true).setStatic(true).setFriction(0);
      this.plots2 = this.add.rectangle(-2500, -190, 210, 210, 0xd4af2b).setSize(300, 40).setOrigin(0.5, 0.5)
      // var plots1 = self.matter.add.gameObject(plotFontaine1).setIgnoreGravity(true).setStatic(true).setFriction(0);
      // this.plots2 = self.matter.add.gameObject(plotFontaine2).setIgnoreGravity(true).setStatic(true).setFriction(0);
      var platformeBas = self.matter.add.gameObject(soclePlatformeBas).setIgnoreGravity(true).setStatic(true).setFriction(0);



      // this.tweens.add({
      //   targets: this.plots2,
      //   y: this.plots2.y + 2000,
      //   yoyo: true,
      //   repeat: -1,
      //   duration: 3000,
      //   ease: 'Sine.easeInOut'
      // });

      this.matter.add.mouseSpring();

      // socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0)
      // var socleJoueur2 = self.matter.add.gameObject(socleToitGauche);
      // socleJoueur2.setIgnoreGravity(true).setStatic(true).setFriction(0)

      // var socleJoueur3 = self.matter.add.gameObject(soclePlatformeDroit);
      // socleJoueur3.setIgnoreGravity(true).setStatic(true).setFriction(0)
      // var socleJoueur4 = self.matter.add.gameObject(socleToitDroit);
      // socleJoueur4.setIgnoreGravity(true).setStatic(true).setFriction(0)


    this.groupeBullets = this.add.group();
    this.bulletCanon = this.groupeBullets.create(this.canon1.x, this.canon1.y + 20, 'bullet').setScale(0.2).setDepth(100).setTintFill(0xff0000)




    this.add.image(3426, -500, 'tobogan', null, { isStatic: true }).setAngle(-26);
    this.bullet = this.add.image(1210, -400, 'bullet').setDepth(2);


    var fil = new Phaser.Geom.Line(1210, -400, 5675, -2373);

    var graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xaa00aa } });

    graphics.strokeLineShape(fil);


    /**
     * ---------Définis la valeur par défault des touches------
     * par default :false (touche non appuyé)
     * @type {Object} état de la touche (pressé ou non)
     */



    this.zKeyPressed = this.input.keyboard.addKey('Z');
    this.eKeyPressed = this.input.keyboard.addKey('E');
    this.ctrlKey = this.input.keyboard.addKey('CTRL');
    this.zoom1 = this.input.keyboard.addKey('ZERO');
    this.zoom2 = this.input.keyboard.addKey('NINE');
    this.zoom3 = this.input.keyboard.addKey('EIGHT');
    this.zoom4 = this.input.keyboard.addKey('SEVEN');
    this.zoom5 = this.input.keyboard.addKey('SIX');
    this.vKeyPressed = this.input.keyboard.addKey('V');
    this.xKeyPressed = this.input.keyboard.addKey('X');
    this.canonKeyPressed = this.input.keyboard.addKey('C');
    this.specialKeyPressed = this.input.keyboard.addKey('R');
    this.special2KeyPressed = this.input.keyboard.addKey('T');
    this.special3KeyPressed = this.input.keyboard.addKey('Y');
    this.aKeyPressed = this.input.keyboard.addKey('A');
    this.cKeyPressed = this.input.keyboard.addKey('CTRL');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;
    this.spaceKeyPressed = false;
    this.cKey = false;
    this.aKey = false;
    this.zKey = false;

    this.matter.add.mouseSpring();

    this.cameras.main.setZoom(0.5);

  },

  setVieEquipe: function(value, equipe) {
    const width = 500
    const percent = Phaser.Math.Clamp(value, 0, 100) / 100
    this.barreEquipe[equipe].clear()
    this.barreEquipe[equipe].fillStyle(0xd00b0b)
    this.barreEquipe[equipe].fillRoundedRect(1700, -330, width, 20, 5 ).setScrollFactor(0)
    if (percent > 0) {
      this.barreEquipe[equipe].fillStyle(0x0e88bd)
      this.barreEquipe[equipe].fillRoundedRect(1700, -330, width * percent, 20, 5)
    }
  },
  changementVieEquipe: function(value) {
    this.setVieEquipe(value, equipe)
    this.lastHealthEquipe[equipe] = value
  },

  changementVieEquipeA: function(value) {
     this.tweens.addCounter({
   from: this.lastHealthEquipeA,
   to: value,
   duration: 200,
   ease: Phaser.Math.Easing.Sine.InOut,
   onUpdate: tween => {
     const value = tween.getValue()
     this.setVieEquipeA(value)
   },
 })
 this.lastHealthEquipeA = value
 },
 changementVieEquipeB: function(value) {

this.tweens.addCounter({
  from: this.lastHealthEquipeB,
  to: value,
  duration: 200,
  ease: Phaser.Math.Easing.Sine.InOut,
  onUpdate: tween => {
    const value = tween.getValue()
    this.setVieEquipeB(value)
  },
})
this.lastHealthEquipeB = value
},
setVieEquipeA: function(value) {
  const width = 500
  const percent = Phaser.Math.Clamp(value, 0, 100) / 100
  this.barreEquipeA.clear()
  this.barreEquipeA.fillStyle(0xd00b0b)
  this.barreEquipeA.fillRoundedRect(1700, -330, width, 20, 5 ).setScrollFactor(0)
  if (percent > 0) {
    this.barreEquipeA.fillStyle(0x0e88bd)
    this.barreEquipeA.fillRoundedRect(1700, -330, width * percent, 20, 5)
  }
},
setVieEquipeB: function(value) {
  const width = 500
  const percent = Phaser.Math.Clamp(value, 0, 100) / 100
  this.barreEquipeB.clear()
  this.barreEquipeB.fillStyle(0xd00b0b)
  this.barreEquipeB.fillRoundedRect(-710, -330, width, 20, 5).setScrollFactor(0)
  if (percent > 0) {
    this.barreEquipeB.fillStyle(0x0ea733)
    this.barreEquipeB.fillRoundedRect(-710, -330, width * percent , 20, 5)
  }
},

  update: function () {


    /**
     * TIROLIENNE CONTROLE
     */
    if (Phaser.Input.Keyboard.JustDown(this.zKeyPressed)) {
      this.socket.emit('playerInput', {
        tirolienne: true,
      });
    }


    if (Phaser.Input.Keyboard.JustDown(this.eKeyPressed)) {
      this.socket.emit('playerInput', {
        interactionTonneau: true,
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
        ctrl: this.ctrlKey.isDown
      });
    }


    if (Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
      this.socket.emit('playerInput', {
        left: true,
        walk: false,
        ctrl: this.ctrlKey.isDown
      });
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.socket.emit('playerInput', {
        right: true,
        walk: true,
        ctrl: this.ctrlKey.isDown
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
      this.socket.emit('playerInput', {
        right: true,
        walk: false,
        ctrl: this.ctrlKey.isDown
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

    if (Phaser.Input.Keyboard.JustUp(this.specialKeyPressed)) {
      this.socket.emit('playerInput', {
        special: true
      });
    }


    if (Phaser.Input.Keyboard.JustUp(this.special2KeyPressed)) {
      this.socket.emit('playerInput', {
        special2: true
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.special3KeyPressed)) {
      this.socket.emit('playerInput', {
        special3: true
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.canonKeyPressed)) {
      this.socket.emit('playerInput', {
        canonMaintenu: false,
        canonRelache: true
      });
      // this.vies.shiftPosition(0, 0, 1);
      // this.vies.killAndHide()
    }

    if (Phaser.Input.Keyboard.JustDown(this.ctrlKey)) {
      this.socket.emit('playerInput', {
        canonMaintenu: false,
        canonRelache: true
      });
    }

    /**
     * ZOOM DE LA CAMERA
     */

    if (Phaser.Input.Keyboard.JustDown(this.zoom1)) {
      this.cameras.main.zoomTo(0.1, 1500)
    }

    if (Phaser.Input.Keyboard.JustDown(this.zoom2)) {
      this.cameras.main.zoomTo(0.2, 1500)
    }

    if (Phaser.Input.Keyboard.JustDown(this.zoom3)) {
      this.cameras.main.zoomTo(0.3, 2000)
    }

    if (Phaser.Input.Keyboard.JustDown(this.zoom4)) {
      this.cameras.main.zoomTo(0.4, 1000)
    }

    if (Phaser.Input.Keyboard.JustDown(this.zoom5)) {
      this.cameras.main.zoomTo(0.5, 1000)
    }

  },

  displayPlayers: function(self, playerInfo, iscurrent) {
    console.log("Ajout joueur function");
    const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, 'dessinatrice1', 'face1').setScale(0.38).setDepth(0.3).setAlpha(0);
    // self.add.image(playerInfo.x, playerInfo.y, "dessinatrice1_").setScale(0.38).setOrigin(0.5, 0.5)


    joueur.playerId = playerInfo.playerId;
    joueur.arene = playerInfo.arene;
    joueur.atlas = playerInfo.atlas;
    joueur.equipe = playerInfo.equipe;
    joueur.vieEquipe = playerInfo.vieEquipe;
    joueur.vie = playerInfo.vie;

    self.setVieEquipeA(playerInfo.vieEquipe["A"])
    self.setVieEquipeB(playerInfo.vieEquipe["B"])

    // joueur.socle = self.add.zone(playerInfo.x +700, playerInfo.y + 190, 210, 210).setSize(150, 40);
    // joueur.setFixedRotation()
joueur.setFrictionAir(0.05);
joueur.setMass(30);
joueur.body.collisionFilter.group = Phaser.Math.Between(1, 10)
joueur.body.collisionFilter.mask = 0


// joueur.setFrame("attack2")


let couleur = playerInfo.equipe == "A" ? 0x0ea733 : 0x0e88bd
let position = playerInfo.equipe == "A" ? {x: -79, y:327} : {x: 7300, y:-1363}

    joueur.ombre = self.add.ellipse(position.x, position.y - 30, 100, 20, couleur).setAlpha(0.8).setDepth(-1);

    // joueur.socle2 = self.add.zone(playerInfo.x, playerInfo.y + 190, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    // var socleJoueur = self.matter.add.gameObject(joueur.socle);
    // socleJoueur.setIgnoreGravity(true).setStatic(true).setFriction(0)

    self.players.add(joueur);
    if (iscurrent) {
    self.apparitionPortail(playerInfo.x, playerInfo.y)
      self.cameras.main.startFollow(joueur);

      self.vies = self.add.group()
      let c = -660;
      for (var i = 0; i < joueur.vie; i++) {
      self.vies.add(self.add.circle(c, -270, 15,0x008000).setDepth(200).setScrollFactor(0));
        c += 100;
      }

      // self.vies.addMultiple([c1, c2, c3, c4, c5]);   // array of game objects

    }
  },
  apparitionPortail: function(x, y) {
    const portail = this.add.image(x, y, 'portal').setDepth(0).setScale(0).setAngle(0);

    this.tweens.add({
      targets: portail,
      scale: 1,
      repeat: 0,
      yoyo: true,
      duration: 1200,
    })

    this.tweens.add({
      targets: portail,
      angle: 660,
      repeat: 0,
      duration: 2400,
    })

  }
});

export default Arene;
