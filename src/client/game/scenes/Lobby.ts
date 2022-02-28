import Phaser from "phaser"

import * as Colyseus from "colyseus.js"

export default class Lobby extends Phaser.Scene {
  private playersMessage: Phaser.GameObjects.Text;
  client!: Colyseus.Client
  session: string
  room: Colyseus.Room<unknown>
  salon: string

  constructor() {
    super("Lobby")
  }

  init(salon: any) {
    this.salon = salon.salon
  }

  preload() {
    this.load.html('nameform', './loginform.html');
  }

  async create() {

    const self = this;
    this.playersMessage = this.add
    .text(400, 300, `SUPER LOBBY`)
    .setOrigin(0.5)
    .setInteractive();

    this.client = new Colyseus.Client("ws://localhost:3000")
    const salon = this.salon
    const client = this.client

      client
      .joinOrCreate("lobby", { salon })
      .then((room) => {
        self.room = room
        self.session = room.sessionId
        console.log("SALON LOBBY REJOINT & CONNECTÉ OK");


        self.playersMessage.setInteractive().on('pointerdown', () => {
          room.leave();
          self.scene.start('Jeu_01',{salon: salon});
        });

        // room.onStateChange((changes: any) => {
        //   let presences = {}
        //   changes.presences.forEach((value, key) => {
        //     presences[key] = value
        //   })
        //   self.patchPlayer({
        //     presences: presences,
        //     presenceList: Object.keys(presences),
        //   })
        // })
      })
      .catch((err) => {
        console.error(err)
      })
    // }

  }

  update() {}
}
