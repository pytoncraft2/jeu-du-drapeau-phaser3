import Phaser from "phaser"

import * as Colyseus from "colyseus.js"
import { deepEqual } from "../utils/index"

export default class Jeu_01 extends Phaser.Scene {
  client!: Colyseus.Client
  players: Phaser.GameObjects.Group
  session: string
  playersRef: any
  salon: any
  id: any
  keyboard!: any
  room: Colyseus.Room<unknown>
  prevInputs: { up: boolean; right: boolean; left: boolean; down: boolean, space: boolean }
  private playersMessage: Phaser.GameObjects.Text;

  constructor() {
    super("Jeu_01")
  }

  init(salon): void {
    this.salon = salon.salon
    this.id = salon.id
  }

  preload(): void {
  }

  async create(): Promise<void> {

    const map = this.make.tilemap({ key: 'map', tileWidth: 802, tileHeight: 802 });
    const tileset = map.addTilesetImage('tiles');
    const layer = map.createLayer('Level1', tileset);
    map.setCollision([ 20, 48 ]);




    const self = this;
    this.players = this.add.group()
    this.playersRef = {}
    this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space")
    this.playersMessage = this.add
  .text(400, 300, `Players connected: 123`)
  .setOrigin(0.5);

    this.client = new Colyseus.Client("ws://localhost:3000")
    const client = this.client
    console.log("JEU 01 CONNECTÉ");



    const salon = this.salon;


    if (this.id == true) {
      console.log("TRUUUE")
      const room = await client.joinById(salon)
      .then((room) => {
        self.room = room
        self.session = room.sessionId
        room.onStateChange((changes: any) => {
          let presences = {}
          changes.presences.forEach((value, key) => {
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

      console.log("joined by id Jeu_01 successfully", room);


    } else if (this.id == false) {
      console.log("FAAAALSE")

      client
      .joinOrCreate("game_instance", { salon })
      .then((room) => {
        self.room = room
        self.session = room.sessionId
        room.onStateChange((changes: any) => {
          let presences = {}
          changes.presences.forEach((value, key) => {
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





    this.prevInputs = {
      up: false,
      right: false,
      left: false,
      down: false,
      space: false,
    }
  }

  patchPlayer(list: any) {
    // create instance of all presence

    list.presenceList.map((item, idx) => {
      if (this.playersRef[item] === undefined) {
        const x = list.presences[item].x
        const y = list.presences[item].y
        const player = this.add
          .sprite(x, y, "fakhear")
          .setData({ ClientId: list.presenceList[idx] })
        this.players.add(player)
        this.playersRef[item] = player
      } else {
        this.playersRef[item].x = list.presences[item].x
        this.playersRef[item].y = list.presences[item].y
      }
    })

    // deleted non existance

    this.players.children.iterate((child) => {
      if (list.presences[child.data.values.ClientId] === undefined) {
        this.playersRef[child.data.values.ClientId].destroy(true)
        delete this.playersRef[child.data.values.ClientId]
      }
    })
  }

  update() {
    if (this.room) {
      const { up, right, left, down, space } = this.keyboard

      const inputs = {
        up: up.isDown ? true : false,
        right: right.isDown ? true : false,
        left: left.isDown ? true : false,
        down: down.isDown ? true : false,
        space: space.isDown ? true : false,

      }

      if (!deepEqual(inputs, this.prevInputs)) {
        this.prevInputs = inputs
        this.room.send("inputs", inputs)
      }
    }
  }
}
