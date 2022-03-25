
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

	preload(): void {

		this.load.pack("preload-asset-pack", "assets/preload-asset-pack.json");
	}

	editorCreate(): void {

		// panel_gauche
		const panel_gauche = this.add.layer();

		// rectangle
		const rectangle = this.add.rectangle(216.2089385986328, 532, 128, 945);
		rectangle.scaleX = -2.6387081220230924;
		rectangle.scaleY = 1.1445505078317437;
		rectangle.setOrigin(0.36902129141497886, 0.49240140177825);
		rectangle.isFilled = true;
		rectangle.fillColor = 0;
		rectangle.fillAlpha = 0.1;
		rectangle.strokeAlpha = 0.5;
		panel_gauche.add(rectangle);

		// bouton_classement
		const bouton_classement = this.add.layer();

		// rectangle_1
		const rectangle_1 = this.add.rectangle(1742, 1032, 128, 128);
		rectangle_1.scaleX = 2.782683731979375;
		rectangle_1.scaleY = 0.7462738542507983;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0.1;
		bouton_classement.add(rectangle_1);

		// bouton_classement_texte
		const bouton_classement_texte = this.add.text(1681, 1023, "", {});
		bouton_classement_texte.text = "CLASSEMEN";
		bouton_classement_texte.setStyle({ "fontSize": "20px" });
		bouton_classement.add(bouton_classement_texte);

		// boutonCommencerLobby
		const boutonCommencerLobby = this.add.text(884.5, 514, "", {});
		boutonCommencerLobby.text = "lucky";
		boutonCommencerLobby.setStyle({ "fontSize": "50px" });

		// lists
		const list: Array<any> = [];

		this.boutonCommencerLobby = boutonCommencerLobby;
		this.list = list;

		this.events.emit("scene-awake");
	}

	public boutonCommencerLobby!: Phaser.GameObjects.Text;
	private list!: Array<any>;

	/* START-USER-CODE */

	// Write your code here

	async create() {

		var div = document.getElementById('game');
		div!.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"

		this.editorCreate();

		let intro = ["Combatter le plus rapidement possible les 5 Boss du manoirs.", "De 1 à 4 joueurs !", "__________________", "Lobby disponible", "__________________"];

		var text = new Panel("Bienvenue !",intro , this, () => {
		})

		var element = this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromCache('nameform');

		element.addListener('click');

		element.on('click', async function (event: Phaser.Input.Mouse.MouseManager) {

			if (event.target.name === 'loginButton')
			{
			// 	var inputUsername = this.getChildByName('salon');
			//
			// 	//  Have they entered anything?
			// 	if (inputUsername.value !== '')
			// 	{
			// 		//  Turn off the click events
			// 		this.removeListener('click');
			//
			// 		this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 1000, ease: 'Power3' });
			// 		this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 1000, ease: 'Power3',
			// 		onComplete: async function ()
			// 		{
			// 			element.setVisible(false);
			// 			const salon = inputUsername.value;
			// 			lobby.leave()
			// 			self.scene.start('Lobby', {salon: salon, id: false});
			// 		}
			// 	});
			// }
			// else
			// {
			// 	//  Flash the prompt
			// 	this.scene.tweens.timeline({
			// 		tweens: [{
			// 			targets: element,
			// 			x: element.x - 10,
			// 			ease: 'Power1',
			// 			duration: 50
			// 		}],
			// 		repeat: 4,
			// 		yoyo: true
			// 	});
			// }
		}

	});


		// let Titre = this.add.text(20, 50, titre, { fontFamily: 'CustomFontNormal' }).setOrigin(0).setFontSize(39);
		this.boutonCommencerLobby.setInteractive().on('pointerdown', () => this.scene.start('Lobby'))

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
