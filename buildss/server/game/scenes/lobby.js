"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClass_1 = __importDefault(require("./class/PlayerClass"));
class Game extends Phaser.Scene {
    constructor() {
        super("Lobby");
    }
    setRoom(room) {
        this.room = room;
    }
    preload() { }
    create() {
        console.log("lobby_instance créer!!");
        this.players = this.physics.add.group({
            runChildUpdate: true,
            collideWorldBounds: true,
        });
        this.playersRef = {};
        this.physics.world.setBoundsCollision(true, true, true, true);
    }
    getPresence() {
        let response = {};
        this.players.children.iterate((child) => {
            if (child.data.values.ClientId) {
                response[child.data.values.ClientId] = { x: child.x, y: child.y };
            }
        });
        return {
            presences: response,
            presenceList: Object.keys(response),
            total: Object.keys(response).length,
        };
    }
    createPlayer(ClientId) {
        const player = this.add.existing(new PlayerClass_1.default(this, 100, 100, "", ClientId).setData({ ClientId }));
        this.players.add(player);
        this.playersRef[ClientId] = player;
        console.log(`player ${ClientId} created`);
        return this.getPresence();
    }
    removePlayer(ClientId) {
        this.playersRef[ClientId].destroy(true);
        delete this.playersRef[ClientId];
        console.log(`player ${ClientId} destroyed`);
        return this.getPresence();
    }
    update(time, deltaTime) { }
}
exports.default = Game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvc2NlbmVzL2xvYmJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0Esc0VBQTZDO0FBRTdDLE1BQXFCLElBQUssU0FBUSxNQUFNLENBQUMsS0FBSztJQUk1QztRQUNFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNoQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNsQixDQUFDO0lBRUQsT0FBTyxLQUFJLENBQUM7SUFFWixNQUFNO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3BDLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFFakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUE7YUFDbEU7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU87WUFDTCxTQUFTLEVBQUUsUUFBUTtZQUNuQixZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDbkMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTTtTQUNwQyxDQUFBO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFhO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUM5QixJQUFJLHFCQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQ3BFLENBQUE7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsUUFBUSxVQUFVLENBQUMsQ0FBQTtRQUV6QyxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWE7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLFlBQVksQ0FBQyxDQUFBO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsSUFBRyxDQUFDO0NBQzNCO0FBN0RELHVCQTZEQyJ9