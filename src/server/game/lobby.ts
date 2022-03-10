//@ts-nocheck
import "@geckos.io/phaser-on-nodejs"
import { Room, Client } from "colyseus"

import { LobbyState, Joueur } from "./LobbyState"


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

    this.setState(new LobbyState())

    if (!this.metadata) {
      this.setMetadata({ nomRoom: options.salon });
    }

    this.etatJoueur = {}

    this.onMessage("etatJoueur", (client, message) => {
      this.etatJoueur[client.id] = message
      console.log('ETTTAT')
      console.log(this.etatJoueur)
      this.state.joueurs.set(client.id, new Joueur(message));
      console.log(this.state.joueurs)
    })
  }

  onJoin(client: Client, options: any, auth: any) {
    this.etatJoueur[client.id] = {
      pret: false,
      indexConfirmation: -1
    }

    for (const [key, value] of Object.entries(this.etatJoueur)) {
      this.state.joueurs.set(key, new Joueur(value))
    }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(`${client.id} left !! `)
    this.state.joueurs.delete(client.id)
    delete this.etatJoueur[client.id]
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
