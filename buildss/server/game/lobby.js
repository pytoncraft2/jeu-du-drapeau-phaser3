"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
require("@geckos.io/phaser-on-nodejs");
const colyseus_1 = require("colyseus");
const config_1 = __importDefault(require("./config"));
const RoomState_1 = require("./RoomState");
class LobbyRooms extends colyseus_1.Room {
    constructor() {
        super();
        this.autoDispose = false;
        this.setPatchRate(17);
        this.maxClients = 4;
    }
    onCreate(options) {
        this.setState(new RoomState_1.RoomState());
        this.userInputs = {};
        this.Game = new Phaser.Game(config_1.default);
        this.scene = this.Game.scene.scenes[0];
        this.scene.setRoom(this);
        this.onMessage("inputs", (client, message) => {
            this.userInputs[client.id] = message;
        });
    }
    onJoin(client, options, auth) {
        console.log(`${client.id} a rejoind le lobby !!!!!!!!!!`);
        this.userInputs[client.id] = {
            up: false,
            right: false,
            down: false,
            left: false,
            space: false,
        };
        const presences = this.scene.createPlayer(client.id);
        for (const [key, value] of Object.entries(presences.presences)) {
            this.state.presences.set(key, new RoomState_1.Player(value));
        }
    }
    onLeave(client, consented) {
        console.log(`${client.id} left !! `);
        const presences = this.scene.removePlayer(client.id);
        this.state.presences.delete(client.id);
        delete this.userInputs[client.id];
    }
    onDispose() {
        console.log(`${this.roomId} shutting down!!`);
    }
}
exports.default = LobbyRooms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvbG9iYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxhQUFhO0FBQ2IsdUNBQW9DO0FBQ3BDLHVDQUF1QztBQUN2QyxzREFBNkI7QUFFN0IsMkNBQXNEO0FBRXRELE1BQXFCLFVBQVcsU0FBUSxlQUFJO0lBSTFDO1FBQ0UsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxRQUFRLENBQUMsT0FBWTtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUkscUJBQVMsRUFBRSxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFFcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXhCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQTtRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQVksRUFBRSxJQUFTO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQzNCLEVBQUUsRUFBRSxLQUFLO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFBO1FBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3BELEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksa0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1NBQ2pEO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjLEVBQUUsU0FBa0I7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0NBQ0Y7QUFqREQsNkJBaURDIn0=