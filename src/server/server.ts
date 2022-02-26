import { WebSocketTransport } from "@colyseus/ws-transport"
import { Server } from "colyseus"
import dotenv from "dotenv"
import express from "express"
import http from "http"
import path from "path"
import { monitor } from "@colyseus/monitor";


import GameRooms from "./game/rooms"
import LobbyRooms from "./game/lobby"
// Get environment variables
dotenv.config()
const HOST = process.env.HOST || "0.0.0.0"
const PORT = parseInt(process.env.PORT || "3000")

// Instantiate Express app
const app = express()

// Serve dist folder
const distPath = path.join(__dirname, "../../dist/")
app.use(express.static(distPath))

// Register frontend pages
app.get("/", (_request, response) => {
  response.sendFile(distPath + "/game.html")
})

app.use('/colyseus', monitor());


// Define game server
const server = http.createServer(app)
const gameServer = new Server({
  transport: new WebSocketTransport({
    server: server,
    pingInterval: 5000,
    pingMaxRetries: 3,
  }),
})

// Register room handlers
gameServer.define("lobby", LobbyRooms).filterBy(['salon'])
gameServer.define("game_instance", GameRooms).filterBy(['salon'])
// .enableRealtimeListing();

// Start game server
void gameServer.listen(PORT, HOST)
console.info(`Listening on http://${HOST}:${PORT}`)
