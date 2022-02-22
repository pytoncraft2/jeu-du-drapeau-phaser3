"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@geckos.io/phaser-on-nodejs");
const colyseus_1 = require("colyseus");
const config_1 = __importDefault(require("./config"));
const RoomState_1 = require("./RoomState");
class GameRooms extends colyseus_1.Room {
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
        console.log(`${client.id} has joined!`);
        this.userInputs[client.id] = {
            up: false,
            right: false,
            down: false,
            left: false,
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
exports.default = GameRooms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvcm9vbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGFBQWE7Ozs7O0FBRWIsdUNBQW9DO0FBQ3BDLHVDQUF1QztBQUN2QyxzREFBNkI7QUFFN0IsMkNBQXNEO0FBRXRELE1BQXFCLFNBQVUsU0FBUSxlQUFJO0lBSXpDO1FBQ0UsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxRQUFRLENBQUMsT0FBWTtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUkscUJBQVMsRUFBRSxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFFcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXhCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQTtRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQVksRUFBRSxJQUFTO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRztZQUMzQixFQUFFLEVBQUUsS0FBSztZQUNULEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsS0FBSztTQUNaLENBQUE7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDcEQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxrQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7U0FDakQ7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWMsRUFBRSxTQUFrQjtRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDcEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxrQkFBa0IsQ0FBQyxDQUFBO0lBQy9DLENBQUM7Q0FDRjtBQWhERCw0QkFnREMifQ==