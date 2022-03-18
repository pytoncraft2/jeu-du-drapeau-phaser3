import Phaser from "phaser"

export default {
  type: Phaser.AUTO,
  parent: "game",
  transparent: true,
  scale: {
    mode: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  dom: {
    createContainer: true
  }
}
