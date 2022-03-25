
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import * as Colyseus from "colyseus.js"
/* END-USER-IMPORTS */

export default class Lobby extends Phaser.Scene {

	constructor() {
		super("Lobby");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// boutonLobby
		const boutonLobby = this.add.text(884.5, 446.5, "", {});
		boutonLobby.text = "LOBBY";
		boutonLobby.setStyle({ "fontSize": "50px" });

		this.boutonLobby = boutonLobby;

		this.events.emit("scene-awake");
	}

	public boutonLobby!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	client!: Colyseus.Client
	session!: string
	room!: Colyseus.Room<unknown>
	salon!: string
	personnages!: string[]
	player: any
	joueursPresents!: string
	container!: Phaser.GameObjects.Container
	panelGauche: any
	listeJoueur!: Object
	personnageChoisie: string = "fakhear"
	boutonActivable: boolean = false
	bouton: any
	pret: boolean = false

	 init(salon: any) {
    this.salon = salon.salon
    this.personnages = ['fakhear', 'akhizonah', 'huzounet', 'fakhear'];
  }


	async create() {
		this.editorCreate();
		this.boutonLobby
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			this.scene.start('Jeu')
		});

		console.log(`WELCOME TO LOBBY ${this.salon}`)

		await this.connexion()
	}

	async connexion() {
		const self = this
		const client = new Colyseus.Client("ws://localhost:3000")
		const salon = this.salon


		await client
		.joinOrCreate("lobby", { salon })
		.then((room) => {
			self.room = room
			self.session = room.sessionId

			setTimeout(() => {
				self.demandeCommencerJeu()
			}, 2000);

			room.onMessage("commencerJeu", _message => {
				self.commencerJeu()
			});
		})
		.catch((err) => {
			console.error(err)
		})
	}

	commencerJeu() {
		this.room.leave()
		this.scene.start('Jeu', {
			salon: this.salon,
			personnage: this.personnageChoisie
		});
	}

	demandeCommencerJeu() {
		this.room.send('demandeCommencerJeu')
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
