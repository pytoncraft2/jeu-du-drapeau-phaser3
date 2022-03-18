//@ts-nocheck
import { Player } from "../RoomState"

import PlayerClass from "./class/PlayerClass"


/**
 * Lobby serveur Phaser 3
 */
export default class Game extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  room: any

  constructor() {
    super("Lobby")
  }

  setRoom(room: any) {
    this.room = room
  }

  preload() {}

  create() {
    console.log("lobby_instance créer!!")
    this.players = this.physics.add.group({
      runChildUpdate: true,
      collideWorldBounds: true,
    })

    this.playersRef = {}

    this.physics.world.setBoundsCollision(true, true, true, true)
    var platforme = this.add.rectangle(200, 550, 148, 148, 0x6666ff);
console.log(platforme)


this.physics.add.existing(platforme, true);
this.physics.add.collider(platforme, this.players);



  }

  getPresence() {
    let response = {}

    this.players.children.iterate((child) => {
      if (child.data.values.ClientId) {
        response[child.data.values.ClientId] = { x: child.x, y: child.y }
      }
    })

    return {
      presences: response,
      presenceList: Object.keys(response),
      total: Object.keys(response).length,
    }
  }

  createPlayer(ClientId: any) {
    const player = this.add.existing(
      new PlayerClass(this, 100, 100, "", ClientId).setData({ ClientId })
    )
    this.players.add(player)
    this.playersRef[ClientId] = player
    console.log(`player ${ClientId} created`)

    return this.getPresence()
  }

  removePlayer(ClientId: any) {
    this.playersRef[ClientId].destroy(true)
    delete this.playersRef[ClientId]
    console.log(`player ${ClientId} destroyed`)
    return this.getPresence()
  }

  update(time, deltaTime) {}
}
