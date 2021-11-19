const MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu ()
    {
        Phaser.Scene.call(this, { key: 'mainMenu' });
    },

    create: function ()
    {
        var sceneB = this.scene.get('sceneB');

        const self = this;
        const halfWidth = 1500 / 2;
        const halfHeight = 720 / 2;

        this.goSelectionM = this.add.text(halfWidth - 90, halfHeight - 10, ['JOUER']).setFontSize(47).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        // this.fullscreen = this.add.text(halfWidth - 90, halfHeight - 10, ['Activer pleine ecran']).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce');
        this.fullscreen = this.add.image(40,40, 'fullscreen')

        // Multijoueur
        this.goSelectionM.setInteractive().on('pointerdown', function() {
          self.scene.start('selectionJoueur');
        });

        this.fullscreen.setInteractive().on('pointerdown', function() {
        this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()
      },this);


      }

});

export default MainMenu
