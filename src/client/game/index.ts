import Phaser from "phaser"
import config from "./config"
import Scenes from "./scenes/index"


const game=new Phaser.Game(
  Object.assign(config, {
    scene: Scenes,
  })
)

window.addEventListener('resize', () => {
  game.scale.refresh();
});
