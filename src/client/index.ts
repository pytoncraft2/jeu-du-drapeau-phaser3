import Phaser from "phaser";
import Level from "./scenes/Level";
import preloadPackUrl from "../../static/assets/preload-asset-pack.json";
import Preload from "./scenes/Preload";

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
    parent: "game",
    transparent: true,
    width: window.innerWidth,
    height: window.innerHeight,
		backgroundColor: "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)",
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},
		scene: [Boot, Preload, Level]
	});

	game.scene.start("Boot");

});
