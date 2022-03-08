//@ts-nocheck
import "@geckos.io/phaser-on-nodejs"
import { Room, Client } from "colyseus"
import config from "./config"

import { RoomState, Player, Input } from "./RoomState"


/**
 * Lobby colyseus
 */
export default class LobbyRooms extends Room {
  Game!: Phaser.Game
  scene!: Phaser.Scene

  constructor() {
    super()
    this.autoDispose = true
    this.setPatchRate(17)
    this.maxClients = 4
  }

  onCreate(options: any) {

    this.setState(new RoomState())

    if (!this.metadata) {
      this.setMetadata({ nomRoom: options.salon });
    }

    this.etatJoueur = {}
    // this.Game = new Phaser.Game(config)
    // this.scene = this.Game.scene.scenes[0]
    // this.scene.setRoom(this)

    this.onMessage("etat", (client, message) => {
      this.etatJoueur[client.id] = message
      console.log(this.etatJoueur)
      console.log(`JOUEUR ${client.id} PRET`)
      this.broadcast("miseAjourListePret", {id: client.id, index: message.indexConfirmation});
    })
  }

  onJoin(client: Client, options: any, auth: any) {
    this.etatJoueur[client.id] = {
      pret: false,
      indexConfirmation: -1
    }
    console.log("__________________")
    console.log(this.etatJoueur)
    // const presences = this.scene.createPlayer(client.id)
    // for (const [key, value] of Object.entries(presences.presences)) {
    //   this.state.presences.set(key, new Player(value))
    // }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(`${client.id} left !! `)
    // const presences = this.scene.removePlayer(client.id)
    // this.state.presences.delete(client.id)
    // delete this.etatJoueur[client.id]
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
