import Phaser from "phaser"
// import config from "./config"
import Scenes from "./scenes/index"

interface Window {
  sizeChanged: () => void;
  game: Phaser.Game;
}

const config =  {
  type: Phaser.AUTO,
  parent: "game",
  transparent: true,
  autoFocus: true,
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
  // canvasStyle: `display: block; width: 100%; height: 100%;`,
  dom: {
    createContainer: true
  },
  audio: {
    disableWebAudio: false,
  }

}


const game=new Phaser.Game(
  Object.assign(config, {
    scene: Scenes,
  })
)

window.addEventListener('resize', () => {
  game.scale.refresh();
  console.log("RRRRRRRRRRRESSIZE")
  setTimeout(() => {
  game.scale.resize(window.innerWidth, window.innerHeight);
  game.canvas.setAttribute(
    'style',
    `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
  );
}, 100);
});
