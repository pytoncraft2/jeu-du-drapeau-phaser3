import Phaser from "phaser"

import * as Colyseus from "colyseus.js"
import { deepEqual } from "../../utils/index"

interface Initialisation {
    salon: string;
    personnage: string;
};

/**
 * Epreuve n°1
 */
export default class Hall_01 extends Phaser.Scene {
  client!: Colyseus.Client
  players: Phaser.GameObjects.Group
  session: string
  playersRef: any
  salon: string
  keyboard!: any
  room: Colyseus.Room<unknown>
  personnage: string
  prevInputs: { up: boolean; right: boolean; left: boolean; down: boolean, space: boolean }

  constructor() {
    super("Hall_01")
  }

  init(info: Initialisation)  {
    this.salon = info.salon
    this.personnage = info.personnage
  }

  async create(): Promise<void> {

    var platforme = this.add.rectangle(960, 750, 1930, 148, 0x6666ff);



// this.physics.add.existing(r1);

    const self = this;
    this.players = this.add.group()
    this.playersRef = {}
    this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space")


    const client = new Colyseus.Client("ws://localhost:3000")
    console.log("JEU 01 CONNECTÉ");
    const salon = this.salon;
    const sprite = this.personnage;

    // alert(this.personnage)
      await client
      .joinOrCreate("game_instance", { salon: salon, sprite: sprite })
      .then((room) => {
        self.room = room
        self.session = room.sessionId
        room.onStateChange((changes: any) => {
          let presences = {}
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

    this.prevInputs = {
      up: false,
      right: false,
      left: false,
      down: false,
      space: false,
    }
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
          console.log("________HHHEIGHT")
          console.log(player.displayWidth)
          console.log(player.displayHeight)
          this.playersRef[item] = player
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
