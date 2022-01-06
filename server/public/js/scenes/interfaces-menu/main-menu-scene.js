const MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu ()
    {
        Phaser.Scene.call(this, { key: 'mainMenu' });
    },

    create: function ()
    {
      var liste = ['dessinatrice1_', 'naruto_', 'ninja_'];

        var sceneB = this.scene.get('sceneB');

        const self = this;
        const halfWidth = 1500 / 2;
        const halfHeight = 720 / 2;

        this.goSelectionM = this.add.text(halfWidth - 90, halfHeight - 10, ['JOUER']).setFontSize(47).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.fullscreen = this.add.image(40,40, 'fullscreen')

        this.goSelectionM.setInteractive().on('pointerdown', function() {
          self.scene.start('selectionJoueur',{liste: liste});
        });

        this.fullscreen.setInteractive().on('pointerdown', function() {
        this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()
      },this);


      }

});

export default MainMenu
