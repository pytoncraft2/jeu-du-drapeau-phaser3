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

 const SelectionJoueur = new Phaser.Class({

   Extends: Phaser.Scene,

   initialize:

   function SelectionJoueur ()
   {
     Phaser.Scene.call(this, { key: 'selectionJoueur' });
   },

   init: function(data) {
     this.liste = data.liste;
   },

   create: function() {
     const self = this;
     var x = 290;
     var y = 600;
     var up = 0;
     this.liste.forEach((item, i) => {
       this.player = 'player' + i.toString();
       this.player = self.add.image(x + up, y, item).setScale(0.48).setOrigin(0.5, 1);
       up += 200;

       this.player.setInteractive().on('pointerdown', function() {
         self.scene.start('areneEquipes', {
           personnage: this.frame.texture.key
         });
       });
     });
   },
 });

export default SelectionJoueur;
