const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http Server
    this.server = http.createServer(this.app);

    //Configuracion socket
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/index.html"));
    });
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar midlewares
    this.middlewares();
    this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en : ${this.port}`);
    });
  }
}

module.exports = Server;
