import Scenes from './scenes/index.js'

var config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 720,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  scale: {
    mode: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'matter',
    matter: {
        debug: false,
        // gravity: {
          // y: 10
        // },
    },
    arcade: {
      debug: false
    }
},
   scene: Scenes
};

var game = new Phaser.Game(config);
