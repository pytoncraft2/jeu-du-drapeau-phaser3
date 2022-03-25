
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Lobby extends Phaser.Scene {

	constructor() {
		super("Lobby");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(884.5, 514, "", {});
		text.text = "LOBBY";
		text.setStyle({ "fontSize": "50px" });

		// rectangle
		const rectangle = this.add.rectangle(1043, 474, 128, 128);
		rectangle.scaleX = 8.273144383288596;
		rectangle.scaleY = 6.441889797489427;
		rectangle.isFilled = true;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		console.log("GGGGGGGGGO")
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
