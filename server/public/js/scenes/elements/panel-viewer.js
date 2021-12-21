/**
* [TOGGLE AFFICHAGE DU PANEL SELON DONNÉS]
*/


const PanelViewer = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function PanelViewer (a)
    {
        Phaser.Scene.call(this, { key: 'panelViewer', active: true });
        this.abonner;
    },

    create: function ()
    {
      this.data.set('ouvert', true);
      this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(0);
      this.viewers = this.add.text(this.game.scale.width - 530, this.game.scale.height - 150, '❤️ Viewer: 400', { font: '23px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(0);
      this.fakehear = this.add.text(this.game.scale.width - 730, this.game.scale.height - 150, 'FAKHEAR', { font: '19px Georgia, "Goudy Bookletter 1911", Times, serif' }).setScrollFactor(0).setDepth(202).setAlpha(0);
      this.imageFakhear = this.add.image(100, 870, 'profilPanel').setScale(0.6).setScrollFactor(0).setDepth(203);
      this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(0);
      this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(0);
    },

    toggle: function () {
      this.data.toggle('ouvert')
      this.viewers.setAlpha(this.data.get('ouvert'))
      this.fakehear.setAlpha(this.data.get('ouvert'))
      this.pannelBottom.setAlpha(this.data.get('ouvert'))
      this.pannelRight.setAlpha(this.data.get('ouvert'))
      this.imageFakhear.setAlpha(this.data.get('ouvert'))
      this.info.setAlpha(this.data.get('ouvert'))
    }

});

export default PanelViewer;
