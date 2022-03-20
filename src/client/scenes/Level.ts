
// You can write more code here
import * as Colyseus from "colyseus.js"
import { RoomAvailable } from "colyseus.js";
import Panel from "../utils/panel";


/* START OF COMPILED CODE */

import Phaser from "phaser";
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

		// text
		const text = this.add.text(608.5, 300, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Resident Streamer";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// rectangle
		const rectangle = this.add.rectangle(216.2089349581494, 532, 128, 945);
		rectangle.scaleX = -2.6387081220230924;
		rectangle.scaleY = 1.1445505078317437;
		rectangle.setOrigin(0.36902129141497886, 0.49240140177825);
		rectangle.isFilled = true;
		rectangle.fillColor = 0;
		rectangle.fillAlpha = 0.1;
		rectangle.strokeAlpha = 0.5;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	async create() {

		var div = document.getElementById('game');
		div!.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"

		this.editorCreate();

		let intro = ["Combatter le plus rapidement possible les 5 Boss du manoirs.", "De 1 à 4 joueurs !", "__________________", "Lobby disponible", "__________________"];

		var text = new Panel("Bienvenue !",intro , this, () => {
		})

		// let Titre = this.add.text(20, 50, titre, { fontFamily: 'CustomFontNormal' }).setOrigin(0).setFontSize(39);
		const client = new Colyseus.Client("ws://localhost:3000")
		const lobby = await client.joinOrCreate("acceuil");

		let allRooms: RoomAvailable[] = [];

		lobby.onMessage("rooms", (rooms) => {
			allRooms = rooms;
			this.miseAjourListe(self, allRooms, text, intro)
		});

		lobby.onMessage("+", ([roomId, room]) => {
			const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
			if (roomIndex !== -1) {
				allRooms[roomIndex] = room;
			} else {
				allRooms.push(room);
			}
			this.miseAjourListe(self, allRooms, text, intro)
		});

		lobby.onMessage("-", (roomId) => {
			allRooms = allRooms.filter((room) => room.roomId !== roomId);
			this.miseAjourListe(self, allRooms, text, intro)
		});

		console.log("coucou")
	}

	/**
	 * miseAjourListe - Met à jour la liste des lobby disponible
	 *
	 * @param  {Phaser.Scene} self: Phaser.Scene    Scene Phaser
	 * @param  {Object} allRooms: Object[]|string[] liste des rooms disponible
	 * @param  {String} text: any                   texte phaser et contenu à mettre à jour
	 * @param  {String} intro: string[]             texte de bienvenue
	 */
 miseAjourListe(self: any, allRooms: Object[]|string[], text: any, intro: string[]) {
	 self.listeLobby = []
	 allRooms.map((val: any) => {
		 if (val.metadata) {
			 self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
		 }
	 })
	 text.setContenu(intro.concat(self.listeLobby))
 }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
