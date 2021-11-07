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


      var path2 = new Phaser.Curves.Path(100, 200).lineTo(500, 300);
      var graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff, 1);

      path2.draw(graphics, 128);



      this.players = {}





      this.players = this.add.group();


    this.cameras.main.fadeIn(1000);
    gfx = this.add.graphics();

    var self = this;
    // console.log(self.scene.scene.physics.scene);

    // this.cameras.main.setBounds(-2074, 0, 3574, 666);
    // this.physics.world.setBounds(-2074, 0, 3574, 666);
    // this.cameras.main.fadeIn(1000);

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


          //1140
          //118

    let interieurMaison1 = this.add.image(-135, 40, 'interieur-maison')
    let poteau1 = this.add.image(1210, 0, 'poteau')
    this.canon1 = this.add.image(0, -460, 'canon').setDepth(4)
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
    let i = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    this.groupeBullets = this.add.group();


    var line = new Phaser.Geom.Line();
var angle = 0;

this.input.keyboard.on('keydown-I', function (event) {

    console.log('Hello from the A Key!');
    // angle = Phaser.Math.Angle.BetweenPoints(this.canon1, pointer);
    // this.canon1.setRotation(angle+Math.PI/2);
    self.canon1.angle += 3
    // self.canon1.setRotation(45);
    // Phaser.Geom.Line.SetToAngle(line,this.canon1.x, this.canon1.y - 50, angle, 128);
    // gfx.clear().strokeLineShape(line);

});

this.input.keyboard.on('keydown-O', function (event) {

    console.log('Hello from the A Key!');
    // angle = Phaser.Math.Angle.BetweenPoints(this.canon1, pointer);
    // this.canon1.setRotation(angle+Math.PI/2);
    self.canon1.angle -= 3
    // self.canon1.setRotation(45);
    // Phaser.Geom.Line.SetToAngle(line,this.canon1.x, this.canon1.y - 50, angle, 128);
    // gfx.clear().strokeLineShape(line);

});

// fireball.setPosition(player.x, player.y).setScale(0.5).setAlpha(1);

// curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(player.x, player.y), new Phaser.Math.Vector2(x, y));

// fireball.setPath(curve);
// fireball.startFollow(300);

// fireFX.restart();
// this.input.on('pointermove', function (pointer) {
// }, this);

// this.input.on('pointerup', function () {
// chick.enableBody(true, cannon.x, cannon.y - 50, true, true);
// chick.play('fly');
// this.physics.velocityFromRotation(angle, 600, chick.body.velocity);
// }, this);


      var ellipse1 = this.add.ellipse(poteau1.x, poteau1.y + poteau1.displayHeight /2, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);
      var ellipse2 = this.add.ellipse(poteau2.x, poteau2.y + poteau2.displayHeight /2, 100, 20, 0x0009).setDepth(-1).setAlpha(0.6).setScale(2);

      this.tweens.add({

        targets: [ellipse1, ellipse2],
        alpha: 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'

      });

    // console.log("POTEAU");
    // console.log(poteau2.x);
    // console.log(poteau2.y);
    // let tobogan = this.add.image(1000, -2650, 'tobogan')
    this.add.image(3426, -500, 'tobogan', null, { isStatic: true }).setAngle(-26);
    // this.matter.add.image(-250, 360, 'tobogan', null, { isStatic: true });
    // this.matter.add.image(7300, -1400, 'tobogan', null, { isStatic: true });
    this.bullet = this.add.image(1210, -400, 'bullet');
    // let a = this.add.zone(3500, -509, 210, 210).setSize(3246, 40)
    // var socleJoueur = self.matter.add.gameObject(a).setStatic(true).setIgnoreGravity(true).setAngle(-26);



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
            // player.setDepth(players[id].depth);
            // player.setAlpha(players[id].alpha);
            player.setAngle(players[id].angle);
            // player.setFrictionAir(players[id].frictionair);
            // player.setFriction(players[id].friction, 1);
            player.setFrictionStatic(players[id].frictionstatic);
            player.setIgnoreGravity(players[id].ignoreGravity);
            player.setMass(players[id].mass);
            player.ombre.x = players[id].ombreX
            player.ombre.y = players[id].ombreY
            self.bullet.x = players[id].bulletX
            self.bullet.y = players[id].bulletY
            // player.ombre.x = players[id].ombreX
            // player.ombre.y = players[id].ombreY


            // player.socle.x = players[id].ombreX
            // player.socle.y = players[id].socleY

            // player.ombre
            // console.log(player.ombre);
            // console.log(player.socle);
            // console.log(players[id].ombreX);
            // player.setMass(players[id].mass);
            // player.body.density = players[id].density;
            // player.body.speed = players[id].speed;
            // player.body.bounds.min.x = player.boundsMIX;
            // player.body.bounds.min.x = player.boundsMIX
            // player.body.bounds.min.y = player.boundsMIY
            // player.body.bounds.max.x = player.boundsMAX
            // player.body.bounds.max.y =  player.boundsMAY


            // console.log(player.socle.body.x);
            // player.socle.setPosition(players[id].socle);
            // console.log(players[id].friction);
            // player.setPosition(players[id].x, players[id].y);
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

    this.cameras.main.setZoom(0.1);
    this.input.keyboard.on('keydown', function (event) {

    if (event.key == "-") {
      self.cameras.main.zoomTo(self.cameras.main.zoom - 0.2, 1000)
    } else if (event.key == "+"){
      self.cameras.main.zoomTo(self.cameras.main.zoom + 0.2, 1000)
    } else if (event.key == "Enter") {
      self.cameras.main.zoomTo(0.5, 2000)
    } else if (event.key == "End") {
      self.cameras.main.zoomTo(0.1, 1500)
    }
    console.log(event.key);

});
    // this.input.on('pointerdown', function () {
    //   const cam = this.cameras.main;
    //
    //   let zoom =
    //   cam.zoom == 0.1 ?  1
    //   : cam.zoom == 1 ? 0.5
    //   :  cam.zoom == 0.5 ? 0.1
    //   : 1
    //   cam.zoomTo(zoom, 3000);
    // });

    this.input.on('pointerdown', function (pointer)
{
  this.generate(pointer.x, pointer.y);
}, this);
  },
  generate: function(x, y)
{
    // this.bulletCanon.setPosition(player.x, player.y).setScale(0.5).setAlpha(1);

    let curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(this.canon1.x, this.canon1.y), new Phaser.Math.Vector2(x, y));

    this.fireball.setPath(curve);
    this.fireball.startFollow(300);

    this.fireFX.restart();
},
 draw: function()
{
    this.rt.draw(this.fireball);
},

  update: function () {

    // const cam = this.cameras.main;


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

    // console.log(Phaser.Input.Keyboard.JustDown(this.zKeyPressed));
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

      // this.bulletCanon = this.groupeBullets.create(this.canon1.x + 180, this.canon1.y + 20, 'bullet').setScale(0.2).setDepth(100).setScale(2.5);
      // this.rt = this.make.renderTexture({ x: 0, y: 0, width: 800, height: 600 });

      this.fireball = this.add.follower(null, this.canon1.x + 180, this.canon1.y + 20, 'bullet').setScale(3);

      this.fireFX = this.tweens.add({
        targets: this.fireball,
        scale: 8,
        // alpha: 0,
        duration: 300,
        ease: "Cubic.easeOut",
        onComplete: function () { /*this.rt.clear()*/console.log("ok");; this.fireball.alpha = 0 },
        paused: true
      });
      this.fireFX.setCallback('onUpdate', this.draw, [], this);



//
//       this.charge = this.tweens.add({
//         targets: this.bulletCanon,
//         // scale: 8,
//         x: this.canon1.x - 140,
//         // yoyo: true,
//         paused: false,
//         duration: 2000,
//         repeat: 0,
//         onComplete: function () { console.log('onComplete'); arguments[1][0].setTintFill(0xffbc00); },
//
//         // onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
//
//       });
//
//       fireball.setPosition(player.x, player.y).setScale(0.5).setAlpha(1);
//
// curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(player.x, player.y), new Phaser.Math.Vector2(x, y));
//
// fireball.setPath(curve);
// fireball.startFollow(300);
//
// fireFX.restart();
    }

    if (Phaser.Input.Keyboard.JustUp(this.canonKeyPressed)) {
      // this.charge.stop()

      // console.log(this.groupeBullets.getChildren()[0]);

      // this.charge = this.tweens.add({
  // targets: this.bulletCanon,
  // scale: 8,
  // x: 2000,
  // yoyo: true,
  // paused: false,
  // duration: 500,
  // repeat: 0,
  // onComplete: function () { console.log('onComplete'); arguments[1][0].setTintFill(0xffbc00); },

  // onYoyo: function () { console.log('onYoyo'); console.log(arguments); },

// });
      // if (this.chargePret) {

      // }
      // var coefDir;
      // if (this.girlMap['direction'] == 'left') { coefDir = -1; } else { coefDir = 1 }
      // this.bulletCanon.alpha = 0.5; // vitesse en x et en y

      // this.bulletCanon.setScale(5); // vitesse en x et en y
      // console.log(this.bullet);
    }

    // console.log(this.zKey);

    // if (Phaser.Input.Keyboard.JustDown(this.zKeyPressed)) {
    //   console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    // }

        // console.log(Phaser.Input.Keyboard.JustDown(this.zKeyPressed));

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

  onYoyoHandler: function (tween, target)
{
    console.log(arguments);

    target.toggleFlipX().setAlpha(0.2 + Math.random());
},

  displayPlayers: function(self, playerInfo, iscurrent) {
    // plane = this.matter.add.sprite(300, 360, "plane", "plane1.png", { shape: spritePhysics.plane });
    console.log("Ajout joueur function");
    const joueur = self.matter.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setScale(0.38);
    // this.matter.add.joint(this.bullet, self.player,  35, 0.4)
    // self.matter.add.constraint(this.bullet ,self.player, 500, 0);

    joueur.playerId = playerInfo.playerId;
    joueur.arene = playerInfo.arene;
    joueur.ombre = playerInfo.ombre;
    joueur.setFrictionAir(0.03);
  // joueur.setFriction(0.5);

    // joueur.setFriction(0.9);

    joueur.setMass(15);
    // joueur.setIgnoreGravity(true)

    // joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -30, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    // joueur.ombre = self.add.ellipse(joueur.socle.x, joueur.socle.y - 35, 100, 20, 0x0009).setAlpha(0.5);
    joueur.socle = self.add.zone(playerInfo.x, playerInfo.y + 30, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    joueur.ombre = self.add.ellipse(joueur.socle.x, joueur.socle.y - 35, 100, 20, 0x0009).setAlpha(0.5);




    self.players.add(joueur);

    // self.matter.add.constraint(self.bullet, joueur, 500, 0.2);




    if (iscurrent) {
      self.cameras.main.startFollow(joueur, false, 0.2, 0.2);


    // joueur.socle = self.add.zone(playerInfo.x, joueur.displayHeight -30, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    // joueur.ombre = self.add.ellipse(joueur.socle.x, joueur.socle.y - 35, 100, 20, 0x0009).setAlpha(0.5);

    // var socleJoueur = self.matter.add.gameObject(joueur.socle);
    // socleJoueur.setIgnoreGravity(true).setStatic(true)
    // console.log(joueur);

    // var Bodies = Phaser.Physics.Matter.Matter.Bodies;
    // var rect = Bodies.rectangle(0, 0, 98, 98);



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
