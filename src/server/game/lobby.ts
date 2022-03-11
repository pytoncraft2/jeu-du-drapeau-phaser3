//@ts-nocheck
import "@geckos.io/phaser-on-nodejs"
import { Room, Client } from "colyseus"

import { LobbyState, Joueur, JoueurIndex, ListeJoueurIndex } from "./LobbyState"


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
    this.listeIndex = {
      0: [],
      1: [],
      2: [],
      3: []
    }

    this.onMessage("etatJoueur", (client, message) => {
      this.etatJoueur[client.id] = message
      if (!this.listeIndex[message.indexConfirmation].includes(client.id)) {
        this.listeIndex[message.indexConfirmation].push(client.id)
      }

      if (this.listeIndex[message.ancienIndexConfirmation]) {
        if (this.listeIndex[message.ancienIndexConfirmation] !== this.listeIndex[message.indexConfirmation]) {
          let arr = this.listeIndex[message.ancienIndexConfirmation]
          for( var i = 0; i < arr.length; i++){
            if ( arr[i] === client.id) {
              arr.splice(i, 1);
              i--;
            }
          }
        }
      }

      this.state.listeJoueurIndex.shift()
      this.state.listeJoueurIndex.push(JSON.stringify([this.listeIndex]))
      this.state.joueurs.set(client.id, new Joueur(message));
    })
  }

  onJoin(client: Client) {
    this.etatJoueur[client.id] = {
      pret: false,
      indexConfirmation: -1,
      ancienIndexConfirmation: -1
    }

    for (const [key, value] of Object.entries(this.etatJoueur)) {
      this.state.joueurs.set(key, new Joueur(value))
    }
  }

  onLeave(client: Client) {
    console.log(`${client.id} left !! `)
    this.state.joueurs.delete(client.id)
    for (const [key] of Object.entries(this.listeIndex)) {
      this.listeIndex[key] = this.listeIndex[key].filter((a: any) => a !== client.id)
    }

    this.state.listeJoueurIndex.shift()
    this.state.listeJoueurIndex.push(JSON.stringify([this.listeIndex]))

    delete this.etatJoueur[client.id]
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
