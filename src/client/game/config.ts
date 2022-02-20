import Phaser from "phaser"

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#33A5E7",
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true
  },
  pixelArt: true,
}


