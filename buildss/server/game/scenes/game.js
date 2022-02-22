"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClass_1 = __importDefault(require("./class/PlayerClass"));
class Game extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    setRoom(room) {
        this.room = room;
    }
    preload() { }
    create() {
        console.log("game_instance created!!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvZ2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLHNFQUE2QztBQUU3QyxNQUFxQixJQUFLLFNBQVEsTUFBTSxDQUFDLEtBQUs7SUFJNUM7UUFDRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFTO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELE9BQU8sS0FBSSxDQUFDO0lBRVosTUFBTTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNwQyxjQUFjLEVBQUUsSUFBSTtZQUNwQixrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBRXBCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUM5QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFBO2FBQ2xFO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPO1lBQ0wsU0FBUyxFQUFFLFFBQVE7WUFDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ25DLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU07U0FDcEMsQ0FBQTtJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsUUFBYTtRQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDOUIsSUFBSSxxQkFBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUNwRSxDQUFBO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUE7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFFBQVEsVUFBVSxDQUFDLENBQUE7UUFFekMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFhO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsUUFBUSxZQUFZLENBQUMsQ0FBQTtRQUMzQyxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLElBQUcsQ0FBQztDQUMzQjtBQTdERCx1QkE2REMifQ==