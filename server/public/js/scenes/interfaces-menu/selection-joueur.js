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

   create: function() {
     var liste = ['dessinatrice1_', 'naruto_', 'ninja_', 'ninja2_'];
     const self = this;
     var x = 350;
     var y = 400;
     var up = 0;
     liste.forEach((item, i) => {
       this.player = 'player' + i.toString();
       this.player = self.add.image(x + up, y, item).setScale(0.38).setOrigin(0.5, 0.5);
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
