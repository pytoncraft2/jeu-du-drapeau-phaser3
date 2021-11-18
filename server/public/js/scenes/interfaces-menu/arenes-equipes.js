import * as Arene from '../elements/bouton-choix-equipe.js'

const AreneEquipes = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function AreneEquipes ()
  {
    Phaser.Scene.call(this, { key: 'areneEquipes' });
  },
  init: function(data) {
  this.personnage = data.personnage;
 },

  create: function() {

          var p0 = new Phaser.Math.Vector2(200, 500);
     var p1 = new Phaser.Math.Vector2(200, 200);
     var p2 = new Phaser.Math.Vector2(600, 200);
     var p3 = new Phaser.Math.Vector2(600, 500);

     var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

     var max = 28;
     var points = [];
     var tangents = [];

     for (var c = 0; c <= max; c++)
     {
         var t = curve.getUtoTmapping(c / max);

         points.push(curve.getPoint(t));
         tangents.push(curve.getTangent(t));
     }

     var tempVec = new Phaser.Math.Vector2();

     var spark0 = this.add.particles('bullet').setDepth(200);
     var spark1 = this.add.particles('bulletVerte').setDepth(200);

     for (var i = 0; i < points.length; i++)
     {
         var p = points[i];

         tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);

         var angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

         var particles = (i % 2 === 0) ? spark0 : spark1;

         particles.createEmitter({
             x: tempVec.x,
             y: tempVec.y,
             angle: angle,
             speed: { min: -10, max: 50 },
             gravityY: 200,
             scale: { start: 0.4, end: 0.1 },
             lifespan: 800,
             blendMode: 'SCREEN'
         });
     }
     /*
     var particles = this.add.particles('bullet');

     var rect = new Phaser.Geom.Rectangle(0, 0, 1600, 100);

     var emitter = particles.createEmitter({
         x: -400,
         y: -100,
         moveToX: 400,
         moveToY: 600,
         lifespan: 1000,
         scale: 0.5,
         quantity: 4,
         _frequency: 20,
         blendMode: 'ADD',
         emitZone: { source: rect }
     });
     */



    // this.socket = io();

    // this.socket.emit('rejoindre salon', {salon: "LOBBY"})
    // this.socket.emit("nouveau joueur", this.scene.key);

    // this.socket.on("nouveau joueur", (data) => {
    // this.addPlayer();
  // });
    const halfWidth = 1500 / 2;
    const halfHeight = 720 / 2;
    var up = 90;
    var top = 400;

    this.equipe = this.add.text(300, 120, ['CHOISIR UNE ARENE ET VOTRE EQUIPE']).setFontSize(47).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
    //
    // new Arene.Naruto(this, up + 400, top, halfHeight, halfWidth, this.personnage);
    // new Arene.Pikachu(this, up + 800, top, halfHeight, halfWidth, this.personnage);
},
});



export default AreneEquipes;
