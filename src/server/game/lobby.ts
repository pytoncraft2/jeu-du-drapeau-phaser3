//@ts-nocheck
import "@geckos.io/phaser-on-nodejs"
import { Room, Client } from "colyseus"
import config from "./config"

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
    // this.Game = new Phaser.Game(config)
    // this.scene = this.Game.scene.scenes[0]
    // this.scene.setRoom(this)

    this.onMessage("etatJoueur", (client, message) => {
      this.etatJoueur[client.id] = message



      // const map = new Joueur<string>();
      const item = this.state.joueurs.get(client.id).pret;
      this.state.joueurs.set(client.id, new Joueur(message));

      console.log("IIIIIITEMM")
      console.log(item)

      console.log("my item message")
      console.log(message.pret)

console.log("FIIIIIIIIIIIIINALL")

// this.state.joueurs.forEach((value, key) => {
//   console.log("key =>", key)
//   console.log("value =>", value)
// });
      // this.state.joueurs.set('pret', message.pret)
      // console.log("ETTTAT")
      // console.log(this.etatJoueur)
      // console.log('Message')
      // console.log(message)
      this.state.joueurs.get(client.id).pret
      // console.log(this.state.joueurs)
      // console.log(this.etatJoueur)
      // console.log(`JOUEUR ${client.id} etat mise a jour`)
      // this.broadcast("etatJoueurMAJ", {id: client.id, index: message.indexConfirmation});
    })
  }

  onJoin(client: Client, options: any, auth: any) {
    this.etatJoueur[client.id] = {
      pret: false,
      indexConfirmation: -1
    }
    // console.log("__________________")
    // console.log(this.etatJoueur)
    // console.log(this.state)
    // console.log(this.state.joueurs)


    // this.state.joueurs.forEach(element => {
    //   console.log(element);
    // });

    // const map = new Joueur<string>();
    // map.set("key", "value");
    // map.set("key", "value");
    // const presences = {
    //   presences: { KzYyr8OA8: { x: 100, y: 100 } },
    //   presenceList: [ 'KzYyr8OA8' ],
    //   total: 1
    // }
    for (const [key, value] of Object.entries(this.etatJoueur)) {
      this.state.joueurs.set(key, new Joueur(value))
    }

    // console.log("LLLLLLLLLLENGTH")
    // console.log(Object.entries(this.etatJoueur).length)
    // console.log(this.state.joueurs)
  }

  onLeave(client: Client, consented: boolean) {
    console.log(`${client.id} left !! `)
    // const presences = this.scene.removePlayer(client.id)
    this.state.joueurs.delete(client.id)
    delete this.etatJoueur[client.id]
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
