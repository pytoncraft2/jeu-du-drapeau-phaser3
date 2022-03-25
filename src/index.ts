import Phaser from "phaser";
import Level from "./client/scenes/Level";
import preloadPackUrl from "../static/assets/preload-asset-pack.json";
import Preload from "./client/scenes/Preload";
import Lobby from "./client/scenes/Lobby";
import Jeu from "./client/scenes/Jeu";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", preloadPackUrl);
    }

    create() {

       this.scene.start("Preload");
    }
}

window.addEventListener('load', function () {

	const game = new Phaser.Game({
		width: 1920,
		height: 945,
		backgroundColor: "#2f2f2f",
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},
		scene: [Boot, Preload, Level, Lobby, Jeu]
	});

	game.scene.start("Boot");

});
