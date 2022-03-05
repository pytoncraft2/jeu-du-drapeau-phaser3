import Phaser from "phaser"
import Game from "./scenes/game"
import Lobby from "./scenes/lobby"


/**
 * Configuration Phaser 3
 */

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.HEADLESS,
  parent: "game",
  scale: {
    width: 640,
    height: 320,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
    },
  },
  scene: [Lobby, Game],
  fps: { min: 10, target: 60 },
}

export default config
