//@ts-nocheck

import "@geckos.io/phaser-on-nodejs"
import { Room, Client } from "colyseus"
import config from "./config"

import { RoomState, Player } from "./RoomState"


/**
 * Epreuve n°1 serveur
 */

export default class GameRooms extends Room {
  Game!: Phaser.Game
  scene!: Phaser.Scene

  constructor() {
    super()
    this.autoDispose = true
    this.setPatchRate(1)
    this.maxClients = 4
  }

  onCreate() {
    this.setState(new RoomState())
    this.donnes = {}

    this.Game = new Phaser.Game(config)
    this.scene = this.Game.scene.scenes[0]
    this.scene.setRoom(this)

    this.onMessage("inputs", (client, message) => {
      this.donnes[client.id].clavier = message
    })
  }

  onJoin(client: Client, options: any) {
    console.log(`${client.id} has joined!`)
    this.donnes[client.id] = {
      clavier: {
        up: false,
        right: false,
        down: false,
        left: false,
        a: false,
        z: false,
        e: false
      },
      sprite: `${options.sprite}`
    }
    const presences = this.scene.createPlayer(client.id, options.sprite)
    for (const [key, value] of Object.entries(presences.presences)) {
      this.state.presences.set(key, new Player(value))
    }
  }

  onLeave(client: Client) {
    console.log(`${client.id} left !! `)
    const presence = this.scene.removePlayer(client.id)
    this.state.presences.delete(client.id)
    delete this.donnes[client.id].clavier
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}