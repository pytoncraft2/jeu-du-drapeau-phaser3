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

    new Arene.Naruto(this, up + 400, top, halfHeight, halfWidth, this.personnage);
    new Arene.Pikachu(this, up + 800, top, halfHeight, halfWidth, this.personnage);
},
});



export default AreneEquipes;
