
// You can write more code here
interface Initialisation {
    salon: string;
    personnage: string;
};

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import * as Colyseus from "colyseus.js"
import { deepEqual } from "../components/deepEqual"
/* END-USER-IMPORTS */

export default class Jeu extends Phaser.Scene {

	constructor() {
		super("Jeu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(914.5, 446.5, "", {});
		text.text = "Jeu";
		text.setStyle({ "fontSize": "50px" });

		// platforme
		const platforme = this.add.rectangle(2525, 883, 128, 128);
		platforme.scaleX = 61.15808405866377;
		platforme.scaleY = 0.9668506362174432;
		platforme.isFilled = true;

		// hall
		const hall = this.add.image(964, 474, "hall");
		hall.scaleX = 1.4949546765712298;
		hall.scaleY = 1.3095362876154848;

		// map_boss1
		const map_boss1 = this.add.image(2780, 485, "map_boss1");
		map_boss1.scaleX = 2.7229582803329224;
		map_boss1.scaleY = 2.7049866133838867;

		// fufuSuperDino
		const fufuSuperDino = this.add.image(5842, 506, "FufuSuperDino");
		fufuSuperDino.scaleX = 3.2452412254302274;
		fufuSuperDino.scaleY = 3.2455827561129156;

		// map_hall0
		const map_hall0 = this.add.image(-735, 501, "map_hall0");
		map_hall0.scaleX = 2.3381350234957354;
		map_hall0.scaleY = 2.4548157869180836;

		// map_hall1
		const map_hall1 = this.add.image(-2176, 501, "map_hall1");
		map_hall1.scaleX = 2.244013013382078;
		map_hall1.scaleY = 2.4560336835205145;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here


	client!: Colyseus.Client
  players!: Phaser.GameObjects.Group
  session?: string
  playersRef: any
  salon?: string
  keyboard!: any
  room?: Colyseus.Room<unknown>
  personnage?: string
  prevInputs?: { up: boolean; right: boolean; left: boolean; down: boolean, space: boolean, a: boolean, z: boolean, e: boolean }



	init(info: Initialisation)  {
		this.salon = info.salon
		this.personnage = info.personnage
	}


	async create() {

		this.editorCreate();

		console.log(`WELCOME TO JEU ${this.salon}`)

		const self = this;
		this.players = this.add.group()
		this.playersRef = {}
		this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space,A,Z,E")


		const client = new Colyseus.Client("ws://localhost:3000")
		console.log("HALL 01 CONNECTÉ");
		const salon = this.salon;
		const sprite = this.personnage;

		// alert(this.personnage)
		await client
		.joinOrCreate("game_instance", { salon: salon, sprite: sprite })
		.then((room) => {
			self.room = room
			self.session = room.sessionId
			console.log("OKAY")
			room.onStateChange((changes: any) => {
				let presences : any = {}
				changes.presences.forEach((value: any, key: any) => {
					presences[key] = value
				})
				self.patchPlayer({
					presences: presences,
					presenceList: Object.keys(presences),
				})
			})
		})
		.catch((err) => {
			console.error(err)
		})


	}

	async patchPlayer(list: any) {
		// create instance of all presence

		list.presenceList.map((item: string, idx: number) => {
			if (this.playersRef[item] === undefined) {
				const x = list.presences[item].x
				const y = list.presences[item].y
				const sprite = list.presences[item].sprite
				if (list.presences[item].sprite) {
					const player = this.add
					.sprite(x, y, `${sprite}`)
					.setData({ ClientId: list.presenceList[idx] })
					this.players.add(player)
					this.playersRef[item] = player
          // this.cameras.main.startFollow(player);
				}
			} else {
				if (list.presences[item].sprite) {
					this.playersRef[item].x = list.presences[item].x
					this.playersRef[item].y = list.presences[item].y
				}
			}
		})

		// deleted non existance

		this.players.children.iterate((child) => {

      console.log(list.presences[child.data.values.ClientId])

			if (list.presences[child.data.values.ClientId] === undefined) {
				this.playersRef[child.data.values.ClientId].destroy(true)
				delete this.playersRef[child.data.values.ClientId]
			}
		})
	}

	update() {
		if (this.room) {
      //@ts-ignore
      // console.log(this.players.getChildren()[0].data.list.ClientId)
      //@ts-ignore
      if (this.players.getChildren()[0].x > 1900 && this.players.getChildren()[0].x < 1902) {
        // console.log("SUPP")
        // if (this.player.roomChange) {

          this.cameras.main.fadeOut(250, 0, 0, 0, (camera: any, progress: any) => {
            // this.player.canMove = false;
            if (progress === 1) {
              // Change camera boundaries when fade out complete.
              this.cameras.main.setBounds(1920,
                                          0,
                                          2000,
                                          945,
                                          true);

              // Fade back in with new boundareis.
              this.cameras.main.fadeIn(500, 0, 0, 0, function(camera: any, progress: any) {
              }, this);
            }
          }, this);
        // }
      }
			const { up, right, left, down, space, A, Z, E } = this.keyboard

			const inputs = {
				up: up.isDown ? true : false,
				right: right.isDown ? true : false,
				left: left.isDown ? true : false,
				down: down.isDown ? true : false,
				space: space.isDown ? true : false,
				a: A.isDown ? true : false,
				z: Z.isDown ? true : false,
				e: E.isDown ? true : false
			}

			if (!deepEqual(inputs, this.prevInputs)) {
				this.prevInputs = inputs
				this.room.send("inputs", inputs)
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
