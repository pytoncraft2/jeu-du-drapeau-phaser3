"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_transport_1 = require("@colyseus/ws-transport");
const colyseus_1 = require("colyseus");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const rooms_1 = __importDefault(require("./game/rooms"));
const lobby_1 = __importDefault(require("./game/lobby"));
// Get environment variables
dotenv_1.default.config();
const HOST = process.env.HOST || "0.0.0.0";
const PORT = parseInt(process.env.PORT || "3000");
// Instantiate Express app
const app = (0, express_1.default)();
// Serve dist folder
const distPath = path_1.default.join(__dirname, "../../dist/");
app.use(express_1.default.static(distPath));
// Register frontend pages
app.get("/", (_request, response) => {
    response.sendFile(distPath + "/game.html");
});
// Define game server
const server = http_1.default.createServer(app);
const gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server: server,
        pingInterval: 5000,
        pingMaxRetries: 3,
    }),
});
//gameServer.simulateLatency(200)
// Register room handlers
gameServer.define("lobby", lobby_1.default).filterBy(['salon']);
gameServer.define("game_instance", rooms_1.default).filterBy(['salon']);
// .enableRealtimeListing();
// Start game server
void gameServer.listen(PORT, HOST);
console.info(`Listening on http://${HOST}:${PORT}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBMkQ7QUFDM0QsdUNBQWlDO0FBQ2pDLG9EQUEyQjtBQUMzQixzREFBNkI7QUFDN0IsZ0RBQXVCO0FBQ3ZCLGdEQUF1QjtBQUd2Qix5REFBb0M7QUFDcEMseURBQXFDO0FBRXJDLDRCQUE0QjtBQUM1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2YsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFBO0FBQzFDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQTtBQUVqRCwwQkFBMEI7QUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUE7QUFFckIsb0JBQW9CO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUVqQywwQkFBMEI7QUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUU7SUFDbEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRixxQkFBcUI7QUFDckIsTUFBTSxNQUFNLEdBQUcsY0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDNUIsU0FBUyxFQUFFLElBQUksaUNBQWtCLENBQUM7UUFDaEMsTUFBTSxFQUFFLE1BQU07UUFDZCxZQUFZLEVBQUUsSUFBSTtRQUNsQixjQUFjLEVBQUUsQ0FBQztLQUNsQixDQUFDO0NBQ0gsQ0FBQyxDQUFBO0FBRUYsaUNBQWlDO0FBRWpDLHlCQUF5QjtBQUN6QixVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxlQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQzFELFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGVBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7QUFDakUsNEJBQTRCO0FBRzVCLG9CQUFvQjtBQUNwQixLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBIn0=