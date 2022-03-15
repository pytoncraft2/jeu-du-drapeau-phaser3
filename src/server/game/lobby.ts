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


  /**
   * onCreate - Initialisation des parametres de base du Lobby
   * Le premier joueur définis le nom du lobby à travers le metadata
   * Ecoute les evenements quand le joueur se connecte, change d'index ou de proprietaire
   * Puis effectue les changements qu'il faut
   *
   * @param  {Object} options: Object liste des options passé par le client
   * @param  {Object} options.salon nom du salon creer par le premier joueur
   * @return {void}
   */
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


  /**
   * onJoin - Creation et Ajout d'un objet contenant les état de base du joueur
   * Le Joueur devient Proprietaire du Lobby si il est seul et est ajouté au tablau proprietaire
   *
   * @param  {Object} client: Client
   * @return {void}
   */
  onJoin(client: Client) {
    this.etatJoueur[client.id] = {
      pret: false,
      indexConfirmation: -1,
      ancienIndexConfirmation: -1
    }

    if (!this.state.proprietaire.length) {
      this.state.proprietaire.push(client.id)
    }

    for (const [key, value] of Object.entries(this.etatJoueur)) {
      this.state.joueurs.set(key, new Joueur(value))
    }
  }


  /**
   * Suppression du joueur
   *  - dans la liste des joueurs
   *  - dans l'objet listeJoueurIndex
   *  - dans l'objet proprietaire (si il est present)
   *      - assignation d'un nouveaau proprietaire qui sera le premier de la liste des joueurs
   */


  /**
   * onLeave - description
   *
   * @param  {Object} client: Client
   * @return {void}
   */
  onLeave(client: Client) {

    this.state.joueurs.delete(client.id)
    for (const [key] of Object.entries(this.listeIndex)) {
      this.listeIndex[key] = this.listeIndex[key].filter((a: any) => a !== client.id)
    }

    this.state.listeJoueurIndex.shift()
    this.state.listeJoueurIndex.push(JSON.stringify([this.listeIndex]))

    if (this.state.proprietaire.includes(client.id) && Object.entries(this.etatJoueur).length > 1) {
      delete this.etatJoueur[client.id]
      this.state.proprietaire.shift()
      this.state.proprietaire.push(Object.keys(this.etatJoueur)[0])
    } else {
      delete this.etatJoueur[client.id]
    }

    console.log(`${client.id} à bientôt 👋 !! `)
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
