/**
 * PRÉCHARGER TOUTE LES IMAGES ET AFFICHE LA BARRE DE PROGRESSION
 * @type {Phaser}
 */


const BootScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function SceneB() {
      Phaser.Scene.call(this, {
        key: 'BootScene',
        active: true
      });
    },

  preload: function() {
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

    const halfWidth = 1500 / 2;
    const halfHeight = 720 / 2;



    const progressBarHeight = 100;
    const progressBarWidth = 400;

    const progressBarContainer = this.add.rectangle(
      halfWidth,
      halfHeight,
      progressBarWidth,
      progressBarHeight,
      0x000000,
    );
    const progressBar = this.add.rectangle(
      halfWidth + 20 - progressBarContainer.width * 0.5,
      halfHeight,
      10,
      progressBarHeight - 20,
      0x888888,
    );

    const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Chargement...').setFontSize(24);
    const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
    const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

    this.load.on('progress', (value) => {
      progressBar.width = (progressBarWidth - 30) * value;

      const percent = value * 100;
      percentText.setText(`${percent}%`);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();

      this.scene.start('mainMenu');
    });

    this.loadAssets();


  },

  loadAssets: function() {
    var liste = ['dessinatrice1_', 'naruto_', 'ninja_'];
    // var liste2 = ['dessinatrice1', 'naruto'];
    liste.forEach((item) => {
      this.load.image(item, 'assets/selection/' + item + '.png');
    });

    // liste2.forEach((item) => {
    //   this.load.atlas(item, 'assets0/personnages/' + item + '/' + item + '.png', 'assets/personnages/' + item + '/' + item + '_atlas.json');
    // });
    // this.load.image('bg', 'assets0/fond/streetOfRage.png');
    this.load.image('chambre', 'assets/fond/bgGrandGrandePorteFond.png');
    // this.load.image('doors', 'assets0/fond/doors.png');
    // this.load.atlas('ennemy', 'assets0/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');
    // this.load.atlas('dessinatrice1', 'assets0/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');

    this.load.image('mask', 'assets0/mask1.png');



    //------------------ATLAS
    //DESSINATRICE
    this.load.atlas('dessinatrice1', 'assets/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');

    //NARUTO
    // this.load.atlas('naruto', 'assets/personnages/naruto/naruto.png', 'assets/personnages/naruto/naruto_atlas.json');

    //NINJA
    // this.load.atlas('ninja', 'assets/personnages/ninja/ninja.png', 'assets/personnages/ninja/ninja_atlas.json');

    //FILLE NINJA
    // this.load.atlas('ninja2', 'assets/personnages/ninja2/ninja2.png', 'assets/personnages/ninja2/ninja2_atlas.json');

    //AVENTURIERE 2
    // this.load.atlas('aventuriere2', 'assets/personnages/aventuriere2/aventuriere2.png', 'assets/personnages/aventuriere2/aventuriere2_atlas.json');

    //CHEVALIER
    // this.load.atlas('chevalier', 'assets/personnages/chevalier/chevalier.png', 'assets/personnages/chevalier/chevalier_atlas.json');

    // this.load.image('tonneau', 'assets0/barrel.png')
    // this.load.image('profilPanel', 'assets0/liveProfilPanel.png');
    // this.load.image('portal', 'assets0/portal.png');
    // this.load.image('bullet', 'assets0/bullet.png');
    // this.load.image('bulletVerte', 'assets0/bulletVerte.png');
    // this.load.image('bulletBleu', 'assets0/bulletBleu.png');

    // this.load.image('drapeauBleu', 'assets0/drapeauBleu.png');
    // this.load.image('matDrapeauBleu', 'assets0/matDrapeauBleu.png');
    // this.load.image('drapeauVert', 'assets0/drapeauVert.png');


    // this.load.image('mini', 'assets0/miniJoueur.png');
    // this.load.atlas('saut', 'assets0/sautest/saut.png', 'assets0/sautest/saut_atlas.json');

    this.load.image('fullscreen', 'assets0/fullscreen.png');
    // this.load.image('bgMenu', 'assets/fond/bgMenu.png');

    // this.load.image('bg', 'assets/fond/bgGrand.png');
    this.load.image('interieur-maison', 'assets/fond/interieur-maison.png');
    this.load.image('platforme', 'assets/fond/platforme.png');
    this.load.image('scaleCorrectJoueur', 'assets/fond/scaleCorrectJoueur.png');
    this.load.image('facade', 'assets/fond/facade-maison.png');
    this.load.image('plafond', 'assets/fond/plafond-maison.png');
    // this.load.image('fontaine', 'assets/fond/fontaine.png');
    // this.load.image('fontaineDerriere', 'assets/fond/fontaineDerriere.png');



    // this.load.image('tobogan', 'assets/fond/tobogan.png');
    // this.load.image('poteau', 'assets/fond/poteau.png');
    // this.load.image('canon-socle', 'assets/fond/canon-socle.png');
    // this.load.image('canon', 'assets/fond/canon.png');
    // this.load.image('doors', 'assets/fond/doors.png');
    // this.load.image('bg2', 'assets/fond/bgMenu.png');

  }

});

export default BootScene;
