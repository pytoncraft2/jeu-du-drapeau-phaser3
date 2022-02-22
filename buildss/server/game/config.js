"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const game_1 = __importDefault(require("./scenes/game"));
const lobby_1 = __importDefault(require("./scenes/lobby"));
const config = {
    type: phaser_1.default.HEADLESS,
    parent: "game",
    scale: {
        width: 640,
        height: 320,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
        },
    },
    scene: [lobby_1.default, game_1.default],
    fps: { min: 10, target: 60 },
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUEyQjtBQUMzQix5REFBZ0M7QUFDaEMsMkRBQWtDO0FBRWxDLE1BQU0sTUFBTSxHQUFpQztJQUMzQyxJQUFJLEVBQUUsZ0JBQU0sQ0FBQyxRQUFRO0lBQ3JCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztLQUNaO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFLFFBQVE7UUFDakIsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtTQUNwQjtLQUNGO0lBQ0QsS0FBSyxFQUFFLENBQUMsZUFBSyxFQUFFLGNBQUksQ0FBQztJQUNwQixHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7Q0FDN0IsQ0FBQTtBQUVELGtCQUFlLE1BQU0sQ0FBQSJ9