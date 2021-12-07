/**
 * Selection des personnage
 * Identifiant de la class Solo
 * @type {String}
 */

 /**
 * Affiche les joueurs
 * Selectionne la clé de l'image lors du clique et l'envoie dans la class Multijoueur pour afficher le bon skin dans le jeu
 * @return {void}
 */
 import Animations from '../elements/liste-animations.js'

 const SelectionJoueur = new Phaser.Class({

   Extends: Phaser.Scene,

   initialize:

   function SelectionJoueur ()
   {
     Phaser.Scene.call(this, { key: 'selectionJoueur' });
   },

   create: function() {
     var liste = ['dessinatrice1', 'naruto', 'ninja', 'ninja2', 'aventuriere2'];
     const self = this;
     var x = 350;
     var y = 600;
     var up = 0;
     const player = {}
     liste.forEach((item, i) => {
       player[i] = self.add.sprite(x + up, y, `${item}`, 'face0').setScale(0.48).setOrigin(0.5, 1);
       up += 200;

       player[i].setInteractive().on('pointerdown', function() {
         self.scene.start('areneEquipes', {
           personnage: this.frame.texture.key
         });
       });
     });
     // player[0].play('jump')
   },
 });

export default SelectionJoueur;
