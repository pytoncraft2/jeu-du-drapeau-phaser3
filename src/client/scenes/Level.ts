
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PushOnClick from "../components/PushOnClick";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// fufuSuperDino
		const fufuSuperDino = this.add.image(400, 235, "FufuSuperDino");

		// text
		const text = this.add.text(400, 436, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Phaser 3 + Phaser Editor 2D\nWebpack + TypeScript";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// fufuSuperDino (components)
		new PushOnClick(fufuSuperDino);

		this.fufuSuperDino = fufuSuperDino;
		this.text = text;

		this.events.emit("scene-awake");
	}

	public fufuSuperDino!: Phaser.GameObjects.Image;
	public text!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		let salonURL = window.location.pathname.slice(1)
		if (salonURL != '') {
			this.scene.start('Lobby', {salon: `${salonURL}`})
		} else {
			// this.afficheAcceuil()
			console.log("RIEN A FAIRE")
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
