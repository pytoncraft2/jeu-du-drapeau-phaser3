import PanelViewer from './elements/panel-viewer.js'
import Animations from './elements/liste-animations.js'
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
var  zone
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
      this.matter.world.disableGravity();
      this.players = {}
      // this.players['Naruto'] = this.add.group();
      this.players = this.add.group();


    this.cameras.main.fadeIn(1000);
    gfx = this.add.graphics();

    var panelViewer = this.scene.get('panelViewer');

    var self = this;
    // console.log(self.scene.scene.physics.scene);

    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    // this.physics.world.setBounds(-2074, 0, 3574, 666);
    this.cameras.main.fadeIn(4000);

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
    this.position = {x: 1000, y: 447}

        this.socket.emit("nouveau_joueur", this.arene, this.equipe);

        this.socket.on("nouveau_joueur", (data) => {
          console.log("NOUVEAU JOUEUR DATA");
          console.log(data);
          self.displayPlayers(self, data, true);
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


    // this.add.image(-300, 350, 'bg').setDepth(-54);
    let interieurMaison = this.add.image(-300, 350, 'interieur-maison')
    let platforme = this.add.image(0, 0, 'platforme').setDepth(-2)
    let maison = this.add.group()
    maison.addMultiple([interieurMaison, platforme]);   // array of game objects

    this.bullet = this.matter.add.image(420, 100, 'bullet', null, { ignoreGravity: true });

    /**
     * AFFICHAGE JOUEURS
     * Affiche le joueur principal si l'id correspond a mon id
     * sinon Affiche les autres personnes
     * @param  {Object} players liste de l'id du socket de tout les joueurs
     * @return {void}
     */
    this.socket.on('currentPlayers', function(players) {
      Object.keys(players).forEach(function(id) {
        if (players[id].playerId === self.socket.id) {
          self.displayPlayers(self, players[id], true);
        } else {
          self.displayPlayers(self, players[id], false);
        }
      });
    });

    /**
     * NOUVEAU JOUEUR
     * Affiche les nouveau joueur
     * @param  {Object} playerInfo liste des parametres(coordonnés,scale,depth...)
     * @return {void}
     */

    this.socket.on('newPlayer', function(playerInfo) {
      console.log("OUIIIII");
      self.displayPlayers(self, playerInfo);
    });

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
            player.setScale(players[id].scale);
            player.setPosition(players[id].x, players[id].y);
            player.setDepth(players[id].depth);
            player.setAlpha(players[id].alpha);
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

    this.matter.add.mouseSpring();


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


    if (left !== this.leftKeyPressed ||
      right !== this.rightKeyPressed ||
      up !== this.upKeyPressed ||
      down !== this.downKeyPressed ||
      ak !== this.aKey ||
      tk !== this.tKey ||
      ck !== this.cKey ||
      space !== this.spaceKeyPressed) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed,
        a: this.aKey,
        t: this.tKey,
        space: this.spaceKeyPressed,
        c: this.cKey,
      });
    }
  },

  displayPlayers: function(self, playerInfo, iscurrent) {
    // plane = this.matter.add.sprite(300, 360, "plane", "plane1.png", { shape: spritePhysics.plane });
    console.log("Ajout joueur function");
    const player = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setOrigin(0.5, 0.5).setScale(0.38);
    // this.matter.add.joint(this.bullet, self.player,  35, 0.4)
    // self.matter.add.constraint(this.bullet ,self.player, 500, 0);

    player.playerId = playerInfo.playerId;
    player.arene = playerInfo.arene;
    player.setFrictionAir(0.1);
    player.setMass(10);
    self.players.add(player);
    self.cameras.main.setZoom(0.5);


    if (iscurrent) {
      self.cameras.main.startFollow(player);
      // self.player.setCollideWorldBounds(true);
      // self.matter.add.image(400, 550, 'platform', null, { isStatic: true });

      // self.matter.add.overlap(self.player, self.doors, function(player, doors) {
        // player.y < 399 ? doors.alpha = 0.5 : doors.alpha = 1
      // });
    }
  },
  ajoutJoueur: function (id, x, y, direction) {



  }
});

export default Arene;
