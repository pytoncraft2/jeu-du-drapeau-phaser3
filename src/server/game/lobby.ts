//@ts-nocheck
import "@geckos.io/phaser-on-nodejs"
import { Room, Client } from "colyseus"

import { LobbyState, Joueur, JoueurIndex, ListeJoueurIndex, Proprietaire } from "./LobbyState"


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


    // console.log("sate")
    // console.log(this.state.proprietaire)
    // console.log(!this.state.proprietaire.length)
    // console.log("PUUUSHH")
    // console.log(!this.state.proprietaire.length)
    //
    // console.log("INNCLUDE 1 ???")
    // console.log(this.state.proprietaire.includes(client.id))


    if (!this.state.proprietaire.length) {
      this.state.proprietaire.push(client.id)
    }

    // console.log("INNCLUDE 2 ???")

    // console.log(this.state.proprietaire.includes(client.id))

    for (const [key, value] of Object.entries(this.etatJoueur)) {
      this.state.joueurs.set(key, new Joueur(value))
    }
    // console.log("____")
    // console.log(this.etatJoueur)
    // console.log("COMBIEN !")
    // console.log(this.clients.length)
  }

  onLeave(client: Client) {


    // console.log("AVANT--------------")
    // console.log(this.etatJoueur)
    // console.log(this.state.proprietaire)




    this.state.joueurs.delete(client.id)
    for (const [key] of Object.entries(this.listeIndex)) {
      this.listeIndex[key] = this.listeIndex[key].filter((a: any) => a !== client.id)
    }



    this.state.listeJoueurIndex.shift()
    this.state.listeJoueurIndex.push(JSON.stringify([this.listeIndex]))
    // console.log(this.etatJoueur[client.id] === '👑')

    // console.log("_______________________???")
    // console.log(Object.entries(this.etatJoueur))
    // console.log("oooooooooooonee")
    // console.log(Object.keys(this.etatJoueur)[0])
    // console.log("<<<<<<<<<<<<<<<<<<<<<<")
    // console.log(this.etatJoueur.length)
    // console.log(this.state.proprietaire.includes(client.id))
    console.log("LENGHT -----------------")
    console.log(Object.entries(this.etatJoueur).length)
    if (this.state.proprietaire.includes(client.id) && Object.entries(this.etatJoueur).length > 1) {
      delete this.etatJoueur[client.id]
      this.state.proprietaire.shift()
      console.log(Object.keys(this.etatJoueur)[0])
      this.state.proprietaire.push(Object.keys(this.etatJoueur)[0])
      // console.log("suppression de l'admin et remplacement")
    } else {
      delete this.etatJoueur[client.id]
      // console.log("rien a faire changer coté admin")
    }

    console.log("LENGHT AAAAAAAAAAAAAAAAPRES")
    console.log(Object.entries(this.etatJoueur).length)

    // console.log("APPPRES")
    // console.log(this.etatJoueur)
    // console.log(this.state.proprietaire)





    // console.log("CCCCCCCCCCCCCCCCCCCC")
    console.log(`${client.id} left !! `)

  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
