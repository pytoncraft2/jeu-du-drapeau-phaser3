import Phaser from "phaser"
import Scenes from "./scenes/index"

const config = {
  type: Phaser.AUTO,
  parent: "game",
  // transparent: true,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
    callbacks: {
      postBoot: () => {
        game.scale.refresh();
      },
    },
  dom: {
    createContainer: true
  },
  audio: {
    disableWebAudio: true,
  }
}

const game=new Phaser.Game(
  Object.assign(config, {
    scene: Scenes,
  })
)
