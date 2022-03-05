// //@ts-nocheck
// import "@geckos.io/phaser-on-nodejs"
// import { Room, Client, updateLobby } from "colyseus"
// import config from "./config"
//
// import { RoomState, Player, Input } from "./RoomState"
//
// export default class AcceuilRooms extends Room {
//   Game!: Phaser.Game
//   scene!: Phaser.Scene
//
//   constructor() {
//     super()
//   }
//
//   onCreate(options: any) {
//
//   }
//
//   onJoin(client: Client, options: any, auth: any) {
//   }
//
//   onLeave(client: Client, consented: boolean) {
//   }
//
//   onDispose() {
//     console.log(`${this.roomId} shutting down!!`)
//   }
// }

/**
 * Lobby serveur
 */

import { Schema, type } from "@colyseus/schema";
import { Client, LobbyRoom } from "colyseus";

class LobbyState extends Schema {
    @type("string") custom: string ;
}

export default class CustomLobbyRoom extends LobbyRoom {
    async onCreate(options) {
        await super.onCreate(options);

        this.setState(new LobbyState());
    }

    onJoin(client: Client, options) {
        super.onJoin(client, options);
        this.state.custom = client.sessionId;
    }

    onLeave(client) {
        super.onLeave(client);
    }
}
