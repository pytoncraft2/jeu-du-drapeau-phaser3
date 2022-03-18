import Phaser from "phaser"
import Game from "./scenes/hall"
import Lobby from "./scenes/lobby"


/**
 * Configuration Phaser 3
 */

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.HEADLESS,
  parent: "game",
  width: 1920,
  height: 945,
  scale: {
    mode: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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
