import Phaser from "phaser"
import config from "./config"
import GameScene from "./scenes/Game"
import Lobby from "./scenes/Lobby"
import Jeu_01 from "./scenes/Jeu_01"

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene, Lobby, Jeu_01],
  })
)
