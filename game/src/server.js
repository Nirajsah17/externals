const http = require('http');
var WebSocketServer = require('websocket').server;
const server = http.createServer();
const app = require("express")();
app.listen(8081, () => console.log("listening at 8081"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})
server.listen(8080, () => {
  console.log("listening at port at 8080");
});

// Variable declarartion
const clients = {};
const games = {}

function guid() {
  var result, i, j;
  result = '';
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}

function updateGameState() {



  for (const g of Object.keys(games)) {
    const game = games[g];
    const payLoad = {
      "method": "update",
      "game": game
    }

    game.clients.forEach(c => {
      clients[c.clientId].connection.send(JSON.stringify(payLoad))
    })
  }

  setTimeout(updateGameState, 500)
}

const wsServer = new WebSocketServer(
  {
    httpServer: server
  }
)

wsServer.on("request", (request) => {
  // Connection 
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened"));
  connection.on("close", () => console.log("close"));
  connection.on("message", (message) => {
    const result = JSON.parse(message.utf8Data);
    console.log(result);
    // I have receied a message from the client 
    if (result.method === "create") {
      const clientId = result.clientId;
      const gameId = guid();
      games[gameId] = {
        "id": gameId,
        "balls": 20,
        "clients": []
      }
      const payLoad = {
        "method": "create",
        "game": games[gameId]
      }
      const con = clients[clientId].connection;
      con.send(JSON.stringify(payLoad));

    }
    // client want to join
    if (result.method === "join") {

      const clientId = result.clientId;
      const gameId = result.gameId;
      const game = games[gameId];
      if (game.clients.length >= 3) {
        // sorry max player reached
        return;
      }
      const color = { "0": "red", "1": "Green", "2": "blue" }[game.clients.length]
      game.clients.push({
        "clientId": clientId,
        "color": color
      });
      // start the game
      if (game.clients.length === 3) updateGameState();

      const payLoad = {
        "method": "join",
        "game": game
      }
      game.clients.forEach(c => {
        clients[c.clientId].connection.send(JSON.stringify(payLoad));
      })

    }

    // User play
    if (result.method === "play") {
      const clientId = result.clientId;
      const gameId = result.gameId;
      const ballId = result.ballId;
      const color = result.color;
      let state = games[gameId].state;

      if (!state)
        state = {}

      state[ballId] = color;
      games[gameId].state = state;

    }


  });

  // generate a new clientId
  const clientId = guid();
  clients[clientId] = {
    "connection": connection
  }
  console.log(connection);
  const payLoad = {
    "method": "connect",
    "clientId": clientId,
  }

  // send back the client connection
  connection.send(JSON.stringify(payLoad));

})