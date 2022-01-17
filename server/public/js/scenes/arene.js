/**
 * @namespace Client
 * @property {module:client} client
 */

 /**
 * @module client
 */



import PanelViewer from './elements/panel-viewer.js'
import Animations from './elements/liste-animations.js'
import Maison from './elements/objets/maison.js'

var gfx
var player;
var spotlight;

const Arene = new Phaser.Class({

  Extends: Phaser.Scene,


  initialize:

    function Arene() {
      Phaser.Scene.call(this, {
        key: 'arene'
      });
    },

  /**
   * Recuperation des parametres choisi du joueur
   * @param  {Object} data parametre choisi par le joueur
   * @param {Object} data.personnage nom du personnage choisi et suppression du "_" pour eviter erreur de repetition de nom d'image
   * @param {Object} data.arene nom de l'arene choisi (Naruto...)
   * @param {Object} data.equipe nom de l'equipe choisi (A|B)
   */

  init: function(data) {
    this.personnage = data.personnage.slice(0, -1);
    this.arene = data.arene;
    this.equipe = data.equipe;
  },


  /**
   * Création des objets du jeu + connexion a socket.io
   */
   create: function() {


     // this.add.image(100, 60, 'logo');

     // const pic = this.add.image(400, 300, 'pic');

     // this.add.image(100, 260, 'logo');


     this.vieEquipeA = 100
     this.vieEquipeB = 100
     this.lastHealthEquipeA = 100;
     this.lastHealthEquipeB = 100;

     this.lastHealthEquipe = {
       "A": 100,
       "B": 100
     }
     this.vieEquipe = {
       "A": 100,
       "B": 100
     }
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
     this.clones = {}

     /**
     * {@link GroupeJoueur}
     */
     this.players = this.add.group();
     this.clones = this.add.group();
     this.tonneaux = this.add.group();

     this.tonneau1 = this.tonneaux.create(-1000, 1700, 'tonneau').setScale(0.22).setDepth(800)
     this.tonneau1.id = 1
     this.tonneau2 = this.tonneaux.create(-1200, 1700, 'tonneau').setScale(0.22).setDepth(800)
     this.tonneau2.id = 2
     this.tonneau3 = this.tonneaux.create(-1400, 1700, 'tonneau').setScale(0.22).setDepth(800)
     this.tonneau3.id = 3
     this.tonneau4 = this.tonneaux.create(-1600, 1700, 'tonneau').setScale(0.22).setDepth(800)
     this.tonneau4.id = 4

     this.cameras.main.fadeIn(1000);
     gfx = this.add.graphics();
     this.graph = this.add.graphics();

     var self = this;
     new Animations(this.anims)

     this.socket = io();
     this.matter.world.disableGravity();


     /**
     * Transmission de l'arene, du personnage et de l'equipe choisie par le joueur au serveur
     * @name Socket - nouveu joueur
     * @fires AjoutJoueurSeveur
     * @property {String} arene nom de l'arene choisi
     * @property {String} equipe nom de l'equipe choisi
     * @property {String} personnage atlas du personnage choisi
     * @example
     * this.socket.emit("nouveau_joueur", "Naruto", "B", "dessinatrice1");
     */
     this.socket.emit("nouveau_joueur", this.arene, this.equipe, this.personnage);


     /**
     * @name Affichage joueur
     * @description Affiche le joueur en parametre coté client
     * @property {Object} data objet contenant les parametres du joueur à afficher
     */

     this.socket.on("nouveau_joueur", (data) => {
       self.displayPlayers(self, data, false);
     });


     /**
     * @name Affichage joueurs
     * @description Affichage de touts les joueurs passé en parametres
     * @property {Object} arene objet contenant les parametres des joueur à afficher
     */
     this.socket.on("tout_les_joueurs", (arene) => {
       Object.keys(arene[self.arene]).forEach(function(id) {
         if (arene[self.arene][id].playerId === self.socket.id) {
           self.displayPlayers(self, arene[self.arene][id], true);
         } else {
           self.displayPlayers(self, arene[self.arene][id], false);
         }
       });
     });

     /**
     * @name Barre de vie equipe
     * @description Change la valeur de la barre de vie de l'equipe par la nouvelle valeur passé en parametre
     * @property {String} equipe nom de l'equipe
     * @property {Number} value nouvelle valeur la vie de l'equipe
     */
     this.socket.on("changement_vie_equipe", (equipe, value) => {
       if (equipe == "A") {
         // self.setVieEquipeA(value)
         self.changementVieEquipeA(value)
       } else {
         // self.setVieEquipeB(value)
         self.changementVieEquipeB(value)
       }
     });

     /**
     * @name Barre de vie joueur
     * @description Change la valeur de la barre de vie du joueur passé en parametre
     * @property {String} id id du joueur
     * @property {Number} vie nouvelle valeur la vie du joueur
     */
     this.socket.on("changement_vie", (id, vie) => {
       let moi = self.players.getMatching('playerId', self.socket.id)[0].playerId

       if (id == moi) {
         if (this.vies.getFirstAlive()) {
           this.vies.getFirstAlive().setAlpha(0.2).setActive(false)
         }
       }
     })

     /**
     * @name Ressusciter un joueur
     * @description Replace le joueur à son endroit de spawn et remet sa vie à son état initiale
     * @property {String} id id du joueur
     * @property {Number} vie nouvelle valeur la vie du joueur
     */

     this.socket.on("fin_de_vie", (id, vie) => {
       let moi = self.players.getMatching('playerId', self.socket.id)[0].playerId

       console.log(vie);
       if (id == moi) {
         this.cameras.main.shake(500);
         this.vies.getChildren().forEach((cercle, i) => {
           cercle.setActive(true).setAlpha(1)
         });
       }
     })


     /**
     * @name Evenement drapeau débloqué
     * @description Déplace la camera au niveau de la fontaine passé en parametre
     * @property {String} equipe fontaine de l'equipe qui à était detruit
     */

     this.socket.on("drapeau_debloque", (equipe) => {

       // this.cameras.main.on('camerapancomplete', camera);
       var moi = self.players.getMatching('playerId', self.socket.id)[0];
       if (equipe == "A") {
         this.cameras.main.pan(self.fontaine2.x, self.fontaine2.y, 2500);
       } else {
         this.cameras.main.pan(self.fontaine1.x, self.fontaine1.y, 2500);
       }

       // function camera() {
       //   var moi = self.players.getMatching('playerId', self.socket.id)[0];
       //   self.cameras.main.pan(moi.x, moi.y, 3500);
       //   // self.cameras.main.on('camerapancomplete', () => {
       //   //   self.cameras.main.startFollow(moi);
       //   // });
       // }
     });

     /**
      * Déconnexion du joueur de socket io et redirection sur la page de victoire|défaite
      * @name finDePartie
      * @description Déplace la camera au niveau de la fontaine passé en parametre
      * @property {String} equipe equipe qui à gagné
      */
     this.socket.on("fin_de_partie", (equipe) => {

       let moi = self.players.getMatching('playerId', self.socket.id)[0].equipe
       self.players.remove(true);

       self.socket.disconnect()

       if (equipe == "B") {
         this.cameras.main.pan(self.fontaine2.x, self.fontaine2.y, 2500);
         this.cameras.main.on('camerapancomplete', () => {
           self.cameras.main.startFollow(self.fontaine2);

           // TODO: OPTIMIZER pour eviter de repeter
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

       } else {
         this.cameras.main.pan(self.fontaine1.x, self.fontaine1.y, 2500);
         this.cameras.main.on('camerapancomplete', () => {
           self.cameras.main.startFollow(self.fontaine1);


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
     * @return {Object} joueur a supprimer
     */

     this.socket.on('disconnection', function(playerId) {
       self.players.getChildren().forEach(function(player) {
         if (playerId === player.playerId) player.destroy();
       });
     });

     /**
      * Mise à jour des joueurs, drapeaux, tonneaux
      * @event MiseAjourJoueurs
      * @param  {Object} players  objet contenant les parametres des joueurs à mettre à jour
      * @param  {Object} tonneaux objet contenant les parametres des tonneaux à mettre à jour
      * @param  {Object} drapeaux objet contenant les parametres des drapeaux à mettre à jour
      */

     this.socket.on('playerUpdates', function(players, tonneaux, drapeaux) {



       Object.keys(drapeaux).forEach((id) => {
         self.drapeaux.getChildren().forEach((drapeau) => {
           if (drapeaux[id].id === drapeau.id) {
             drapeau.setPosition(drapeaux[id].x, drapeaux[id].y)
           }
         });
       })


       Object.keys(tonneaux).forEach((id) => {
         self.tonneaux.getChildren().forEach((tonneau) => {
           if (tonneaux[id].id === tonneau.id) {
             tonneau.setPosition(tonneaux[id].x, tonneaux[id].y)
             tonneau.setAlpha(tonneaux[id].alpha)
           }
         });
       })

       Object.keys(players).forEach((id) => {
         self.players.getChildren().forEach(function(player) {
           if (players[id].playerId === player.playerId) {

             spotlight.x = players[id].x;
             spotlight.y = players[id].y;

             player.flipX = (players[id].flipX);
             player.setScale(players[id].scale);
             player.setTint(players[id].tint);
             player.setDepth(players[id].depth);
             // player.zoneAttaque.setPosition(players[id].zoneAX, players[id].zoneAY)
             player.setPosition(players[id].x, players[id].y);
             player.setRotation(players[id].rotation);
             player.setFlipX(players[id].flipX);
             player.setAlpha(players[id].alpha);
             player.ombre.x = players[id].ombreX;
             player.ombre.setAlpha(players[id].ombreAlpha);
             player.ombre.setScale(players[id].ombreScale);

             player.cercleChargeExterieur.setAlpha(players[id].chargeEnCours)
             player.cercleChargeExterieur.setPosition(players[id].cercleChargeX, players[id].cercleChargeY)
             player.cercleChargeInterieur.setPosition(players[id].cercleChargeX, players[id].cercleChargeY)
             player.cercleChargeInterieur.setScale(players[id].cercleChargeScale)

             if (players[id].frame != "") {
               player.setFrame(players[id].frame);
             }
             self.bullet.setPosition(players[id].bulletX, players[id].bulletY)

             player.socle.x = players[id].socleX;
             player.socle.y = players[id].socleY;

             if (self.bulletCanon) {
               self.bulletCanon.x = players[id].bulletCanonX
               self.bulletCanon.y = players[id].bulletCanonY
               self.bulletCanon.setScale(players[id].bulletCanonScale)
             }
             // self.canon1.setAngle(players[id].canonAngle)
           }
         });
       });
     });


     const chambre = this.add.image(-300, 0, 'chambre').setDepth(-0.05);

     spotlight = this.make.sprite({
         x: 1200,
         y: 1200,
         scale: 4,
         key: 'mask',
         add: false
     });

     chambre.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

     var graphics = this.add.graphics({ fillStyle:{ color: 0xaa0000 } });
var rect = new Phaser.Geom.Rectangle(chambre.x - chambre.width/2, chambre.y - chambre.height/2, chambre.width, chambre.height);

graphics.fillRectShape(rect);

this.input.on('pointermove', function (pointer) {

    graphics.clear();

    if(rect.contains(pointer.x, pointer.y))
    {
        graphics.fillStyle(0x0000aa);
    }
    else
    {
        graphics.fillStyle(0xaa0000);
    }

    graphics.fillRectShape(rect);

});
     // this.input.on('pointermove', function (pointer) {
     //
     //     spotlight.x = pointer.x;
     //     spotlight.y = pointer.y;
     //
     // });




     // this.canon1 = this.add.image(0, -460, 'canon').setDepth(4)

     // let canonSocle1 = this.add.image(0, -340, 'canon-socle').setDepth(3)
     let platforme1 = this.add.image(0, 290, 'platforme').setDepth(-2)

     var g1 = this.add.graphics();

     // var rect = new Phaser.Geom.Rectangle(this.facade1.x - this.facade1.displayWidth / 2, 300, 200);

     // g1.fillRectShape(this.maison1Zone);
     // g1.setDepth(200)
     this.fontaine1 = this.add.image(-4870, -790, 'fontaine').setDepth(0.1)
     this.fontaine1Derriere = this.add.image(-4870, -790, 'fontaineDerriere').setDepth(0)

     this.drapeaux = this.add.group()
     let matDrapeauBleu = this.add.image(-4868.428561331542, -775.2723001427164, 'drapeauBleu').setDepth(0.01).setOrigin(0, 1)
     matDrapeauBleu.id = 1;
     let matDrapeauVert = this.add.image(8242.130999766403, -1566.8232688524165, 'drapeauVert').setDepth(0.01).setOrigin(0, 1)
     matDrapeauVert.id = 2;
     this.drapeaux.addMultiple([matDrapeauBleu, matDrapeauVert]);



     this.matter.add.mouseSpring();

     this.groupeBullets = this.add.group();
     this.bulletCanon = this.groupeBullets.create(0, 0, 'bullet').setScale(0.2).setDepth(100).setTintFill(0xff0000)

     this.bullet = this.add.image(1210, -400, 'bullet').setDepth(2);

     var fil = new Phaser.Geom.Line(1210, -400, 5675, -2373);

     var graphics = this.add.graphics({
       lineStyle: {
         width: 10,
         color: 0xaa00aa
       }
     });

     graphics.strokeLineShape(fil);


     /**
     * ---------Définis la valeur par défault des touches------
     * par default :false (touche non appuyé)
     * @type {Object}
     */


     this.escape = this.input.keyboard.addKey('ESC');

     //TIROLIENNE + interactionTonneau
     this.tirolienneKeyPressed = this.input.keyboard.addKey('T');
     this.eKeyPressed = this.input.keyboard.addKey('E');

     this.toucheProtection = this.input.keyboard.addKey('ALT');

     //Se redresser
     this.toucheF = this.input.keyboard.addKey('F');
     //DROITE-GAUCHE
     this.toucheGauche = this.input.keyboard.addKey('Q');
     this.toucheDroite = this.input.keyboard.addKey('D');
     this.toucheHaut = this.input.keyboard.addKey('Z');
     this.toucheBas = this.input.keyboard.addKey('S');
     this.zoom1 = this.input.keyboard.addKey('ZERO');
     this.zoom2 = this.input.keyboard.addKey('NINE');
     this.zoom3 = this.input.keyboard.addKey('EIGHT');
     this.zoom4 = this.input.keyboard.addKey('SEVEN');
     this.zoom5 = this.input.keyboard.addKey('FIVE');
     this.zoom6 = this.input.keyboard.addKey('FOUR');
     this.zoom7 = this.input.keyboard.addKey('THREE');
     this.zoom8 = this.input.keyboard.addKey('TWO');
     this.zoom9 = this.input.keyboard.addKey('ONE');
     this.vKeyPressed = this.input.keyboard.addKey('V');
     this.xKeyPressed = this.input.keyboard.addKey('X');
     this.canonKeyPressed = this.input.keyboard.addKey('C');
     this.specialKeyPressed = this.input.keyboard.addKey('R');
     this.special2KeyPressed = this.input.keyboard.addKey('Z');
     this.aKeyPressed = this.input.keyboard.addKey('A');
     this.cursors = this.input.keyboard.createCursorKeys();
     this.leftKeyPressed = false;
     this.rightKeyPressed = false;
     this.upKeyPressed = false;
     this.downKeyPressed = false;
     this.spaceKeyPressed = false;
     this.charge = false;
     this.saut = false;
     this.cKey = false;
     this.aKey = false;
     this.zKey = false;

     this.matter.add.mouseSpring();

     this.cameras.main.setZoom(0.5);


   },


  /**
   * Observe les touches pressé par le joueur
   * Envoie un objet contenant la touche pressé au serveur
   * Zoom et dézoom le caméra
   * @fires EvenementTouches
   */
  update: function() {


    const left = this.leftKeyPressed,
    space = this.spaceKeyPressed,
    chargeSaut = this.charge,
    saut = this.saut,
    up = this.upKeyPressed,
    down = this.downKeyPressed,
    right = this.rightKeyPressed;

    this.cursors.space.isDown ? this.spaceKeyPressed = true : this.spaceKeyPressed = false

    this.toucheHaut.isDown ? this.upKeyPressed = true :
  this.toucheBas.isDown ? this.downKeyPressed = true :
  (this.upKeyPressed = false, this.downKeyPressed = false)


    this.toucheGauche.isDown ? this.leftKeyPressed = true :
  this.toucheDroite.isDown ? this.rightKeyPressed = true :
  (this.leftKeyPressed = false, this.rightKeyPressed = false)


  if (Phaser.Input.Keyboard.JustDown(this.toucheHaut)) {
    this.socket.emit('playerInput', {
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      space: this.spaceKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed
    });
  }

  if (Phaser.Input.Keyboard.JustUp(this.toucheHaut)) {
    this.socket.emit('playerInput', {
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      space: this.spaceKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed
    });
  }


  if (Phaser.Input.Keyboard.JustDown(this.toucheBas)) {
    this.socket.emit('playerInput', {
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      space: this.spaceKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed
    });
  }

  if (Phaser.Input.Keyboard.JustUp(this.toucheBas)) {
    this.socket.emit('playerInput', {
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      space: this.spaceKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed
    });
  }


  if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
    this.socket.emit('playerInput', {
      saut: true,
      chargeSaut: true,
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      space: this.spaceKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed
    });
  }

  if (Phaser.Input.Keyboard.JustUp(this.cursors.space)) {
    this.socket.emit('playerInput', {
      saut: true,
      chargeSaut: false,
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      space: this.spaceKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed
    });
  }

    /**
     * TIROLIENNE CONTROLE
     */
    if (Phaser.Input.Keyboard.JustDown(this.tirolienneKeyPressed)) {
      this.socket.emit('playerInput', {
        tirolienne: true,
      });
    }

    if (Phaser.Input.Keyboard.JustDown(this.escape)) {
      this.socket.emit('playerInput', {
        escape: true,
      });
    }


    if (Phaser.Input.Keyboard.JustDown(this.eKeyPressed)) {
      this.socket.emit('playerInput', {
        interactionTonneau: true,
        lancer: false
      });
    }

    // if (Phaser.Input.Keyboard.JustUp(this.eKeyPressed)) {
    //   this.socket.emit('playerInput', {
    //     interactionTonneau: true,
    //     lancer: true
    //   });
    // }


    /**
     * SAUT
     */
    //

    /**
     * SE PROTEGER
     *
     */
     if (Phaser.Input.Keyboard.JustDown(this.toucheProtection)) {
       this.socket.emit('playerInput', {
         protection: true
       });
     }


    /**
     * SE REDRESSER
     */
     if (Phaser.Input.Keyboard.JustDown(this.toucheF)) {
       this.socket.emit('playerInput', {
         redresser: true
       });
     }

    /**
     * GAUCHE
     */

    if (Phaser.Input.Keyboard.JustDown(this.toucheGauche)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        space: this.spaceKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed
      });
    }


    if (Phaser.Input.Keyboard.JustUp(this.toucheGauche)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        space: this.spaceKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed
      });
    }

    /**
     * DROITE
     */
    if (Phaser.Input.Keyboard.JustDown(this.toucheDroite)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        space: this.spaceKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.toucheDroite)) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        space: this.spaceKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed
      });
    }


    /**
     * MARCHE VERS LE FOND ET L'AVANT
     */
    // if (Phaser.Input.Keyboard.JustDown(this.toucheHaut)) {
    //   this.socket.emit('playerInput', {
    //     up: true,
    //   });
    // }
    //
    // if (Phaser.Input.Keyboard.JustUp(this.toucheHaut)) {
    //   this.socket.emit('playerInput', {
    //     up: false,
    //   });
    // }
    //
    //
    // if (Phaser.Input.Keyboard.JustDown(this.toucheBas)) {
    //   this.socket.emit('playerInput', {
    //     down: true,
    //   });
    // }
    //
    //
    // if (Phaser.Input.Keyboard.JustUp(this.toucheBas)) {
    //   this.socket.emit('playerInput', {
    //     down: false,
    //   });
    // }

    if (Phaser.Input.Keyboard.JustDown(this.aKeyPressed)) {
      // this.players.getChildren()[0].flipX ?
      // (this.players.getChildren()[0].zoneAttaque.x = this.players.getChildren()[0].getLeftCenter().x - 70, this.players.getChildren()[0].zoneAttaque.y = this.players.getChildren()[0].getLeftCenter().y)
      // : (this.players.getChildren()[0].zoneAttaque.x = this.players.getChildren()[0].getRightCenter().x + 70, this.players.getChildren()[0].zoneAttaque.y = this.players.getChildren()[0].getRightCenter().y)
      // joueur.zoneAttaque.x = joueur.getRightCenter().x
      // joueur.zoneAttaque.y = joueur.getRightCenter().y

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
     */
    // if (Phaser.Input.Keyboard.JustDown(this.canonKeyPressed)) {
    //   this.socket.emit('playerInput', {
    //     canonMaintenu: true,
    //     canonRelache: false
    //   });
    // }

    // if (Phaser.Input.Keyboard.JustUp(this.specialKeyPressed)) {
    //   this.socket.emit('playerInput', {
    //     special: true,
    //     specialRelache: false,
    //   });
    // }
    //
    // if (Phaser.Input.Keyboard.JustDown(this.specialKeyPressed)) {
    //   this.socket.emit('playerInput', {
    //     special: true,
    //     specialRelache: true,
    //   });
    // }


    // if (Phaser.Input.Keyboard.JustUp(this.special2KeyPressed)) {
    //   this.socket.emit('playerInput', {
    //     special2: true
    //   });
    // }

    // if (Phaser.Input.Keyboard.JustUp(this.canonKeyPressed)) {
    //   this.socket.emit('playerInput', {
    //     canonMaintenu: false,
    //     canonRelache: true
    //   });
    // }

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

    if (Phaser.Input.Keyboard.JustDown(this.zoom6)) {
      this.cameras.main.zoomTo(0.6, 1000)
    }

    if (Phaser.Input.Keyboard.JustDown(this.zoom7)) {
      this.cameras.main.zoomTo(0.7, 1000)
    }

    if (Phaser.Input.Keyboard.JustDown(this.zoom8)) {
      this.cameras.main.zoomTo(0.8, 1000)
    }
    if (Phaser.Input.Keyboard.JustDown(this.zoom9)) {
      this.cameras.main.zoomTo(0.9, 1000)
    }



  },

  /**
   * Affiche et ajoute un joueur au groupe
   * @param  {Object} self référence à la scene Phaser
   * @param  {Object} playerInfo parametres reçu du serveur
   * @param  {Boolean} iscurrent  Verifie si le joueur correspond fait referance au joueur courant
   * @example
   * displayPlayers(...scene, {
    "vie": 4,
    "displayWidth": 149,
    "displayHeight": 140,
    "masse": 10,
    "puissanceDeBase": 12,
    "attaqueFrame": "positiona1",
    "protege": false,
    "direction": "gauche",
    "atlas": "ninja",
    "arene": "Naruto",
    "equipe": "A",
    "mask": 1,
    "wall": false,
    "attaque": false,
    "puissanceBonus": 0,
    "alpha": 1,
    "etatAttaque": {
        "attacked": false,
        "repousser": false,
        "direction": null
    },
    "degat": 0,
    "depth": 30,
    "anim": "profil",
    "size": 200,
    "vieEquipe": {
        "A": 100,
        "B": 100
    },
    "x": -379,
    "y": 137,
    "playerId": "ErVKiiwjJJpLAdhoAAAA",
    "input": {
        "left": false,
        "right": false,
        "up": false,
        "down": false,
        "a": false,
        "z": false
    }
}, true)
   */

  displayPlayers: function(self, playerInfo, iscurrent) {
    console.log("Ajout joueur function");
    console.log(playerInfo);

    const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face0').setAlpha(1).setDisplaySize(playerInfo.displayWidth, playerInfo.displayHeight).setDepth(0.1);
    joueur.playerId = playerInfo.playerId;
    joueur.arene = playerInfo.arene;
    joueur.atlas = playerInfo.atlas;
    joueur.equipe = playerInfo.equipe;
    joueur.vieEquipe = playerInfo.vieEquipe;
    joueur.vie = playerInfo.vie;

    joueur.cercleChargeInterieur = this.add.circle(400, 300, 20, 0xeed510);
    joueur.cercleChargeExterieur = self.add.circle(400, 300, 20, 0x15a815);

    joueur.cercleChargeInterieur.setDepth(201);
    joueur.cercleChargeExterieur.setDepth(200).setAlpha(0);

    joueur.chargeEnCours = playerInfo.chargeEnCours,


    self.setVieEquipeA(playerInfo.vieEquipe["A"])
    self.setVieEquipeB(playerInfo.vieEquipe["B"])

    joueur.setFrictionAir(0.05);
    joueur.setMass(30);
    // joueur.zoneAttaque = self.add.rectangle(0, 0 ,joueur.displayWidth/2, joueur.displayHeight, 0x0e88bd, 0.5).setDepth(400);
    joueur.body.collisionFilter.group = Phaser.Math.Between(1, 100)
    joueur.body.collisionFilter.mask = 0

    joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -55, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    var socle = self.matter.add.gameObject(joueur.socle);
    socle.setIgnoreGravity(true).setStatic(true)


    // joueur.socle = self.add.rectangle(0, 0 ,joueur.displayWidth/2, joueur.displayHeight, 0x0e88bd, 0.5).setDepth(400);
    let couleur = playerInfo.equipe == "A" ? 0x0ea733 : 0x0e88bd
    let position = playerInfo.equipe == "A" ? {
      x: -79,
      y: 327
    } : {
      x: 7300,
      y: -1363
    }

    joueur.ombre = self.add.ellipse(position.x, position.y - 30, 100, 20, couleur).setAlpha(0.8).setDepth(-1);
    self.players.add(joueur);
    if (iscurrent) {
      self.cameras.main.startFollow(joueur);

      self.vies = self.add.group()
      let c = -660;
      for (var i = 0; i < joueur.vie; i++) {
        self.vies.add(self.add.circle(c, -270, 15, 0x008000).setDepth(200).setScrollFactor(0));
        c += 100;
      }
    }
  },
  setChargeInfo: function(value) {
   const width = 500
   const percent = Phaser.Math.Clamp(value, 0, 100) / 100
   this.barreEquipeA.clear()
   this.barreEquipeA.fillStyle(0xd00b0b)
   this.barreEquipeA.fillRoundedRect(1700, -330, width, 20, 5).setScrollFactor(0)
   if (percent > 0) {
     this.barreEquipeA.fillStyle(0x0e88bd)
     this.barreEquipeA.fillRoundedRect(1700, -330, width * percent, 20, 5)
   }
 },

  /**
   * Change la barre de vie de l'equipe A avec une animation
   * @param  {Number} value valeur final de la vie (après l'attaque)
   */

  // TODO: faire une fonction qui change la vie au lieu de 2
 changementVieEquipeA: function(value) {
   this.tweens.addCounter({
     from: this.lastHealthEquipeA,
     to: value,
     duration: 200,
     ease: Phaser.Math.Easing.Sine.InOut,
     onUpdate: tween => {
       const value = tween.getValue()
       this.setVieEquipeA(value)
       this.fontaine2.setAlpha(value/100)
       this.fontaine2Derriere.setAlpha(value/100 + 0.04)
     },
   })
   this.lastHealthEquipeA = value
 },

 /**
* Change la barre de vie de l'equipe B avec une animation
* @param  {Number} value valeur final de la vie (après l'attaque)
*/
 changementVieEquipeB: function(value) {

   this.tweens.addCounter({
     from: this.lastHealthEquipeB,
     to: value,
     duration: 200,
     ease: Phaser.Math.Easing.Sine.InOut,
     onUpdate: tween => {
       const value = tween.getValue()
       this.setVieEquipeB(value)
       this.fontaine1.setAlpha(value/100)
       this.fontaine1Derriere.setAlpha(value/100 + 0.04)
     },
   })
   this.lastHealthEquipeB = value
 },

 /**
  * Affiche et change la barre de vie de l'equipe A
  * @param  {Number} value valeur final de la vie
  */
 setVieEquipeA: function(value) {
   const width = 500
   const percent = Phaser.Math.Clamp(value, 0, 100) / 100
   this.barreEquipeA.clear()
   this.barreEquipeA.fillStyle(0xd00b0b)
   this.barreEquipeA.fillRoundedRect(1700, -330, width, 20, 5).setScrollFactor(0)
   if (percent > 0) {
     this.barreEquipeA.fillStyle(0x0e88bd)
     this.barreEquipeA.fillRoundedRect(1700, -330, width * percent, 20, 5)
   }
 },
 /**
 * Affiche et change la barre de vie de l'equipe B
 * @param  {Number} value valeur final de la vie
 */
 setVieEquipeB: function(value) {
   const width = 500
   const percent = Phaser.Math.Clamp(value, 0, 100) / 100
   this.barreEquipeB.clear()
   this.barreEquipeB.fillStyle(0xd00b0b)
   this.barreEquipeB.fillRoundedRect(-710, -330, width, 20, 5).setScrollFactor(0)
   if (percent > 0) {
     this.barreEquipeB.fillStyle(0x0ea733)
     this.barreEquipeB.fillRoundedRect(-710, -330, width * percent, 20, 5)
   }
 }
});

export default Arene;
