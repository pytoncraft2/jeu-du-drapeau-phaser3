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
    this.listeIndex = {
      0: [],
      1: [],
      2: [],
      3: []
    }

    this.onMessage("etatJoueur", (client, message) => {
      let arr;
      this.etatJoueur[client.id] = message
      if (!this.listeIndex[message.indexConfirmation].includes(client.id)) {
        this.listeIndex[message.indexConfirmation].push(client.id)
      }

      if (this.listeIndex[message.ancienIndexConfirmation]) {
        if (this.listeIndex[message.ancienIndexConfirmation] !== this.listeIndex[message.indexConfirmation]) {
          arr = this.listeIndex[message.ancienIndexConfirmation]
          for( var i = 0; i < arr.length; i++){
            if ( arr[i] === client.id) {
              arr.splice(i, 1);
              i--;
            }
          }
        }
      }

      console.log('aaaarr')
      console.log(arr)
      console.log('ouiii')
      console.log(this.listeIndex[message.ancienIndexConfirmation])
      this.etatJoueur[client.id] = {
        pret: message.pret,
        indexConfirmation: message.indexConfirmation,
        ancienIndexConfirmation: message.indexConfirmation,
        ancienTexte: this.listeIndex[message.ancienIndexConfirmation]
      }
      // console.log(this.listeIndex[message.ancienIndexConfirmation])

      this.state.joueurs.set(client.id, new Joueur(message));
    })
  }

  onJoin(client: Client) {
    this.etatJoueur[client.id] = {
      pret: false,
      indexConfirmation: -1,
      ancienIndexConfirmation: -1,
      ancienTexte: []
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
    delete this.etatJoueur[client.id]
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
